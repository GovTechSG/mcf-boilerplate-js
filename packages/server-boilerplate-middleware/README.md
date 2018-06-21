[![Build Status](https://travis-ci.org/GovTechSG/mcf-boilerplate-js.svg?branch=master)](https://travis-ci.org/GovTechSG/mcf-boilerplate-js)

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

### Options
Options are passed into the constructor function:

```js
const serverBoilerplate = require('@mcf/server-boilerplate-middleware');
const server = serverBoilerplate({
  ...options,
});
```

#### `enableSerializer`
**Type**: `Boolean`

**Example**
```js
serverBoilerplate({
  enableSerializer: true,
});
```

> Defaults to `true`

#### `enableCookieParser`
**Type**: `Boolean`

**Example**
```js
serverBoilerplate({
  enableCookieParser: true,
});
```

> Defaults to `true`

#### `enableHttpHeaderSecurity`
**Type**: `Boolean`

**Example**
```js
serverBoilerplate({
  enableHttpHeaderSecurity: true,
});
```

> Defaults to `true`

#### `enableContentSecurityPolicy`
**Type**: `Boolean`

**Example**
```js
serverBoilerplate({
  enableContentSecurityPolicy: true,
});
```

> Defaults to `true`

#### `enableCompression`
**Type**: `Boolean`

**Example**
```js
serverBoilerplate({
  enableCompression: true,
});
```

> Defaults to `true`

#### `enableCORS`
**Type**: `Boolean`

**Example**
```js
serverBoilerplate({
  enableCORS: true,
});
```

> Defaults to `true`

#### `compressionOptions`
**Type**: `Object`

**Keys**
- `chunkSize` : `Number` *(size in bytes of chunk)*
- `level` : `Number` *(0-9 - see https://www.npmjs.com/package/compression for more information)*
- `threshold` : `Number` *(minimum size in bytes before compression kicks in)*

**Example**
```js
serverBoilerplate({
  compressionOptions: {
    chunkSize: 1024 * 16, // 16kb
    level: 9, // best compression
    threshold: 1024 * 100, // only responses of size 100kb and above will be compressed
  },
});
```

> Defaults to `{}`

#### `contentSecurityPolicy`
> This option is only relevant if the `enableContentSecurityPolicy` flag is not set to `false`.

**Type**: `Object`

**Keys**
- `childSrc` : `Array<String>` *(populates the child-src value of the CSP header)*
- `connectSrc` : `Array<String>` *(populates the connect-src value of the CSP header)*
- `defaultSrc` : `Array<String>` *(populates the default-src value of the CSP header)*
- `fontSrc` : `Array<String>` *(populates the font-src value of the CSP header)*
- `imgSrc` : `Array<String>` *(populates the img-src value of the CSP header)*
- `scriptSrc` : `Array<String>` *(populates the script-src value of the CSP header)*
- `styleSrc` : `Array<String>` *(populates the style-src value of the CSP header)*
- `reportUri` : `String` *(populates the report-uri value of the CSP header)*

**Example**
```js
serverBoilerplate({
  contentSecurityPolicy: {
    childSrc: ['\'self\''],
    connectSrc: ['\'self\''],
    defaultSrc: ['http://mydomain.com', '\'self\''],
    fontSrc: ['\'none\''],
    imgSrc: ['data: \'self\''],
    scriptSrc: ['\'self\''],
    styleSrc: ['\'self\''],
    reportUri: '/my-csp-report-uri',
  },
});
```

The above configuration produces the following CSP:

```
"child-src 'self'; connect-src 'self'; default-src http://mydomain.com 'self'; font-src 'none'; img-src data: 'self'; script-src 'self'; style-src 'self'; report-uri /my-csp-report-uri"
```

> Defaults to `{}`

#### `crossOriginResourceSharing`
> This configuration is only relevant if the `enableCORS` parameter was not set to `false`

**Keys**
- `allowedHeaders` : `Array<String>` *(provides the Access-Control-Allow-Headers header value)*
- `allowedMethods` : `Array<String>` *(provides the Access-Control-Allow-Methods header value)*
- `allowedOrigins` : `Array<String>` *(provides the Access-Control-Allow-Origins header value)*
- `credentials` : `Boolean` *(provides the Access-Control-Allow-Credentials header value)*
- `preflightContinue` : `Boolean` *(decides whether to pass the request on or respond with 204)*

**Example**
```js
serverBoilerplate({
  crossOriginResourceSharing: {
    allowedHeaders: ['X-Authorization'],
    allowedMethods: ['GET', 'POST'],
    allowedOrigins: ['http://localhost:3000', 'http://localhost:8080'],
  },
});
```

> Defaults to `{}`

## Scope
- [x] express compatible server
- [x] cookie handling
- [x] json body data handling ("application/json")
- [x] form body data handling ("application/x-www-form-urlencoded")
- [x] basic http header security
- [x] content security policy
- [x] cross-origin-resource-sharing support
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

## ChangeLog
### 0.4.0
- added CORS support (see `enableCORS` and `crossOriginResourceSharing`)
### 0.3.x
#### 0.3.1
- added gzip compression module
#### 0.3.0
- refactored security module into two submodules: http headers and csp
- also changed API for content security policy (CSP)
- added new flag, `enableContentSecurityPolicy`, for server initialisation
### 0.2.x
#### 0.2.1
- added `connect-src` to CSP configuration
#### 0.2.0
- fixed ci pipeline problems, no changes to functionality, we can now expect stably numbered patch releases
### 0.1.x
#### 0.1.0
- added content security policy configuration for:
  - 'default-src'
  - 'child-src'
  - 'font-src'
  - 'img-src'
  - 'script-src'
  - 'style-src'
  - 'report-uri'
- added basic http security headers
  - hides 'x-powered-by'
  - adds 'x-xss-protection: 1; mode=block'
  - adds 'x-content-type-options : nosniff'
  - adds 'x-dns-prefetch-control : off'
  - adds 'x-download-options : noopen'
  - adds 'x-frame-options : SAMEORIGIN'
  - adds 'strict-transport-security : max-age=15552000; includeSubDomains'
- added body data parsing suport for `Content-Type: application/json`
- added body data parsing suport for `Content-Type: application/x-www-form-urlencoded`
- added cookie parsing superpowers

### 0.0.x
#### 0.0.4
- fixed behaviour to allow import via `require('@mcf/server-boilerplate-middleware')` without a `.default` property

#### 0.0.2
- initial commit with an Express compatible server