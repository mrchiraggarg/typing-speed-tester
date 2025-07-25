import { useEffect, useRef } from 'react';

const InputArea = ({ 
  userInput, 
  setUserInput, 
  onStart, 
  isActive, 
  isFinished, 
  placeholder = "Start typing here..." 
}) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current && !isFinished) {
      inputRef.current.focus();
    }
  }, [isFinished]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    
    // Start the test on first keystroke
    if (!isActive && !isFinished) {
      onStart();
    }
    
    setUserInput(value);
  };

  const handleKeyDown = (e) => {
    // Prevent certain keys that might interfere with typing test
    if (e.key === 'Tab') {
      e.preventDefault();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Input</h3>
      <div className="relative">
        <textarea
          ref={inputRef}
          value={userInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={isFinished ? "Test completed!" : placeholder}
          disabled={isFinished}
          className={`w-full h-32 p-4 text-lg font-mono border-2 rounded-lg resize-none transition-all duration-300 focus:outline-none ${
            isFinished 
              ? 'border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed'
              : isActive 
                ? 'border-primary-500 focus:border-primary-600 focus:ring-2 focus:ring-primary-200' 
                : 'border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200'
          }`}
        />
        
        {/* Character count indicator */}
        <div className="absolute bottom-2 right-2 text-sm text-gray-500">
          {userInput.length} characters
        </div>
      </div>
      
      {!isActive && !isFinished && (
        <p className="mt-2 text-sm text-gray-600">
          💡 Tip: Start typing to begin the test!
        </p>
      )}
    </div>
  );
};

export default InputArea;