import { TransformFunction } from 'logform';
import winston from 'winston';
import * as Transport from 'winston-transport';
declare const defaultLogLevels: {
    error: number;
    warn: number;
    info: number;
    http: number;
    debug: number;
    silly: number;
};
/**
 * @param {Object} options
 * @param {Array<Function>} options.logFormatters
 * @param {String} options.logLevel
 * @param {Array<Object>} options.logTransporters
 */
export declare function createLogger({ logFormatters, logLevel, logTransporters, }?: ILoggerOptions): IApplicationLogger;
export declare type LogLevelType = keyof typeof defaultLogLevels;
export interface ILoggerOptions {
    logFormatters?: TransformFunction[];
    logLevel?: LogLevelType;
    logTransporters?: Transport[];
}
export interface IApplicationLogger extends winston.Logger {
    getStream: (level: LogLevelType) => {
        write: any;
    };
}
export {};
