import React, { useState, useRef } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Grid from './components/Grid';
import PlacementGrid from './components/PlacementGrid';
// import TurnIndicator from './components/TurnIndicator';
import ResetButton from './components/ResetButton';
import ShipTray from './components/ShipTray';
import Game from './modules/Game';
import SetupShips from './modules/SetupShips';
import './styles/normalize.css';
import './styles/App.css';

const App = () => {
  const [game, setGame] = useState(Game());
  const [playerOneBoard, setPlayerOneBoard] = useState(game.getPOneBoard());
  const [playerTwoBoard, setPlayerTwoBoard] = useState(game.getPTwoBoard());
  const [placing, setPlacing] = useState(true);
  const [trayShips, setTrayShips] = useState(SetupShips());
  const [gridShips, setGridShips] = useState([]);
  const trayRef = useRef();
  const gridRef = useRef();
  trayRef.current = trayShips;
  gridRef.current = gridShips;

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

  const moveShip = (x, y, item) => {
    const { length, model } = item;
    const temp = { x, y, length, model };

    // the ship must be either in the grid or the tray
    // we must find it so we can know its current orientation
    // this allows the ship to maintain its current orientation as it is placed
    const inGrid = gridRef.current.find((s) => s.model === model);
    const inTray = trayRef.current.find((s) => s.model === model);
    if (!!inGrid === true && !!inTray === false) {
      temp.orientation = inGrid.orientation;
    } else if (!!inGrid === false && !!inTray === true) {
      temp.orientation = inTray.orientation;
    }

    // remove this ship from the tray now that it is going in the grid
    setTrayShips((prevShips) =>
      prevShips.filter((ship) => ship.model !== model)
    );
    // remove this ship from the grid if it is already here
    // then add it in its new location
    setGridShips((prevShips) =>
      prevShips.filter((s) => s.model !== temp.model)
    );
    setGridShips((prevShips) => prevShips.concat(temp));
    setPlayerOneBoard(game.getPOneBoard());
  };

  /*
  look for the ship in gridShips and trayShips
  change its orientation wherever you find it
  update both states
  */
  const rotateShip = (e, model) => {
    e.preventDefault();
    const tempTray = trayShips.map((s) => {
      if (s.model === model && s.orientation === 'horizontal') {
        s.orientation = 'vertical';
      } else if (s.model === model && s.orientation === 'vertical') {
        s.orientation = 'horizontal';
      }
      return s;
    });

    const tempGrid = gridShips.map((s) => {
      if (s.model === model && s.orientation === 'horizontal') {
        s.orientation = 'vertical';
      } else if (s.model === model && s.orientation === 'vertical') {
        s.orientation = 'horizontal';
      }
      return s;
    });

    setTrayShips(tempTray);
    setGridShips(tempGrid);
  };

  const reset = () => {
    setGame(Game());
    game.reset();
    // game.placeShips();
    setPlayerOneBoard(game.getPOneBoard());
    setPlayerTwoBoard(game.getPTwoBoard());
    setPlacing(true);
  };

  // if (game.playerOneShips() === 0 && game.playerTwoShips() === 0) {
  //   game.placeShips();
  //   setPlayerOneBoard(game.getPOneBoard());
  //   setPlayerTwoBoard(game.getPTwoBoard());
  // }

  let screen = null;

  if (placing) {
    screen = (
      <DndProvider backend={HTML5Backend}>
        <main>
          <ShipTray
            moveShip={moveShip}
            rotateShip={rotateShip}
            trayShips={trayShips}
          />
          <h2 className="friendly-heading">place your ships</h2>
          {/* <Grid
            player={1}
            name="friendly"
            tileSet={playerOneBoard}
            moveShip={moveShip}
          /> */}
          <PlacementGrid
            moveShip={moveShip}
            rotateShip={rotateShip}
            gridShips={gridShips}
          />
          <ResetButton reset={reset} />
        </main>
      </DndProvider>
    );
  } else {
    screen = (
      <main>
        <h2 className="enemy-heading">enemy waters</h2>
        <Grid
          player={1}
          name="enemy"
          tileSet={playerTwoBoard}
          attack={attack}
        />
        <h2 className="friendly-heading">friendly waters</h2>
        <Grid player={1} name="friendly" tileSet={playerOneBoard} />
        <ResetButton reset={reset} />
      </main>
    );
  }
  return screen;
};

export default App;
