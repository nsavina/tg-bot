module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended"
  ],
  plugins: ["prettier", "simple-import-sort"],
  rules: {
    curly: "error",
    eqeqeq: ["error", "always"],
    "no-console": ["error", { allow: ["warn", "error", "info"] }],
    "no-useless-escape": "off",
    "no-dupe-args": 0,
    "no-sequences": "error",
    "no-shadow": "error",
    "no-irregular-whitespace": 0,
    "no-constant-condition": 0,
    "no-undef": "error",
    "one-var": ["error", "never"],
    "prefer-template": "error",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "sort-imports": "off",
   
    "spaced-comment": ["error", "always"],
    "padding-line-between-statements": [
      "error",
      { blankLine: "always", prev: "*", next: "return" },
      { blankLine: "always", prev: "*", next: "export" },
      { blankLine: "any", prev: "export", next: "export" },
      { blankLine: "always", prev: "*", next: ["const", "let", "var"] },
      { blankLine: "always", prev: "*", next: "if" },
      { blankLine: "always", prev: "directive", next: "*" },
      { blankLine: "any", prev: "directive", next: "directive" },
      { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
      {
        blankLine: "any",
        prev: ["const", "let", "var"],
        next: ["const", "let", "var"]
      }
    ],
    "prettier/prettier": [
      "error",
      {
        singleQuote: true,
        trailingComma: "all"
      }
    ],
  }
};
