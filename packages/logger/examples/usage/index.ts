import {createFluentTransport, createLogger} from '../../dist';

// basic usage
const basicLogger = createLogger({namespace: 'basic-console-logger'});
basicLogger.silly('a silly hi');
basicLogger.debug('a debug hi');
basicLogger.http('a http hi');
basicLogger.info('a info hi');
basicLogger.warn('a warn hi');
basicLogger.error('a error hi');

// fluentd usage
// demonstrates a plaintext logger
const fluentLogger1 = createLogger({
  namespace: 'open-fluentd-logger',
  transports: [
    createFluentTransport({
      host: 'localhost',
      port: 44224,
      requireAckResponse: true,
      tag: 'free-world',
      timeout: 3.0,
    }),
  ],
});
// demonstrates an encrypted logger
const fluentLogger2 = createLogger({
  formatters: [
    (info) => {
      return {
        ...info,
        message: `${info.message.substr(0, 4)}${'*'.repeat(
          info.message.length - 4,
        )}`,
      };
    },
  ],
  namespace: 'secret-fluentd-logger',
  transports: [
    createFluentTransport({
      host: 'localhost',
      port: 44224,
      requireAckResponse: true,
      tag: 'dark-side',
      timeout: 3.0,
    }),
  ],
});

fluentLogger1.info('hello from the free world');
fluentLogger2.info('hello from the dark side');

setTimeout(() => {
  process.exit(0);
}, 500);
