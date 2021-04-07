module.exports = {
  verbose: true,
  moduleFileExtensions: [
    "ts",
    "js"
  ],
  transform: {
    "^.+\\.ts$": "ts-jest",
    "^.+\\.graphql$": "<rootDir>/scripts/graphql-schema-transformer.js",
  },
  globals: {
    "ts-jest": {
      babelConfig: "<rootDir>/.babelrc.json",
      tsconfig: "<rootDir>/tsconfig.json"
    },
  },
};
