import * as Transport from 'winston-transport';
export interface ICreateFluentTransport {
    host?: string;
    port?: number;
    timeout?: number;
    requireAckResponse?: boolean;
}
export declare function createFluentTransport({ host, port, timeout, requireAckResponse, }?: ICreateFluentTransport): Transport;
