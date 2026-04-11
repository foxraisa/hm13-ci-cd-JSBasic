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
      files: ['**/*.test.js', '**/*.spec.js', '**/__tests__/**/*.js'],
      env: {
        jest: true // Подключает словарь Jest-глобалов только здесь
      }
    }
  ]
};