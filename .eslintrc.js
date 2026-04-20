// .eslintrc.js
module.exports = {
  env: {
    browser: true,
    node: true,
    jest: true  // ✅ Ключевое: добавляем jest в глобалы
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module'
  },
  // ✅ Игнорируем линтинг тестовых файлов, если нужно
  overrides: [
    {
      files: ['tests/**/*.test.js'],
      env: { jest: true }
    }
  ]
};