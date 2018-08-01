const createServer = require('@mcf/server-boilerplate-middleware');
const {
  createConsoleTransport,
  createFluentTransport,
  createLogger,
} = require('@mcf/logger');
const {createMorganStream} = require('@mcf/logger');

let context;
let request;

const logger = createLogger({
  formatters: [
    (info) =>
      context.currentCtx
        ? {
            ...info,
            spanId: context.currentCtx.spanId,
            parentSpanId: context.currentCtx.parentId,
            traceId: context.currentCtx.traceId,
            sampled: context.currentCtx.sampled,
          }
        : info,
  ],
  level: 0,
  transports: [
    createConsoleTransport(),
    createFluentTransport({
      host: process.env.FLUENTD_HOST,
      port: process.env.FLUENTD_PORT,
      requireAckResponse: true,
    }),
  ],
});

const server = createServer({
  serverLogging: {
    logStream: createMorganStream({logger, logLevel: 'http'}),
  },
  tracing: {
    localServiceName: process.env.SVC_ID,
    sampleRate: 1.0,
    serverHost: process.env.ZIPKIN_HOST,
    serverPort: process.env.ZIPKIN_PORT,
  },
});

context = server.getContext();
request = server.getRequest();

module.exports = {
  context,
  logger,
  request,
  server,
};
