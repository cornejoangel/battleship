import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Tile.css';
import '../styles/ShipTile.css';

const ShipTile = (props) => {
  const { x, y } = props;
  let tile = null;
  tile = (
    <button type="button" className="tile ship ship-tile">
      {x}, {y}
    </button>
  );

  return tile;
};

ShipTile.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
};

export default ShipTile;
