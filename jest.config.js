// jest.config.js
// ✅ Конфигурация Jest для проекта с DOM-тестами (LTS версии)

module.exports = {
  // 🌐 Эмуляция браузера: без этого window/document не определены
  testEnvironment: 'jsdom',

  // 🎯 Запускать только файлы, заканчивающиеся на .test.js
  testMatch: ['**/*.test.js'],

  // ⚙️ Глобальные настройки, которые выполняются перед каждым тестом
  setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.js'],

  // 🚫 Не трансформировать node_modules (ускоряет запуск)
  transformIgnorePatterns: ['/node_modules/'],

  // 📁 Явно указать корень проекта для резолвинга путей
  rootDir: '.',
};