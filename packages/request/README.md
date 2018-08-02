# `@mcf/request`
Exposes a context-aware request using Opentracing headers based on `node-fetch`.

## Scope

- [x] create a zipkin-instrumented request object

## Installation

```bash
npm i @mcf/request;
# OR
yarn add @mcf/request;
```

## Usage

In a base request module:

```js
const {createRequest} = require('@mcf/request');
// OR
import {createRequest} from '@mcf/request';
import {tracer} from '../path/to/tracer/component';

export default createRequest({tracer});
```

In code:

```js
const request = require('../path/to/request/component');

request('http://otherservice:12345', {
  remoteServiceName: 'shopping-cart', // eg only
  ...otherOptions,
})
```

The other options in `:...otherOptions` follows the same option schema as `node-fetch`. [View it here](https://github.com/bitinn/node-fetch#options).

## License
This package is licensed under the MIT license.

## Change Log
### 0.0.1
- Initial release

# Cheers
