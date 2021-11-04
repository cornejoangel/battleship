import React from 'react';
import PropTypes from 'prop-types';
// import ShipTile from './ShipTile';
import Battleship from './Battleship';
import '../styles/ShipTray.css';

const ShipTray = (props) => {
  const { moveShip, rotateShip, trayShips } = props;
  let tray = null;
  const inTray = true;
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
  return tray;
};

ShipTray.propTypes = {
  moveShip: PropTypes.func,
  rotateShip: PropTypes.func,
  trayShips: PropTypes.array,
};

export default ShipTray;
