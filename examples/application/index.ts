import convict from 'convict';
import {
  createConsoleTransport,
  createFluentTransport,
  createLogger,
  IApplicationLogger,
} from '../../packages/logger/dist';
import {createServer} from '../../packages/server-boilerplate-middleware/dist';
import {createTracer, getWinstonFormat, IExpressRequestWithContext} from '../../packages/tracer/dist';
import {createRequest} from '../../packages/request/dist';
import {AddressInfo} from 'net';

const config = convict({
  fluentHost: {
    default: 'localhost',
    env: 'FLUENTD_HOST',
  },
  fluentPort: {
    default: '24224',
    env: 'FLUENTD_PORT',
  },
  otherServiceName: {
    default: 'unknown2',
    env: 'SVC_OTHER_NAME',
  },
  otherServiceUrl: {
    default: 'http://localhost',
    env: 'SVC_OTHER_URL',
  },
  serviceName: {
    default: 'unknown',
    env: 'SVC_NAME',
  },
  servicePort: {
    default: '11111',
    env: 'PORT',
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
  sampleRate: 1,
  serverHost: config.get('zipkinHost'),
  serverPort: config.get('zipkinPort'),
});

export const context = tracer.getContext();

export const logger: IApplicationLogger = createLogger({
  formatters: [getWinstonFormat({context})],
  level: 'silly',
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
  tracingOptions: {
    context: tracer.getContext(),
    tracer: tracer.getTracer(),
  },
});

server.post('/csp-report', (req: IExpressRequestWithContext, res) => {
  logger.info(req.body);
  res.json('ok');
});

server.get('/other/:iteration', (req: IExpressRequestWithContext, res) => {
  if (req.context) {
    logger.info(`Caller is ${req.context.traceId}`);
  }
  const iteration = parseInt(req.params.iteration, 10);
  logger.info(`iteration ${iteration}`);
  const url = config.get('otherServiceUrl') + (iteration > 0 ? `/other/${iteration - 1}` : '');
  logger.info(`sending request to ${url}`);
  request(url, {
    remoteServiceName: config.get('otherServiceName'),
  })
    .then((otherResponse) => otherResponse.json())
    .then((otherResponseBody) => {
      res.json(otherResponseBody);
    });
});

server.get('/other', (req: IExpressRequestWithContext, res) => {
  logger.info(`sending request to ${config.get('otherServiceUrl')}`);
  request(config.get('otherServiceUrl'), {
    remoteServiceName: config.get('otherServiceName'),
  })
    .then((otherResponse) => otherResponse.json())
    .then((otherResponseBody) => {
      res.json(otherResponseBody);
    });
});

server.get('/context', (req: IExpressRequestWithContext, res) => {
  logger.info('returning from /context');
  if (req.context) {
    logger.info('Received context: ' + req.context.parentId);
  }
  res.send(req.context);
});

server.get('/', (req: IExpressRequestWithContext, res) => {
  logger.info(`called with headers: ${JSON.stringify(req.headers)}`);
  logger.info('returning from /');
  res.json(`hello from ${config.get('serviceName')}`);
});

const instance = server.listen(config.get('servicePort'));

instance.on('listening', () => {
  const {port} = instance.address() as AddressInfo;
  logger.info(`Listening on http://localhost:${port}`);
});
