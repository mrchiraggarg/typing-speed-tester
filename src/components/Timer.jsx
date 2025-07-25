import { useEffect, useState } from 'react';
import { formatTime } from '../utils/typingUtils';

const Timer = ({ timeLimit, onTimeUp, isActive, timeElapsed, setTimeElapsed }) => {
  const [timeLeft, setTimeLeft] = useState(timeLimit);

  useEffect(() => {
    setTimeLeft(timeLimit);
    setTimeElapsed(0);
  }, [timeLimit, setTimeElapsed]);

  useEffect(() => {
    let interval = null;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => {
          const newTime = time - 1;
          setTimeElapsed(timeLimit - newTime);
          
          if (newTime === 0) {
            onTimeUp();
          }
          
          return newTime;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, onTimeUp, timeLimit, setTimeElapsed]);

  const percentage = ((timeLimit - timeLeft) / timeLimit) * 100;
  const isLowTime = timeLeft <= 10;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Time Remaining</h3>
        <div className={`text-3xl font-bold ${isLowTime ? 'text-red-500 animate-pulse' : 'text-primary-600'}`}>
          {formatTime(timeLeft)}
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div 
          className={`h-3 rounded-full transition-all duration-1000 ease-linear ${
            isLowTime ? 'bg-red-500' : 'bg-primary-500'
          }`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      
      <div className="mt-2 text-sm text-gray-600">
        Elapsed: {formatTime(timeElapsed)}
      </div>
    </div>
  );
};

export default Timer;