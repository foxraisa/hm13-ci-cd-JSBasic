module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true // ✅ Включаем окружение Jest
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
  }
};