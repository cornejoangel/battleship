import React from 'react';
import PropTypes from 'prop-types';
import '../styles/TurnIndicator.css';

const TurnIndicator = (props) => {
  const { player } = props;
  return <div className="turn">Player {player}'s turn to move</div>;
};

TurnIndicator.propTypes = {
  player: PropTypes.number,
};

export default TurnIndicator;
