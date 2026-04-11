module.exports = {
  // Ищем тесты в tests/
  testMatch: ['**/tests/**/*.js'],
  testPathIgnorePatterns: ['/node_modules/'],
  
  // Браузерное окружение
  testEnvironment: 'jsdom',
  verbose: true,
  collectCoverage: false,
  
  // ✅ Моки для стилей и ассетов
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|svg)$': 'identity-obj-proxy'
  },
  
  // ✅ Трансформация: если используете современный синтаксис
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  
  // ✅ Не трансформируем зависимости, кроме указанных
  transformIgnorePatterns: [
    '/node_modules/(?!(some-esm-package)/)'
  ],
  
  // ✅ Setup для моков анимаций
  setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.js']
};