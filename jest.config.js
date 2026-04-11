module.exports = {
  // Ищем тесты в папке tests/
  testMatch: ['**/tests/**/*.js'],
  testPathIgnorePatterns: ['/node_modules/'],
  
  // Браузерное окружение для DOM-методов
  testEnvironment: 'jsdom',
  verbose: true,
  collectCoverage: false,
  
  // ✅ Игнорируем CSS/SCSS-импорты — заменяем их на пустой модуль
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  
  // ✅ Не трансформируем зависимости, кроме тех, что используют ESM
  transformIgnorePatterns: [
    '/node_modules/(?!(some-esm-package)/)'
  ]
};