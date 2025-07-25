// Sample texts for typing practice
export const sampleTexts = [
  {
    id: 1,
    difficulty: 'easy',
    text: "The quick brown fox jumps over the lazy dog. This sentence contains every letter of the alphabet at least once. It is commonly used for typing practice because it helps test all the keys on a keyboard."
  },
  {
    id: 2,
    difficulty: 'easy',
    text: "Technology has revolutionized the way we communicate and work. Social media platforms connect people across the globe instantly. Mobile devices have become an essential part of our daily lives."
  },
  {
    id: 3,
    difficulty: 'medium',
    text: "Artificial intelligence and machine learning are transforming industries at an unprecedented pace. These technologies enable computers to learn from data and make intelligent decisions without explicit programming."
  },
  {
    id: 4,
    difficulty: 'medium',
    text: "Climate change represents one of the most significant challenges facing humanity today. Scientists worldwide are working on innovative solutions to reduce carbon emissions and develop sustainable energy sources."
  },
  {
    id: 5,
    difficulty: 'hard',
    text: "Quantum computing promises to revolutionize computational capabilities by leveraging quantum mechanical phenomena such as superposition and entanglement. This paradigm shift could solve complex problems that are intractable for classical computers."
  },
  {
    id: 6,
    difficulty: 'hard',
    text: "Neuroplasticity refers to the brain's remarkable ability to reorganize itself by forming new neural connections throughout life. This phenomenon allows the brain to compensate for injury and disease and adjust to new experiences."
  }
];

export const getRandomText = (difficulty = 'all') => {
  const filteredTexts = difficulty === 'all' 
    ? sampleTexts 
    : sampleTexts.filter(text => text.difficulty === difficulty);
  
  const randomIndex = Math.floor(Math.random() * filteredTexts.length);
  return filteredTexts[randomIndex];
};