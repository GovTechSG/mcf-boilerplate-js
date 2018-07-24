import winston from 'winston';
import * as Transport from 'winston-transport';

export function createConsoleTransport(): Transport {
  return new winston.transports.Console();
}
