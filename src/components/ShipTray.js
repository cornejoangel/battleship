import React from 'react';
import PropTypes from 'prop-types';
// import ShipTile from './ShipTile';
import Battleship from './Battleship';
import '../styles/ShipTray.css';

const ShipTray = (props) => {
  const { moveShip, dummyShip } = props;
  let tray = null;
  if (dummyShip) {
    tray = (
      <div className="ship-tray">
        <Battleship
          moveShip={moveShip}
          coords={[
            { x: 0, y: 0 },
            { x: 1, y: 0 },
          ]}
        />
      </div>
    );
  } else {
    tray = <div className="ship-tray">empty</div>;
  }
  return tray;
};

ShipTray.propTypes = {
  moveShip: PropTypes.func,
  dummyShip: PropTypes.bool,
};

export default ShipTray;
