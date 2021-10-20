import React from 'react';
import PropTypes from 'prop-types';
import Tile from './Tile';
import '../styles/Grid.css';

const Grid = (props) => {
  const { player, name, tileSet, attack } = props;

  let grid = null;
  if (name === 'enemy') {
    grid = (
      <div className={`grid ${name} player${player}`}>
        {tileSet.map((tile) => (
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
        {tileSet.map((tile) => (
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
