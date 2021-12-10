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
        portalClassName="info-portal"
      >
        <button type="button" className="close-info" onClick={closeInfo}>
          close
        </button>
      </ReactModal>
    </div>
  );
};

export default InfoButton;
