module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'linebreak-style': 'off',
    'class-methods-use-this': 'off',
    'no-underscore-dangle': 'off',
    'no-console': 'off',
    'func-names': 'off',
    'object-property-newline': [
      'error',
      { allowMultiplePropertiesPerLine: false },
    ],
    'no-plusplus': 'off',
  },
};
