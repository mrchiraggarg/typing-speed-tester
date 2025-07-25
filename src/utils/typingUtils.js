// Utility functions for typing calculations

/**
 * Calculate Words Per Minute (WPM)
 * Standard: 1 word = 5 characters (including spaces)
 */
export const calculateWPM = (correctChars, timeElapsed) => {
  if (timeElapsed === 0) return 0;
  const minutes = timeElapsed / 60;
  const words = correctChars / 5;
  return Math.round(words / minutes);
};

/**
 * Calculate Characters Per Minute (CPM)
 */
export const calculateCPM = (correctChars, timeElapsed) => {
  if (timeElapsed === 0) return 0;
  const minutes = timeElapsed / 60;
  return Math.round(correctChars / minutes);
};

/**
 * Calculate accuracy percentage
 */
export const calculateAccuracy = (correctChars, totalTyped) => {
  if (totalTyped === 0) return 100;
  return Math.round((correctChars / totalTyped) * 100);
};

/**
 * Format time in MM:SS format
 */
export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};