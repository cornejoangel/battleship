import React from 'react';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../modules/Constants';
import ShipTile from './ShipTile';
import '../styles/Battleship.css';

const Battleship = (props) => {
  const { moveShip, x, y, length, orientation } = props;
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.SHIP,
    item: {
      length,
      orientation,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const shipTiles = [];
  const shipCoords = {};
  shipTiles.push(<ShipTile x={x} y={y} moveShip={moveShip} key={`${x}${y}`} />);
  for (let i = 1; i < length; i += 1) {
    if (orientation === 'horizontal') {
      shipCoords.x = x + i;
      shipCoords.y = y;
    } else {
      shipCoords.x = x;
      shipCoords.y = y + i;
    }
    shipTiles.push(
      <ShipTile
        x={shipCoords.x}
        y={shipCoords.y}
        moveShip={moveShip}
        key={`${shipCoords.x}${shipCoords.y}`}
      />
    );
  }

  let ship = null;
  ship = (
    <div
      className="battleship"
      ref={drag}
      style={{
        gridColumnStart: x + 1,
        gridColumnEnd: x + 3,
        gridRowStart: y + 1,
      }}
    >
      {shipTiles}
    </div>
  );

  return ship;
};

Battleship.propTypes = {
  moveShip: PropTypes.func,
  x: PropTypes.number,
  y: PropTypes.number,
  length: PropTypes.number,
  orientation: PropTypes.string,
};

export default Battleship;
