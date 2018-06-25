import express from 'express';
import cookieParser from 'cookie-parser';
import serializer from './serializer';
import security from './security';
import compression from './compression';
import observability from './observability';

const DEFAULT_METRICS_ENDPOINT = '/metrics';

module.exports = createServer;

/**
 * Returns a server that is:
 *  - compatible with Express.js interfaces
 *  - able to parse cookies
 *
 * @param {Object} [options={}]
 * @param {Boolean} [options.enableCORS=true]
 * @param {Boolean} [options.enableCompression=true]
 * @param {Boolean} [options.enableContentSecurityPolicy=true]
 * @param {Boolean} [options.enableCookieParser=true]
 * @param {Boolean} [options.enableHttpHeadersSecurity=true]
 * @param {Boolean} [options.enableMetricsCollection=true]
 * @param {Boolean} [options.enableSerializer=true]
 * @param {Object} [contentSecurityPolicy={}]
 * @param {Array<String>} contentSecurityPolicy.childSrc
 * @param {Array<String>} contentSecurityPolicy.connectSrc
 * @param {Array<String>} contentSecurityPolicy.defaultSrc
 * @param {Array<String>} contentSecurityPolicy.fontSrc
 * @param {Array<String>} contentSecurityPolicy.imgSrc
 * @param {Array<String>} contentSecurityPolicy.scriptSrc
 * @param {Array<String>} contentSecurityPolicy.styleSrc
 * @param {String} contentSecurityPolicy.reportUri
 * @param {Object} [compressionOptions={}]
 * @param {Number} compressionOptions.chunkSize
 * @param {Number} compressionOptions.level
 * @param {Number} compressionOptions.threshold
 * @param {Object} [crossOriginResourceSharing={}]
 * @param {Array<String>} crossOriginResourceSharing.allowedHeaders
 * @param {Array<String>} crossOriginResourceSharing.allowedMethods
 * @param {Array<String>} crossOriginResourceSharing.allowedOrigins
 * @param {Boolean} crossOriginResourceSharing.credentials
 * @param {Boolean} crossOriginResourceSharing.preflightContinue
 * @param {Object} [metricsCollection={}]
 * @param {String} metricsCollection.livenessCheckEndpoint
 * @param {String} metricsCollection.metricsEndpoint
 * @param {Number} metricsCollection.probeIntervalInMilliseconds=
 * @param {String} metricsCollection.readinessCheckEndpoint
 *
 * @return {express.Application}
 */
export default function createServer({
  enableCORS = true,
  enableCompression = true,
  enableContentSecurityPolicy = true,
  enableCookieParser = true,
  enableHttpHeadersSecurity = true,
  enableMetricsCollection = true,
  enableSerializer = true,
  contentSecurityPolicy = {},
  compressionOptions = {},
  crossOriginResourceSharing = {},
  metricsCollection = {},
} = {}) {
  const server = express();
  if (enableCookieParser) {
    server.use(cookieParser());
  }
  if (enableSerializer) {
    server.use(serializer());
  }
  if (enableHttpHeadersSecurity) {
    server.use(security.httpHeaders());
  }
  if (enableContentSecurityPolicy) {
    server.use(security.contentSecurityPolicy(contentSecurityPolicy));
  }
  if (enableCompression) {
    server.use(compression(compressionOptions));
  }
  if (enableCORS) {
    server.use(security.crossOriginResourceSharing(crossOriginResourceSharing));
  }
  if (enableMetricsCollection) {
    const metricsEndpoint =
      metricsCollection.metricsEndpoint ?
        metricsCollection.metricsEndpoint
        : observability.metrics.constant.defaultMetricsEndpoint;
    server.use(observability.metrics(metricsCollection));
    server.use(
      metricsEndpoint,
      observability.metrics.getMetricsEndpointHandler()
    );
  }

  return server;
}
