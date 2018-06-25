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
      readinessCheckEndpoint = _ref$readinessCheckEn === undefined ? DEFAULT_READINESS_CHECK_ENDPOINT : _ref$readinessCheckEn;

  if (metrics.instance === null) {
    _expressPromBundle2.default.promClient.register.clear();
    var blacklist = [livenessCheckEndpoint, readinessCheckEndpoint, metricsEndpoint];
    var promClient = {
      collectDefaultMetrics: {
        timeout: probeIntervalInMilliseconds
      }
    };
    metrics.instance = (0, _expressPromBundle2.default)(Object.assign({}, metrics.options, { blacklist: blacklist, promClient: promClient }));
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

metrics.getMetricsEndpointHandler = function () {
  return metrics.instance.metricsMiddleware;
};
metrics.reset = function () {
  return metrics.instance = null;
};