const SetupShips = () => {
  const ships = [
    { x: -1, y: -1, length: 2, orientation: 'horizontal', model: 'patrol' },
    { x: -1, y: -1, length: 3, orientation: 'horizontal', model: 'submarine' },
    { x: -1, y: -1, length: 3, orientation: 'horizontal', model: 'destroyer' },
    { x: -1, y: -1, length: 4, orientation: 'horizontal', model: 'battler' },
    { x: -1, y: -1, length: 5, orientation: 'horizontal', model: 'carrier' },
  ];

  return ships;
};

export default SetupShips;
