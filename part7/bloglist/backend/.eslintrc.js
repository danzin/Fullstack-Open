/* eslint-env node */
module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'plugin:node/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['import', 'node', 'jest', 'prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      { singleQuote: true, semi: false, tabWidth: 2 },
    ],
    'no-console': 'off',
    'node/no-unsupported-features/es-syntax': [
      'error',
      { ignores: ['modules'] },
    ],
    quotes: ['warn', 'single'],
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    semi: ['error', 'never'],
    eqeqeq: 'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': ['error', 'always'],
    'arrow-spacing': ['error', { before: true, after: true }],
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 'off',
    'no-param-reassign': 'off',
    'no-underscore-dangle': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
