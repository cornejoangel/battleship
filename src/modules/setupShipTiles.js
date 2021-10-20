const setupShipTiles = () => {
  let tiles = [];

  for (let i = 0; i < 10; i += 1) {
    for (let j = 0; j < 10; j += 1) {
      tiles = tiles.concat({ x: j, y: i });
    }
  }

  // manually add the default ships
  for (let k = 0; k < tiles.length; k += 1) {
    if (
      (tiles[k].x === 1 && tiles[k].y === 3) ||
      (tiles[k].x === 2 && tiles[k].y === 3) ||
      (tiles[k].x === 3 && tiles[k].y === 3) ||
      (tiles[k].x === 5 && tiles[k].y === 4) ||
      (tiles[k].x === 5 && tiles[k].y === 5) ||
      (tiles[k].x === 5 && tiles[k].y === 6) ||
      (tiles[k].x === 5 && tiles[k].y === 7)
    ) {
      tiles[k].type = 'ship';
    }
  }

  return tiles;
};

export default setupShipTiles;
