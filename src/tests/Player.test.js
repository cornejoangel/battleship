import Player from '../Player';

const p = Player();

test('A player exists', () => {
  expect(p).toBeDefined();
});

test('A Player knows if it is their turn', () => {
  expect(p.isTurn()).toBe(true);
});

// not sure players need to be able to do this
// test('A Player is able to make an attack', () => {
//   expect(p.attack({ x: 1, y: 1 })).toBeDefined();
// });

test('A Player is able to make a random attack', () => {
  expect(p.randomAttack()).toBeDefined();
  console.log(p.randomAttack());
});

test('A Player is able to have their turn status changed', () => {
  expect(p.isTurn()).toBe(true);
  p.changeTurn();
  expect(p.isTurn()).toBe(false);
  p.changeTurn();
  expect(p.isTurn()).toBe(true);
});
