import React from 'react';
import PropTypes from 'prop-types';
import '../styles/StartButton.css';

const StartButton = (props) => {
  const { startGame } = props;
  return (
    <button type="button" className="start" onClick={startGame}>
      Start
      <br />
      Game
    </button>
  );
};

StartButton.propTypes = {
  startGame: PropTypes.func,
};
export default StartButton;
