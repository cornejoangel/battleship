import React from 'react';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../modules/Constants';
import ShipTile from './ShipTile';
import '../styles/Battleship.css';

const Battleship = (props) => {
  const { moveShip, rotateShip, x, y, length, orientation, model } = props;
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.SHIP,
    item: {
      length,
      orientation,
      model,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const shipTiles = [];
  const shipCoords = {};
  shipTiles.push(
    <ShipTile
      x={x}
      y={y}
      moveShip={moveShip}
      rotateShip={rotateShip}
      model={model}
      key={`${x}${y}`}
    />
  );
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
        rotateShip={rotateShip}
        model={model}
        key={`${shipCoords.x}${shipCoords.y}`}
      />
    );
  }

  let ship = null;
  if (orientation === 'horizontal') {
    ship = (
      <div
        className="battleship horizontal"
        ref={drag}
        style={{
          gridColumnStart: x + 1,
          gridColumnEnd: x + 1 + length,
          gridRowStart: y + 1,
        }}
      >
        {shipTiles}
      </div>
    );
  } else {
    ship = (
      <div
        className="battleship vertical"
        ref={drag}
        style={{
          gridColumnStart: x + 1,
          gridRowStart: y + 1,
          gridRowEnd: y + 1 + length,
        }}
      >
        {shipTiles}
      </div>
    );
  }

  return ship;
};

Battleship.propTypes = {
  moveShip: PropTypes.func,
  rotateShip: PropTypes.func,
  x: PropTypes.number,
  y: PropTypes.number,
  length: PropTypes.number,
  orientation: PropTypes.string,
  model: PropTypes.string,
};

export default Battleship;
