import prometheusBundle from 'express-prom-bundle';

const DEFAULT_LIVENESS_CHECK_ENDPOINT = '/healthz';
const DEFAULT_READINESS_CHECK_ENDPOINT = '/readyz';
const DEFAULT_METRICS_ENDPOINT = '/metrics';
const DEFAULT_PROBE_INTERVAL_MS = 3000; // 5 seconds
const DEFAULT_PUSHGATEWAY_URL = null;
const DEFAULT_PUSHGATEWAY_JOB_NAME = process.env.USER || 'unknown';
const DEFAULT_PUSHGATEWAY_TIMEOUT = 10000; // 10 seconds
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
 * @param {String} [options.pushgatewayJobName="%USER%"]
 * @param {String} [options.pushgatewayUrl=null]
 * @param {String} [options.pushgatewayTimeout=10000]
 * @return {Function}
 */
export default function metrics({
  livenessCheckEndpoint = DEFAULT_LIVENESS_CHECK_ENDPOINT,
  metricsEndpoint = DEFAULT_METRICS_ENDPOINT,
  probeIntervalInMilliseconds = DEFAULT_PROBE_INTERVAL_MS,
  readinessCheckEndpoint = DEFAULT_READINESS_CHECK_ENDPOINT,
  pushgatewayJobName = DEFAULT_PUSHGATEWAY_JOB_NAME,
  pushgatewayTimeout = DEFAULT_PUSHGATEWAY_TIMEOUT,
  pushgatewayUrl = DEFAULT_PUSHGATEWAY_URL,
} = {}) {
  if (metrics.instance === null) {
    metrics.instance = createPrometheusBundleInstance({
      livenessCheckEndpoint,
      readinessCheckEndpoint,
      metricsEndpoint,
      probeIntervalInMilliseconds,
    });
    createPushgatewayHandler({
      pushgatewayJobName,
      pushgatewayUrl,
      probeIntervalInMilliseconds,
      promClient: metrics.instance.promClient,
    });
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

metrics.clearPushgatewayTimeout =
  () => clearTimeout(createPushgatewayHandler.timeout);
metrics.getMetricsEndpointHandler = () => metrics.instance.metricsMiddleware;
metrics.reset = () => metrics.instance = null;

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
function createPrometheusBundleInstance({
  livenessCheckEndpoint,
  metricsEndpoint,
  probeIntervalInMilliseconds,
  readinessCheckEndpoint,
} = {}) {
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
  return prometheusBundle(Object.assign(
    {}, metrics.options, {blacklist, promClient}
  ));
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
function createPushgatewayHandler({
  pushgatewayJobName,
  pushgatewayTimeout,
  pushgatewayUrl,
  probeIntervalInMilliseconds,
  promClient,
} = {}) {
  if (pushgatewayUrl !== null && typeof pushgatewayUrl === 'string') {
    const {Pushgateway} = promClient;
    const pushgateway = new Pushgateway(
      pushgatewayUrl, {timeout: pushgatewayTimeout}
    );
    (function metricsPush() {
      pushgateway.push({
        jobName: pushgatewayJobName,
      }, (err, resp, body) => {
        if (err) {
          console.error(
            `metrics push to ${pushgatewayUrl} not ok. error follows:`
          );
          console.error(err);
        }
      });
      clearTimeout(createPushgatewayHandler.timeout);
      createPushgatewayHandler.timeout =
        setTimeout(metricsPush, probeIntervalInMilliseconds);
    })();
  }
};
