import React, { useState } from 'react';
import Grid from './components/Grid';
import TurnIndicator from './components/TurnIndicator';
import ResetButton from './components/ResetButton';
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
      return;
    }
    alert(result);

    // this block enables random CPU moves
    let aiResult = '';
    const aiAttack = game.aiMove();
    aiResult = game.move(2, aiAttack);
    alert(`Your opponent strikes ${aiAttack.x}, ${aiAttack.y} - ${aiResult}`);
    //

    setPlayerOneBoard(game.getPOneBoard());
    setPlayerTwoBoard(game.getPTwoBoard());
  };

  const reset = () => {
    setGame(Game());
    game.reset();
    game.placeShips();
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
      <TurnIndicator player={game.getCurrentTurn()} />
      <Grid player={1} name="enemy" tileSet={playerTwoBoard} attack={attack} />
      <Grid player={1} name="friendly" tileSet={playerOneBoard} />
      <Grid player={2} name="enemy" tileSet={playerOneBoard} attack={attack} />
      <Grid player={2} name="friendly" tileSet={playerTwoBoard} />
      <ResetButton reset={reset} />
    </main>
  );
};

export default App;
