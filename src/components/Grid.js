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

  /*
  Grid's conditional render:

  There are two players and each player has two kinds of grids
    Their 'friendly' grid
    Their 'enemy' grid

  There are also 4 types of tile - 'ship', 'miss', 'hit', '' (blank)
  
  A player's friendly grid shows their own ships and the result of any attacks the enemy has made (all tile types).

  A player's enemy grid shows only the results of their own attacks (no ship tiles).
  Furthermore, when a player makes an attack, they do so by clicking on their enemy grid

  So enemy grids need:
    to show tile types but...
    to NOT show ship types
    to pass along the attack function
  
  And friendly grids only need:
    to show all tile types

  With all that in mind, lets address the following block of code:
  It just checks if it is making a friendly or enemy board
  Friendly boards don't get the attack function
  Enemy boards have their 'ship' tiles changed to '' (blank) tiles
  Unfortunately that has to happen in an ugly if/else block inside of the mapping
  */

  let grid = null;
  if (name === 'enemy') {
    grid = (
      <div className={`grid ${name} player${player}`}>
        {tiles.map((tile) => {
          let t = null;
          if (tile.type === 'ship') {
            t = (
              <Tile
                type=""
                x={tile.x}
                y={tile.y}
                name={name}
                player={player}
                key={`${tile.x}${tile.y}`}
                attack={attack}
              />
            );
          } else {
            t = (
              <Tile
                type={tile.type}
                x={tile.x}
                y={tile.y}
                name={name}
                player={player}
                key={`${tile.x}${tile.y}`}
                attack={attack}
              />
            );
          }
          return t;
        })}
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
