import * as Transport from 'winston-transport';
import {createConsoleTransport} from './console';
import {createFluentTransport} from './fluent';

export interface ITransportCreatorOptions {
  [key: string]: any;
}

export type TransportCreator = ({}: ITransportCreatorOptions) => Transport;

export interface ISupportedTransports {
  console: TransportCreator;
  fluent: TransportCreator;
}

export {createConsoleTransport, createFluentTransport};
