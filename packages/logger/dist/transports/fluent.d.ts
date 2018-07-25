/// <reference types="node" />
import * as Transport from 'winston-transport';
declare const defaultId: string;
declare const defaultFluentHost = "localhost";
declare const defaultFluentPort = 24224;
declare const defaultFluentTimeout = 3;
declare const defaultRequireAckResponse: boolean;
declare const defaultReconnectInterval = 30000;
declare const defaultTls: boolean;
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
export declare function createFluentTransport({ host, port, timeout, requireAckResponse, security, tls, tlsOptions, }?: ICreateFluentTransport): Transport;
export {};
