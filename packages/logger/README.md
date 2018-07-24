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

### Requiring
```js
import {createConsoleTransport, createFluentTransport, createLogger} from '@mcf/logger';
// or
const {createConsoleTransport, createFluentTransport, createLogger} = require('@mcf/logger');
```

### Basic
```js
const basicLogger = createLogger();
basicLogger.silly('a silly hi');
basicLogger.debug('a debug hi');
basicLogger.http('a http hi');
basicLogger.info('a info hi');
basicLogger.warn('a warn hi');
basicLogger.error('a error hi');
```

### FluentD
```js
const fluentLogger = createLogger({
  formatters: [
    (info) => {
      const messageIsObject = typeof info.message === 'object';
      return {
        ...info,
        message: messageIsObject ? 'meta' : info.message,
        meta: messageIsObject ? info.message : undefined,
      };
    },
  ],
  additionalTransports: [
    createFluentTransport({
      host: 'localhost',
      port: 44224,
      timeout: 2.0,
      requireAckResponse: false,
    }),
  ],
});

fluentLogger.info('hello world!');
```

## Documentation
The library exposes the following methods:

| Method | Description |
| --- | --- |
| `.createLogger` | Creates the logger object which can be used |
| `.createFluentTransport` | Creates a FluentD compatible transport |
| `.createConsoleTransport` | Creates a Console transport |

### `.createLogger(:options)`
This function accepts a configuration object as the parameter where the keys are documented as follows:

| Key | Description | Default |
| --- | --- | --- |
| `formatters` | Winston formatters created via `winston.format(...)()` | `[]` |
| `level` | Default level (`ENUM { "error", "warn", "info", "http", "debug", "silly" }`) | `"silly"` |
| `transports` | Winston transports | `[winston.transports.Console()]` |
| `additionalTransports` | Winston transports to be added on (no overriding of the default Console transport) | `[]` |

### `.createFluentTransport`
This function accepts a configuration object as the parameter where the keys are documented as follows:

| Key | Description | Default |
| --- | --- | --- |
| `host` | FluentD service hostname | `"localhost"` |
| `port` | FluentD service port | `24224` |
| `timeout` | Timeout for a push | `3.0` |
| `requireAckResponse` | Specifies whether we should connect via TCP (`true`) or UDP (`false`) | `false` |

### `.createConsoleTransport`
This function returns a Console transporter and takes no parameters

## Examples
Confirm all dependencies have been installed:

```bash
yarn
```

To run the `usage` example, set up FluentD first:

```bash
docker-compose -f ./examples/usage/docker-compose.yml up;
```

In another terminal, run the usage application which will pipe to the FluentD instance:

```bash
npm run usage;
```

## Changelog

### 0.1.x
#### 0.1.0
- Initial release 