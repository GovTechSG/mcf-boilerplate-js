import fluentLogger from 'fluent-logger';
import os from 'os';
import * as Transport from 'winston-transport';

const defaultId = process.env.HOSTNAME || os.hostname() || 'unknown';
const defaultFluentHost = 'localhost';
const defaultFluentPort = 24224;
const defaultFluentTimeout = 3.0;
const defaultRequireAckResponse = false;
const defaultReconnectInterval = 30000;
const defaultTls = false;

export interface ICreateFluentTransportSecurity {
  clientHostname: string;
  sharedKey: string;
}
export interface ICreateFluentTransportTlsOptions {
  ca: string | Buffer;
}
export interface ICreateFluentTransport {
  id?: typeof defaultId;
  host?: typeof defaultFluentHost;
  port?: typeof defaultFluentPort;
  timeout?: typeof defaultFluentTimeout;
  requireAckResponse?: typeof defaultRequireAckResponse;
  reconnectInterval?: typeof defaultReconnectInterval;
  security?: ICreateFluentTransportSecurity;
  tls?: typeof defaultTls;
  tlsOptions?: ICreateFluentTransportTlsOptions;
}

export function createFluentTransport({
  host = defaultFluentHost,
  port = defaultFluentPort,
  timeout = defaultFluentTimeout,
  requireAckResponse = defaultRequireAckResponse,
  security,
  tls,
  tlsOptions,
}: ICreateFluentTransport = {}): Transport {
  const fluentTransport = fluentLogger.support.winstonTransport();
  return new fluentTransport({
    host,
    port,
    requireAckResponse,
    security,
    timeout,
    tls,
    tlsOptions,
  });
}
