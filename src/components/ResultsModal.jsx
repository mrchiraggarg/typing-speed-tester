import { calculateWPM, calculateCPM, calculateAccuracy } from '../utils/typingUtils';

const ResultsModal = ({ 
  isOpen, 
  onClose, 
  onTryAgain, 
  correctChars, 
  totalTyped, 
  mistakes, 
  timeElapsed, 
  timeLimit 
}) => {
  if (!isOpen) return null;

  const wpm = calculateWPM(correctChars, timeElapsed);
  const cpm = calculateCPM(correctChars, timeElapsed);
  const accuracy = calculateAccuracy(correctChars, totalTyped);

  const getWPMRating = (wpm) => {
    if (wpm >= 80) return { text: 'Excellent!', color: 'text-green-600', emoji: '🏆' };
    if (wpm >= 60) return { text: 'Great!', color: 'text-blue-600', emoji: '🎉' };
    if (wpm >= 40) return { text: 'Good!', color: 'text-yellow-600', emoji: '👍' };
    if (wpm >= 20) return { text: 'Fair', color: 'text-orange-600', emoji: '👌' };
    return { text: 'Keep practicing!', color: 'text-red-600', emoji: '💪' };
  };

  const rating = getWPMRating(wpm);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 transform transition-all duration-300 scale-100">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">{rating.emoji}</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Test Complete!</h2>
          <p className={`text-xl font-semibold ${rating.color}`}>{rating.text}</p>
        </div>

        <div className="space-y-4 mb-8">
          {/* WPM - Main metric */}
          <div className="bg-primary-50 rounded-lg p-4 text-center">
            <div className="text-4xl font-bold text-primary-600 mb-1">{wpm}</div>
            <div className="text-sm font-medium text-primary-700">Words Per Minute</div>
          </div>

          {/* Other metrics */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-success-50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-success-600">{cpm}</div>
              <div className="text-xs font-medium text-success-700">CPM</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-purple-600">{accuracy}%</div>
              <div className="text-xs font-medium text-purple-700">Accuracy</div>
            </div>
            <div className="bg-red-50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-red-600">{mistakes}</div>
              <div className="text-xs font-medium text-red-700">Mistakes</div>
            </div>
          </div>
        </div>

        {/* Additional stats */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="text-sm text-gray-600 space-y-1">
            <div className="flex justify-between">
              <span>Time taken:</span>
              <span className="font-medium">{timeElapsed}s / {timeLimit}s</span>
            </div>
            <div className="flex justify-between">
              <span>Characters typed:</span>
              <span className="font-medium">{totalTyped}</span>
            </div>
            <div className="flex justify-between">
              <span>Correct characters:</span>
              <span className="font-medium text-success-600">{correctChars}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onTryAgain}
            className="flex-1 bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200 transform hover:scale-105"
          >
            Try Again
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsModal;