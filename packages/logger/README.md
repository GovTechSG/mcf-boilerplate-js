# `@mcf/logger`
This logger is based on Winston. It includes formats and plugins for integration with the Morgan request logging library, and Zipkin request distributed tracing library.

## Scope

- [x] OpenTracing context ID integration
- [x] Morgan logger integration
- [ ] FluentD log centrailisation

## Installation
Install it via `npm` or `yarn`:

```sh
npm i @mcf/logger
# or
yarn add @mcf/logger
```

## Usage

### Initialisation
```js
// in es5:
const logger = require('@mcf/logger');

// or es6:
import logger from '@mcf/logger';

// initialise it once
logger.init(/* {...options} */);
```

### Base Usage
```js
// use it
logger.silly('silly level message');
logger.debug('debug level message');
logger.access('access level message');
logger.info('info level message');
logger.warn('warn level message');
logger.error('error level message');
```

### Usage with Zipkin distributed tracing
```js
// ...
const zipkin = require('zipkin');
const ctxImpl = new zipkin.ExplicitContext();
// ...
logger.context.set(ctxImpl);
```

### Usage with Morgan logger
```js
// ...
const express = require('express');
const morgan = require('morgan');
// ...
const server = express();
server.use(morgan('combined', logger.getStream('access')));
```

### Complete usage with default options
```js
const express = require('express');
const morgan = require('morgan');
const zipkin = require('zipkin');
const winston = require('winston');
const zipkinMiddleware = require('zipkin-instrumentation-express');

const logger = require('@mcf/logger');

const ctxImpl = new zipkin.ExplicitContext();

logger.init({
  logFormatters: [],
  logLevels: {
    error: 0, // use for errors
    warn: 1, // use for deprecations
    info: 2, // for application logging
    access: 3, // for request logging
    debug: 4, // debug uses
    silly: 5, // all other uses
  },
  logLevel: 'silly',
  logTransporters: [
    new winston.transports.Console(),
  ],
  openTracingContext: ctxImpl,
});

const tracer = new zipkin.Tracer({
  ctxImpl,
  recorder: new zipkin.ConsoleRecorder(() => {}),
  localServiceName: 'test-zipkin-server',
});

const server = express();
server.use(zipkinMiddleware.expressMiddleware({tracer}));
server.use(morgan('combined', {stream: logger.getStream()}));

// ...
```

## Public API Documentation
#### `.context.set(:context)`

| Parameter | Description |
| --- | --- |
| `:context` | The context object from an open tracing implementation |

### `.getStream(:logLevel)`

| Parameter | Description |
| --- | --- |
| :logLevel | Specifies the log level to be used for the stream. This log level has to exist in the log levels you passed into the `.init()` function |

### `.init(:args)`
> The `:args` parameter is an object with the following properties:

| Parameter | Description | Defaults To |
| --- | --- |
| `logFormatters` | Specify Winston log formatters. This parameter should be an array of functions that work with Winston | `[]` |
| `logLevels` | A hashmap of log category and value. | `{error:0, warn:1, info:2, access:3, debug:4, silly:5}` |
| `logLevel` | Definition of the lowest level of logs we should go to. If the `:logLevel` does not exist in `:logLevels`, an error is thrown | `"silly"` |
| `logTransporters` | Defines the transports used for the logging. | `[new winston.transports.Console()]` |
| `openTracingContext` | Defines the context for the logger. If not specified at `.init()`, the `logger.context.set(...)` can be used later to set it. | `null` |

## Changelog

### 0.1.x
#### 0.1.0
- Initial release 