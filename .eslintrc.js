module.exports = {
  extends: ['eslint-config-egg/typescript', 'eslint:recommended'],
  parserOptions: {
    project: './tsconfig.json'
  },
  rules: {
    semi: ['error', 'never'],
    '@typescript-eslint/semi': 0,
    'comma-dangle': ['error', 'never'],
    'array-bracket-spacing': 0,
    'default-case': 0
  }
}
