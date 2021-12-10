import React, { useState, useRef } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Grid from './components/Grid';
import PlacementGrid from './components/PlacementGrid';
import ResetButton from './components/ResetButton';
import InfoButton from './components/InfoButton';
import RandomButtom from './components/RandomButton';
import MessageBox from './components/MessageBox';
import ShipTray from './components/ShipTray';
import Game from './modules/Game';
import SetupShips from './modules/SetupShips';
import './styles/normalize.css';
import './styles/App.css';

const App = () => {
  const [game] = useState(Game());
  const [playerOneBoard, setPlayerOneBoard] = useState(game.getPOneBoard());
  const [playerTwoBoard, setPlayerTwoBoard] = useState(game.getPTwoBoard());
  const [placing, setPlacing] = useState(true);
  const [trayShips, setTrayShips] = useState(SetupShips());
  const [gridShips, setGridShips] = useState([]);
  const [playerResult, setPlayerResult] = useState('');
  const [AIResult, setAIResult] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [AIDirection, setAIDirection] = useState('none');
  const [AISearchingFrom, setAISearchingFrom] = useState({});
  const [AIRecentHit, setAIRecentHit] = useState({});
  const [recentX, setRecentX] = useState(-1);
  const [recentY, setRecentY] = useState(-1);
  const trayRef = useRef();
  const gridRef = useRef();
  trayRef.current = trayShips;
  gridRef.current = gridShips;

  const directionRef = useRef();
  const searchingRef = useRef();
  const recentRef = useRef();
  directionRef.current = AIDirection;
  searchingRef.current = AISearchingFrom;
  recentRef.current = AIRecentHit;

  const getRandomCoordinates = () => {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    return { x, y };
  };

  const attack = (e, player, coords) => {
    e.preventDefault();
    let result = '';
    let aiResult = {
      result: AIResult,
      newDirection: AIDirection,
      newSearching: searchingRef.current,
      newRecent: recentRef.current,
      newCoords: {
        x: recentX,
        y: recentY,
      },
    };
    if (!gameOver) {
      result = game.move(player, coords);
    }
    if (result !== 'invalid' && !gameOver) {
      do {
        if (
          aiResult?.result === 'invalid' &&
          aiResult.newDirection === 'down'
        ) {
          aiResult = game.smartMove(
            getRandomCoordinates(),
            'down',
            searchingRef.current,
            recentRef.current
          );
        } else if (
          aiResult?.result === 'invalid' &&
          aiResult.newDirection === 'left'
        ) {
          aiResult = game.smartMove(
            getRandomCoordinates(),
            'left',
            searchingRef.current,
            recentRef.current
          );
        } else if (
          aiResult?.result === 'invalid' &&
          aiResult.newDirection === 'right'
        ) {
          aiResult = game.smartMove(
            getRandomCoordinates(),
            'right',
            searchingRef.current,
            recentRef.current
          );
        } else if (
          aiResult?.result === 'invalid' &&
          aiResult.newDirection === 'none'
        ) {
          aiResult = game.smartMove(
            getRandomCoordinates(),
            'none',
            searchingRef.current,
            recentRef.current
          );
        } else {
          aiResult = game.smartMove(
            getRandomCoordinates(),
            directionRef.current,
            searchingRef.current,
            recentRef.current
          );
        }
      } while (aiResult.result === 'invalid');
    } else if (!gameOver) {
      result = 'invalid - select a new target';
    } else {
      result = game.checkGameOver();
      aiResult.result = game.checkGameOver();
    }

    const gameOverStatus = game.checkGameOver();

    const newX = aiResult.newCoords.x;
    const newY = aiResult.newCoords.y;
    setRecentX(newX);
    setRecentY(newY);
    setGameOver(gameOverStatus);
    setPlayerResult(result);
    setAIResult(aiResult.result);
    setAIDirection(aiResult.newDirection);
    setAISearchingFrom(aiResult.newSearching);
    setAIRecentHit(aiResult.newRecent);
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
  the ship must be either in the grid or the tray
  we must find it so we can know its current orientation
  */
  const getOrientation = (model) => {
    const inGrid = gridRef.current.find((s) => s.model === model);
    const inTray = trayRef.current.find((s) => s.model === model);
    if (!!inGrid === true && !!inTray === false) {
      return inGrid.orientation;
    }
    if (!!inGrid === false && !!inTray === true) {
      return inTray.orientation;
    }
  };

  /*
  identical to the above function but returns a built ship instead
  not DRY but i prefer doing this over making one overly if/else-y function
  if this becomes a problem i can still do that without much trouble at this scale
  */
  const getShipByModel = (model) => {
    const inGrid = gridRef.current.find((s) => s.model === model);
    const inTray = trayRef.current.find((s) => s.model === model);
    if (!!inGrid === true && !!inTray === false) {
      return buildShip(inGrid);
    }
    if (!!inGrid === false && !!inTray === true) {
      return buildShip(inTray);
    }
  };

  const moveShip = (x, y, item) => {
    const { length, model } = item;
    const temp = { x, y, length, model };

    // find the current orientation so we can know how we should place it
    temp.orientation = getOrientation(model);

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

    // remove the ship from the game board (in case it was already in the grid)
    // (does nothing if it was not in the grid)
    game.removeShipModel(1, temp.model);

    // build the ship's coordinate array so we can add it to the board
    const tempShip = buildShip(temp);

    // and add it back to the board so its new location will be up to date
    game.addShip(1, tempShip, temp.model);
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
    let tempShip = tempGrid.find((s) => s.model === model);
    if (!tempShip) {
      tempShip = tempTray.find((s) => s.model === model);
    }
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
    setPlayerOneBoard(game.getPOneBoard());
  };

  /*
  Ships cannot overlap!
  */
  const canDropShip = (x, y, item) => {
    const { length, model } = item;
    const temp = { x, y, length, model };
    temp.orientation = getOrientation(model);
    const potentialShip = buildShip(temp);
    const originalShip = getShipByModel(model);
    /*
    have to remove the ship from the set of occupied tiles before checking for 
    placement validity or else we might be rejected because the spot we are 
    moving to was occupied by this same ship before
    also have to re-add the ship or else attempting to make an invalid drop with 
    a ship will allow other ships to be placed over it
    */
    game.removeShipModel(1, temp.model);
    const result = game.checkLocation(1, potentialShip);
    game.addShip(1, originalShip, model);
    return result;
  };

  const reset = () => {
    game.reset();
    setPlayerOneBoard(game.getPOneBoard());
    setPlayerTwoBoard(game.getPTwoBoard());
    setTrayShips(SetupShips());
    setGridShips([]);
    setPlacing(true);
    setGameOver(false);
    setPlayerResult('');
    setAIResult('');
    setRecentX(-1);
    setRecentY(-1);
  };

  /*
  Called by randomShips to get the locations to move things to but extracted
  into its own function so it can also be called to randomly place the AI's ships
  Returns the data (not all the coordinates) of the ships that were generated

  clear the player's game board
  for each ship, randomize its orientation and x, y
  try to add the ship to the appropriate player's board
  if you get a failed message generate a new orientation and x, y
  */
  const setRandomShipLocations = (player) => {
    if (player === 1) {
      game.resetPlayerOne();
    } else if (player === 2) {
      game.resetPlayerTwo();
    }
    // set the basic data for the ships that will not change
    const orientations = ['horizontal', 'vertical'];
    const ships = [
      { length: 2, model: 'patrol' },
      { length: 3, model: 'submarine' },
      { length: 3, model: 'destroyer' },
      { length: 4, model: 'battler' },
      { length: 5, model: 'carrier' },
    ];
    const addedShips = [];
    for (let i = 0; i < ships.length; i += 1) {
      let notAdded = true;
      do {
        // randomly set each ship's starting coordinates and orientation
        const coords = getRandomCoordinates();
        ships[i].x = coords.x;
        ships[i].y = coords.y;
        ships[i].orientation = orientations[Math.round(Math.random())];
        // now build a ship coordinate array (addShip expects this)
        const tempShip = buildShip(ships[i]);
        // try to add the ship
        // if it fails notAdded is set to false so we reverse it to loop again
        // it it succeeds notAdded is set to true so we reverse it and don't loop again
        notAdded = !game.addShip(player, tempShip, ships[i].model);
      } while (notAdded);
      addedShips.push(ships[i]);
    }
    return addedShips;
  };

  /*
  Assigns random locations for each ship, clears the tray and moves the ships
  to their assigned locations
  */
  const randomShips = () => {
    const randomizedShips = setRandomShipLocations(1);
    setTrayShips([]);
    setGridShips(randomizedShips);
    // set the game boards
    setPlayerOneBoard(game.getPOneBoard());
    setPlayerTwoBoard(game.getPTwoBoard());
  };

  const startGame = () => {
    setPlacing(false);
    setRandomShipLocations(2);
    setPlayerTwoBoard(game.getPTwoBoard());
    // keeping this on to make testing easier
    // *** must remove before full release ***
    console.log(game.getPTwoBoard());
  };

  let screen = null;

  if (placing) {
    screen = (
      <DndProvider backend={HTML5Backend}>
        <main>
          <ul className="tray-info">
            <li>click to rotate</li>
            <li>use the lighter-colored squares to drag and drop</li>
          </ul>
          <ShipTray
            moveShip={moveShip}
            rotateShip={rotateShip}
            trayShips={trayShips}
            startGame={startGame}
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
          <InfoButton />
          <RandomButtom randomShips={randomShips} />
        </main>
      </DndProvider>
    );
  } else {
    screen = (
      <DndProvider backend={HTML5Backend}>
        <main>
          <h2 className="enemy-heading">enemy waters</h2>
          <Grid
            player={1}
            name="enemy"
            tileSet={playerTwoBoard}
            attack={attack}
          />
          <h2 className="friendly-heading">friendly waters</h2>
          <Grid
            player={1}
            name="friendly"
            tileSet={playerOneBoard}
            recentX={recentX}
            recentY={recentY}
          />
          <MessageBox
            playerResult={playerResult}
            AIResult={AIResult}
            gameOver={gameOver}
          />
          <ResetButton reset={reset} />
          <InfoButton />
        </main>
      </DndProvider>
    );
  }
  return screen;
};

export default App;
