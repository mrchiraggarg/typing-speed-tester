import { calculateWPM, calculateCPM, calculateAccuracy } from '../utils/typingUtils';

const StatsPanel = ({ correctChars, totalTyped, mistakes, timeElapsed }) => {
  const wpm = calculateWPM(correctChars, timeElapsed);
  const cpm = calculateCPM(correctChars, timeElapsed);
  const accuracy = calculateAccuracy(correctChars, totalTyped);

  const stats = [
    {
      label: 'WPM',
      value: wpm,
      color: 'text-primary-600',
      bgColor: 'bg-primary-50',
      description: 'Words per minute'
    },
    {
      label: 'CPM',
      value: cpm,
      color: 'text-success-600',
      bgColor: 'bg-success-50',
      description: 'Characters per minute'
    },
    {
      label: 'Accuracy',
      value: `${accuracy}%`,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      description: 'Typing accuracy'
    },
    {
      label: 'Mistakes',
      value: mistakes,
      color: 'text-error-600',
      bgColor: 'bg-red-50',
      description: 'Total errors'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Live Statistics</h3>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className={`${stat.bgColor} rounded-lg p-4 text-center transition-all duration-300 hover:scale-105`}>
            <div className={`text-2xl font-bold ${stat.color} mb-1`}>
              {stat.value}
            </div>
            <div className="text-sm font-medium text-gray-700">
              {stat.label}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {stat.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsPanel;