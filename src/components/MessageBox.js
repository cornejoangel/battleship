import React from 'react';
import PropTypes from 'prop-types';
import '../styles/MessageBox.css';

const MessageBox = (props) => {
  const { playerResult, AIResult } = props;
  return (
    <div className="message-container">
      <div>Your move: {playerResult}</div>
      <div>Opponent's move: {AIResult}</div>
    </div>
  );
};

MessageBox.propTypes = {
  playerResult: PropTypes.string,
  AIResult: PropTypes.string,
};

export default MessageBox;
