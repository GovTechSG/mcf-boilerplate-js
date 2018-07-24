import {createLogger} from '../dist';

// basic usage
const basicLogger = createLogger();
basicLogger.silly('a silly hi');
basicLogger.debug('a debug hi');
basicLogger.http('a http hi');
basicLogger.info('a info hi');
basicLogger.warn('a warn hi');
basicLogger.error('a error hi');

// kibana usage
const kibanaLogger = createLogger({
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
});
kibanaLogger.info('hello world!', {hello: 'world'});
kibanaLogger.info({hello: 'world!'});
