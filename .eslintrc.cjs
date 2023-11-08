module.exports = {
  root: true,
  env: {
    node: true,
    browser: true
  },
  extends: [
    "eslint:recommended",
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  rules: {
    semi: ["error", "always"],
    "no-console": "error",
    'keyword-spacing': ["error", { "before": true, "after": true }],
    'space-in-parens': ["error", "never"],
  }
};
