# Boilerplate Middleware
Boilerplate middleware for Node projects in MyCareersFuture.

## Installation
Install it via `npm` or `yarn`:

```sh
npm i @mcf/server-boilerplate-middleware;
# or
yarn add @mcf/server-boilerplate-middleware;
```

## Usage

```js
const serverBoilerplate = require('@mcf/server-boilerplate-middleware');
const server = serverBoilerplate();
server.[...expressMethods];
// ...
```

## Scope
- [x] express compatible server
- [ ] basic http header security
- [ ] cross-origin-resource-sharing support
- [ ] cookie handling
- [ ] body data handling
- [ ] centralised logging
- [ ] application metrics
- [ ] distributed tracing
- [ ] endpoint: `/healthz`
- [ ] endpoint protection for `/healthz`
- [ ] endpoint: `/readyz`
- [ ] endpoint protection for `/readyz`
- [ ] endpoint: `/metrics`
- [ ] endpoint protection for `/metrics`

## Change Log
### 0.0.2
- initial commit with an express compatible server