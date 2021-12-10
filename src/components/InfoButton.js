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
        <h3>How to Play</h3>
        <h3>Your Opponent</h3>
        <button type="button" className="close-info" onClick={closeInfo}>
          close
        </button>
      </ReactModal>
    </div>
  );
};

export default InfoButton;
