const os = require('os');
const morgan = require('morgan');

const DEFAULT_LOG_LEVEL = 'access';
const DEFAULT_LOG_STREAM = null;
const DEFAULT_HOSTNAME_TYPE = 'os';
const DEFAULT_TRACER = {};

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
  logLevel = DEFAULT_LOG_LEVEL,
  logStream = DEFAULT_LOG_STREAM,
  hostnameType = DEFAULT_HOSTNAME_TYPE,
  tracer = DEFAULT_TRACER,
} = {}) {
  serverLoggingMiddleware.provisionCustomTokens(
    serverLoggingMiddleware.morgan,
    {
      hostnameType,
      tracer,
    }
  );
  return (logStream) ?
    serverLoggingMiddleware.morgan(
      serverLoggingMiddleware.getFormatter({logLevel}),
      {stream: logStream}
    ) :
    serverLoggingMiddleware.morgan(
      serverLoggingMiddleware.getFormatter({logLevel})
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
 * @param {String} options.hostnameType
 * @param {Object} options.tracer
 * @param {Object} options.tracer.id
 * @param {String} options.tracer.id.traceId
 * @param {String} options.tracer.id.spanId
 * @param {String} options.tracer.id.parentId
 * @param {Symbol} options.tracer.id.sampled
 */
serverLoggingMiddleware.provisionCustomTokens = (morganLogger, {
  hostnameType = DEFAULT_HOSTNAME_TYPE,
  tracer = DEFAULT_TRACER,
} = {}) => {
  // for knowing which instance the log is coming from, essential
  // when scaling horizontally in a container-based architecture to
  // know which container the log is coming from
  morganLogger.token('hostname', () =>
    (hostnameType === 'os')?
      os.hostname() : process.env[hostnameType]
  );

  // for logging of open tracing headers
  morganLogger.token('trace-id', (req) => req.context.traceId);
  morganLogger.token('span-id', (req) => req.context.spanId);
  morganLogger.token('parent-span-id', (req) => req.context.parentId);
  morganLogger.token('sampled', (req) => req.context.sampled);
};

/**
 * Returns a function formatter for Morgan.
 *
 * .provisionCustomTokens() should have been run prior to this
 *
 * @param {Object} options
 * @param {String} options.logLevel
 *
 * @return {Function}
 */
serverLoggingMiddleware.getFormatter = ({
  logLevel = DEFAULT_LOG_LEVEL,
} = {}) => ((tokens, req, res) =>
  JSON.stringify({
    level: logLevel,
    method: tokens['method'](req, res),
    url: tokens['url'](req, res),
    status: tokens['status'](req, res),
    contentLength: tokens['res'](req, res, 'content-length'),
    responseTimeMs: tokens['response-time'](req, res),
    traceId: tokens['trace-id'](req, res),
    spanId: tokens['span-id'](req, res),
    parentSpanId: tokens['parent-span-id'](req, res),
    sampled: tokens['sampled'](req, res),
    httpVersion: tokens['http-version'](req, res),
    referrer: tokens['referrer'](req, res),
    remoteHostname: req['hostname'],
    remoteAddress: tokens['remote-addr'](req, res),
    serverHostname: tokens['hostname'](req, res),
    time: tokens['date'](req, res, 'iso'),
    userAgent: tokens['user-agent'](req, res),
  }));
