import React, { useState, useEffect } from 'react';
import './hooksStyle/load.css';
const Loading = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) =>
        prevDots.length === 6 ? '' : prevDots + '.'
      );
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-container">
      <div className="loading-text">Cargando</div>
      <div className="loading-dots">
        <span>.{dots}</span>
      </div>
    </div>
  );
};

export default Loading;
