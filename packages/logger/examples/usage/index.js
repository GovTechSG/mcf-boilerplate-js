const {createConsoleTransport, createFluentTransport, createLogger} = require('../../dist');

// basic usage
const basicLogger = createLogger();
basicLogger.silly('a silly hi');
basicLogger.debug('a debug hi');
basicLogger.http('a http hi');
basicLogger.info('a info hi');
basicLogger.warn('a warn hi');
basicLogger.error('a error hi');

// fluentd usage
const fluentLogger = createLogger({
  formatters: [
    (info) => {
      const messageIsObject = typeof info.message === 'object';
      return {
        ...info,
        message: messageIsObject ? 'meta' : info.message,
        meta: messageIsObject ? info.message : undefined,
      };
    },
  ],
  transports: [
    createFluentTransport({
      host: 'localhost',
      port: 44224,
      timeout: 2.0,
      requireAckResponse: false,
    }),
    createConsoleTransport(),
  ],
});

fluentLogger.info('hello world!');
