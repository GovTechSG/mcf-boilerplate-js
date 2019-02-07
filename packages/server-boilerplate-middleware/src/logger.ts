import {createLogger, IApplicationLogger} from '@mcf/logger';
export let logger = createLogger({
  level: 'http',
  namespace: 'mcf:server-boilerplate-middleware',
});
export const buildLogger = (parentLogger?: IApplicationLogger) => {
  return (logger = parentLogger ? parentLogger.child({namespace: 'mcf:server-boilerplate-middleware'}) : logger);
};
