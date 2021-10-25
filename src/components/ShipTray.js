import React from 'react';
import PropTypes from 'prop-types';
import ShipTile from './ShipTile';
import '../styles/ShipTray.css';

const ShipTray = (props) => {
  const { moveShip } = props;
  return (
    <div className="ship-tray">
      <ShipTile x={1} y={1} moveShip={moveShip} />
    </div>
  );
};

ShipTray.propTypes = {
  moveShip: PropTypes.func,
};

export default ShipTray;
