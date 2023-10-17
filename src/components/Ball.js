import React from 'react';

function Ball({ x, y }) {
  return (
    <div className="ball" style={{
      left: `${x}px`,
      top: `${y}px`,
    }}>
    </div>
  );
}

export default Ball;
