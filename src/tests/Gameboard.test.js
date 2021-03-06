import Gameboard from '../modules/Gameboard';

const g = Gameboard();
test('The gameboard exists', () => {
  expect(g).toBeDefined();
});

test('A ship can be placed', () => {
  expect(g.shipCount()).toBe(0);
  g.addShip([
    { x: 1, y: 3 },
    { x: 2, y: 3 },
    { x: 3, y: 3 },
  ]);
  expect(g.shipCount()).toBe(1);
});

test('A ship can be removed', () => {
  g.addShip([
    { x: 9, y: 0 },
    { x: 9, y: 1 },
  ]);
  expect(g.shipCount()).toBe(2);
  g.removeShip([
    { x: 9, y: 0 },
    { x: 9, y: 1 },
  ]);
  expect(g.shipCount()).toBe(1);
});

test('A ship can be added with a specified model type', () => {
  g.addShip(
    [
      { x: 9, y: 0 },
      { x: 9, y: 1 },
    ],
    'patrol'
  );
  expect(g.shipCount()).toBe(2);
  g.removeShip([
    { x: 9, y: 0 },
    { x: 9, y: 1 },
  ]);
  expect(g.shipCount()).toBe(1);
});

test('A ship can be removed based only on its model type', () => {
  g.addShip(
    [
      { x: 9, y: 0 },
      { x: 9, y: 1 },
    ],
    'patrol'
  );
  expect(g.shipCount()).toBe(2);
  g.removeModel('patrol');
  expect(g.shipCount()).toBe(1);
});

test('Ship placement can be tested without actually trying to add a ship', () => {
  expect(g.shipCount()).toBe(1);
  g.checkShipLocation([
    { x: 9, y: 0 },
    { x: 9, y: 1 },
  ]);
  expect(g.shipCount()).toBe(1);
});

test('A ship cannot be placed out of bounds', () => {
  expect(g.shipCount()).toBe(1);
  g.addShip([
    { x: 9, y: 5 },
    { x: 10, y: 5 },
  ]);
  expect(g.shipCount()).toBe(1);
});

test('A ship cannot overlap another ship', () => {
  expect(g.shipCount()).toBe(1);
  g.addShip([
    { x: 3, y: 3 },
    { x: 3, y: 4 },
  ]);
  expect(g.shipCount()).toBe(1);
});

test('Ship overlap check does not produce false positives', () => {
  expect(g.shipCount()).toBe(1);
  g.addShip([{ x: 3, y: 1 }]);
  expect(g.shipCount()).toBe(2);
  g.receiveAttack({ x: 3, y: 1 });
});

test('We can have multiple ships of multiple sizes', () => {
  g.addShip([
    { x: 5, y: 4 },
    { x: 5, y: 5 },
    { x: 5, y: 6 },
    { x: 5, y: 7 },
  ]);
  expect(g.shipCount()).toBe(2);
});

test('Attacks can be made resulting in a hit or a miss', () => {
  expect(g.receiveAttack({ x: 1, y: 1 })).toEqual('miss');
  expect(g.receiveAttack({ x: 2, y: 3 })).toEqual('hit');
});

test('The same attack cannot be made more than once', () => {
  expect(g.receiveAttack({ x: 1, y: 1 })).toEqual('invalid');
  expect(g.receiveAttack({ x: 1, y: 1 })).toEqual('invalid');
  expect(g.receiveAttack({ x: 2, y: 3 })).toEqual('invalid');
});

test('An attack that is out of bounds is invalid', () => {
  expect(g.receiveAttack({ x: 10, y: 4 })).toEqual('invalid');
  expect(g.receiveAttack({ x: 1, y: 40 })).toEqual('invalid');
  expect(g.receiveAttack({ x: -1, y: 40 })).toEqual('invalid');
  expect(g.receiveAttack({ x: 7, y: -3 })).toEqual('invalid');
});

test('Sunken ships are marked as such', () => {
  expect(g.shipCount()).toBe(2);
  g.addShip(
    [
      { x: 9, y: 0 },
      { x: 9, y: 1 },
    ],
    'patrol'
  );
  expect(g.shipCount()).toBe(3);
  expect(g.receiveAttack({ x: 9, y: 0 })).toEqual('hit');
  expect(g.receiveAttack({ x: 9, y: 1 })).toEqual('sunk');
  expect(g.shipCount()).toBe(2);
  console.log(g.getTiles());
});

test('The board updates the number of ships when one is sunk', () => {
  expect(g.shipCount()).toBe(2);
  g.receiveAttack({ x: 1, y: 3 });
  g.receiveAttack({ x: 3, y: 3 });
  expect(g.shipCount()).toBe(1);
});

test('The board knows when all ships have been sunk', () => {
  expect(g.shipCount()).toBe(1);
  g.receiveAttack({ x: 5, y: 4 });
  g.receiveAttack({ x: 5, y: 5 });
  g.receiveAttack({ x: 5, y: 6 });
  g.receiveAttack({ x: 5, y: 7 });
  expect(g.shipCount()).toBe(0);
});

// I think the best way to check for a game over is to just get the ship count
// after each time you get a 'sunk' message
// I think any other way just adds code without justifying its existence
