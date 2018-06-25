import prometheusBundle from 'express-prom-bundle';

const DEFAULT_LIVENESS_CHECK_ENDPOINT = '/healthz';
const DEFAULT_READINESS_CHECK_ENDPOINT = '/readyz';
const DEFAULT_METRICS_ENDPOINT = '/metrics';
const DEFAULT_PROBE_INTERVAL_MS = 3000; // 5 seconds
const DEFAULT_METRICS_OPTIONS = {
  autoregister: false,
  includeMethod: true,
  includePath: true,
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
export default function metrics({
  livenessCheckEndpoint = DEFAULT_LIVENESS_CHECK_ENDPOINT,
  metricsEndpoint = DEFAULT_METRICS_ENDPOINT,
  probeIntervalInMilliseconds = DEFAULT_PROBE_INTERVAL_MS,
  readinessCheckEndpoint = DEFAULT_READINESS_CHECK_ENDPOINT,
} = {}) {
  if (metrics.instance === null) {
    prometheusBundle.promClient.register.clear();
    const blacklist = [
      livenessCheckEndpoint,
      readinessCheckEndpoint,
      metricsEndpoint,
    ];
    const promClient = {
      collectDefaultMetrics: {
        timeout: probeIntervalInMilliseconds,
      },
    };
    metrics.instance = prometheusBundle(Object.assign(
      {}, metrics.options, {blacklist, promClient}
    ));
  }
  return metrics.instance;
}

metrics.constant = {
  defaultLivenessCheckEndpoint: DEFAULT_LIVENESS_CHECK_ENDPOINT,
  defaultMetricsEndpoint: DEFAULT_METRICS_ENDPOINT,
  defaultProbeIntervalInMilliseconds: DEFAULT_PROBE_INTERVAL_MS,
  defaultReadinessCheckEndpoint: DEFAULT_READINESS_CHECK_ENDPOINT,
};
metrics.instance = null;
metrics.options = DEFAULT_METRICS_OPTIONS;

metrics.getMetricsEndpointHandler = () => metrics.instance.metricsMiddleware;
metrics.reset = () => metrics.instance = null;
