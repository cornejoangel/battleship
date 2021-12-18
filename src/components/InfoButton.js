/* eslint-disable react/jsx-boolean-value */
import React, { useState } from 'react';
import ReactModal from 'react-modal';
import '../styles/InfoButton.css';

const InfoButton = () => {
  const [showModal, setShowModal] = useState(false);
  const openInfo = () => {
    setShowModal(true);
  };

  const closeInfo = () => {
    setShowModal(false);
  };

  return (
    <div className="info-container">
      <button type="button" className="info" onClick={openInfo}>
        info
      </button>
      <ReactModal
        isOpen={showModal}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        onRequestClose={closeInfo}
        className="info-content"
        overlayClassName="info-overlay"
        portalClassName="info-portal"
      >
        <h2>This is an implementation of Battleship</h2>
        <p>
          Battleship is a 2 player game where each player places an identical
          set of ships onto a grid in whatever locations they choose. The
          players then take turns "attacking" specific tiles on their opponents
          grid. When a tile that contains a section of a ship is attacked, that
          section of ship is damaged. If all of a ship's sections are damaged
          then that ship is sunk. The first player to sink all of their
          opponent's ships wins.
        </p>
        <h3 className="info-left">How to Play</h3>
        <p className="info-left">
          First you must place your ships. You can drag them from their starting
          tray (on the right) over to the grid on the left by dragging their
          lighter colored end-tiles. You can also opt to use the appropriately
          labeled "randomize ships" button. Rotating ships is done by clicking
          on any part of a ship - provided the ship has clearance to rotate.
        </p>
        <p className="info-left">
          Once the game begins you simply click on any tile from your enemy's
          grid to attack that tile. Your opponent will immediately counterattack
          and the result of both attacks will be shown below the grid. If you
          attempt to make a duplicate move, the game will reject it and wait for
          a new move. The game will end once all of either player's ships have
          been sunk. You may press the reset button at any time to start over.
        </p>
        <h3 className="info-right">Your Opponent</h3>
        <p className="info-left">
          This game of Battleship is played against an AI opponent. The AI knows
          when it gets a hit and will probe the surrounding area trying to sink
          the rest of your ship. Don't underestimate your opponent!
        </p>
        <button type="button" className="info close-info" onClick={closeInfo}>
          close
        </button>
      </ReactModal>
    </div>
  );
};

export default InfoButton;
