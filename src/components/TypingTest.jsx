import { useState, useEffect, useCallback } from 'react';
import { getRandomText } from '../data/textData';
import Timer from './Timer';
import StatsPanel from './StatsPanel';
import TypingArea from './TypingArea';
import InputArea from './InputArea';
import ResultsModal from './ResultsModal';
import DifficultySelector from './DifficultySelector';

const TypingTest = () => {
  // Test configuration
  const [timeLimit, setTimeLimit] = useState(60);
  const [difficulty, setDifficulty] = useState('all');
  
  // Test state
  const [currentText, setCurrentText] = useState(getRandomText());
  const [userInput, setUserInput] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  
  // Statistics
  const [mistakes, setMistakes] = useState(0);
  const [correctChars, setCorrectChars] = useState(0);
  const [totalTyped, setTotalTyped] = useState(0);
  
  // UI state
  const [showResults, setShowResults] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  // Calculate statistics based on user input
  useEffect(() => {
    const textChars = currentText.text.slice(0, userInput.length);
    let correct = 0;
    let errors = 0;
    
    for (let i = 0; i < userInput.length; i++) {
      if (i < textChars.length && userInput[i] === textChars[i]) {
        correct++;
      } else {
        errors++;
      }
    }
    
    setCorrectChars(correct);
    setMistakes(errors);
    setTotalTyped(userInput.length);
    
    // Update current word index
    const words = userInput.split(' ');
    setCurrentWordIndex(Math.max(0, words.length - 1));
  }, [userInput, currentText.text]);

  // Handle test start
  const handleStart = useCallback(() => {
    if (!isActive && !isFinished) {
      setIsActive(true);
    }
  }, [isActive, isFinished]);

  // Handle time up
  const handleTimeUp = useCallback(() => {
    setIsActive(false);
    setIsFinished(true);
    setShowResults(true);
  }, []);

  // Handle test reset
  const handleReset = useCallback(() => {
    setUserInput('');
    setIsActive(false);
    setIsFinished(false);
    setTimeElapsed(0);
    setMistakes(0);
    setCorrectChars(0);
    setTotalTyped(0);
    setCurrentWordIndex(0);
    setShowResults(false);
    setCurrentText(getRandomText(difficulty));
  }, [difficulty]);

  // Handle try again (reset with same settings)
  const handleTryAgain = useCallback(() => {
    handleReset();
  }, [handleReset]);

  // Handle difficulty change
  const handleDifficultyChange = useCallback((newDifficulty) => {
    setDifficulty(newDifficulty);
    setCurrentText(getRandomText(newDifficulty));
    handleReset();
  }, [handleReset]);

  // Handle time limit change
  const handleTimeLimitChange = (newTimeLimit) => {
    setTimeLimit(newTimeLimit);
    handleReset();
  };

  // Check if test should end (user completed the text)
  useEffect(() => {
    if (userInput.length >= currentText.text.length && isActive) {
      handleTimeUp();
    }
  }, [userInput.length, currentText.text.length, isActive, handleTimeUp]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            ⚡ Typing Speed Tester
          </h1>
          <p className="text-lg text-gray-600">
            Test and improve your typing speed and accuracy
          </p>
        </div>

        {/* Configuration Panel */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time Limit
              </label>
              <div className="flex gap-2">
                {[30, 60, 120, 300].map((time) => (
                  <button
                    key={time}
                    onClick={() => handleTimeLimitChange(time)}
                    disabled={isActive}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      timeLimit === time
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    } ${isActive ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
                  >
                    {time < 60 ? `${time}s` : `${time / 60}m`}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <DifficultySelector
                onDifficultyChange={handleDifficultyChange}
                currentDifficulty={difficulty}
              />
            </div>
          </div>
        </div>

        {/* Timer and Stats */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <Timer
            timeLimit={timeLimit}
            onTimeUp={handleTimeUp}
            isActive={isActive}
            timeElapsed={timeElapsed}
            setTimeElapsed={setTimeElapsed}
          />
          <StatsPanel
            correctChars={correctChars}
            totalTyped={totalTyped}
            mistakes={mistakes}
            timeElapsed={timeElapsed}
          />
        </div>

        {/* Typing Area */}
        <TypingArea
          text={currentText.text}
          userInput={userInput}
          currentWordIndex={currentWordIndex}
          isActive={isActive}
        />

        {/* Input Area */}
        <InputArea
          userInput={userInput}
          setUserInput={setUserInput}
          onStart={handleStart}
          isActive={isActive}
          isFinished={isFinished}
        />

        {/* Control Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={handleReset}
            className="px-8 py-3 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-all duration-200 transform hover:scale-105 shadow-md"
          >
            🔄 Reset Test
          </button>
          
          {isFinished && (
            <button
              onClick={() => setShowResults(true)}
              className="px-8 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-all duration-200 transform hover:scale-105 shadow-md"
            >
              📊 View Results
            </button>
          )}
        </div>

        {/* Results Modal */}
        <ResultsModal
          isOpen={showResults}
          onClose={() => setShowResults(false)}
          onTryAgain={handleTryAgain}
          correctChars={correctChars}
          totalTyped={totalTyped}
          mistakes={mistakes}
          timeElapsed={timeElapsed}
          timeLimit={timeLimit}
        />

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm">
          <p>Built with React + Vite | Track your progress and improve your typing skills! 🎯</p>
        </div>
      </div>
    </div>
  );
};

export default TypingTest;