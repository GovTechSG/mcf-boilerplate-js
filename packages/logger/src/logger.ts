// TODO
import {TransformableInfo, TransformFunction} from 'logform'; // tslint:disable-line no-implicit-dependencies
import winston from 'winston';
import * as Transport from 'winston-transport'; // tslint:disable-line no-implicit-dependencies
const {combine, timestamp, json} = winston.format;

// tslint:disable object-literal-sort-keys
// using value order rather than key order makes more sense
const defaultLogLevels = {
  error: 0, // use for errors
  warn: 1, // use for deprecations
  info: 2, // for application logging
  http: 3, // for request logging
  debug: 4, // debug uses
  silly: 5, // all other uses
};
// tslint:enable object-literal-sort-keys
const defaultLogLevel: LogLevelType = 'warn';
const defaultLogTransporter:Transport[] = [new winston.transports.Console()];

export function createLogger({
  logFormatters = [],
  logLevel = defaultLogLevel,
  logTransporters = defaultLogTransporter,
}: ILoggerOptions) {
  const logger = winston.createLogger({
    exitOnError: false,
    format: combine(
      ...logFormatters.map(winston.format).map((fn) => fn()), // need the second call to unwrap the formatter
      timestamp(),
      json(),
    ),
    level: logLevel,
    levels: defaultLogLevels,
    transports: logTransporters,
  });
  return {
    ...logger,
    // function needed for morgan integration, leave it as it is for the moment but I dont like that
    getStream: (level: LogLevelType) => ({
      // @ts-ignore
      write: (...args: any[]) => this.logger[level](...args),
    }),
  };
};

type LogLevelType = keyof typeof defaultLogLevels;
interface ILoggerOptions {
  logFormatters?: TransformFunction[];
  logLevel?: LogLevelType;
  logTransporters?: Transport[];
}

const l = createLogger({
  logFormatters: [
    (info: TransformableInfo) => {
      return {...info, context: 'yeah'};
    },
  ],
  logLevel: 'http',
});
l.silly('silly');
l.debug('debut');
l.info('info');
l.http('ghjkl');
