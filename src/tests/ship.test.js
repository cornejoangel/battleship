import Ship from '../modules/Ship';

const s = Ship(3);
test('A ship is object - it exists', () => {
  expect(s).toBeDefined();
});

test('A ship has a length', () => {
  expect(s.getLength()).toBe(3);
});

test('A ship has an HP value equal to its length', () => {
  expect(s.getHP()).toBe(3);
  expect(s.getHP()).toBe(s.getLength());
});

test('A ship can take a hit and lose HP', () => {
  expect(s.takeHit()).toBeDefined();
  s.takeHit();
  expect(s.getHP()).toBe(1);
});

test('A ship can tell if it is sunk and will ignore further hits', () => {
  expect(s.isSunk()).toBe(false);
  s.takeHit();
  expect(s.getHP()).toBe(0);
  s.takeHit();
  expect(s.getHP()).toBe(0);
  s.takeHit();
  expect(s.getHP()).toBe(0);
  expect(s.isSunk()).toBe(true);
});
