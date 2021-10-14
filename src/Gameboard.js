import Ship from './Ship';

const Gameboard = () => {
  let ships = [];
  let tiles = [];
  const shipCount = () => ships.length;
  const addShip = (coords) => {
    // check if the ship placement is valid
    for (let i = 0; i < coords.length; i += 1) {
      // first check if the requested ship placement is in bounds
      if (
        coords[i].x > 9 ||
        coords[i].x < 0 ||
        coords[i].y > 9 ||
        coords[i].y < 0
      ) {
        return;
      }
      // now check to make sure the new ship will not overlap an existing one
      const duplicate = tiles.find(
        (tile) => tile.x === coords[i].x || tile.y === coords[i].y
      );
      if (duplicate) {
        return;
      }
    }

    // checks have passed, lets actually add the ship
    const s = Ship(coords.length);
    ships = ships.concat(s);
    for (let i = 0; i < coords.length; i += 1) {
      const tile = coords[i];
      tile.type = 'ship';
      tile.ship = s;
      tiles = tiles.concat(tile);
    }
  };

  const receiveAttack = (coord) => {
    const attack = tiles.find(
      (tile) => tile.x === coord.x && tile.y === coord.y
    );

    // this is a valid attack on a ship
    if (attack && attack.type === 'ship') {
      tiles = tiles.map((tile) => {
        if (tile.x === coord.x && tile.y === coord.y) {
          tile.type = 'hit';
        }
        return tile;
      });
      return 'hit';
    }

    // the attack has already been made
    if (attack) {
      return 'invalid';
    }

    // this attack has not been made and it is a miss
    coord.type = 'miss';
    tiles = tiles.concat(coord);
    return 'miss';
  };

  return { shipCount, addShip, receiveAttack };
};

export default Gameboard;
