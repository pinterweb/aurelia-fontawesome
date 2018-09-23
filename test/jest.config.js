module.exports =  {
  "rootDir": "../",
  "modulePaths": [
    "<rootDir>/src",
    "<rootDir>/node_modules"
  ],
  "moduleFileExtensions": [
    "js",
    "json",
    "ts"
  ],
  "transform": {
    "^.+\\.(ts|tsx)$": "<rootDir>/node_modules/ts-jest/preprocessor.js",
    "^.+\\.(scss|css)$": "<rootDir>/node_modules/jest-css-modules"
  },
  "testRegex": "\\.spec\\.(ts|js)x?$",
  "setupFiles": [
    "<rootDir>/test/jest-pretest.ts"
  ],
  "testEnvironment": "node",
  "moduleNameMapper": {
    "(test\\\\unit\\\\)aurelia-(.*)": "<rootDir>/node_modules/aurelia-$2",
    "^.+\\.(css)$": "<rootDir>/test/jest-css-stub.js"
  },
  "collectCoverage": true,
  "collectCoverageFrom": [
    "src/**/*.{js,ts}",
    "!**/*.spec.{js,ts}",
    "!**/node_modules/**",
    "!**/test/**"
  ],
  "coverageDirectory": "<rootDir>/test/coverage-jest",
  "coveragePathIgnorePatterns": [
    "/node_modules/"
  ],
  "coverageReporters": [
    "json",
    "lcov",
    "text",
    "html"
  ]
};
