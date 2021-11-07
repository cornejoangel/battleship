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

  const buildShip = (shipData) => {
    const { x, y, length, orientation } = shipData;
    const ship = [];
    let tempX = 0;
    let tempY = 0;
    for (let i = 0; i < length; i += 1) {
      if (orientation === 'horizontal') {
        tempX = x + i;
        tempY = y;
      } else {
        tempX = x;
        tempY = y + i;
      }
      ship.push({ x: tempX, y: tempY });
    }
    return ship;
  };

  /*
  enumerate the possible cases of checking ship placement validity:
  - 1. i am placing a ship from the tray
  - 2. i am moving a ship within the grid
    - 2(a) the ship successfuly moves
    - 2(b) the ship does not move
  - 3. i am rotating a ship within the grid
    - 3(a) the ship successfully rotates
    - 3(b) the ship does not rotate
  */

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
    const tempShip = buildShip(temp);
    // console.log(tempShip);
    if (game.checkLocation(1, tempShip) === true) {
      game.removeShipModel(1, temp.model);
      game.addShip(1, tempShip, temp.model);
    }
    // console.log(game.getPOneBoard());
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

    /*
    Ships that are already in the grid need to check if their rotation is valid
    This necessitates a bit more logic
    */

    // find the ship we are going to rotate and preserve its location/orientation
    const tempGrid = gridShips;
    const tempShip = tempGrid.find((s) => s.model === model);
    // we will need these later if the rotation ends up being rejected
    const originalOrientation = tempShip.orientation;
    const originalShip = buildShip(tempShip);

    // lets see what this rotation would look like so we can check its validity
    if (tempShip.orientation === 'horizontal') {
      tempShip.orientation = 'vertical';
    } else if (tempShip.orientation === 'vertical') {
      tempShip.orientation = 'horizontal';
    }
    const potentialRotation = buildShip(tempShip);

    // remove the ship (otherwise the rotation will be rejected for overlap)
    game.removeShipModel(1, model);
    if (game.checkLocation(1, potentialRotation) === true) {
      // potential rotation accepted, add the ship
      game.addShip(1, potentialRotation, model);
    } else {
      // rotation rejected - return the orientation to what it started as and re-add
      tempShip.orientation = originalOrientation;
      game.addShip(1, originalShip, model);
    }

    setTrayShips(tempTray);
    setGridShips(tempGrid);
  };

  const canDropShip = () => {
    const hey = 'h';
    return true;
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
            canDropShip={canDropShip}
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
