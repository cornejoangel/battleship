import React from 'react';
import PropTypes from 'prop-types';
import Tile from './Tile';
import Battleship from './Battleship';
import '../styles/Grid.css';

const PlacementGrid = (props) => {
  const { moveShip, rotateShip, gridShips } = props;

  let tiles = [];
  for (let i = 0; i < 10; i += 1) {
    for (let j = 0; j < 10; j += 1) {
      const tile = { x: j, y: i };
      tiles = tiles.concat(tile);
    }
  }

  let grid = null;
  grid = (
    <div className="grid friendly player1">
      {tiles.map((tile) => (
        <Tile
          type=""
          x={tile.x}
          y={tile.y}
          name=""
          player={1}
          key={`${tile.x}${tile.y}`}
          moveShip={moveShip}
        />
      ))}
      {gridShips.map((ship) => (
        <Battleship
          moveShip={moveShip}
          rotateShip={rotateShip}
          x={ship.x}
          y={ship.y}
          length={ship.length}
          orientation={ship.orientation}
          model={ship.model}
          key={`${ship.x}${ship.y}`}
        />
      ))}
    </div>
  );

  return grid;
};

PlacementGrid.propTypes = {
  moveShip: PropTypes.func,
  rotateShip: PropTypes.func,
  gridShips: PropTypes.array,
};

export default PlacementGrid;
