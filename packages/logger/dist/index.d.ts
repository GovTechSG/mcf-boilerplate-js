import { TransformFunction } from 'logform';
import winston from 'winston';
import * as Transport from 'winston-transport';
import { createConsoleTransport, createFluentTransport } from './transports';
export { createLogger, createFluentTransport, createConsoleTransport };
declare const defaultLevels: {
    error: number;
    warn: number;
    info: number;
    http: number;
    debug: number;
    silly: number;
};
export declare type LogLevelType = keyof typeof defaultLevels;
export interface ILoggerOptions {
    formatters?: TransformFunction[];
    level?: LogLevelType;
    transports?: Transport[];
    additionalTransports?: Transport[];
}
export interface IApplicationLogger extends winston.Logger {
    getStream: (level: LogLevelType) => {
        write: any;
    };
}
declare function createLogger({ formatters, level, transports, additionalTransports, }?: ILoggerOptions): IApplicationLogger;
