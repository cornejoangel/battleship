import Game from '../Game';

const game = Game();

test('A game exists', () => {
  expect(game).toBeDefined();
});

// this is just for testing and will not be necessary in final version
test('The game sets up ships for both players', () => {
  game.placeShips();
  expect(game.playerOneShips()).toBeGreaterThan(0);
  expect(game.playerTwoShips()).toBeGreaterThan(0);
});

test('The first player is able to make a move', () => {
  const firstMove = game.move(1, { x: 1, y: 3 });
  expect(firstMove).toBeDefined();
});

test('The first player is not imediately able to make another move', () => {
  const repeatMove = game.move(1, { x: 9, y: 9 });
  expect(repeatMove).toBe('not your turn');
});

test('The second player is able to make a move', () => {
  const secondMove = game.move(2, { x: 7, y: 7 });
  expect(secondMove).toBeDefined();
});

test('The second player is not imediately able to make another move', () => {
  const repeatMove = game.move(2, { x: 9, y: 9 });
  expect(repeatMove).toBe('not your turn');
});

test('The first player is able to move again', () => {
  const thirdMove = game.move(1, { x: 2, y: 3 });
  expect(thirdMove).toBe('hit');
  expect(thirdMove).toBeDefined();
});

test('The game allows no further moves when a player is out of ships', () => {
  // just sinking all of p2's ships
  game.move(2, { x: 1, y: 1 });
  game.move(1, { x: 3, y: 3 });
  game.move(2, { x: 2, y: 2 });
  game.move(1, { x: 5, y: 4 });
  game.move(2, { x: 3, y: 3 });
  game.move(1, { x: 5, y: 5 });
  game.move(2, { x: 4, y: 4 });
  game.move(1, { x: 5, y: 6 });
  game.move(2, { x: 5, y: 5 });
  const finalMove = game.move(1, { x: 5, y: 7 });
  const tooLateMove = game.move(2, { x: 2, y: 2 });
  const anotherMove = game.move(1, { x: 3, y: 3 });
  expect(finalMove).toBe('player 1 wins');
  expect(tooLateMove).toBe('game over');
  expect(anotherMove).toBe('game over');
  expect(game.playerOneShips()).toBeGreaterThan(0);
  expect(game.playerTwoShips()).toBeLessThan(1);
});
