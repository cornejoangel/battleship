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

export default ShipTile;
