import os from 'os';
import {
  BatchRecorder,
  ConsoleRecorder,
  ExplicitContext,
  Tracer,
  jsonEncoder,
  sampler,
} from 'zipkin';
import {expressMiddleware} from 'zipkin-instrumentation-express';
import {HttpLogger as ZipkinHttpTransport} from 'zipkin-transport-http';

const DEFAULT_HTTP_HEADERS = {};
const DEFAULT_LOCAL_SERVICE_NAME =
  os.hostname() || process.env.HOSTNAME || 'unknown';
const DEFAULT_SAMPLE_RATE = 0.5;
const DEFAULT_SYNC_INTERVAL_MS = 1000;
const DEFAULT_SERVER_HOST = null;
const DEFAULT_SERVER_PORT = null;
const DEFAULT_SERVER_PROTOCOL = 'http';

const {JSON_V2} = jsonEncoder;
const {CountingSampler} = sampler;

/**
 * Returns a tracer object
 *
 * @param {Object} options
 * @param {String} options.httpHeaders
 * @param {String} options.localServiceName
 * @param {Number} options.sampleRate
 * @param {Number} options.syncIntervalMs
 * @param {String} options.serverHost
 * @param {Number} options.serverPort
 * @param {String} options.serverProtocol
 * @return {Object}
 */
export function createTracer({
  httpHeaders = DEFAULT_HTTP_HEADERS,
  localServiceName = DEFAULT_LOCAL_SERVICE_NAME,
  sampleRate = DEFAULT_SAMPLE_RATE,
  syncIntervalMs = DEFAULT_SYNC_INTERVAL_MS,
  serverHost = DEFAULT_SERVER_HOST,
  serverPort = DEFAULT_SERVER_PORT,
  serverProtocol = DEFAULT_SERVER_PROTOCOL,
} = {}) {
  const context = new ExplicitContext();
  const logger = createLogger({
    httpHeaders, serverHost, serverPort, serverProtocol, syncIntervalMs,
  });
  const recorder =
    (logger instanceof ConsoleRecorder)
      ? logger
      : new BatchRecorder({logger});
  const sampler = new CountingSampler(sampleRate);
  const tracer = new Tracer({
    ctxImpl: context,
    recorder,
    sampler,
    traceId128Bit: true,
    localServiceName,
  });
  const middleware = [
    expressMiddleware({tracer}),
    contextProviderMiddleware({context}),
  ].filter((v) => v);

  return {
    getContext: () => context,
    getLogger: () => logger,
    getMiddleware: () => middleware,
    getRecorder: () => recorder,
    getSampler: () => sampler,
    getTracer: () => tracer,
  };
}

const contextProviderMiddleware = ({
  context = null,
}) => (context ? ((req, _res, next) => {
  const {spanId, parentId, traceId, sampled} = context.getContext();
  req.context = {spanId, parentId, traceId, sampled};
  next();
}) : undefined);

const createLogger = ({
  httpHeaders = DEFAULT_HTTP_HEADERS,
  serverHost = DEFAULT_SERVER_HOST,
  serverPort = DEFAULT_SERVER_PORT,
  serverProtocol = DEFAULT_SERVER_PROTOCOL,
  syncIntervalMs = DEFAULT_SYNC_INTERVAL_MS,
} = {}) => {
  if (serverHost) {
    const zipkinHostname = `${serverHost}:${serverPort}`;
    const zipkinBaseUrl = `${serverProtocol}://${zipkinHostname}`;
    return new ZipkinHttpTransport({
      endpoint: `${zipkinBaseUrl}/api/v2/spans`,
      jsonEncoder: JSON_V2,
      httpInterval: syncIntervalMs,
      headers: httpHeaders,
    });
  } else {
    return new ConsoleRecorder(() => {});
  }
};
