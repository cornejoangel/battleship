import React, { useState } from 'react';
import Grid from './components/Grid';
import Game from './modules/Game';
import './styles/normalize.css';
import './styles/App.css';

const App = () => {
  const [game, setGame] = useState(Game());
  const [playerOneBoard, setPlayerOneBoard] = useState(game.getPOneBoard());
  const [playerTwoBoard, setPlayerTwoBoard] = useState(game.getPTwoBoard());

  const attack = (e, player, coords) => {
    e.preventDefault();
    let result = '';
    result = game.move(player, coords);
    if (result === 'invalid') {
      alert('invalid move! make another');
    } else {
      alert(result);
    }
    setPlayerOneBoard(game.getPOneBoard());
    setPlayerTwoBoard(game.getPTwoBoard());
  };

  if (game.playerOneShips() === 0 && game.playerTwoShips() === 0) {
    game.placeShips();
    setPlayerOneBoard(game.getPOneBoard());
    setPlayerTwoBoard(game.getPTwoBoard());
  }

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
