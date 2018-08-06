import convict from 'convict';
import {
  createConsoleTransport,
  createFluentTransport,
  createLogger,
} from '@mcf/logger';
import createServer from '@mcf/server-boilerplate-middleware';
import {createTracer, getWinstonFormat} from '@mcf/tracer';
import {createRequest} from '@mcf/request';

const config = convict({
  serviceName: {
    default: 'unknown',
    env: 'SVC_NAME',
  },
  servicePort: {
    default: '11111',
    env: 'PORT',
  },
  otherServiceName: {
    default: 'unknown2',
    env: 'SVC_OTHER_NAME',
  },
  otherServiceUrl: {
    default: 'http://localhost',
    env: 'SVC_OTHER_URL',
  },
  fluentHost: {
    default: 'localhost',
    env: 'FLUENTD_HOST',
  },
  fluentPort: {
    default: '24224',
    env: 'FLUENTD_PORT',
  },
  zipkinHost: {
    default: 'localhost',
    env: 'ZIPKIN_HOST',
  },
  zipkinPort: {
    default: '9411',
    env: 'ZIPKIN_PORT',
  },
});

export const tracer = createTracer({
  localServiceName: config.get('serviceName'),
  serverHost: config.get('zipkinHost'),
  serverPort: config.get('zipkinPort'),
  sampleRate: 1,
});

export const context = tracer.getContext();

export const logger = createLogger({
  formatters: [getWinstonFormat({context})],
  level: 0,
  transports: [
    createConsoleTransport(),
    createFluentTransport({
      host: config.get('fluentHost'),
      port: config.get('fluentPort'),
    }),
  ],
});

export const request = createRequest({tracer: tracer.getTracer()});

export const server = createServer({
  tracing: {
    tracer: tracer.getTracer(),
    context: tracer.getContext(),
  },
});

server.post('/csp-report', (req, res) => {
  logger.info(req.body);
  res.json('ok');
});

server.get('/other/:iteration', (req, res) => {
  const iteration = parseInt(req.params.iteration);
  logger.info(`iteration ${iteration}`);
  const url =
    config.get('otherServiceUrl') + (iteration > 0)
      ? `/other/${iteration - 1}`
      : '';
  logger.info(`sending request to ${url}`);
  request(url, {
    remoteServiceName: config.get('otherServiceName'),
  })
    .then((otherResponse) => otherResponse.json())
    .then((otherResponseBody) => {
      res.json(otherResponseBody);
    });
});

server.get('/other', (req, res) => {
  logger.info(`sending request to ${config.get('otherServiceUrl')}`);
  request(config.get('otherServiceUrl'), {
    remoteServiceName: config.get('otherServiceName'),
  })
    .then((otherResponse) => otherResponse.json())
    .then((otherResponseBody) => {
      res.json(otherResponseBody);
    });
});

server.get('/context', (req, res) => {
  logger.info('returning from /context');
  logger.info(req.context);
  res.send(req.context);
});

server.get('/', (req, res) => {
  logger.info(`called with headers: ${JSON.stringify(req.headers)}`);
  logger.info('returning from /');
  res.json(`hello from ${config.get('serviceName')}`);
});

const instance = server.listen(config.get('servicePort'));

instance.on('listening', () => {
  const {port} = instance.address();
  logger.info(`Listening on http://localhost:${port}`);
});
