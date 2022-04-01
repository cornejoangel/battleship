# Battleship
Battleship is an implementation of the [classic game](https://en.wikipedia.org/wiki/Battleship) of the same name. Created by **Angel Cornejo** as part of [*The Odin Project*](https://www.theodinproject.com/), Battleship is a React single page app styled with pure CSS and developed using test-driven-development with Jest. 

**[VIEW IT LIVE HERE](https://cornejoangel.github.io/battleship/)**

## Features
- Responsive mobile layout
- Intuitive drag-and-drop interface for ship placement using react-dnd
- AI algorithm that knows when it has gotten a hit and will search for the rest of your ship until it is sunk

## A Brief Tour
1. When you first open the app you are shown a grid and a square tray that houses your ships.
2. Drag a ship by picking them up by their *front* tile. The front tile is the lighter colored one, with the larger border. You can still drag a ship from a spot that isn't the front but you will notice the ship slide over a bit when you drop it.
3. Alternatively, you could just press the RANDOMIZE SHIPS button to place all of your ships at once. You are still free to move your ships around afterward.
4. Also note that you can rotate your ships at any time by clicking on any part of the ship.
5. When you are happy with the placement of your ships press the menacingly large **START GAME** button.
6. The area that was once the ship tray (and subsequently the start button) is now the enemy's grid. Your ships have changed color and their fronts are no longer accentuated to reflect that you can no longer move them.
7. Make a move by clicking on any tile in the enemy grid. For each (valid) move you make, your enemy will immediately retaliate! Attacked tiles will change color to indicate if it was a hit (red) or a miss (white). The result of your most recent move, along with your enemy's, is recorded below the two grids. In addition, the most recent attack your enemy performed is highlighted with a large gold border. If you try to attack a tile that you have already attacked, you will not lose your turn and the game will simply wait for you to make a valid move.
8. When you (or your opponent) have struck every tile that makes up an individual ship, that ship will be sunk and it will change to a darker shade of red.
9. The game ends when either player sinks all of their opponent's ships. Don't underestimate your foe! When the game is over you can play again by hitting the reset button in the top right corner. You could also do this at any other time.

### Made With
- [React DnD](https://github.com/react-dnd/react-dnd/) for the drag-and-drop ship placement
- [react-modal](https://github.com/reactjs/react-modal) for the modal the comes up when you press the info button