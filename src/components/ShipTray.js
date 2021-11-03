import React from 'react';
import PropTypes from 'prop-types';
// import ShipTile from './ShipTile';
import Battleship from './Battleship';
import '../styles/ShipTray.css';

const ShipTray = (props) => {
  const { moveShip, trayShips } = props;
  let tray = null;
  tray = (
    <div className="ship-tray">
      {trayShips.map((ship) => (
        <Battleship
          moveShip={moveShip}
          x={ship.x}
          y={ship.y}
          length={ship.length}
          orientation={ship.orientation}
          model={ship.model}
          key={ship.model}
        />
      ))}
    </div>
  );
  return tray;
};

ShipTray.propTypes = {
  moveShip: PropTypes.func,
  trayShips: PropTypes.array,
};

export default ShipTray;
