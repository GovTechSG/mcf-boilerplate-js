import winston from 'winston';
import * as Transport from 'winston-transport';
import {FileTransportOptions} from 'winston/lib/winston/transports';

const {printf} = winston.format;

const mcfConsoleFormat = printf(
  (info) =>
    `[${info.label}] ${info.timestamp} ${info.level}: ${
      typeof info.message === 'string' ? info.message : JSON.stringify(info.message)
    }`,
);
const defaultFormat = mcfConsoleFormat;

export function createFileTransport({format = defaultFormat, filename}: FileTransportOptions = {}): Transport {
  return new winston.transports.File({
    filename,
    format,
  });
}
