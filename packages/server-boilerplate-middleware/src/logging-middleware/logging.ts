import Case from 'case';
import os from 'os';
import morgan, {Morgan, StreamOptions} from 'morgan';
import {Request, RequestHandler, Response} from 'express';

const DEFAULT_LOG_STREAM = undefined;
const DEFAULT_HOSTNAME_TYPE = 'os';

export interface ILoggingMiddlewareOptions {
  additionalTokenizers?: IMorganTokenizer[];
  logStream?: StreamOptions;
  hostnameType?: string;
}

interface IMorganTokenizer {
  fn: (req: Request, res?: Response) => any;
  id: string;
}

export const loggingMiddleware = ({
  additionalTokenizers = [],
  logStream = DEFAULT_LOG_STREAM,
  hostnameType = DEFAULT_HOSTNAME_TYPE,
}: ILoggingMiddlewareOptions = {}): RequestHandler => {
  provisionCustomTokens(morgan, {
    additionalTokenizers,
    hostnameType,
  });
  return logStream
    ? morgan(
        getFormatter({
          additionalTokenizers,
        }),
        {stream: logStream},
      )
    : morgan(
        getFormatter({
          additionalTokenizers,
        }),
      );
};

/**
 * Provisions the custom tokens we use.
 *
 * The provided :options.tracer should be a tracer created with the
 * CLS Context.
 *
 * @see https://github.com/openzipkin/zipkin-js/tree/master/packages/zipkin-context-cls
 *
 */
const provisionCustomTokens = (
  morganLogger: Morgan,
  {
    additionalTokenizers = [],
    hostnameType = DEFAULT_HOSTNAME_TYPE,
  }: Pick<ILoggingMiddlewareOptions, 'hostnameType' | 'additionalTokenizers'> = {},
) => {
  // for knowing which instance the log is coming from, essential
  // when scaling horizontally in a container-based architecture to
  // know which container the log is coming from
  morganLogger.token('hostname', () => (hostnameType === 'os' ? os.hostname() : process.env[hostnameType] || ''));

  additionalTokenizers.forEach(({id, fn}) => {
    morganLogger.token(id, fn);
  });
};

/**
 * Returns a function formatter for Morgan.
 *
 * .provisionCustomTokens() should have been run prior to this
 */
const getFormatter = ({additionalTokenizers = []}: Pick<ILoggingMiddlewareOptions, 'additionalTokenizers'> = {}) => (
  tokens,
  req,
  res,
) => {
  const message = {
    contentLength: tokens.res(req, res, 'content-length'),
    httpVersion: tokens['http-version'](req, res),
    method: tokens.method(req, res),
    referrer: tokens.referrer(req, res),
    remoteAddress: tokens['remote-addr'](req, res),
    remoteHostname: req.hostname,
    responseTimeMs: tokens['response-time'](req, res),
    serverHostname: tokens.hostname(req, res),
    status: tokens.status(req, res),
    time: tokens.date(req, res, 'iso'),
    url: tokens.url(req, res),
    userAgent: tokens['user-agent'](req, res),
  };
  additionalTokenizers.forEach(({id}) => {
    message[Case.camel(id)] = tokens[id](req, res);
  });
  return JSON.stringify(message);
};
