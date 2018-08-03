[![npm version](https://badge.fury.io/js/%40mcf%2Fserver-boilerplate-middleware.svg)](https://badge.fury.io/js/%40mcf%2Fserver-boilerplate-middleware)

# Boilerplate Middleware
Boilerplate middleware for Node projects in MyCareersFuture.

## Scope
- [x] express compatible server
- [x] cookie handling
- [x] json body data handling ("application/json")
- [x] form body data handling ("application/x-www-form-urlencoded")
- [x] basic http header security
- [x] content security policy
- [x] cross-origin-resource-sharing support
- [x] application metrics
- [x] server request logging
- [x] distributed tracing
- [ ] endpoint: `/healthz`
- [ ] endpoint protection for `/healthz`
- [ ] endpoint: `/readyz`
- [ ] endpoint protection for `/readyz`
- [x] endpoint: `/metrics`
- [ ] endpoint protection for `/metrics`

## Installation
Install it via `npm` or `yarn`:

```sh
npm i @mcf/server-boilerplate-middleware
# or
yarn add @mcf/server-boilerplate-middleware
```

## Usage

```js
const serverBoilerplate = require('@mcf/server-boilerplate-middleware');
const server = serverBoilerplate();
server.[...expressMethods];
// ...
```

### API
The returned server is an Express server with the following additional APIs.

### Options
Options are passed into the constructor function to create the server

```js
const serverBoilerplate = require('@mcf/server-boilerplate-middleware');
const server = serverBoilerplate({
  ...options,
});
```

#### `enableCookieParser` : `Boolean`
| Type | Default | Example |
| --- | --- | --- |
| `Boolean` | `true` | `serverBoilerplate({enableCookieParser: true})` |

#### `enableCompression` : `Boolean`
| Type | Default | Example |
| --- | --- | --- |
| `Boolean` | `true` | `serverBoilerplate({enableCompression: true})` |

#### `enableContentSecurityPolicy` : `Boolean`
| Type | Default | Example |
| --- | --- | --- |
| `Boolean` | `true` | `serverBoilerplate({enableContentSecurityPolicy: true})` |

#### `enableCORS` : `Boolean`
| Type | Default | Example |
| --- | --- | --- |
| `Boolean` | `true` | `serverBoilerplate({enableCORS: true})` |

#### `enableHttpHeaderSecurity` : `Boolean`
| Type | Default | Example |
| --- | --- | --- |
| `Boolean` | `true` | `serverBoilerplate({enableHttpHeaderSecurity: true})` |

#### `enableMetricsCollection` : `Boolean`
| Type | Default | Example |
| --- | --- | --- |
| `Boolean` | `true` | `serverBoilerplate({enableMetricsCollection: true})` |

#### `enableSerializer` : `Boolean`
| Type | Default | Example |
| --- | --- | --- |
| `Boolean` | `true` | `serverBoilerplate({enableSerializer: true})` |

#### `enableServerLogging` : `Boolean`
| Type | Default | Example |
| --- | --- | --- |
| `Boolean` | `true` | `serverBoilerplate({enableServerLogging: true})` |

#### `enableTracing` : `Boolean`
| Type | Default | Example |
| --- | --- | --- |
| `Boolean` | `true` | `serverBoilerplate({enableTracing: true})` |

> If the `:tracing` option parameter is not configured with a `:context` and `:tracer`, tracing will still remain disabled.

#### `compressionOptions` : `Object`
> This configuration is only relevant if the `enableCompression` parameter was not set to `false`

| Key | Type | Notes | Defaults To |
| --- | --- | --- | --- |
| `chunkSize` | `Number` | size in bytes of chunk | `16384` |
| `level` | `Number` | 0-9 - see https://www.npmjs.com/package/compression for more information | `9` |
| `threshold` | `Number` | minimum size in bytes before compression kicks in | `102400` |

> Defaults to:
> ```js
> {
>   chunkSize: 16 * 1024, // 16kb
>   level: 9,
>   threshold: 300 * 1024, // 300kb
> }
> ```

#### `contentSecurityPolicy` : `Object`
> This option is only relevant if the `enableContentSecurityPolicy` flag is not set to `false`.

| Key | Type | Notes | Defaults To |
| --- | --- | --- | --- |
| `childSrc` | `Array<String>` | populates the child-src value of the CSP header | `['\'none\'']` |
| `connectSrc` | `Array<String>` | populates the connect-src value of the CSP header | `['\'none\'']` |
| `defaultSrc` | `Array<String>` | populates the default-src value of the CSP header | `['\'none\'']` |
| `fontSrc` | `Array<String>` | populates the font-src value of the CSP header | `['\'none\'']` |
| `imgSrc` | `Array<String>` | populates the img-src value of the CSP header | `['\'none\'']` |
| `scriptSrc` | `Array<String>` | populates the script-src value of the CSP header | `['\'none\'']` |
| `styleSrc` | `Array<String>` | populates the style-src value of the CSP header | `['\'none\'']` |
| `reportUri` | `String` | populates the report-uri value of the CSP header | `'/csp-report'` |

> Defaults to:
> ```js
> {
>   childSrc: ['\'none\''],
>   connectSrc: ['\'none\''],
>   defaultSrc: ['\'none\''],
>   fontSrc: ['\'none\''],
>   imgSrc: ['\'none\''],
>   scriptSrc: ['\'none\''],
>   styleSrc: ['\'none\''],
>   reportUri: '/csp-report',
> }
> ```

The above configuration produces the following CSP:

```
"child-src 'none'; connect-src 'none'; default-src 'none'; font-src 'none'; img-src 'none'; script-src 'none'; style-src 'none'; report-uri /csp-report"
```

#### `crossOriginResourceSharing` : `Object`
> This configuration is only relevant if the `enableCORS` parameter was not set to `false`

| Key | Type | Notes | Defaults To |
| --- | --- | --- | --- |
| `allowedHeaders` | `Array<String>` | provides the Access-Control-Allow-Headers header value | `[]` |
| `allowedMethods` | `Array<String>` | provides the Access-Control-Allow-Methods header value | `['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']` |
| `allowedOrigins` | `Array<String>` | provides the Access-Control-Allow-Origins header value | `[]` |
| `credentials` | `Boolean` | provides the Access-Control-Allow-Credentials header value | `true` |
| `preflightContinue` | `Boolean` | decides whether to pass the request on or respond with 204 | `false` |

> Defaults to:
> ```js
> {
>   crossOriginResourceSharing: {
>   allowedHeaders: [],
>   allowedMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
>   allowedOrigins: [],
>   credentials: true,
>   preflightContinue: false,
> }
> ```

#### `metricsCollection` : `Object`
> This configuration is only relevant if the `enableMetricsCollection` parameter was not set to `false`

| Key | Type | Notes | Defaults To |
| --- | --- | --- | --- |
| `livenessCheckEndpoint` | `String` | defines the liveness check endpoint for ignoring in metrics | `'/healthz'` |
| `metricsEndpoint` | `String` | defines the metrics endpoint for ignoring in metrics | `'/metrics'` |
| `probeIntervalInMilliseconds` | `Number` | defines interval between metrics scrape | `3000` |
| `readinessCheckEndpoint` | `String` | defines the readiness check endpoint for ignoring in metrics | `'/readyz'` |
| `pushgatewayUrl` | `String` | defines the pushgateway URL - when this is not `null`, the pushgateway is considered activated | `null` |
| `pushgatewayJobName` | `String` | defines the job name of the job being pushed to the pushgateway - use this to define the application instance when running in a cluster | `process.env.USER || 'unknown'` |
| `pushgatewayTimeout` | `Number` | defines the timeout of the pushgateway if enabled | `10000` |

> Defaults to:
> ```js
> {
>   livenessCheckEndpoint: '/healthz',
>   metricsEndpoint: '/metrics',
>   probeIntervalInMilliseconds: 3000,
>   readinessCheckEndpoint: '/readyz',
>   pushgatewayUrl: null,
>   pushgatewayJobName: process.env.USER || 'unknown',
>   pushgatewayTimeout: 10000,
> }
> ```

#### `serverLogging` : `Object`
> This configuration is only relevant if the `enableServerLogging` parameter was not set to `false`

| Key | Type | Notes | Defaults To |
| --- | --- | --- | --- |
| `additionalTokenizers` | Array of Tokenizers | Additional tokenizers with the schema `{id: string, fn: (req: Request, res: Response) => any}` | `[]` |
| `logLevel` | String | Determines the `level` property in the logs | `"access"` |
| `logStream` | String | Specifies a stream to use instead of the default `console`. For example, use this to link Morgan up with Winston | `null` |
| `hostnameType` | String | If set to `"os"`, the `os.hostname()` will be used. For all other values, `process.env[hostnameType]` is used. | `"os"`

> Defaults to:
> ```js
> {
>   additionalTokenizers: [],
>   logLevel: 'access',
>   logStream: null,
>   hostnameType: 'os',
> }
> ```

#### `tracing` : `Object`
> This configuration is only relevant if the `enableTracing` parameter was not set to `false`

| Key | Type | Notes | Defaults To |
| --- | --- | --- | --- |
| `tracer` | `zipkin.Tracer` | The Zipkin Tracer instance to use | `undefined` |
| `context` | `zipkin.ExplicitContext | `undefined` |

> Defaults to:
> ```js
> {
>   tracer: undefined,
>   context: undefined,
> }
> ```

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

To run a test server using the boilerplate server, use:

```sh
npm start
```

### Building
```sh
npm run build;
```

### Integration Example

Run the following to setup an example environment:

```bash
docker-compose -f test/docker-compose.yml up -d
```

This should spin up a Zipkin server on port 9411 - [VISIT IT](http://localhost:9411).

Open a new terminal and run the following to **create server a on port 11111**:

```bash
SVC_ID=a PORT=11111 npm start;
```

Open another terminal and run the following to **create server b on port 22222**:

```bash
RSVC_ID=a SVC_ID=b PORT=22222 PROXY_PORT=11111 npm start;
```

Verify that [your local Zipkin instance](http://localhost:9411) works and then run the following in yet another terminal to demonstrate tracing:

```bash
curl "http://localhost:22222/proxy";
```

## ChangeLog
### 0.7.x
#### 0.7.0
- added distributed tracing capabilities
- server instance now exports the following methods:
  - `.getTracer()`
  - `.getContext()`
  - `.getRequest()`

### 0.6.x
#### 0.6.4
- added `:logStream` property in `serverLogging` options for providing Morgan with a custom logger to use
#### 0.6.0
- added Morgan server request logging
### 0.5.x
#### 0.5.3
- changed the `preflightContinue` option to be `false` by default
#### 0.5.1
- added features to accommodate a push gateway model (see `pushgatewayUrl`, `pushgatewayTimeout` and `pushgatewayJobName` for more info)
  - if `pushgatewayUrl` is defined in the `metricsCollection` options property, the push gateway metrics flow model is activated, metrics will be pushed every `:probeIntervalInMilliseconds` milliseconds`
#### 0.5.0
- added Prometheus metrics (see `enableMetricsCollection` and `metricsCollection` properties)
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
