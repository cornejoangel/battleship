const Player = () => {
  let turnStatus = true;
  const isTurn = () => turnStatus;

  const randomAttack = () => {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    return { x, y };
  };

  const changeTurn = () => {
    if (turnStatus) {
      return (turnStatus = false);
    }
    return (turnStatus = true);
  };

  return { isTurn, randomAttack, changeTurn };
};

export default Player;
