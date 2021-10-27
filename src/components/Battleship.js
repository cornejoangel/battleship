import React from 'react';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../modules/Constants';
import ShipTile from './ShipTile';
import '../styles/Battleship.css';

const Battleship = (props) => {
  const { moveShip, coords } = props;
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.SHIP,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  const { x } = coords[0];
  const { y } = coords[1];

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
      {coords.map((coord) => (
        <ShipTile
          x={coord.x}
          y={coord.y}
          moveShip={moveShip}
          key={`${coord.x}${coord.y}`}
        />
      ))}
    </div>
  );

  return ship;
};

Battleship.propTypes = {
  moveShip: PropTypes.func,
  coords: PropTypes.array,
};

export default Battleship;
