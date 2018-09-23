# aurelia-fontawesome

[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

Inspired by:
  [react-fontawesome](https://github.com/FortAwesome/react-fontawesome)
  [vue-fontawesome](https://github.com/FortAwesome/vue-fontawesome)

## Dependencies

* [FontAwesome SVG Core](https://www.npmjs.com/package/@fortawesome/fontawesome-svg-core)
* [aurelia-framework](https://github.com/aurelia/framework)

## Building The Code

To build the code, follow these steps.

1. Ensure that [NodeJS](http://nodejs.org/) is installed. This provides the platform on which the build tooling runs.
2. From the project folder, execute the following command:

  ```shell
  npm install
  ```
3. To build the code, you can now run:

  ```shell
  npm run build
  ```
4. You will find the compiled code in the `dist` folder, available in various module formats.

## Running The Tests

To run the unit tests, first ensure that you have followed the steps above in order to install all dependencies and successfully build the library. Once you have done that, proceed with these additional steps:

1. For single execution run:

  ```shell
  npm run test
  ```
2. For continuous tdd style:

  ```shell
  npm run test-watch
  ```
3. You can find the coverage report built after each test run:

  ```shell
  cat /test/coverage-jest/index.html
  ```
