import express from 'express';
import os from 'os';
import {
  BatchRecorder,
  ConsoleRecorder,
  ExplicitContext,
  jsonEncoder,
  option,
  Recorder,
  sampler,
  Tracer,
} from 'zipkin';
import {expressMiddleware} from 'zipkin-instrumentation-express';
import {HttpLogger as ZipkinHttpTransport} from 'zipkin-transport-http';

const DEFAULT_HTTP_HEADERS = {};
const DEFAULT_LOCAL_SERVICE_NAME =
  os.hostname() || process.env.HOSTNAME || 'unknown';
const DEFAULT_SAMPLE_RATE = 0.5;
const DEFAULT_SYNC_INTERVAL_MS = 1000;
const DEFAULT_SERVER_HOST = 'localhost';
const DEFAULT_SERVER_PORT = '9411';
const DEFAULT_SERVER_PROTOCOL = 'http';

const {JSON_V2} = jsonEncoder;
const {CountingSampler} = sampler;

/**
 * Returns a tracer object
 */
export function createTracer({
  httpHeaders = DEFAULT_HTTP_HEADERS,
  localServiceName = DEFAULT_LOCAL_SERVICE_NAME,
  sampleRate = DEFAULT_SAMPLE_RATE,
  syncIntervalMs = DEFAULT_SYNC_INTERVAL_MS,
  serverHost = DEFAULT_SERVER_HOST,
  serverPort = DEFAULT_SERVER_PORT,
  serverProtocol = DEFAULT_SERVER_PROTOCOL,
}: ICreateTracerParameters = {}): ITracer {
  const context = new ExplicitContext();
  const recorder = createRecorder({
    httpHeaders,
    serverHost,
    serverPort,
    serverProtocol,
    syncIntervalMs,
  });
  const samplerInstance = new CountingSampler(sampleRate);
  const tracer = new Tracer({
    ctxImpl: context,
    localServiceName,
    recorder,
    sampler: samplerInstance,
    traceId128Bit: true,
  });
  const middleware = [
    expressMiddleware({tracer}),
    contextProviderMiddleware({context}),
  ].filter((v) => v);

  return {
    getContext: () => context,
    getExpressMiddleware: () => middleware,
    getMorganTokenizers: () => morganTokenizersProvider(),
    getTracer: () => tracer,
  };
}

// the following should be synchronised to contextProviderMiddleware
const morganTokenizersProvider = () => [
  {
    fn: (req) => req.context.traceId,
    id: 'trace-id',
  },
  {
    fn: (req) => req.context.spanId,
    id: 'span-id',
  },
  {
    fn: (req) => req.context.parentId,
    id: 'parent-span-id',
  },
  {
    fn: (req) => req.context.sampled,
    id: 'sampled',
  },
];

// the following should be synchronised to morganTokenizersProvider
const contextProviderMiddleware = ({
  context,
}: IContextProviderMiddlewareParameters): IExpressHandlerWithContext => (
  req: IExpressRequestWithContext,
  res: express.Response,
  next: express.NextFunction,
) => {
  const {spanId, parentId, traceId, sampled} = context.getContext();
  req.context = {spanId, parentId, traceId, sampled};
  next();
};

function createRecorder({
  httpHeaders = DEFAULT_HTTP_HEADERS,
  serverHost = DEFAULT_SERVER_HOST,
  serverPort = DEFAULT_SERVER_PORT,
  serverProtocol = DEFAULT_SERVER_PROTOCOL,
  syncIntervalMs = DEFAULT_SYNC_INTERVAL_MS,
}: ICreateLoggerParameters = {}): Recorder {
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

export interface IContextProviderMiddlewareParameters {
  context: ExplicitContext;
}

export interface IContextShape {
  parentId: string;
  sampled: option.IOption<boolean>;
  spanId: string;
  traceId: string;
}

export interface IExpressRequestWithContext extends express.Request {
  context?: IContextShape;
}

export interface IExpressHandlerWithContext extends express.RequestHandler {
  (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ): void;
}

export interface ICreateLoggerParameters {
  httpHeaders?: object;
  serverHost?: string;
  serverPort?: string;
  serverProtocol?: string;
  syncIntervalMs?: number;
}

export interface ICreateTracerParameters {
  httpHeaders?: object;
  localServiceName?: string;
  sampleRate?: number;
  syncIntervalMs?: number;
  serverHost?: string;
  serverPort?: string;
  serverProtocol?: string;
}

export interface IMorganTokenizer {
  fn: (req?: IExpressRequestWithContext) => any;
  id: string;
}

export interface ITracer {
  getContext: () => ExplicitContext;
  getExpressMiddleware: () => IExpressHandlerWithContext[];
  getMorganTokenizers: () => IMorganTokenizer[];
  getTracer: () => Tracer;
}
