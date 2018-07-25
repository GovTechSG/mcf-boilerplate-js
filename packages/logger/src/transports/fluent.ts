import fluentLogger from 'fluent-logger';
import os from 'os';
import * as Transport from 'winston-transport';

const defaultTag = process.env.HOSTNAME || os.hostname() || 'unknown';
const defaultHost = 'localhost';
const defaultPort = 24224;
const defaultTimeout = 3.0;
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
  host?: string;
  port?: number;
  timeout?: typeof defaultTimeout;
  requireAckResponse?: boolean;
  reconnectInterval?: number;
  security?: ICreateFluentTransportSecurity;
  tag?: typeof defaultTag;
  tls?: typeof defaultTls;
  tlsOptions?: ICreateFluentTransportTlsOptions;
}

export function createFluentTransport({
  host = defaultHost,
  port = defaultPort,
  requireAckResponse = defaultRequireAckResponse,
  reconnectInterval,
  security,
  tag = defaultTag,
  timeout = defaultTimeout,
  tls = defaultTls,
  tlsOptions,
}: ICreateFluentTransport = {}): Transport {
  const fluentTransport = fluentLogger.support.winstonTransport();
  return new fluentTransport({
    host,
    port,
    reconnectInterval,
    requireAckResponse,
    security,
    tag,
    timeout,
    tls,
    tlsOptions,
  });
}
