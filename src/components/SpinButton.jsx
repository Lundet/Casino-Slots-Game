import React from 'react';

const SpinButton = ({ onClick, disabled }) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      Spin
    </button>
  );
};

export default SpinButton;