const Ship = (len) => {
  const length = len;
  let hp = length;

  const getLength = () => length;
  const getHP = () => hp;
  const takeHit = () => {
    if (hp > 0) {
      return (hp -= 1);
    }
  };
  const isSunk = () => {
    if (hp === 0) {
      return true;
    }
    return false;
  };

  return { getLength, getHP, takeHit, isSunk };
};

export default Ship;
