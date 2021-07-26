module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-typescript/base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.dev.json',
  },
  ignorePatterns: ['**/*.js'],
  rules: {
    "max-len": "off",
    "no-param-reassign": "off",
    "no-restricted-syntax": ["warn"]
  }
};
