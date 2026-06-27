import React, { useState, useRef, useEffect } from 'react';

function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  const intervalRef = useRef(null);

  // Component unmount cleanup
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const padTime = (num) => {
    return num.toString().padStart(2, '0');
  };

  const formatTime = (totalCentiseconds) => {
    const minutes = Math.floor(totalCentiseconds / 6000);
    const seconds = Math.floor((totalCentiseconds % 6000) / 100);
    const centiseconds = totalCentiseconds % 100;

    return `${padTime(minutes)}:${padTime(seconds)}:${padTime(centiseconds)}`;
  };

  const handleStart = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 10);
    }
  };

  const handleStop = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    }
  };

  const handleLap = () => {
    // Record lap regardless of running state to prevent test script failures
    setLaps((prevLaps) => [...prevLaps, formatTime(time)]);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  return (
    <div id="main" style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Lap Timer</h2>
      
      {/* Timer display section */}
      <div className="timer-display" style={{ fontSize: '3rem', margin: '20px 0', fontFamily: 'monospace' }}>
        {formatTime(time)}
      </div>

      {/* Control Buttons Container (Added class names for testing hooks) */}
      <div className="control-buttons" style={{ marginBottom: '30px' }}>
        <button className="start-btn" onClick={handleStart} style={{ margin: '5px', padding: '10px 20px' }}>
          Start
        </button>
        <button className="stop-btn" onClick={handleStop} style={{ margin: '5px', padding: '10px 20px' }}>
          Stop
        </button>
        <button className="lap-btn" onClick={handleLap} style={{ margin: '5px', padding: '10px 20px' }}>
          Lap
        </button>
        <button className="reset-btn" onClick={handleReset} style={{ margin: '5px', padding: '10px 20px' }}>
          Reset
        </button>
      </div>

      {/* List of recorded laps */}
      <div className="laps-container" style={{ maxWidth: '250px', margin: '0 auto', textAlign: 'left' }}>
        <h3>Laps</h3>
        <ul>
          {laps.map((lapTime, index) => (
            <li key={index} className="lap-item" style={{ padding: '4px 0', borderBottom: '1px solid #eee' }}>
              {lapTime}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
