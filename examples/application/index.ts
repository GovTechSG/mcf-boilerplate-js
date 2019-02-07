import convict from 'convict';
import {createFluentTransport, createLogger, IApplicationLogger} from '../../packages/logger/dist';
import {createServer} from '../../packages/server-boilerplate-middleware/dist';
import {AddressInfo} from 'net';
import {Request} from 'express';
import winston from 'winston';
import fetch from 'node-fetch';

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

const getTraceId = (info: any) => {
  return info && info.meta && info.meta.trace ? info.meta.trace.traceId : '';
};
const magenta = (str: string) => `\u001b[35m${str}\u001b[39m`;
const red = (str: string) => `\u001b[31m${str}\u001b[39m`;

const logger: IApplicationLogger = createLogger({
  level: 'silly',
  namespace: config.get('serviceName'),
  transports: [
    // create a custom console logger to display trace
    new winston.transports.Console({
      format: winston.format.printf(
        (info) =>
          `[${magenta(info.label)} - ${red(getTraceId(info))}] ${info.timestamp} ${info.level}: ${info.message}`,
      ),
    }),
    createFluentTransport({
      host: config.get('fluentHost'),
      port: config.get('fluentPort'),
    }),
  ],
});

export const {server, request} = createServer({
  loggingOptions: {
    logger,
  },
  tracingOptions: {
    localServiceName: config.get('serviceName'),
    sampleRate: 1,
    serverHost: config.get('zipkinHost'),
    serverPort: config.get('zipkinPort'),
  },
});
const requestOtherService = request ? request(config.get('otherServiceName')) : fetch;

server.post('/csp-report', (req: Request, res) => {
  logger.info(req.body);
  res.json('ok');
});

server.get('/other/:iteration', async (req: Request, res) => {
  // simulate that it's slow
  await new Promise((resolve) => setTimeout(resolve, 800));
  const iteration = parseInt(req.params.iteration, 10);
  logger.info(`iteration ${iteration}`);
  const url = config.get('otherServiceUrl') + (iteration > 0 ? `/other/${iteration - 1}` : '');
  logger.info(`sending request to ${url}`);
  const otherResponse = await requestOtherService(url);
  const body = await otherResponse.json();
  res.json(body);
  logger.info(`response sent`);
});

server.get('/other', async (req: Request, res) => {
  // simulate that it's slow
  await new Promise((resolve) => setTimeout(resolve, 400));
  logger.info(`sending request to ${config.get('otherServiceUrl')}`);

  const otherResponse = await requestOtherService(config.get('otherServiceUrl'));
  const body = await otherResponse.json();
  res.json(body);
});

server.get('/', async (req: Request, res) => {
  // simulate that it's slow
  await new Promise((resolve) => setTimeout(resolve, 1000));
  logger.info(`called with headers: ${JSON.stringify(req.headers)}`);
  logger.info('returning from /');
  res.json(`hello from ${config.get('serviceName')}`);
});

const instance = server.listen(config.get('servicePort'));

instance.on('listening', () => {
  const {port} = instance.address() as AddressInfo;
  logger.info(`Listening on http://localhost:${port}`);
});
