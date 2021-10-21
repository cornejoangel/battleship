import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Tile.css';

const Tile = (props) => {
  const { type, x, y, name, player, attack } = props;
  let tile = null;
  if (name === 'enemy') {
    tile = (
      <button
        type="button"
        className={`tile enemy-tile ${type}`}
        onClick={(e) => attack(e, player, { x, y })}
      >
        {x}, {y}
      </button>
    );
  } else {
    tile = (
      <button type="button" className={`tile ${type}`}>
        {x}, {y}
      </button>
    );
  }

  return tile;
};

Tile.propTypes = {
  type: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
  name: PropTypes.string,
  player: PropTypes.number,
  attack: PropTypes.func,
};

export default Tile;
