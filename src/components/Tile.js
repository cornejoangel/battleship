import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Tile.css';

const Tile = (props) => {
  const { type } = props;
  return <div className="tile" />;
};

Tile.propTypes = {
  type: PropTypes.string,
};

export default Tile;
