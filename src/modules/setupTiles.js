const setupTiles = () => {
  let tiles = [];

  for (let i = 0; i < 10; i += 1) {
    for (let j = 0; j < 10; j += 1) {
      tiles = tiles.concat({ x: j, y: i });
    }
  }
  return tiles;
};

export default setupTiles;
