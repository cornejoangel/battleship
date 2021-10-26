import React from 'react';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../modules/Constants';
import ShipTile from './ShipTile';
import '../styles/Battleship.css';

const Battleship = (props) => {
  const { moveShip } = props;
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.SHIP,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  let ship = null;
  ship = (
    <div className="battleship" ref={drag}>
      <ShipTile x={1} y={1} moveShip={moveShip} />
      <ShipTile x={2} y={1} moveShip={moveShip} />
    </div>
  );

  return ship;
};

Battleship.propTypes = {
  moveShip: PropTypes.func,
};

export default Battleship;
