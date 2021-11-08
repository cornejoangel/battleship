import React from 'react';
import PropTypes from 'prop-types';

const RandomButtom = (props) => {
  const { randomShips } = props;
  return (
    <button type="button" className="random" onClick={randomShips}>
      Randomize ships
    </button>
  );
};

RandomButtom.propTypes = {
  randomShips: PropTypes.func,
};
export default RandomButtom;
