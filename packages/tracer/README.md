[![npm version](https://badge.fury.io/js/%40mcf%2Ftracer.svg)](https://badge.fury.io/js/%40mcf%2Ftracer)

# `@mcf/tracer`
Creates a Zipkin tracer for consumption by an Express-based application.

## Scope

- [x] Create a tracer

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
import express from 'express';
import {expressMiddleware} from 'zipkin-instrumentation-express';
import {createTracer} from '@mcf/tracer';
const tracer = createTracer();
const server = express();
server.use(expressMiddleware({tracer}));
server.listen();

// access context from anywhere
import {MCF_TRACE_NAMESPACE} from '@mcf/tracer';
import {getNamespace} from 'cls-hooked';
const namespace = getNamespace(MCF_TRACE_NAMESPACE);
// do whatever you want with namespace

```

### Full Configuration (with defaults)

```js
import express from 'express';
import {expressMiddleware} from 'zipkin-instrumentation-express';
import {createTracer} from '@mcf/tracer';
const tracer = createTracer({
  httpHeaders: {},
  localServiceName: 'unknown',
  sampleRate: 0.5,
  syncIntervalMs: 1000,
  serverHost: 'localhost',
  serverPort: '9411',
  serverProtocol: 'http',
});
const server = express();
server.use(expressMiddleware({tracer}));
```

## API

### `.createTracer(:options)`
Creates the tracer instance. The `:options` parameter has the following schema:

| Key | Defaults To | Description | Environment variable
| --- | --- | --- | ---
| `httpHeaders` | `{}` | Additional HTTP headers to be sent to the Zipkin server | -
| `localServiceName` | `os.hostname() OR 'unknown'` | The identity of the current service | process.env.HOSTNAME
| `sampleRate` | `0.5` | The frequency of sampling by Zipkin. Settings this to 1.0 may cause your data store behind Zipkin to be populated very quickly. Use higher numbers for testing only | -
| `syncIntervalMs` | `1000` | Synchronises the data every X milliseconds | -
| `serverHost` | `"localhost"` | The hostname of your Zipkin service | process.env.ZIPKIN_HOST
| `serverPort` | `"9411"` | The port on which the Zipkin service is listening to | process.env.ZIPKIN_PORT
| `serverProtocol` | `"http"` | The string identifier of the protocol your are using. Typically `"http"` or `"https"` | process.env.ZIPKIN_PROTOCOL

## Changelog
### 0.0.11
- Use cls-hooked for context implementation
### 0.0.6
- Added static exports for retrieving a Winston formatter to add context details to the logs
- Release!
### 0.0.5
- Added static exports for retrieving the context provider middleware
- Added static exports for retrieving the Morgan tokenizers
### 0.0.4
- Added Morgan tokenizer generator
### 0.0.3
- Initial release