import React from 'react';
import PropTypes from 'prop-types';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../modules/Constants';
import '../styles/Tile.css';

const Tile = (props) => {
  const {
    type,
    x,
    y,
    name,
    player,
    attack,
    moveShip,
    canDropShip,
    recentX,
    recentY,
  } = props;
  const recentHit = x === recentX && y === recentY;

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.SHIP,
      drop: (item) => moveShip(x, y, item),
      canDrop: (item) => canDropShip(x, y, item),
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
        className={`tile enemy-tile ${type} ${recentHit ? 'recent-hit' : ''}`}
        onClick={(e) => attack(e, player, { x, y })}
      >
        {x}, {y}
      </button>
    );
  } else {
    tile = (
      <button
        type="button"
        className={`tile ${type} ${recentHit ? 'recent-hit' : ''}`}
        ref={drop}
        style={{
          gridColumn: x + 1,
          gridRow: y + 1,
        }}
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
  canDropShip: PropTypes.func,
  recentX: PropTypes.number,
  recentY: PropTypes.number,
};

export default Tile;
