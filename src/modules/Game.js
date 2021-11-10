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
    if (playerOneShips() < 1 || playerTwoShips() < 1) {
      return true;
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
  what do you need in order to intelligently attack?
  You need to be able to: 
    read the results of your attacks
    know where you've had a hit
    know that ships are constructed in straight lines

  The algorithm:

  Attack randomly
  When you get a hit
    attack all of the adjacent tiles until you get another hit
    keep attacking in that direction until you get a 'miss' or 'sunk'
    if you got a sunk - return to attacking randomly (direction = '')
    if you got a miss - change the attacking direction to the opposite

  
  currently stressing over the blooming complexity of dealing with invalid attacks
  i think the way to do this is to have each direction attack check if the attack would be out of bounds. 
  if it would then you just attack searchingFrom again (so you get turned around in result checks)
  the result check of any invalid result just makes the direction the opposite

  so....
  add bound checks to direction attacks
  change newCoords to be searchingFrom if gonna go out of bounds
  make invalid results just change your direction (maybe also set recentHit to searchingFrom)

  what happens if you have two horizontal ships stacked on top of each other
  and you get a hit on the bottom one
  you start your search by trying the tile above and get a hit
  you set up as your direction and but your next move is a miss (or invalid!)
  so you go back down to the tile below your first hit
  you get another miss
  currently, you will turn around again and endlessly loop invalid moves
  i need to be able to know if ive already checked a direction before i set it as my direction
  OR i need to recognize im in this situation and just reset to searching
  how do you recognize you are in this situation
  i cant set the direction from one i was on to one ive already checked

  what if i kept an array of 'unsolved hits'
  i only do random attacks when that array is empty
  i remove from this array each time i get a 'sunk'
  */
  let direction = 'none';
  let searchingFrom = '';
  let recentHit = '';
  const checkedDirections = [];

  const checkBounds = (coords) => {
    if (coords.x > 9 || coords.x < 0 || coords.y > 9 || coords.y < 0) {
      return false;
    }
    return true;
  };

  const aiSmartMove = (coords) => {
    let result = '';
    let newCoords = coords;
    const directions = ['up', 'down', 'left', 'right'];
    if (direction === 'none') {
      result = ai.randomAttack();
    } else if (direction === 'searching' && !checkedDirections.contains('up')) {
      checkedDirections.push('up');
      newCoords = searchingFrom;
      newCoords.y -= 1;
      result = move(2, newCoords);
    } else if (
      direction === 'searching' &&
      !checkedDirections.contains('down')
    ) {
      checkedDirections.push('down');
      newCoords = searchingFrom;
      newCoords.y += 1;
      result = move(2, newCoords);
    } else if (
      direction === 'searching' &&
      !checkedDirections.contains('left')
    ) {
      checkedDirections.push('left');
      newCoords = searchingFrom;
      newCoords.x -= 1;
      result = move(2, newCoords);
    } else if (
      direction === 'searching' &&
      !checkedDirections.contains('right')
    ) {
      checkedDirections.push('right');
      newCoords = searchingFrom;
      newCoords.x += 1;
      result = move(2, newCoords);
    } else if (direction === 'up') {
      newCoords = recentHit;
      newCoords.y -= 1;
      if (checkBounds(newCoords) === false) {
        newCoords = searchingFrom;
      }
      result = move(2, newCoords);
    } else if (direction === 'down') {
      newCoords = recentHit;
      newCoords.y += 1;
      if (checkBounds(newCoords) === false) {
        newCoords = searchingFrom;
      }
      result = move(2, newCoords);
    } else if (direction === 'left') {
      newCoords = recentHit;
      newCoords.x -= 1;
      if (checkBounds(newCoords) === false) {
        newCoords = searchingFrom;
      }
      result = move(2, newCoords);
    } else if (direction === 'right') {
      newCoords = recentHit;
      newCoords.x += 1;
      if (checkBounds(newCoords) === false) {
        newCoords = searchingFrom;
      }
      result = move(2, newCoords);
    }

    if (result === 'hit' && direction === 'none') {
      direction = 'searching';
      searchingFrom = coords;
    } else if (result === 'hit' && direction === 'searching') {
      direction = checkedDirections[-1];
      recentHit = newCoords;
    } else if (result === 'sunk') {
      console.log('whoa');
      // todo
    } else if (result !== 'hit' && directions.contains(direction)) {
      // some direction has been set but we've hit a dead end
      // now lets start from the original hit and turn around
      switch (direction) {
        case 'up':
          // if i got to the point of going up i can't have checked down so go down
          direction = 'down';
          // checkedDirections.push('down');
          break;
        case 'down':
          // if i am going down then i have already checked up, go left
          direction = 'left';
          // also this case will only ever happen if my searchingFrom was the bottom
          // of two horizontally stacked ships
          // so now I need to keep track of that ship I just found above this one
          // so next add the logic of adding that to an array to come back to it later
          // but ALSO what if there was ANOTHER HORIZONTAL next to the bottom ship
          // on the left?
          // theres no way to tell when you sink that ship to the left that it
          // was not just the original horizontal unless i say which ship gets sunk
          // so you are free to just go left until you get sunk
          // and then having stored reference to the ship above come back to that after

          // checkedDirections.push('left');
          break;
        case 'left':
          // if i am going left, i have also checked up and down - go right
          direction = 'right';
          // checkedDirections.push('right');
          break;
        case 'right':
          // this block can never be executed
          // one of the other directions MUST have already been the correct one
          console.log('I was wrong');
          break;
        default:
          break;
      }
    }
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
