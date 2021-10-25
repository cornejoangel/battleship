import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Tile.css';

const ShipTile = (props) => {
  const { x, y, moveShip } = props;
  let tile = null;
  tile = (
    <button type="button" className="tile ship" onClick={(e) => moveShip(e)}>
      {x}, {y}
    </button>
  );

  return tile;
};

ShipTile.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  moveShip: PropTypes.func,
};

export default ShipTile;
