import React from 'react';
import PropTypes from 'prop-types';
import '../styles/ResetButton.css';

const ResetButton = (props) => {
  const { reset } = props;
  return (
    <button type="button" className="reset" onClick={reset}>
      RESET
    </button>
  );
};

ResetButton.propTypes = {
  reset: PropTypes.func,
};

export default ResetButton;
