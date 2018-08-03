const Case = require('case');
const os = require('os');
const morgan = require('morgan');

const DEFAULT_LOG_LEVEL = 'access';
const DEFAULT_LOG_STREAM = null;
const DEFAULT_HOSTNAME_TYPE = 'os';

module.exports = serverLoggingMiddleware;

/**
 * @param {Object} options
 * @param {String} options.logLevel
 * @param {String} options.logStream
 * @param {String} options.hostnameType
 * @param {Object} options.tracer
 * @return {Function}
 */
export default function serverLoggingMiddleware({
  additionalTokenizers = [],
  logLevel = DEFAULT_LOG_LEVEL,
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
          logLevel,
        }),
        {stream: logStream}
      )
    : serverLoggingMiddleware.morgan(
        serverLoggingMiddleware.getFormatter({
          additionalTokenizers,
          logLevel,
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
 * @param {Object} options.tracer
 * @param {Object} options.tracer.id
 * @param {String} options.tracer.id.traceId
 * @param {String} options.tracer.id.spanId
 * @param {String} options.tracer.id.parentId
 * @param {Symbol} options.tracer.id.sampled
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
 * @param {String} options.logLevel
 *
 * @return {Function}
 */
serverLoggingMiddleware.getFormatter = ({
  additionalTokenizers = [],
  logLevel = DEFAULT_LOG_LEVEL,
} = {}) => (tokens, req, res) => {
  let message = {
    level: logLevel,
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
