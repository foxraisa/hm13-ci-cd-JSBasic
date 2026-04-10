module.exports = {
  // Используем jsdom для тестирования DOM
  testEnvironment: 'jsdom',
  
  // Где искать тесты
  testMatch: ['**/__tests__/**/*.js'],
  
  // Игнорируем папку node_modules
  testPathIgnorePatterns: ['/node_modules/']
};
