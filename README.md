# aurelia-fontawesome
> Font Awesome 5 Aurelia component using SVG with JS

[![Build Status](https://dev.azure.com/parkeremg/aurelia-fontawesome/_apis/build/status/pinterweb.aurelia-fontawesome?branchName=master)](https://dev.azure.com/parkeremg/aurelia-fontawesome/_build/latest?definitionId=79&branchName=master)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

Inspired by:
  [react-fontawesome](https://github.com/FortAwesome/react-fontawesome) and
  [vue-fontawesome](https://github.com/FortAwesome/vue-fontawesome)


- [Installation](#installation)
- [Usage](#usage)
  * [Zero Configuration](#zero-configuration)
  * [Global Configuration](#global-configuration)
  * [Explicit Import](#explicit-import)
  * [Non FAS Icons](#non-fas-icons)
  * [Binding Variations](#binding-variations)
- [Dependencies](#dependencies)
- [Building the Code](#building-the-code)
- [Running the tests](#running-the-tests)
- [Running the examples](#running-the-examples)

## Installation

**Visit [fontawesome.com/icons](https://fontawesome.com/icons) to search for free and Pro icons**
```
$ npm i --save @fortawesome/fontawesome-svg-core
```

**Select one or all icon libraries**
```
$ npm i --save @fortawesome/free-solid-svg-icons
$ npm i --save @fortawesome/free-regular-svg-icons
$ npm i --save @fortawesome/free-brands-svg-icons
```

**Aurelia Plugin**
```
$ npm i --save aurelia-fontawesome
```

## Usage

In your Aurelia bootstrap file, add the plugin:

### Zero Configuration
```javascript
import { PLATFORM } from 'aurelia-framework';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .plugin(PLATFORM.moduleName('aurelia-fontawesome'));

  // other code ...

  return aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}
```

### Global Configuration
```javascript
import { PLATFORM } from 'aurelia-framework';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .plugin(PLATFORM.moduleName('aurelia-fontawesome'), {
      iconOptions: { /* bindable property defaults here (e.g rotation: 0) */ },,
      icons: [ fab, faCircle, faHome, faSpinner, faCoffee, faMugHot ]
    });

  // other code ...

  return aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}
```

### Explicit Import
Explicitly import the icon(s) into your view model(s)

_foobar.js_
```javascript
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

export class FooBarViewModel {
  coffeeIcon = faCoffee;
}
```

_foobar.html_
```html
<template>
  <font-awesome-icon icon.bind="coffeeIcon"></font-awesome-icon>
</template>
```

> Explicitly importing icons like this allows us to subset Font Awesome's
> thousands of icons to include only those you use in your final bundled file.
> for an alternative approach check out webpack loader [aurelia-fontawesome-loader](https://github.com/rmja/aurelia-fontawesome-loader)

### Non FAS icons
_foobar.js_
```javascript
export class FooBarViewModel { }
```

_foobar.html_
```html
<template>
  <font-awesome-icon icon.bind="['fab', 'apple']"><font-awesome-icon>
  <font-awesome-icon icon.bind="['fab', 'microsoft']"><font-awesome-icon>
  <font-awesome-icon icon.bind="['fab', 'google']"><font-awesome-icon>
</template>
```
> The `"check-square"` icon is getting a default prefix of `fas` here too, which
> is what we want, because that icon also lives in the
> `@fortawesome/free-solid-svg-icons` package.

> However, the `"apple"`, `"microsoft"`, and `"google"` brand icons live in the
> package `@fortawesome/free-brands-svg-icons`. So we need to specify a
> different prefix for them—not the default `fas`, but `fab`, for Font Awesome


### Binding Variations
- The icon can be an icon object, like `icon.bind=${faCoffee}`.
- The icon can be a string, like `icon="coffee"`.
- The icon can be an `Array` of strings, where the first element is a prefix,
  and the second element is the icon name: `icon.bind="['fab', 'apple']"`

## Dependencies

* [FontAwesome SVG Core](https://www.npmjs.com/package/@fortawesome/fontawesome-svg-core)
* [aurelia-framework](https://github.com/aurelia/framework)

## Building The Code

To build the code, follow these steps.

1. From the project folder, execute the following command:

  ```shell
  npm install
  ```
2. To build the production files, run:

  ```shell
  npm run build
  ```
3. You will find the compiled code in the `dist` folder, available in various module formats.

## Running The Tests

To run the unit tests, first ensure that you have followed the steps above in order to install all dependencies and successfully build the library. Once you have done that, proceed with these additional steps:

1. For single execution run:

  ```shell
  npm run test
  ```
2. For continuous tdd style:

  ```shell
  npm run test:watch
  ```

## Running The Examples

1. From the project folder, execute the following command:

  ```shell
  npm start
  ```
