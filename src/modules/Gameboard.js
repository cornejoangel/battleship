import Ship from './Ship';

const Gameboard = () => {
  let ships = 0;
  let tiles = [];
  const shipCount = () => ships;
  const checkShipLocation = (coords) => {
    // check if the ship placement is valid
    for (let i = 0; i < coords.length; i += 1) {
      // first check if the requested ship placement is in bounds
      if (
        coords[i].x > 9 ||
        coords[i].x < 0 ||
        coords[i].y > 9 ||
        coords[i].y < 0
      ) {
        return false;
      }
      // now check to make sure the new ship will not overlap an existing one
      const duplicate = tiles.find(
        (tile) => tile.x === coords[i].x && tile.y === coords[i].y
      );
      if (duplicate) {
        return false;
      }
    }
    return true;
  };

  const addShip = (coords, model) => {
    if (checkShipLocation(coords) === false) {
      return false;
    }

    // checks have passed, lets actually add the ship
    const s = Ship(coords.length);
    ships += 1;
    for (let i = 0; i < coords.length; i += 1) {
      const tile = coords[i];
      tile.type = 'ship';
      tile.ship = s;
      tile.model = model;
      tiles = tiles.concat(tile);
    }
    return true;
  };

  const removeShip = (coords) => {
    const tileCount = tiles.length;
    for (let i = 0; i < coords.length; i += 1) {
      tiles = tiles.filter(
        (tile) => !(tile.x === coords[i].x && tile.y === coords[i].y)
      );
    }
    if (tileCount > tiles.length) {
      ships -= 1;
    }
  };

  const removeModel = (model) => {
    const tileCount = tiles.length;
    tiles = tiles.filter((tile) => tile.model !== model);
    if (tileCount > tiles.length) {
      ships -= 1;
    }
  };

  const markSunk = (model) => {
    if (model === undefined) {
      return;
    }
    tiles = tiles.map((tile) => {
      if (tile.model === model) {
        tile.type = 'sunk';
      }
      return tile;
    });
  };

  const receiveAttack = (coord) => {
    const attack = tiles.find(
      (tile) => tile.x === coord.x && tile.y === coord.y
    );
    let sunk = false;

    // this is a valid attack on a ship
    if (attack && attack.type === 'ship') {
      tiles = tiles.map((tile) => {
        if (tile.x === coord.x && tile.y === coord.y) {
          tile.type = 'hit';
          tile.ship.takeHit();
          sunk = tile.ship.isSunk();
        }
        return tile;
      });
      if (sunk) {
        ships -= 1;
        markSunk(attack.model);
        return 'sunk';
      }
      return 'hit';
    }

    // the attack has already been made
    if (attack) {
      return 'invalid';
    }

    // the attack was out of bounds
    if (coord.x > 9 || coord.x < 0 || coord.y > 9 || coord.y < 0) {
      return 'invalid';
    }

    // this attack has not been made and it is a miss
    coord.type = 'miss';
    tiles = tiles.concat(coord);
    return 'miss';
  };

  const getTiles = () => tiles;

  return {
    shipCount,
    addShip,
    checkShipLocation,
    removeShip,
    removeModel,
    receiveAttack,
    getTiles,
  };
};

export default Gameboard;
