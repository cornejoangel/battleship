import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Tile.css';

const Tile = (props) => {
  const { type, x, y } = props;
  return (
    <div className="tile">
      {x}, {y}
    </div>
  );
};

Tile.propTypes = {
  type: PropTypes.string,
  x: PropTypes.string,
  y: PropTypes.number,
};

export default Tile;
