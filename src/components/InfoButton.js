import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import '../styles/InfoButton.css';

const InfoButton = (props) => {
  const { openInfo } = props;
  const [showModal, setShowModal] = useState(false);

  return (
    <button type="button" className="info" onClick={openInfo}>
      info
    </button>
  );
};

InfoButton.propTypes = {
  openInfo: PropTypes.func,
};
export default InfoButton;
