module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
  ],
  rules: {
    "no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
  },
  parserOptions: {
    ecmaVersion: 2020,
  },
};