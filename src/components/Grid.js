import React from 'react';
import PropTypes from 'prop-types';
import Tile from './Tile';

const Grid = (props) => {
  const { player, name } = props;
  return (
    <div className="grid">
      <Tile type="" />
    </div>
  );
};

Grid.propTypes = {
  player: PropTypes.number,
  name: PropTypes.string,
};

export default Grid;
