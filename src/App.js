import React from 'react';
import Timer from './components/Timer.js';
import './App.css';

function App() {
  const handleTick = time => {
    console.log("Залишилось часу: " + time);
  };

  const handleTimePause = timeLeft => {
    console.log("Таймер на паузі! Залишилось часу: " + timeLeft);
  };

  const handleTimeStart = timeLeft => {
    console.log("Таймер запущено! Залишилось часу: " + timeLeft);
  };

  const handleTimeEnd = () => {
    console.log("Час вийшов!");
  };

  return (
    <div className="App">
      <Timer
        time={10000}
        autostart={false}
        step={1000}
        onTick={handleTick}
        onTimePause={handleTimePause}
        onTimeStart={handleTimeStart}
        onTimeEnd={handleTimeEnd}
      />
    </div>
  );
}

export default App;