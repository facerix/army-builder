const prettier = require("eslint-plugin-prettier");
const prettierConfig = require("eslint-config-prettier");

module.exports = [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        // Browser globals
        window: "readonly",
        document: "readonly",
        navigator: "readonly",
        location: "readonly",
        localStorage: "readonly",
        sessionStorage: "readonly",
        fetch: "readonly",
        URL: "readonly",
        URLSearchParams: "readonly",
        CustomEvent: "readonly",
        EventTarget: "readonly",
        HTMLElement: "readonly",
        Element: "readonly",
        Node: "readonly",
        // Service Worker globals
        self: "readonly",
        caches: "readonly",
        clients: "readonly",
        skipWaiting: "readonly",
        importScripts: "readonly",
        indexedDB: "readonly",
        IDBRequest: "readonly",
        IDBDatabase: "readonly",
        IDBObjectStore: "readonly",
        IDBTransaction: "readonly",
        IDBIndex: "readonly",
        IDBCursor: "readonly",
        IDBKeyRange: "readonly",
        // Custom Elements API
        customElements: "readonly",
        // Console (for development)
        console: "readonly",
        // Promise
        Promise: "readonly",
        // setTimeout/setInterval
        setTimeout: "readonly",
        setInterval: "readonly",
        clearTimeout: "readonly",
        clearInterval: "readonly",
        // Additional browser APIs
        alert: "readonly",
        Object: "readonly",
        Array: "readonly",
        String: "readonly",
        Number: "readonly",
        Boolean: "readonly",
        Date: "readonly",
        Math: "readonly",
        JSON: "readonly",
        Map: "readonly",
        Set: "readonly",
        Error: "readonly",
        RegExp: "readonly",
      },
    },
    plugins: {
      prettier,
    },
    rules: {
      ...prettierConfig.rules,
      // Disable Prettier in ESLint - use Prettier separately for formatting
      "prettier/prettier": "off",
      // Only keep critical errors, make everything else warnings or off
      "no-console": "off",
      "no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "no-empty": ["warn", { allowEmptyCatch: true }],
      "prefer-const": "warn",
      "no-var": "warn",
      "no-use-before-define": "off",
      "eqeqeq": "off", // Allow == and !=
      "no-eq-null": "off",
      // Disable strict rules that don't match codebase style
      "no-undef": "warn", // Warn instead of error for undefined vars
      "no-redeclare": "warn",
      "no-unreachable": "warn",
      "no-constant-condition": "warn",
      "no-empty-pattern": "warn",
      "no-func-assign": "warn",
      "no-import-assign": "warn",
      "no-setter-return": "warn",
      "no-sparse-arrays": "warn",
      "no-this-before-super": "warn",
      "no-unsafe-finally": "warn",
      "no-unsafe-negation": "warn",
      "use-isnan": "warn",
      "valid-typeof": "warn",
    },
  },
  {
    // Service Worker files have different globals
    files: ["sw*.js", "**/sw*.js"],
    languageOptions: {
      globals: {
        self: "readonly",
        caches: "readonly",
        clients: "readonly",
        skipWaiting: "readonly",
        importScripts: "readonly",
        indexedDB: "readonly",
        IDBRequest: "readonly",
        IDBDatabase: "readonly",
        IDBObjectStore: "readonly",
        IDBTransaction: "readonly",
        IDBIndex: "readonly",
        IDBCursor: "readonly",
        IDBKeyRange: "readonly",
        console: "readonly",
        Promise: "readonly",
        setTimeout: "readonly",
        setInterval: "readonly",
        clearTimeout: "readonly",
        clearInterval: "readonly",
        // Service Worker specific
        CacheConfig: "readonly",
      },
    },
  },
  {
    // Ignore patterns (replaces .eslintignore)
    ignores: [
      "node_modules/**",
      "**/node_modules/**",
      "dist/**",
      "build/**",
      "*.min.js",
      "package-lock.json",
      "sw.js",
      "sw-dev.js",
      "sw-core.js",
      "*.md",
      ".eslintignore",
      ".eslintrc*",
      "eslint.config.js",
      ".prettierrc*",
      ".prettierignore",
    ],
  },
];
