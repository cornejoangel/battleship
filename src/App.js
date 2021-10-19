import React, { useState } from 'react';
import Grid from './components/Grid';
import Game from './Game';
import './styles/normalize.css';
import './styles/App.css';

const App = () => {
  const game = Game();
  let tileSet = [];
  for (let i = 0; i < 10; i += 1) {
    for (let j = 0; j < 10; j += 1) {
      tileSet = tileSet.concat({ x: j, y: i });
    }
  }

  // this block is for testing, not the final version
  // it will be deleted once ship placement is implemented
  game.placeShips();
  tileSet.map((tile) => {
    const found = game
      .getPOneBoard()
      .find((boardTile) => boardTile.x === tile.x && boardTile.y === tile.y);
    if (found) {
      tile.type = found.type;
    }
    return tile;
  });
  //

  const [playerOneBoard, setPlayerOneBoard] = useState(tileSet);
  const [playerTwoBoard, setPlayerTwoBoard] = useState(tileSet);

  console.log(playerOneBoard);
  return (
    <main>
      <Grid player={1} name="enemy" tileSet={playerTwoBoard} />
      <Grid player={1} name="friendly" tileSet={playerOneBoard} />
      <Grid player={2} name="enemy" tileSet={playerOneBoard} />
      <Grid player={2} name="friendly" tileSet={playerTwoBoard} />
    </main>
  );
};

export default App;
