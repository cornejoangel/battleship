import React from 'react';
import PropTypes from 'prop-types';
import '../styles/MessageBox.css';

const MessageBox = (props) => {
  const { playerResult, AIResult, gameOver } = props;
  let box = null;
  if (gameOver) {
    box = (
      <div className="message-container">
        <div className="game-over">{gameOver}</div>
      </div>
    );
  } else {
    box = (
      <div className="message-container">
        <div>Your move: {playerResult}</div>
        <div>Opponent's move: {AIResult}</div>
      </div>
    );
  }
  return box;
};

MessageBox.propTypes = {
  playerResult: PropTypes.string,
  AIResult: PropTypes.string,
  gameOver: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

export default MessageBox;
