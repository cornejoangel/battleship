import React from 'react';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../modules/Constants';
import ShipTile from './ShipTile';
import '../styles/Battleship.css';

const Battleship = (props) => {
  const { moveShip, rotateShip, x, y, length, orientation, model, inTray } =
    props;
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.SHIP,
    item: {
      length,
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
      // eslint-disable-next-line react/jsx-boolean-value
      front={true}
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
        front={false}
        key={`${shipCoords.x}${shipCoords.y}`}
      />
    );
  }

  /*
  The addition of the dragging class (sets negative z-index) allows the user to 
  drag the ship onto a location that was previously held by the ship, otherwise 
  the same ship would be interpreted as the drop target and since ships are not 
  droppable the drop would be rejected
  */
  let ship = null;
  if (orientation === 'horizontal') {
    ship = (
      <div
        className={`battleship horizontal ${inTray ? `${model}` : ''} ${
          isDragging ? 'dragging' : ''
        }`}
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
        className={`battleship vertical ${inTray ? `${model}` : ''} ${
          isDragging ? 'dragging' : ''
        }`}
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
  inTray: PropTypes.bool,
};

export default Battleship;
