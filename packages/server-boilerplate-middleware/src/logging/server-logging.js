const os = require('os');
const morgan = require('morgan');

const DEFAULT_LOG_LEVEL = 'access';
const DEFAULT_HOSTNAME_TYPE = 'os';

module.exports = serverLoggingMiddleware;

/**
 * @param {Object} options
 * @param {String} options.logLevel
 * @param {String} options.hostnameType
 * @return {Function}
 */
export default function serverLoggingMiddleware({
  logLevel = DEFAULT_LOG_LEVEL,
  hostnameType = DEFAULT_HOSTNAME_TYPE,
} = {}) {
  serverLoggingMiddleware.provisionCustomTokens(
    serverLoggingMiddleware.morgan, {hostnameType}
  );
  return serverLoggingMiddleware.morgan(
    serverLoggingMiddleware.getFormatter({logLevel})
  );
}

serverLoggingMiddleware.morgan = morgan;

/**
 * Provisions the custom tokens we use.
 *
 * @param {Object} morganLogger
 */
serverLoggingMiddleware.provisionCustomTokens = (morganLogger, {
  hostnameType = DEFAULT_HOSTNAME_TYPE,
} = {}) => {
  // for knowing which instance the log is coming from, essential
  // when scaling horizontally in a container-based architecture to
  // know which container the log is coming from
  morganLogger.token('hostname', () => {
    if (hostnameType === 'os') {
      return os.hostname();
    } else {
      return process.env[hostnameType];
    }
  });
  // for logging of open tracing headers
  morganLogger.token('opentracing-trace-id', (req) =>
    req.headers['X-B3-TraceId']);
  morganLogger.token('opentracing-span-id', (req) =>
    req.headers['X-B3-SpanId']);
  morganLogger.token('opentracing-parent-span-id', (req) =>
    req.headers['X-B3-ParentSpanId']);
  morganLogger.token('opentracing-sampled', (req) =>
    req.headers['X-B3-Sampled']);
};

/**
 * Returns a function formatter for Morgan.
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
    otTraceId: tokens['opentracing-trace-id'](req, res),
    otSpanId: tokens['opentracing-span-id'](req, res),
    otParentId: tokens['opentracing-parent-span-id'](req, res),
    otSampled: tokens['opentracing-sampled'](req, res),
    httpVersion: tokens['http-version'](req, res),
    referrer: tokens['referrer'](req, res),
    remoteHostname: req['hostname'],
    remoteAddress: tokens['remote-addr'](req, res),
    serverHostname: tokens['hostname'](req, res),
    time: tokens['date'](req, res, 'iso'),
    userAgent: tokens['user-agent'](req, res),
  }));
