const Player = () => {
  const randomAttack = () => {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    return { x, y };
  };

  return { randomAttack };
};

export default Player;
