import Player from '../modules/Player';

const p = Player();

test('A player exists', () => {
  expect(p).toBeDefined();
});

test('A Player is able to make a random attack', () => {
  expect(p.randomAttack()).toBeDefined();
  console.log(p.randomAttack());
});
