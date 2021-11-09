import React from 'react';
import PropTypes from 'prop-types';

const StartButton = (props) => {
  const { startGame } = props;
  return (
    <button type="button" className="start" onClick={startGame}>
      Start Game
    </button>
  );
};

StartButton.propTypes = {
  startGame: PropTypes.func,
};
export default StartButton;
