import crypto from 'crypto';
import {createConsoleTransport, createFluentTransport, createLogger} from '../../dist';

// basic usage
const basicLogger = createLogger();
basicLogger.silly('a silly hi');
basicLogger.debug('a debug hi');
basicLogger.http('a http hi');
basicLogger.info('a info hi');
basicLogger.warn('a warn hi');
basicLogger.error('a error hi');

// fluentd usage
// demonstrates a plaintext logger
const fluentLogger1 = createLogger({
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
function encrypt(text: string, password: string): string {
  const cipher = crypto.createCipher('aes-256-ccm', password);
  let crypted = cipher.update(text, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}
// demonstrates an encrypted logger
const fluentLogger2 = createLogger({
  formatters: [
    (info) => {
      return {
        ...info,
        message: `enc.${encrypt(info.message, 'supersecretstuff')}`,
      };
    },
  ],
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
