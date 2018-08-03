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
    getContextProviderMiddleware({context}),
  ].filter((v) => v);

  return {
    getContext: () => context,
    getExpressMiddleware: () => middleware,
    getTracer: () => tracer,
  };
}

// the following should be synchronised to morganTokenizersProvider
export function getContextProviderMiddleware({
  context,
}: IContextProviderMiddlewareParameters): IExpressHandlerWithContext {
  return (
    req: IExpressRequestWithContext,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    const {spanId, parentId, traceId, sampled} = context.getContext();
    req.context = {spanId, parentId, traceId, sampled};
    next();
  };
}

// the following should be synchronised to getContextProviderMiddleware
export function getMorganTokenizers(): IMorganTokenizer[] {
  return [
    {
      fn: (req) => (req.context ? req.context.traceId : null),
      id: 'trace-id',
    },
    {
      fn: (req) => (req.context ? req.context.spanId : null),
      id: 'span-id',
    },
    {
      fn: (req) => (req.context ? req.context.parentId : null),
      id: 'parent-span-id',
    },
    {
      fn: (req) => (req.context ? req.context.sampled : null),
      id: 'sampled',
    },
  ];
}

/**
 * Returns a single Winston transform function. Call `winston.format(...)`
 * on this to generate the formatter and then call it to unwrap the
 * formatter.
 *
 * @example
 *  const winston = require('winston')
 *  const formats = winston.format.combine(
 *    winston.format(getWinstonFormat({context}))(),
 *    winston.format.json()
 *  );
 *
 * @param {IGetWinstonFormatParameters} opts
 */
export function getWinstonFormat({
  context,
}: IGetWinstonFormatParameters): IExtendedWinstonTransformFunction {
  const {currentCtx} = context;
  return (info) => ({
    ...info,
    parentSpanId: currentCtx ? currentCtx.parentId : null,
    sampled: currentCtx ? currentCtx.sampled : null,
    spanId: currentCtx ? currentCtx.spanId : null,
    traceId: currentCtx ? currentCtx.traceId : null,
  });
}

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

export type IExtendedWinstonTransformFunction = (info) => object;

export interface IExtendedExplicitContext extends ExplicitContext {
  currentCtx: IContextShape;
}

export interface IGetWinstonFormatParameters {
  context: IExtendedExplicitContext;
}

export interface IMorganTokenizer {
  fn: (req: IExpressRequestWithContext, res?: express.Response) => any;
  id: string;
}

export interface ITracer {
  getContext: () => ExplicitContext;
  getExpressMiddleware: () => IExpressHandlerWithContext[];
  getTracer: () => Tracer;
}
