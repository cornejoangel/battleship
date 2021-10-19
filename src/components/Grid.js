import React from 'react';
import PropTypes from 'prop-types';
import Tile from './Tile';
import '../styles/Grid.css';

const Grid = (props) => {
  const { player, name, tileSet } = props;

  let grid = null;
  if (name === 'enemy') {
    grid = (
      <div className={`grid ${name} player${player}`}>
        {tileSet.map((tile) => (
          <Tile type="" x={tile.x} y={tile.y} key={`${tile.x}${tile.y}`} />
        ))}
      </div>
    );
  } else {
    grid = (
      <div className={`grid ${name} player${player}`}>
        {tileSet.map((tile) => (
          <Tile
            type={tile.type}
            x={tile.x}
            y={tile.y}
            key={`${tile.x}${tile.y}`}
          />
        ))}
      </div>
    );
  }

  return grid;
};

Grid.propTypes = {
  player: PropTypes.number,
  name: PropTypes.string,
  tileSet: PropTypes.array,
};

export default Grid;
