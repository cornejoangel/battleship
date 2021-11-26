import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Tile.css';
import '../styles/ShipTile.css';

const ShipTile = (props) => {
  const { x, y, rotateShip, model, front } = props;
  let tile = null;
  tile = (
    <button
      type="button"
      onClick={(e) => rotateShip(e, model)}
      className={`tile ship ship-tile ${front ? 'front' : 'back'}`}
    >
      {x}, {y}
    </button>
  );

  return tile;
};

ShipTile.propTypes = {
  type: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
  rotateShip: PropTypes.func,
  model: PropTypes.string,
  front: PropTypes.bool,
};

export default ShipTile;
