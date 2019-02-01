import winston from 'winston';

export type MorganStreamWriter = (message: any, encoding?: any) => void;

export interface IMorganStream {
  write: MorganStreamWriter;
}

export interface ILogger extends winston.Logger {
  [key: string]: any;
}

export interface IMorganStreamCreatorParameters {
  logLevel?: string;
  logger: ILogger;
}

export type MorganStreamCreator = (options: IMorganStreamCreatorParameters) => IMorganStream;

export function createMorganStream({logLevel = 'http', logger}: IMorganStreamCreatorParameters): IMorganStream {
  if (!logger) {
    throw new Error('The :logger parameter is required.');
  } else if (!logger[logLevel]) {
    throw new Error(`The desired log level ("${logLevel}") could not be found in the provided logger.`);
  }
  return {
    write: (mes: string) => {
      const message: any = JSON.parse(mes);
      try {
        logger[logLevel](
          `${message.method} ${message.url} ${message.status} ${message.contentLength} - ${message.responseTimeMs} ms`,
          message,
        );
      } catch (ex) {
        logger.error(ex.message, message);
      }
    },
  };
}
