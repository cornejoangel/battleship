import React from 'react';
import PropTypes from 'prop-types';
import ShipTile from './ShipTile';
import '../styles/Tile.css';

const Battleship = (props) => {
  const { moveShip } = props;
  let ship = null;
  ship = (
    <div className="battleship">
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
