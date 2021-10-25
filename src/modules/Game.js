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

  const aiMove = () => ai.randomAttack();

  const addShip = (player, coords) => {
    if (player === 1) {
      playerOneBoard.addShip(coords);
    } else if (player === 2) {
      playerTwoBoard.addShip(coords);
    }
  };

  return {
    placeShips,
    addShip,
    playerOneShips,
    playerTwoShips,
    move,
    getPOneBoard,
    getPTwoBoard,
    getCurrentTurn,
    reset,
    aiMove,
  };
};

export default Game;
