[![npm version](https://badge.fury.io/js/%40mcf%2Fprovision-process.svg)](https://badge.fury.io/js/%40mcf%2Fprovision-process)

# `@mcf/provision-process`
Provisions the process for a graceful termination.

## Installation

```sh
npm i @mcf/provision-process;
```

OR

```sh
yarn add @mcf/provision-process;
```

## Usage
### Without middleware
`provision-process` can be used to listen for `SIGINT` and `SIGTERM` operating system signals.

#### Example
```js
const provisionProcess = require('@mcf/provision-process`);

// ...

// do the deed
provisionProcess();
```

### With middleware
Use the function `.addMiddleware()` to add methods which should run before the application terminates.

The `.addMiddleware()` function accepts one parameter which should be a function that returns a `Promise`. These `Promises` will resolved just before the process exits. The `.addMiddleware()` function is also chainable.

> These middlewares should do things such as ensuring connection pools are closed, server being gracefully terminated, sending the correct responses to in-processing requests, and having nothing left in the Node event queue.

#### Example
```js
const provisionProcess = require('@mcf/provision-process');
// fictitious database instance
const db = require('./path/to/db-instance');
// your logging module
const logger = require('./path/to/logger');
// fictitious server
const server = require('express')().listen();

provisionProcess
  .addMiddleware(() => (new Promise((resolve, reject) => {
    logger.info('closing database connections...');
    db
      .destroy()
      .then((error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
          logger.info('database connections closed');
        }
      });
  })))
  .addMiddleware(() => (new Promise((resolve, reject) => {
    logger.info('closing server gracefully...');
    server
      .close((error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
          logger.info('server closed');
        }
      });
  })));

// do the deed
provisionProcess();
```

#### Note
To speed things up, the middlewares you add are executed in parallel. To execute things in sequential order, resolve your own promises and return the final result:

```js
provisionProcess
  .addMiddleware(() => (
    (new Promise((resolve, reject) => {
      // ...
    })).then((result1) => {
      return new Promise((resolve, reject) => {
        // ...
      })
    }).then((result2) => {
      return new Promise((resolve, reject) => {
        // ...
      })
    })
  ));
```

## Development

### Installing Dependencies
Run the following from the root of the repository to initialise the dependencies since Lerna manages the dependencies for us across the multiple packages:

```sh
lerna bootstrap;
```

### Running Tests
To run the tests during development, use:

```sh
npm run test:watch;
```

To run the tests on the built package, use:

```sh
npm run test;
```

### Building
```sh
npm run build;
```

## ChangeLog
### 0.1.0
- Initial release