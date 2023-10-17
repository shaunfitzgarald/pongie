import React, { useState, useEffect } from 'react';
import './App.css';
import Paddle from './components/Paddle';
import Ball from './components/Ball';

function App() {
  const [paddleA, setPaddleA] = useState({y: 0});
  const [paddleB, setPaddleB] = useState({y: 0});
  const [ball, setBall] = useState({x: 0, y: 0, dx: 2, dy: 2});

  useEffect(() => {
    const gameArea = document.getElementById('gameArea');
    const handleMouseMove = (e) => {
      const rect = gameArea.getBoundingClientRect();
      setPaddleA({y: e.clientY - rect.top - 50});
    };
    gameArea.addEventListener('mousemove', handleMouseMove);

    return () => {
      gameArea.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const tick = () => {
      let newBall = {...ball};
      newBall.x += newBall.dx;
      newBall.y += newBall.dy;

      // Ball collision with paddles
      if (newBall.x < 20 && (newBall.y > paddleA.y && newBall.y < paddleA.y + 100)) {
        newBall.dx = -newBall.dx;
      }
      if (newBall.x > 780 && (newBall.y > paddleB.y && newBall.y < paddleB.y + 100)) {
        newBall.dx = -newBall.dx;
      }

      // Ball collision with walls
      if (newBall.y <= 0 || newBall.y >= 600) newBall.dy = -newBall.dy;

      setBall(newBall);
      setPaddleB({y: newBall.y - 50});
    };
    const timer = setInterval(tick, 16);

    return () => clearInterval(timer);
  }, [ball, paddleA, paddleB]);

  return (
    <div className="App">
      <div id="gameArea" className="gameArea">
        <Paddle y={paddleA.y} side="left"/>
        <Paddle y={paddleB.y} side="right"/>
        <Ball x={ball.x} y={ball.y}/>
      </div>
    </div>
  );
}

export default App;
