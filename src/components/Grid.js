import React from 'react';
import PropTypes from 'prop-types';
import Tile from './Tile';
import '../styles/Grid.css';

const Grid = (props) => {
  const { player, name } = props;

  let tileSet = [];
  for (let i = 0; i < 10; i += 1) {
    for (let j = 0; j < 10; j += 1) {
      tileSet = tileSet.concat({ i, j });
    }
  }
  return (
    <div className={`grid ${name} player${player}`}>
      {tileSet.map((tile) => (
        <Tile type="" />
      ))}
    </div>
  );
};

Grid.propTypes = {
  player: PropTypes.number,
  name: PropTypes.string,
};

export default Grid;
