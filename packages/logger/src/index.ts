// TODO add comment
import {TransformFunction} from 'logform';
import winston from 'winston';
import * as Transport from 'winston-transport';
const {combine, timestamp, json} = winston.format;

// tslint:disable object-literal-sort-keys
// using value order rather than key order makes more sense
// TODO see if we can use defaults and http
const defaultLogLevels = {
  error: 0, // use for errors
  warn: 1, // use for deprecations
  info: 2, // for application logging
  http: 3, // for request logging
  debug: 4, // debug uses
  silly: 5, // all other uses
};
// tslint:enable object-literal-sort-keys
const defaultLogLevel: LogLevelType = 'http';
const defaultLogTransporter: Transport[] = [new winston.transports.Console()];

export function createLogger({
  logFormatters = [],
  logLevel = defaultLogLevel,
  logTransporters = defaultLogTransporter,
}: ILoggerOptions): IApplicationLogger {
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

  // for any reason spread operator complain :)
  // tslint:disable-next-line prefer-object-spread
  return Object.assign(logger, {
    getStream: (level: LogLevelType) => ({
      // @ts-ignore
      write: (...args: any[]) => this.logger[level](...args),
    }),
  });
}

export type LogLevelType = keyof typeof defaultLogLevels;
export interface ILoggerOptions {
  logFormatters?: TransformFunction[];
  logLevel?: LogLevelType;
  logTransporters?: Transport[];
}

// function needed for morgan integration, leave it as it is for the moment but I dont like that
export interface IApplicationLogger extends winston.Logger {
  getStream: (level: LogLevelType) => {write: any};
}
