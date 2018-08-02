[![npm version](https://badge.fury.io/js/%40mcf%2Ftracer.svg)](https://badge.fury.io/js/%40mcf%2Ftracer)

# `@mcf/tracer`
Creates and exposes a Zipkin tracer for consumption by an Express-based application.

## Scope

- [x] Create a tracer
- [x] Expose the internal context
- [x] Expose an Express middleware component
- [x] Expose Morgan tokenizers

## Installation

```bash
npm i @mcf/tracer;
# OR
yarn add @mcf/tracer;
```

## Usage

```js
const {createTracer} = require('@mcf/tracer');
// OR
import {createTracer} from '@mcf/tracer';
```

### Basic

```js
const express = require('express');
const {createTracer} = require('@mcf/tracer');
const tracerInstance = createTracer();
const server = express();
server.use(tracerInstance.getExpressMiddleware());
server.use((req, res) => {
  res.json(req.context);
});
server.listen();
// ...
```

### Full Configuration (with defaults)

```js
const express = require('express');
const {createTracer} = require('@mcf/tracer');
const tracerInstance = createTracer({
  httpHeaders: {},
  localServiceName: 'unknown',
  sampleRate: 0.5,
  syncIntervalMs: 1000,
  serverHost: 'localhost',
  serverPort: '9411',
  serverProtocol: 'http',
});
const server = express();
server.use(tracerInstance.getExpressMiddleware());
server.use((req, res) => {
  res.json(req.context);
});
server.listen();
// ...
```

## API

### `.createTracer(:options)`
Creates the tracer instance. The `:options` parameter has the following schema:

| Key | Defaults To | Description |
| --- | --- | --- |
| `httpHeaders` | `{}` | Additional HTTP headers to be sent to the Zipkin server |
| `localServiceName` | `os.hostname() || process.env.HOSTNAME || 'unknown'` | The identity of the current service |
| `sampleRate` | `0.5` | The frequency of sampling by Zipkin. Settings this to 1.0 may cause your data store behind Zipkin to be populated very quickly. Use higher numbers for testing only |
| `syncIntervalMs` | `1000` | Synchronises the data every X milliseconds |
| `serverHost` | `"localhost"` | The hostname of your Zipkin service |
| `serverPort` | `"9411"` | The port on which the Zipkin service is listening to |
| `serverProtocol` | `"http"` | The string identifier of the protocol your are using. Typically `"http"` or `"https"` |

#### Returned Tracer
The returned tracer instance exposes the following three methods:

- `.getContext()`
- `.getExpressMiddleware()`
- `.getTracer()`

##### `.getContext()`
Returns the context used to create the Zipkin Tracer.

##### `.getExpressMiddleware()`
Returns an Express-compatible middleware which does two things:
1. Add a `.context` property to Node's request object
2. Manages the trace and span ID for every request

##### `.getMorganTokenizers()`
Returns an array of Morgan tokens which have the shape:

```typescript
{
  id: string;
  fn: (req?: Request, res?: Response) => any;
}
```

These can be used to generate additional tokens for Morgan and using them in Morgan logs.

> The transformations here are tied to how `.getExpressMiddleware()` injects the Zipkin context into requests. You'll need to write your own if you are not using `.getExpressMiddleware()`.

##### `.getTracer()`
Returns the pure Zipkin Tracer object.

## Changelog
### 0.0.4
- Added Morgan tokenizer generator
### 0.0.3
- Initial release