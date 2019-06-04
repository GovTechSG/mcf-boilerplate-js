import prometheusBundle from 'express-prom-bundle';
import {logger} from '../logger';
import {RequestHandler} from 'express';

const DEFAULT_LIVENESS_CHECK_ENDPOINT = '/healthz';
const DEFAULT_READINESS_CHECK_ENDPOINT = '/readyz';
export const DEFAULT_METRICS_ENDPOINT = '/metrics';
const DEFAULT_PROBE_INTERVAL_MS = 3000; // 5 seconds
const DEFAULT_PUSHGATEWAY_JOB_NAME = process.env.USER || 'unknown';
const DEFAULT_PUSHGATEWAY_TIMEOUT = 10000; // 10 seconds
export const DEFAULT_METRICS_OPTIONS = {
  autoregister: false,
  includeMethod: true,
  includePath: true,
};

export interface IMetricsMiddlewareOptions {
  livenessCheckEndpoint: string;
  metricsEndpoint: string;
  probeIntervalInMilliseconds: number;
  readinessCheckEndpoint: string;
  pushgatewayJobName: string;
  pushgatewayTimeout: number;
  pushgatewayUrl: string;
}

interface IMetricsMiddleware extends RequestHandler {
  metricsMiddleware: RequestHandler;
  promClient: any;
}

/**
 * Returns an Express compatible metrics collection middleware
 */
export const metricsMiddleware = ({
  livenessCheckEndpoint = DEFAULT_LIVENESS_CHECK_ENDPOINT,
  metricsEndpoint = DEFAULT_METRICS_ENDPOINT,
  probeIntervalInMilliseconds = DEFAULT_PROBE_INTERVAL_MS,
  readinessCheckEndpoint = DEFAULT_READINESS_CHECK_ENDPOINT,
  pushgatewayJobName = DEFAULT_PUSHGATEWAY_JOB_NAME,
  pushgatewayTimeout = DEFAULT_PUSHGATEWAY_TIMEOUT,
  pushgatewayUrl = '',
}: Partial<IMetricsMiddlewareOptions> = {}): IMetricsMiddleware => {
  const promClient = createPrometheusBundleInstance({
    livenessCheckEndpoint,
    metricsEndpoint,
    probeIntervalInMilliseconds,
    readinessCheckEndpoint,
  });
  createPushgatewayHandler({
    probeIntervalInMilliseconds,
    promClient: promClient.promClient,
    pushgatewayJobName,
    pushgatewayTimeout,
    pushgatewayUrl,
  });
  return promClient;
};

/**
 * Returns an instance of the `express-prom-bundle` package.
 */
const createPrometheusBundleInstance = ({
  livenessCheckEndpoint,
  metricsEndpoint,
  probeIntervalInMilliseconds,
  readinessCheckEndpoint,
}: Pick<
  IMetricsMiddlewareOptions,
  'livenessCheckEndpoint' | 'metricsEndpoint' | 'probeIntervalInMilliseconds' | 'readinessCheckEndpoint'
>) => {
  prometheusBundle.promClient.register.clear();
  const blacklist = [livenessCheckEndpoint, readinessCheckEndpoint, metricsEndpoint];
  const promClient = {
    collectDefaultMetrics: {
      timeout: probeIntervalInMilliseconds,
    },
  };
  return prometheusBundle({...DEFAULT_METRICS_OPTIONS, blacklist, promClient});
};

let createPushgatewayHandlerTimeout: any;
/**
 * Creates a pushgateway configuration that pushes the metrics to
 * :pushgatewayUrl every :probeIntervalInMilliseconds milliseconds.
 */
const createPushgatewayHandler = ({
  pushgatewayJobName,
  pushgatewayTimeout,
  pushgatewayUrl,
  probeIntervalInMilliseconds,
  promClient,
}: Pick<
  IMetricsMiddlewareOptions,
  'pushgatewayJobName' | 'pushgatewayTimeout' | 'pushgatewayUrl' | 'probeIntervalInMilliseconds'
> & {promClient: any}) => {
  if (pushgatewayUrl) {
    const {Pushgateway} = promClient;
    const pushgateway = new Pushgateway(pushgatewayUrl, {timeout: pushgatewayTimeout});
    (function metricsPush() {
      pushgateway.push(
        {
          jobName: pushgatewayJobName,
        },
        (err) => {
          if (err) {
            logger.error(`metrics push to ${pushgatewayUrl} not ok. error follows:`);
            logger.error(err);
          }
        },
      );
      stopPushgateway();
      createPushgatewayHandlerTimeout = setTimeout(metricsPush, probeIntervalInMilliseconds);
    })();
  }
};

export const stopPushgateway = () => clearTimeout(createPushgatewayHandlerTimeout);
