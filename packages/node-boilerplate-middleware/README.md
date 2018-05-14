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


## Development

### Installing Dependencies
Run the following from the root of the repository to initialise the dependencies since Lerna manages the dependencies for us across the multiple packages:

```sh
lerna bootstrap;
```

### Running Tests
To run the tests during development, use:

```sh
npm run test-watch;
```

To run the tests on the built package, use:

```sh
npm run test;
```

### Building
```sh
npm run build;
```

## Change Log
### 0.x
#### 0.0.5
- fixed behaviour to allow import via `require('@mcf/server-boilerplate-middleware')` without a `.default` property

#### 0.0.2
- initial commit with an express compatible server