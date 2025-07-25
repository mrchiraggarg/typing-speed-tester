const TypingArea = ({ text, userInput, currentWordIndex, isActive }) => {
  const words = text.split(' ');
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Text to Type</h3>
      <div className={`text-lg leading-relaxed font-mono p-4 rounded-lg border-2 transition-all duration-300 ${
        isActive ? 'border-primary-300 bg-primary-50' : 'border-gray-200 bg-gray-50'
      }`}>
        {words.map((word, wordIndex) => {
          const isCurrentWord = wordIndex === currentWordIndex;
          const isCompletedWord = wordIndex < currentWordIndex;
          
          // For the current word, show character-by-character feedback
          if (isCurrentWord) {
            const userCurrentWord = userInput.split(' ')[wordIndex] || '';
            
            return (
              <span key={wordIndex} className="relative">
                {word.split('').map((char, charIndex) => {
                  const userChar = userCurrentWord[charIndex];
                  let className = '';
                  
                  if (userChar === undefined) {
                    // Not typed yet
                    className = 'bg-gray-200';
                  } else if (userChar === char) {
                    // Correct character
                    className = 'bg-success-200 text-success-800';
                  } else {
                    // Incorrect character
                    className = 'bg-error-200 text-error-800';
                  }
                  
                  return (
                    <span key={charIndex} className={`${className} transition-colors duration-200`}>
                      {char}
                    </span>
                  );
                })}
                
                {/* Show extra characters if user typed more than expected */}
                {userCurrentWord.length > word.length && (
                  <span className="bg-error-300 text-error-900">
                    {userCurrentWord.slice(word.length)}
                  </span>
                )}
                
                {/* Cursor indicator */}
                <span className="animate-pulse text-primary-600 font-bold">|</span>
                <span> </span>
              </span>
            );
          }
          
          // For completed words, show them as correct/incorrect
          if (isCompletedWord) {
            const userWord = userInput.split(' ')[wordIndex] || '';
            const isCorrect = userWord === word;
            
            return (
              <span key={wordIndex} className={`transition-colors duration-300 ${
                isCorrect ? 'text-success-600 bg-success-100' : 'text-error-600 bg-error-100'
              }`}>
                {word}{' '}
              </span>
            );
          }
          
          // For future words, show them in default state
          return (
            <span key={wordIndex} className="text-gray-600">
              {word}{' '}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default TypingArea;