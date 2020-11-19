import winston from 'winston';
import * as Transport from 'winston-transport';
import {ConsoleTransportOptions} from 'winston/lib/winston/transports';

const {combine, colorize, printf} = winston.format;

const magenta = (str: string) => `\u001b[35m${str}\u001b[39m`;
const mcfConsoleFormat = printf((info) => {
  let message = `[${magenta(info.label)}] ${info.timestamp} ${info.level}: ${
    typeof info.message === 'string' ? info.message : JSON.stringify(info.message)
  }`;
  if (info.meta && Object.keys(info.meta).length > 0) {
    message += `\n${JSON.stringify(info.meta)}`;
  }
  return message;
});
const defaultFormat = combine(colorize(), mcfConsoleFormat);

export function createConsoleTransport({format = defaultFormat}: ConsoleTransportOptions = {}): Transport {
  return new winston.transports.Console({
    format,
  });
}
