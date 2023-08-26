import React, { useState, useEffect } from 'react';
import '../components/Timer.css';

function Timer(props) {
  const [timeLeft, setTimeLeft] = useState(props.time);
  const [inputTime, setInputTime] = useState('');
  const [isRunning, setIsRunning] = useState(props.autostart);

  const handleInputChange = event => {
    setInputTime(event.target.value);
  };

  const startTimer = () => {
    if (inputTime !== '') {
      setTimeLeft(parseInt(inputTime));
      setIsRunning(true);
      setInputTime('');
    }
  };

  const toggleTimer = () => {
    if (isRunning) {
      setIsRunning(false);
      props.onTimePause(timeLeft);
    } else {
      setIsRunning(true);
    }
  };

  useEffect(() => {
    let timerId;

    if (isRunning && timeLeft > 0) {
      timerId = setInterval(() => {
        setTimeLeft(prevTime => prevTime - props.step);
        props.onTick(timeLeft - props.step);

        if (timeLeft - props.step <= 0) {
          clearInterval(timerId);
          setIsRunning(false);
          props.onTimeEnd();
        }
      }, props.step);
    }

    return () => {
      clearInterval(timerId);
    };
  }, [isRunning, timeLeft, props]);

  const progress = (timeLeft / props.time) * 100;

  return (
    <div>
      <h1>Countdown Timer</h1>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
      <p>Time left: {timeLeft} milliseconds</p>
      <input
        type="number"
        placeholder="Enter time in milliseconds"
        value={inputTime}
        onChange={handleInputChange}
      />
      <button onClick={startTimer}>Start from input</button>
      {isRunning ? (
        <button onClick={toggleTimer}>Pause</button>
      ) : (
        <button onClick={toggleTimer}>Resume</button>
      )}
    </div>
  );
}

export default Timer;