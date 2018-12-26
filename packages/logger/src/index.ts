import {TransformableInfo} from 'logform';
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

const {combine, timestamp, json, colorize, printf, label} = winston.format;

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

export interface IExtendedTransformableInfo extends TransformableInfo {
  [key: string]: any;
}

export type IExtendedTransformFunction = (
  info: TransformableInfo,
) => IExtendedTransformableInfo;

export type LogLevelType = keyof typeof defaultLevels;
export interface ILoggerOptions {
  formatters?: IExtendedTransformFunction[];
  level?: LogLevelType;
  transports?: Transport[];
  additionalTransports?: Transport | Transport[];
  namespace?: string;
  silent?: boolean;
}
export interface IApplicationLogger extends winston.Logger {
  getStream: (level: LogLevelType) => {write: any};
}

const magenta = (str: string) => `\u001b[35m${str}\u001b[39m`;
const identity = (i) => i;
const mcfDevelopmentFormat = printf(
  (info) =>
    `[${magenta(info.label)}] ${info.timestamp} ${info.level}: ${
      typeof info.message === 'string'
        ? info.message
        : JSON.stringify(info.message)
    }`,
);

function createLogger({
  formatters = [],
  level = defaultLevel,
  transports = defaultTransports,
  additionalTransports = defaultAdditionalTransports,
  namespace = '',
  silent = false,
}: ILoggerOptions = {}): IApplicationLogger {
  const logger = winston.createLogger({
    exitOnError: false,
    format: combine(
      process.env.NODE_ENV === 'production' // add colors for development
        ? winston.format(identity)()
        : colorize(),
      ...formatters
        .map((formatter) => winston.format(formatter))
        .map((fn) => fn()), // need the second call to unwrap the formatter
      label({label: namespace}),
      timestamp(),
      process.env.NODE_ENV === 'production' ? json() : mcfDevelopmentFormat,
    ),
    level,
    levels: defaultLevels,
    silent,
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
