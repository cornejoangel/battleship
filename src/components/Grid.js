import React from 'react';
import PropTypes from 'prop-types';
import Tile from './Tile';
import '../styles/Grid.css';

const Grid = (props) => {
  const { player, name, tileSet, attack } = props;

  let tiles = [];
  for (let i = 0; i < 10; i += 1) {
    for (let j = 0; j < 10; j += 1) {
      const tile = { x: j, y: i };
      const found = tileSet.find((t) => t.x === j && t.y === i);
      if (found) {
        tile.type = found.type;
      } else {
        tile.type = '';
      }
      tiles = tiles.concat(tile);
    }
  }

  let grid = null;
  if (name === 'enemy') {
    grid = (
      <div className={`grid ${name} player${player}`}>
        {tiles.map((tile) => (
          <Tile
            type=""
            x={tile.x}
            y={tile.y}
            name={name}
            player={player}
            key={`${tile.x}${tile.y}`}
            attack={attack}
          />
        ))}
      </div>
    );
  } else {
    grid = (
      <div className={`grid ${name} player${player}`}>
        {tiles.map((tile) => (
          <Tile
            type={tile.type}
            x={tile.x}
            y={tile.y}
            name={name}
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
  attack: PropTypes.func,
};

export default Grid;
