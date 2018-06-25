'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = metrics;

var _expressPromBundle = require('express-prom-bundle');

var _expressPromBundle2 = _interopRequireDefault(_expressPromBundle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_LIVENESS_CHECK_ENDPOINT = '/healthz';
var DEFAULT_READINESS_CHECK_ENDPOINT = '/readyz';
var DEFAULT_METRICS_ENDPOINT = '/metrics';
var DEFAULT_PROBE_INTERVAL_MS = 3000; // 5 seconds
var DEFAULT_PUSHGATEWAY_URL = null;
var DEFAULT_PUSHGATEWAY_JOB_NAME = process.env.USER || 'unknown';
var DEFAULT_PUSHGATEWAY_TIMEOUT = 10000; // 10 seconds
var DEFAULT_METRICS_OPTIONS = {
  autoregister: false,
  includeMethod: true,
  includePath: true
};

module.exports = metrics;

/**
 * Returns an Express compatible metrics collection middleware
 *
 * @param {Object} options
 * @param {String} [options.livenessCheckEndpoint="/healthz"]
 * @param {String} [options.metricsEndpoint="/metrics"]
 * @param {Number} [options.probeIntervalInMilliseconds=5000]
 * @param {String} [options.readinessCheckEndpoint="/readyz"]
 * @param {String} [options.pushgatewayJobName="%USER%"]
 * @param {String} [options.pushgatewayUrl=null]
 * @param {String} [options.pushgatewayTimeout=10000]
 * @return {Function}
 */
function metrics() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$livenessCheckEnd = _ref.livenessCheckEndpoint,
      livenessCheckEndpoint = _ref$livenessCheckEnd === undefined ? DEFAULT_LIVENESS_CHECK_ENDPOINT : _ref$livenessCheckEnd,
      _ref$metricsEndpoint = _ref.metricsEndpoint,
      metricsEndpoint = _ref$metricsEndpoint === undefined ? DEFAULT_METRICS_ENDPOINT : _ref$metricsEndpoint,
      _ref$probeIntervalInM = _ref.probeIntervalInMilliseconds,
      probeIntervalInMilliseconds = _ref$probeIntervalInM === undefined ? DEFAULT_PROBE_INTERVAL_MS : _ref$probeIntervalInM,
      _ref$readinessCheckEn = _ref.readinessCheckEndpoint,
      readinessCheckEndpoint = _ref$readinessCheckEn === undefined ? DEFAULT_READINESS_CHECK_ENDPOINT : _ref$readinessCheckEn,
      _ref$pushgatewayJobNa = _ref.pushgatewayJobName,
      pushgatewayJobName = _ref$pushgatewayJobNa === undefined ? DEFAULT_PUSHGATEWAY_JOB_NAME : _ref$pushgatewayJobNa,
      _ref$pushgatewayTimeo = _ref.pushgatewayTimeout,
      pushgatewayTimeout = _ref$pushgatewayTimeo === undefined ? DEFAULT_PUSHGATEWAY_TIMEOUT : _ref$pushgatewayTimeo,
      _ref$pushgatewayUrl = _ref.pushgatewayUrl,
      pushgatewayUrl = _ref$pushgatewayUrl === undefined ? DEFAULT_PUSHGATEWAY_URL : _ref$pushgatewayUrl;

  if (metrics.instance === null) {
    metrics.instance = createPrometheusBundleInstance({
      livenessCheckEndpoint: livenessCheckEndpoint,
      readinessCheckEndpoint: readinessCheckEndpoint,
      metricsEndpoint: metricsEndpoint,
      probeIntervalInMilliseconds: probeIntervalInMilliseconds
    });
    createPushgatewayHandler({
      pushgatewayJobName: pushgatewayJobName,
      pushgatewayUrl: pushgatewayUrl,
      probeIntervalInMilliseconds: probeIntervalInMilliseconds,
      promClient: metrics.instance.promClient
    });
  }
  return metrics.instance;
}

metrics.constant = {
  defaultLivenessCheckEndpoint: DEFAULT_LIVENESS_CHECK_ENDPOINT,
  defaultMetricsEndpoint: DEFAULT_METRICS_ENDPOINT,
  defaultProbeIntervalInMilliseconds: DEFAULT_PROBE_INTERVAL_MS,
  defaultReadinessCheckEndpoint: DEFAULT_READINESS_CHECK_ENDPOINT
};
metrics.instance = null;
metrics.options = DEFAULT_METRICS_OPTIONS;

metrics.clearPushgatewayTimeout = function () {
  return clearTimeout(createPushgatewayHandler.timeout);
};
metrics.getMetricsEndpointHandler = function () {
  return metrics.instance.metricsMiddleware;
};
metrics.reset = function () {
  return metrics.instance = null;
};

/**
 * Returns an instance of the `express-prom-bundle` package.
 *
 * @param {Object} options
 * @param {String} options.livenessCheckEndpoint
 * @param {String} options.metricsEndpoint
 * @param {Number} options.probeIntervalInMilliseconds
 * @param {String} options.readinessCheckEndpoint
 *
 * @return {Function}
 */
function createPrometheusBundleInstance() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      livenessCheckEndpoint = _ref2.livenessCheckEndpoint,
      metricsEndpoint = _ref2.metricsEndpoint,
      probeIntervalInMilliseconds = _ref2.probeIntervalInMilliseconds,
      readinessCheckEndpoint = _ref2.readinessCheckEndpoint;

  _expressPromBundle2.default.promClient.register.clear();
  var blacklist = [livenessCheckEndpoint, readinessCheckEndpoint, metricsEndpoint];
  var promClient = {
    collectDefaultMetrics: {
      timeout: probeIntervalInMilliseconds
    }
  };
  return (0, _expressPromBundle2.default)(Object.assign({}, metrics.options, { blacklist: blacklist, promClient: promClient }));
};

/**
 * Creates a pushgateway configuration that pushes the metrics to
 * :pushgatewayUrl every :probeIntervalInMilliseconds milliseconds.
 *
 * @param {Object} options
 * @param {String} options.pushgatewayJobName
 * @param {String} options.pushgatewayTimeout
 * @param {String} options.pushgatewayUrl
 * @param {Number} options.probeIntervalInMilliseconds
 * @param {Object} options.promClient
 */
function createPushgatewayHandler() {
  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      pushgatewayJobName = _ref3.pushgatewayJobName,
      pushgatewayTimeout = _ref3.pushgatewayTimeout,
      pushgatewayUrl = _ref3.pushgatewayUrl,
      probeIntervalInMilliseconds = _ref3.probeIntervalInMilliseconds,
      promClient = _ref3.promClient;

  if (pushgatewayUrl !== null && typeof pushgatewayUrl === 'string') {
    var Pushgateway = promClient.Pushgateway;

    var pushgateway = new Pushgateway(pushgatewayUrl, { timeout: pushgatewayTimeout });
    (function metricsPush() {
      pushgateway.push({
        jobName: pushgatewayJobName
      }, function (err, resp, body) {
        if (err) {
          console.error('metrics push to ' + pushgatewayUrl + ' not ok. error follows:');
          console.error(err);
        }
      });
      clearTimeout(createPushgatewayHandler.timeout);
      createPushgatewayHandler.timeout = setTimeout(metricsPush, probeIntervalInMilliseconds);
    })();
  }
};