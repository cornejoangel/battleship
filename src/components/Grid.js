import React from 'react';
import PropTypes from 'prop-types';
import Tile from './Tile';
import '../styles/Grid.css';

const Grid = (props) => {
  const { player, name, tileSet } = props;

  return (
    <div className={`grid ${name} player${player}`}>
      {tileSet.map((tile) => (
        <Tile type="" x={tile.x} y={tile.y} />
      ))}
    </div>
  );
};

Grid.propTypes = {
  player: PropTypes.number,
  name: PropTypes.string,
  tileSet: PropTypes.array,
};

export default Grid;
