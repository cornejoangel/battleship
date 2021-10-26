import React from 'react';
import PropTypes from 'prop-types';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../modules/Constants';
import '../styles/Tile.css';

const Tile = (props) => {
  const { type, x, y, name, player, attack, moveShip } = props;

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.SHIP,
      drop: () => moveShip(x, y, 2, 'horizontal'),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [x, y]
  );

  let tile = null;
  if (name === 'enemy') {
    tile = (
      <button
        type="button"
        className={`tile enemy-tile ${type}`}
        onClick={(e) => attack(e, player, { x, y })}
      >
        {x}, {y}
      </button>
    );
  } else {
    tile = (
      <button
        type="button"
        className={`tile ${type}`}
        ref={drop}
        // onClick={(e) => moveShip(e, x, y, 2, 'horizontal')}
      >
        {x}, {y}
      </button>
    );
  }

  return tile;
};

Tile.propTypes = {
  type: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
  name: PropTypes.string,
  player: PropTypes.number,
  attack: PropTypes.func,
  moveShip: PropTypes.func,
};

export default Tile;
