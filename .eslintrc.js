module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module'
  },
  rules: {
    'no-unused-vars': 'warn',
    'semi': ['error', 'always'],
    'quotes': ['error', 'single']
  },
  overrides: [
    {
      // Применяется только к файлам тестов
      files: ['tests/**/*.js'], // Только файлы внутри папки tests/
      env: {
        jest: true // Подключает globals: test, expect, beforeEach, describe и др.
      }
    }
  ]
};