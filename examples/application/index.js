import convict from 'convict';
import {createFluentTransport, createLogger} from '@mcf/logger';
import createServer from '@mcf/server-boilerplate-middleware';
import {createTracer} from '@mcf/tracer';
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
  formatters: [
    (info) => {
      return {
        ...info,
        context: {
          spanId: context.currentCtx.spanId,
          traceId: context.currentCtx.traceId,
          parentId: context.currentCtx.parentId,
          sampled: context.currentCtx.sampled,
        },
      };
    },
  ],
  level: 0,
  transports: [
    createFluentTransport({
      host: config.get('fluentHost'),
      port: config.get('fluentPort'),
    })
  ],
});

export const request = createRequest({tracer: tracer.getTracer()});

export const server = createServer({
  tracing: {
    tracer: tracer.getTracer(),
    context: tracer.getContext(),
  },
});

server.get('/other', (req, res) => {
  request(config.get('otherServiceUrl'), {
    remoteServiceName: config.get('otherServiceName'),
  })
    .then((otherResponse) => otherResponse.json())
    .then((otherResponseBody) => {
      res.json(otherResponseBody);
    });
})

server.get('/context', (req, res) => {
  logger.info('returning from /context');
  res.send(req.context);
});

server.get('/', (req, res) => {
  logger.info('returning from /');
  res.json(`hello from ${config.get('serviceName')}`);
});

server.listen(config.get('servicePort'));

server.on('listening', () => {
  const {port} = server.address();
  logger.info(`Listening on http://localhost:${port}`);
});
