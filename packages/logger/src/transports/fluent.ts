import fluentLogger from 'fluent-logger';
import url from 'url';
import * as Transport from 'winston-transport';

const defaultFluentHost = 'localhost';
const defaultFluentPort = 24224;
const defaultFluentTimeout = 3.0;
const defaultRequireAckResponse = false;

export interface ICreateFluentTransport {
  host?: string;
  port?: number;
  timeout?: number;
  requireAckResponse?: boolean;
}

export function createFluentTransport({
  host = defaultFluentHost,
  port = defaultFluentPort,
  timeout = defaultFluentTimeout,
  requireAckResponse = defaultRequireAckResponse,
}: ICreateFluentTransport = {}): Transport {
  const fluentTransport = fluentLogger.support.winstonTransport();
  return new fluentTransport({
    host,
    port,
    requireAckResponse,
    timeout,
  });
}
