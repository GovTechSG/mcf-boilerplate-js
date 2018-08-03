import express from 'express';
import cookieParser from 'cookie-parser';
import * as tracer from '@mcf/tracer';
import {expressMiddleware} from 'zipkin-instrumentation-express';
import serializer from './serializer';
import security from './security';
import compression from './compression';
import observability from './observability';
import logging from './logging';

module.exports = createServer;

/**
 * Returns an Express compatible server
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
 * @param {String} metricsCollection.pushgatewayJobName
 * @param {String} metricsCollection.pushgatewayTimeout
 * @param {String} metricsCollection.pushgatewayUrl
 * @param {Object} [serverLogging={}]
 * @param {Array<Function>} serverLogging.additionalTokenizers
 * @param {String} serverLogging.logLevel
 * @param {String} serverLogging.logStream
 * @param {String} serverLogging.hostnameType
 * @param {Object} tracing
 * @param {zipkin.ExplicitContext} tracing.context
 * @param {zipkin.Tracer} tracing.tracer
 *
 * @return {express.Application}
 */
export function createServer({
  enableCORS = true,
  enableCompression = true,
  enableContentSecurityPolicy = true,
  enableCookieParser = true,
  enableHttpHeadersSecurity = true,
  enableMetricsCollection = true,
  enableSerializer = true,
  enableServerLogging = true,
  enableTracing = true,
  contentSecurityPolicy = {},
  compressionOptions = {},
  crossOriginResourceSharing = {},
  metricsCollection = {},
  serverLogging = {},
  tracing = {},
} = {}) {
  const server = express();
  if (enableTracing) {
    if (!tracing.tracer || !tracing.context) {
      console.warn(
        ':enableTracing was set to true but no :tracer or :context was ' +
          'passed into the :tracing option. Tracing is disabled.'
      );
    } else {
      const tracerInstance = tracing.tracer;
      const tracerContext = tracing.context;
      server.use(expressMiddleware({tracer: tracerInstance}));
      server.use(tracer.getContextProviderMiddleware({context: tracerContext}));
      serverLogging.additionalTokenizers =
        serverLogging.additionalTokenizers || [];
      serverLogging.additionalTokenizers =
        serverLogging.additionalTokenizers.concat(tracer.getMorganTokenizers());
    }
  }
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
    const metricsEndpoint = metricsCollection.metricsEndpoint
      ? metricsCollection.metricsEndpoint
      : observability.metrics.constant.defaultMetricsEndpoint;
    server.use(observability.metrics(metricsCollection));
    server.use(
      metricsEndpoint,
      observability.metrics.getMetricsEndpointHandler()
    );
  }
  if (enableServerLogging) {
    server.use(logging.server(serverLogging));
  }

  return server;
}
