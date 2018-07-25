/// <reference types="node" />
import * as Transport from 'winston-transport';
declare const defaultTag: string;
declare const defaultTimeout = 3;
declare const defaultTls: boolean;
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
export declare function createFluentTransport({ host, port, requireAckResponse, reconnectInterval, security, tag, timeout, tls, tlsOptions, }?: ICreateFluentTransport): Transport;
export {};
