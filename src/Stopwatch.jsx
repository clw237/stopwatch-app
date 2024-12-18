import React, {useState, useEffect, useRef} from "react";

function Stopwatch() {
    
    const [isRunning, setIsRunning] = useState(false); // State to track if the stopwatch is running
    const [elapsedTime, setElapsedTime] = useState(0);  // State to store elapsed time in milliseconds
    const intervalIdRef = useRef(null); // Reference to store the interval ID for clearing later
    const startTimeRef = useRef(0); // Reference to store the start time of the stopwatch
     // Effect to handle the timer logic
    useEffect(() => {
        if (isRunning) {
            // Adjust start time based on elapsed time
            startTimeRef.current = Date.now() - elapsedTime;
            // Update every 10 milliseconds
            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current);
            } , 10);
        }
         // Cleanup function to clear the interval when not running or component unmounts
        return () => {
            clearInterval(intervalIdRef.current);
        }
    }, [isRunning, elapsedTime]);
    // functions to respond to click events
    const start = () => setIsRunning(true);
    const stop = () => setIsRunning(false);
    const reset = () => {
        setElapsedTime(0);
        setIsRunning(false);
    };
    // Function to format elapsed time into a readable string (MM:SS:MS)
    const formatTime = () => {
        const minutes = String(Math.floor(elapsedTime / (1000 * 60) % 60)).padStart(2, "0");
        const seconds = String(Math.floor(elapsedTime/ (1000) % 60)).padStart(2, "0");
        const milliseconds = String(Math.floor((elapsedTime % 1000) / 10)).padStart(2, "0");
        // Return formatted time string
        return `${minutes}:${seconds}:${milliseconds}`;
    }

    return(
        <div className="stopwatch">
            <div className="display">{formatTime()}</div>
            <div className="controls">
                <button className="start-button" onClick={start}>Start</button>
                <button className="stop-button" onClick={stop}>Stop</button>
                <button className="reset-button" onClick={reset}>Reset</button>
            </div>
        </div>
    );
}
export default Stopwatch;