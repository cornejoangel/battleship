const SetupShips = () => {
  // the ship orientations are randomly determined
  const orientations = ['horizontal', 'vertical'];
  const ships = [
    {
      x: -1,
      y: -1,
      length: 2,
      orientation: orientations[Math.round(Math.random())],
      model: 'patrol',
    },
    {
      x: -1,
      y: -1,
      length: 3,
      orientation: orientations[Math.round(Math.random())],
      model: 'submarine',
    },
    {
      x: -1,
      y: -1,
      length: 3,
      orientation: orientations[Math.round(Math.random())],
      model: 'destroyer',
    },
    {
      x: -1,
      y: -1,
      length: 4,
      orientation: orientations[Math.round(Math.random())],
      model: 'battler',
    },
    {
      x: -1,
      y: -1,
      length: 5,
      orientation: orientations[Math.round(Math.random())],
      model: 'carrier',
    },
  ];

  return ships;
};

export default SetupShips;
