import React from 'react';
import PropTypes from 'prop-types';
import StartButton from './StartButton';
// import ShipTile from './ShipTile';
import Battleship from './Battleship';
import '../styles/ShipTray.css';

const ShipTray = (props) => {
  const { moveShip, rotateShip, trayShips, startGame } = props;
  let tray = null;
  const inTray = true;
  if (trayShips.length > 0) {
    tray = (
      <div className="ship-tray">
        {trayShips.map((ship) => (
          <Battleship
            moveShip={moveShip}
            rotateShip={rotateShip}
            x={ship.x}
            y={ship.y}
            length={ship.length}
            orientation={ship.orientation}
            model={ship.model}
            key={ship.model}
            inTray={inTray}
          />
        ))}
      </div>
    );
  } else {
    tray = (
      <div className="ship-tray empty">
        <StartButton startGame={startGame} />
      </div>
    );
  }
  return tray;
};

ShipTray.propTypes = {
  moveShip: PropTypes.func,
  rotateShip: PropTypes.func,
  trayShips: PropTypes.array,
  startGame: PropTypes.func,
};

export default ShipTray;
