import React from 'react';

function Paddle({ y, side }) {
  return (
    <div className="paddle" style={{
      top: `${y}px`,
      left: side === 'left' ? '0px' : null,
      right: side === 'right' ? '0px' : null,
    }}>
    </div>
  );
}

export default Paddle;
