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

export type MorganStreamCreator = (
  options: IMorganStreamCreatorParameters,
) => IMorganStream;

export function createMorganStream({
  logLevel = 'silly',
  logger,
}: IMorganStreamCreatorParameters): IMorganStream {
  if (!logger) {
    throw new Error('The :logger parameter is required.');
  } else if (!logger[logLevel]) {
    throw new Error(`The desired log level ("${logLevel}") `
      + 'could not be found in the provided logger.');
  }
  return {
    write: (message: any) => {
      try {
        logger[logLevel](JSON.parse(message));
      } catch (ex) {
        logger[logLevel](message);
      }
    },
  };
}
