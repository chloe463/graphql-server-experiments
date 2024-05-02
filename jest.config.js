// module.exports = {
//   verbose: true,
//   moduleFileExtensions: [
//     "ts",
//     "js"
//   ],
//   transform: {
//     "^.+\\.ts$": "@swc/jest",
//     "^.+\\.graphql$": "<rootDir>/scripts/graphql-schema-transformer.js",
//   }
// };

export default {
  verbose: true,
  moduleFileExtensions: [
    "ts",
    "js"
  ],
  transform: {
    "^.+\\.ts$": "@swc/jest",
    // "^.+\\.graphql$": "<rootDir>/scripts/graphql-schema-transformer.js",
  }
};
