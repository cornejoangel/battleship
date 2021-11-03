import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Tile.css';
import '../styles/ShipTile.css';

const ShipTile = (props) => {
  const { x, y, rotateShip, model } = props;
  let tile = null;
  tile = (
    <button
      type="button"
      onClick={(e) => rotateShip(e, model)}
      className="tile ship ship-tile"
    >
      {x}, {y}
    </button>
  );

  return tile;
};

ShipTile.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  rotateShip: PropTypes.func,
  model: PropTypes.string,
};

export default ShipTile;
