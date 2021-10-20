import React, { useState } from 'react';
import Grid from './components/Grid';
import Game from './modules/Game';
import './styles/normalize.css';
import './styles/App.css';
import setupShipTiles from './modules/setupShipTiles';

const App = () => {
  const game = useState(Game());
  // const [tiles, setTiles] = useState(setupShipTiles());
  const [playerOneBoard, setPlayerOneBoard] = useState(setupShipTiles());
  const [playerTwoBoard, setPlayerTwoBoard] = useState(setupShipTiles());

  const attack = (e, player, coords) => {
    e.preventDefault();
    console.log(coords);
    // let result = '';
    // result = game.move(player, coords);
    // if (result === 'invalid') {
    //   alert('invalid move! make another');
    // } else {
    //   alert(result);
    // }
  };

  return (
    <main>
      <Grid player={1} name="enemy" tileSet={playerTwoBoard} attack={attack} />
      <Grid player={1} name="friendly" tileSet={playerOneBoard} />
      <Grid player={2} name="enemy" tileSet={playerOneBoard} attack={attack} />
      <Grid player={2} name="friendly" tileSet={playerTwoBoard} />
    </main>
  );
};

export default App;
