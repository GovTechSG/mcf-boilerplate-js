import {TransformFunction} from 'logform';
import winston from 'winston';
import * as Transport from 'winston-transport';
import {createMorganStream} from './streams';
import {createConsoleTransport, createFluentTransport} from './transports';

export {
  createLogger,
  createFluentTransport,
  createConsoleTransport,
  createMorganStream,
};

const {combine, timestamp, json} = winston.format;

// tslint:disable object-literal-sort-keys
// using value order rather than key order makes more sense
// TODO see if we can use defaults and http
const defaultLevels = {
  error: 0, // use for errors
  warn: 1, // use for deprecations
  info: 2, // for application logging
  http: 3, // for request logging
  debug: 4, // debug uses
  silly: 5, // all other uses
};
// tslint:enable object-literal-sort-keys
const defaultLevel: LogLevelType = 'silly';
const defaultTransports: Transport[] = [createConsoleTransport()];
const defaultAdditionalTransports: Transport[] = [];

export interface IExtendedTransformFunction extends TransformFunction {
  [key: string]: any;
}

export type LogLevelType = keyof typeof defaultLevels;
export interface ILoggerOptions {
  formatters?: IExtendedTransformFunction[];
  level?: LogLevelType;
  transports?: Transport[];
  additionalTransports?: Transport[];
}
export interface IApplicationLogger extends winston.Logger {
  getStream: (level: LogLevelType) => {write: any};
}

function createLogger({
  formatters = [],
  level = defaultLevel,
  transports = defaultTransports,
  additionalTransports = defaultAdditionalTransports,
}: ILoggerOptions = {}): IApplicationLogger {
  const logger = winston.createLogger({
    exitOnError: false,
    format: combine(
      ...formatters.map(winston.format).map((fn) => fn()), // need the second call to unwrap the formatter
      timestamp(),
      json(),
    ),
    level,
    levels: defaultLevels,
    transports: transports.concat(additionalTransports),
  });

  // for any reason spread operator complain :)
  // tslint:disable-next-line prefer-object-spread
  return Object.assign({}, logger, {
    getStream: (httpLogLevel: LogLevelType) => ({
      // @ts-ignore
      write: (...args: any[]) => this.logger[httpLogLevel](...args),
    }),
  });
}
