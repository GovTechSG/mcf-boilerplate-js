import Case from 'case';
import os from 'os';
import morgan from 'morgan';

const DEFAULT_LOG_STREAM = null;
const DEFAULT_HOSTNAME_TYPE = 'os';

/**
 * @param {Object} options
 * @param {String} options.logStream
 * @param {String} options.hostnameType
 * @return {Function}
 */
export default function serverLoggingMiddleware({
  additionalTokenizers = [],
  logStream = DEFAULT_LOG_STREAM,
  hostnameType = DEFAULT_HOSTNAME_TYPE,
} = {}) {
  serverLoggingMiddleware.provisionCustomTokens(
    serverLoggingMiddleware.morgan,
    {
      hostnameType,
      additionalTokenizers,
    }
  );
  return logStream
    ? serverLoggingMiddleware.morgan(
        serverLoggingMiddleware.getFormatter({
          additionalTokenizers,
        }),
        {stream: logStream}
      )
    : serverLoggingMiddleware.morgan(
        serverLoggingMiddleware.getFormatter({
          additionalTokenizers,
        })
      );
}

serverLoggingMiddleware.morgan = morgan;

/**
 * Provisions the custom tokens we use.
 *
 * The provided :options.tracer should be a tracer created with the
 * CLS Context.
 *
 * @see https://github.com/openzipkin/zipkin-js/tree/master/packages/zipkin-context-cls
 *
 * @param {Object} morganLogger
 * @param {Object} options
 * @param {Array<Object>} options.additionalTokenizers
 * @param {String} options.hostnameType
 */
serverLoggingMiddleware.provisionCustomTokens = (
  morganLogger,
  {
    additionalTokenizers = [],
    hostnameType = DEFAULT_HOSTNAME_TYPE,
  } = {}
) => {
  // for knowing which instance the log is coming from, essential
  // when scaling horizontally in a container-based architecture to
  // know which container the log is coming from
  morganLogger.token(
    'hostname',
    () => (hostnameType === 'os' ? os.hostname() : process.env[hostnameType])
  );

  additionalTokenizers.forEach(({id, fn}) => {
    morganLogger.token(id, fn);
  });
};

/**
 * Returns a function formatter for Morgan.
 *
 * .provisionCustomTokens() should have been run prior to this
 *
 * @param {Object} options
 * @param {Array<Object>} options.additionalTokenizers
 *
 * @return {Function}
 */
serverLoggingMiddleware.getFormatter = ({
  additionalTokenizers = [],
} = {}) => (tokens, req, res) => {
  let message = {
    method: tokens['method'](req, res),
    url: tokens['url'](req, res),
    status: tokens['status'](req, res),
    contentLength: tokens['res'](req, res, 'content-length'),
    responseTimeMs: tokens['response-time'](req, res),
    httpVersion: tokens['http-version'](req, res),
    referrer: tokens['referrer'](req, res),
    remoteHostname: req['hostname'],
    remoteAddress: tokens['remote-addr'](req, res),
    serverHostname: tokens['hostname'](req, res),
    time: tokens['date'](req, res, 'iso'),
    userAgent: tokens['user-agent'](req, res),
  };
  additionalTokenizers.forEach(({id}) => {
    message[Case.camel(id)] = tokens[id](req, res);
  });
  return JSON.stringify(message);
};
