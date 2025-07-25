import { useState } from 'react';

const DifficultySelector = ({ onDifficultyChange, currentDifficulty }) => {
  const difficulties = [
    { value: 'all', label: 'All Levels', color: 'bg-gray-500' },
    { value: 'easy', label: 'Easy', color: 'bg-green-500' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-500' },
    { value: 'hard', label: 'Hard', color: 'bg-red-500' }
  ];

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select Difficulty Level
      </label>
      <div className="flex flex-wrap gap-2">
        {difficulties.map((difficulty) => (
          <button
            key={difficulty.value}
            onClick={() => onDifficultyChange(difficulty.value)}
            className={`px-4 py-2 rounded-lg text-white font-medium transition-all duration-200 transform hover:scale-105 ${
              currentDifficulty === difficulty.value
                ? `${difficulty.color} ring-2 ring-offset-2 ring-gray-400`
                : `${difficulty.color} opacity-70 hover:opacity-100`
            }`}
          >
            {difficulty.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DifficultySelector;