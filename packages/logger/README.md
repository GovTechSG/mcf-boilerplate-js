# `@mcf/logger`
This logger is based on Winston. It includes formats and plugins for integration with the Morgan request logging library, and Zipkin request distributed tracing library.

## Scope

- [x] Basic logging
- [x] Allows for formatter extensions
- [x] Allows for transport extensions
- [x] Console transport creator
- [x] FluentD transport creator
- [x] Fluent transport security configuration
- [x] Fluent transport ID tagger

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
By default, the logger already logs to the console and no configuration is needed. This should suffice for basic apps.

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
We use [fluent](https://www.fluentd.org/) for our centralised logs collector. To initialise the transport, create the logger as such:

```js
const fluentLogger = createLogger({
  additionalTransports: [
    createFluentTransport({
      host: 'localhost',
      port: 44224,
      timeout: 2.0,
      requireAckResponse: false,
    }),
  ],
  // optional message transformation, depends on your elasticsearch setup
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
});

fluentLogger.info('hello world!');
```

The following `fluent.conf` should get you up and running:

```xml
<source>
  @type forward
  bind 0.0.0.0
  port 24224
</source>

<match **.*>
  @type stdout
</match>
```

See the [usage example](./examples/usage) for more examples of creating plaintext/encrypted loggers.

## Documentation
The library exposes the following methods:

| Method | Description |
| --- | --- |
| `.createLogger` | Creates the logger object which can be used |
| `.createFluentTransport` | Creates a FluentD compatible transport |
| `.createConsoleTransport` | Creates a Console transport |
| `.createMorganStream` | Creates an object consumable by Morgan |

### `.createLogger(:options)`
This function accepts a configuration object as the parameter where the keys are documented as follows:

| Key | Description | Default |
| --- | --- | --- |
| `formatters` | Winston formatters created via `winston.format(...)()` | `[]` |
| `level` | Default level (`ENUM { "error", "warn", "info", "http", "debug", "silly" }`) | `"silly"` |
| `transports` | Winston transports | `[winston.transports.Console()]` |
| `additionalTransports` | Winston transports to be added on (no overriding of the default Console transport) | `[]` |

### `.createFluentTransport(:options)`
This function accepts a configuration object as the parameter where the keys are documented as follows:

| Key | Description | Default |
| --- | --- | --- |
| `host` | FluentD service hostname | `"localhost"` |
| `port` | FluentD service port | `24224` |
| `requireAckResponse` | Specifies whether we should connect via TCP (`true`) or UDP (`false`) | `false` |
| `security` | A security object with `.clientHostname` : `string` and `.sharedKey` : `string` properties | `undefined` |
| `tag` | Tag for the logs | `process.env.HOSTNAME || os.hostname() || 'unknown'` |
| `tls` | Specifies if we should use TLS | `true` |
| `tlsOptions` | Specifies an options object for the TLS connection which has a `.ca` property | `undefined` |
| `timeout` | Timeout for a push | `3.0` |

This is referenced from [the `fluent-logger` library](https://github.com/fluent/fluent-logger-node).

### `.createConsoleTransport()`
This function returns a Console transporter and takes no parameters.

### `.createMorganStream(:options)`
This function returns an object that can be used by Morgan to specify a write stream.

The properties for the `:options` object are:

| Key | Description | Default |
| --- | --- | --- |
| `logLevel` | The desire level of logs to use for request logs by Morgan | `"silly"` |
| `logger` | The logger instance to be used | `undefined` |

## Examples
Confirm all dependencies have been installed:

```bash
yarn;
```

To run the `usage` example, set up FluentD first:

```bash
npm run svc:fluent;
```

In another terminal, run the usage application which will pipe to the FluentD instance:

```bash
npm run demo-usage;
```

To stop FluentD, run:

```bash
npm run svc:fluent:stop;
```

## Changelog

### 0.2.x
#### 0.2.1
Added in stream creator for Morgan (see `.createMorganStream`)
#### 0.2.0
Added more:
  - Fluent transport security configuration (`.security`)
  - Fluent transport ID tagger (`.tag`)
  - Fluent transport TLS support (`.tls` and `.tlsOptions`)
### 0.1.x
#### 0.1.0
Initial release with:
  - Basic logging
  - Allows for formatter extensions
  - Allows for transport extensions
  - FluentD transport creator
  - Console transport creator