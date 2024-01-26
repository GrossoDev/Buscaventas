module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:storybook/recommended'
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/prop-types': [0],
    'comma-dangle': ['warn', 'never'],
    'object-curly-newline': ['error', { multiline: true }],
    'no-console': 'off',
    'jsx-a11y/label-has-associated-control': ['error', { required: { some: ['nesting'] } }]
  }
};
