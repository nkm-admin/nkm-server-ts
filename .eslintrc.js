module.exports = {
  extends: ['eslint-config-egg/typescript', 'eslint:recommended'],
  parserOptions: {
    project: './tsconfig.json'
  },
  rules: {
    semi: ['error', 'never'],
    'comma-dangle': ["error", "never"],
    'array-bracket-spacing': "off",
    'default-case': "off"
  }
}
