import Gameboard from './Gameboard';
import Player from './Player';

const Game = () => {
  const ai = Player();
  const playerOneBoard = Gameboard();
  const playerTwoBoard = Gameboard();
  let currentTurn = 1;
  const playerOneShips = () => playerOneBoard.shipCount();
  const playerTwoShips = () => playerTwoBoard.shipCount();

  const changeTurn = () => {
    if (currentTurn === 1) {
      return (currentTurn = 2);
    }
    return (currentTurn = 1);
  };

  const placeShips = () => {
    // place ships for both players
    playerOneBoard.addShip([
      { x: 1, y: 3 },
      { x: 2, y: 3 },
      { x: 3, y: 3 },
    ]);
    playerOneBoard.addShip([
      { x: 5, y: 4 },
      { x: 5, y: 5 },
      { x: 5, y: 6 },
      { x: 5, y: 7 },
    ]);
    playerTwoBoard.addShip([
      { x: 1, y: 3 },
      { x: 2, y: 3 },
      { x: 3, y: 3 },
    ]);
    playerTwoBoard.addShip([
      { x: 5, y: 4 },
      { x: 5, y: 5 },
      { x: 5, y: 6 },
      { x: 5, y: 7 },
    ]);
  };

  const checkGameOver = () => {
    if (playerOneShips() < 1) {
      return 'player 2 wins!';
    }
    if (playerTwoShips() < 1) {
      return 'player 1 wins!';
    }
    return false;
  };

  const move = (player, coords) => {
    let result = '';
    // don't allow a move to be made if the game is over
    if (checkGameOver()) {
      return 'game over';
    }

    if (player === 1 && currentTurn === 1) {
      result = playerTwoBoard.receiveAttack(coords);
    } else if (player === 2 && currentTurn === 2) {
      result = playerOneBoard.receiveAttack(coords);
    } else {
      result = 'not your turn';
    }

    // check if the game is over after every move and if so who won
    // (if the game has ended as a result of a player's move that means they won)
    if (checkGameOver() && player === 1) {
      return 'player 1 wins';
    }
    if (checkGameOver() && player === 2) {
      return 'player 2 wins';
    }

    if (result !== 'not your turn' && result !== 'invalid') {
      changeTurn();
    }

    return result;
  };

  const getPOneBoard = () => playerOneBoard.getTiles();

  const getPTwoBoard = () => playerTwoBoard.getTiles();

  const getCurrentTurn = () => currentTurn;

  const reset = () => {
    playerOneBoard.resetTiles();
    playerTwoBoard.resetTiles();
  };

  const resetPOne = () => {
    playerOneBoard.resetTiles();
  };

  const resetPTwo = () => {
    playerTwoBoard.resetTiles();
  };

  /*
  smartMove assumes it will be called with a pair of random coordinates.

  smartMove must consist of two if/else sections. 
  The first section decides what kind of attack to make.
  The second section interprets the result of the attack.

  smartMove must remember between calls:
    - what direction it is checking
    - what the last hit it got was
    - what tile is it searching from

  Phases of "Smart Attacking" (similar to what a human would do):
  Random Phase (no direction set):
  - attack randomly
  - If you get a 'hit'
    - set searchingFrom and recentHit to the coordinates you just attacked
    - set direction to 'up' (move to the searching phase)
  
  Searching Phase (some direction set):
  - start from your recent hit and attack the next tile in your direction
  - If you get a 'sunk'
    - reset direction, recentHit and searchingFrom (return to random phase)
  - If you do not get a 'hit' (or 'sunk')
    - this direction is now a dead end
    - set recentHit to searchingFrom (resume search from the original hit)
    - change direction down my arbitrary sequence (up > down > left > right)
      - if the direction had been 'right'
        - then we have checked all directions
        - return to the random phase just like if we had gotten a 'sunk'
  - If you get a 'hit'
    - set the recentHit to the coordinates you just attacked

  smartMove can be 'tricked' by placing ships directly adjacent to one another.
  Consider two horizontally stacked ships.
  A human may recognize that there were two adjacent ships. (by first probing vertically)
  After sinking one they would go back for the other.
  smartMove cannot go back to another ship that it 'stumbles upon'.
  The amount of logic needed to prevent this is outside the scope of this project.
  (yes I have thought a great deal about it)
  */

  const smartMove = (coords, direction, searchingFrom, recentHit) => {
    let result = '';
    const newCoords = coords;
    let newDirection = direction;
    let newSearching = searchingFrom;
    let newRecent = recentHit;

    if (direction === 'none') {
      result = move(2, coords);
    }
    if (direction === 'up') {
      Object.assign(newCoords, recentHit);
      newCoords.y -= 1;
      result = move(2, newCoords);
    } else if (direction === 'down') {
      Object.assign(newCoords, recentHit);
      newCoords.y += 1;
      result = move(2, newCoords);
    } else if (direction === 'left') {
      Object.assign(newCoords, recentHit);
      newCoords.x -= 1;
      result = move(2, newCoords);
    } else if (direction === 'right') {
      Object.assign(newCoords, recentHit);
      newCoords.x += 1;
      result = move(2, newCoords);
    }

    if (direction === 'none' && result === 'hit') {
      Object.assign(newSearching, newCoords);
      Object.assign(newRecent, newCoords);
      newDirection = 'up';
    } else if (result === 'sunk') {
      newDirection = 'none';
      newSearching = {};
      newRecent = {};
    } else if (direction !== 'none' && result !== 'hit') {
      console.log(newDirection);
      switch (direction) {
        case 'up':
          newDirection = 'down';
          break;
        case 'down':
          newDirection = 'left';
          break;
        case 'left':
          newDirection = 'right';
          break;
        case 'right':
          // we have checked all directions, reset now
          newDirection = 'none';
          break;
        default:
          break;
      }
      Object.assign(newRecent, newSearching);
    } else if (result === 'hit') {
      Object.assign(newRecent, newCoords);
    }
    // console.log(newCoords);
    return { result, newDirection, newSearching, newRecent };
  };

  const aiMove = () => ai.randomAttack();

  const addShip = (player, coords, model = '') => {
    let result = null;
    if (player === 1) {
      result = playerOneBoard.addShip(coords, model);
    } else if (player === 2) {
      result = playerTwoBoard.addShip(coords, model);
    }
    return result;
  };

  const removeShip = (player, coords) => {
    if (player === 1) {
      playerOneBoard.removeShip(coords);
    } else if (player === 2) {
      playerTwoBoard.removeShip(coords);
    }
  };

  const removeShipModel = (player, model) => {
    if (player === 1) {
      playerOneBoard.removeModel(model);
    } else if (player === 2) {
      playerTwoBoard.removeModel(model);
    }
  };

  const checkLocation = (player, coords) => {
    if (player === 1) {
      return playerOneBoard.checkShipLocation(coords);
    }
    if (player === 2) {
      return playerTwoBoard.checkShipLocation(coords);
    }
  };

  return {
    placeShips,
    addShip,
    removeShip,
    removeShipModel,
    checkLocation,
    playerOneShips,
    playerTwoShips,
    move,
    checkGameOver,
    smartMove,
    getPOneBoard,
    getPTwoBoard,
    getCurrentTurn,
    reset,
    resetPOne,
    resetPTwo,
    aiMove,
  };
};

export default Game;
