# Boilerplate Middleware
Boilerplate middleware for Node projects in My Careers Future.

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
- [ ] basic http header security
- [ ] cross-origin-resource-sharing support
- [ ] cookie handling
- [ ] body parsing handling
- [ ] endpoint: `/healthz`
- [ ] endpoint protection for `/healthz`
- [ ] endpoint: `/readyz`
- [ ] endpoint protection for `/readyz`
- [ ] endpoint: `/metrics`
- [ ] endpoint protection for `/metrics`