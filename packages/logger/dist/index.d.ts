import { TransformFunction } from 'logform';
import winston from 'winston';
import * as Transport from 'winston-transport';
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
    transporters?: Transport[];
}
export interface IApplicationLogger extends winston.Logger {
    getStream: (level: LogLevelType) => {
        write: any;
    };
}
/**
 * @param {Object} options
 * @param {Array<Function>} options.formatters
 * @param {String} options.level
 * @param {Array<Object>} options.transporters
 */
export declare function createLogger({ formatters, level, transporters, }?: ILoggerOptions): IApplicationLogger;
export {};
