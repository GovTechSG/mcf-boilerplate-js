import {createLogger} from '@mcf/logger';
export let logger = null;
export const buildLogger = (parentLogger) => {
  return logger = parentLogger ? parentLogger.child({namespace: 'mcf:server-boilerplate-middleware'}) : createLogger({
    level: 'http',
    namespace: 'mcf:server-boilerplate-middleware',
  });
};
