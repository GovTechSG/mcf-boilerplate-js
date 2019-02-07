import os from 'os';
import {BatchRecorder, ConsoleRecorder, jsonEncoder, Recorder, sampler, Tracer} from 'zipkin';
import {HttpLogger as ZipkinHttpTransport} from 'zipkin-transport-http';
import {CLSContext} from './cls-context';
export {MCF_TRACE_NAMESPACE} from '@mcf/logger';

const DEFAULT_HTTP_HEADERS = {};
const DEFAULT_LOCAL_SERVICE_NAME = process.env.ZIPKIN_SERVICE_NAME || os.hostname() || 'unknown';
const DEFAULT_SAMPLE_RATE = 0.5;
const DEFAULT_SYNC_INTERVAL_MS = 1000;
const DEFAULT_SERVER_HOST = process.env.ZIPKIN_HOST || 'localhost';
const DEFAULT_SERVER_PORT = process.env.ZIPKIN_PORT || '9411';
const DEFAULT_SERVER_PROTOCOL = process.env.ZIPKIN_PROTOCOL || 'http';

const {JSON_V2} = jsonEncoder;
const {CountingSampler} = sampler;

/**
 * Returns a tracer object
 */
export const createTracer = ({
  httpHeaders = DEFAULT_HTTP_HEADERS,
  localServiceName = DEFAULT_LOCAL_SERVICE_NAME,
  sampleRate = DEFAULT_SAMPLE_RATE,
  syncIntervalMs = DEFAULT_SYNC_INTERVAL_MS,
  serverHost = DEFAULT_SERVER_HOST,
  serverPort = DEFAULT_SERVER_PORT,
  serverProtocol = DEFAULT_SERVER_PROTOCOL,
}: ITracerOptions = {}): Tracer => {
  const context = new CLSContext();
  const recorder = createRecorder({
    httpHeaders,
    serverHost,
    serverPort,
    serverProtocol,
    syncIntervalMs,
  });
  const samplerInstance = new CountingSampler(sampleRate);
  return new Tracer({
    ctxImpl: context,
    localServiceName,
    recorder,
    sampler: samplerInstance,
    traceId128Bit: true,
  });
};

function createRecorder({
  httpHeaders = DEFAULT_HTTP_HEADERS,
  serverHost = DEFAULT_SERVER_HOST,
  serverPort = DEFAULT_SERVER_PORT,
  serverProtocol = DEFAULT_SERVER_PROTOCOL,
  syncIntervalMs = DEFAULT_SYNC_INTERVAL_MS,
}: IRecorderOptions = {}): Recorder {
  if (serverHost) {
    const zipkinHostname = `${serverHost}:${serverPort}`;
    const zipkinBaseUrl = `${serverProtocol}://${zipkinHostname}`;
    return new BatchRecorder({
      logger: new ZipkinHttpTransport({
        endpoint: `${zipkinBaseUrl}/api/v2/spans`,
        headers: httpHeaders,
        httpInterval: syncIntervalMs,
        jsonEncoder: JSON_V2,
      }),
    });
  } else {
    return new ConsoleRecorder();
  }
}

export interface IRecorderOptions {
  httpHeaders?: object;
  serverHost?: string;
  serverPort?: string;
  serverProtocol?: string;
  syncIntervalMs?: number;
}

export interface ITracerOptions {
  httpHeaders?: object;
  localServiceName?: string;
  sampleRate?: number;
  syncIntervalMs?: number;
  serverHost?: string;
  serverPort?: string;
  serverProtocol?: string;
}
