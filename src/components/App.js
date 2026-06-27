import React, { useState, useRef, useEffect } from 'react';

function App() {
  // State to track time in centiseconds (1 second = 100 centiseconds)
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  // Mutable reference to hold the interval ID
  const intervalRef = useRef(null);

  // Clears the interval from memory when the component unmounts to prevent leaks
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Utility function to pad single digit numbers with a leading zero
  const padTime = (num) => {
    return num.toString().padStart(2, '0');
  };

  // Formats time from centiseconds to mm:ss:cs
  const formatTime = (totalCentiseconds) => {
    const minutes = Math.floor(totalCentiseconds / 6000);
    const seconds = Math.floor((totalCentiseconds % 6000) / 100);
    const centiseconds = totalCentiseconds % 100;

    return `${padTime(minutes)}:${padTime(seconds)}:${padTime(centiseconds)}`;
  };

  // Starts/resumes the timer tracking centiseconds (every 10ms)
  const handleStart = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 10);
    }
  };

  // Pauses/stops the timer
  const handleStop = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    }
  };

  // Records the current time format snapshot into the lap list
  const handleLap = () => {
    if (isRunning) {
      setLaps((prevLaps) => [...prevLaps, formatTime(time)]);
    }
  };

  // Stops and completely resets the timer states and lap lists back to zero
  const handleReset = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  return (
    <div id="main" style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'monospace' }}>
      <h2>Lap Timer</h2>
      
      {/* Timer display section */}
      <div style={{ fontSize: '3rem', margin: '20px 0' }}>
        {formatTime(time)}
      </div>

      {/* Control Buttons Container */}
      <div style={{ marginBottom: '30px' }}>
        <button onClick={handleStart} disabled={isRunning} style={{ margin: '5px', padding: '10px 20px' }}>
          Start
        </button>
        <button onClick={handleStop} disabled={!isRunning} style={{ margin: '5px', padding: '10px 20px' }}>
          Stop
        </button>
        <button onClick={handleLap} disabled={!isRunning} style={{ margin: '5px', padding: '10px 20px' }}>
          Lap
        </button>
        <button onClick={handleReset} style={{ margin: '5px', padding: '10px 20px' }}>
          Reset
        </button>
      </div>

      {/* List of recorded laps */}
      {laps.length > 0 && (
        <div style={{ maxWidth: '200px', margin: '0 auto', textAlign: 'left' }}>
          <h3>Laps</h3>
          <ol>
            {laps.map((lapTime, index) => (
              <li key={index} style={{ padding: '4px 0', borderBottom: '1px solid #eee' }}>
                {lapTime}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

export default App;
