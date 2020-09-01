import cookieParser from 'cookie-parser';
import {
  corsMiddleware,
  cspMiddleware,
  httpHeadersMiddleware,
  ICorsMiddlewareOptions,
  ICspMiddlewareOptions,
} from './security';
import {serializer} from './serializer';
import express from 'express';
import {compressionMiddleware, ICompressionMiddlewareOptions} from './compression-middleware';
import {DEFAULT_METRICS_ENDPOINT, IMetricsMiddlewareOptions, metricsMiddleware} from './metrics-middleware';
import {ILoggingMiddlewareOptions, loggingMiddleware} from './logging-middleware';
import {buildLogger} from './logger';
import {createMorganStream, IApplicationLogger} from '@mcf/logger';

interface IMcfMiddlewareOptions {
  enableCORS?: boolean;
  enableCompression?: boolean;
  enableCSP?: boolean;
  enableCookieParser?: boolean;
  enableHttpHeadersSecurity?: boolean;
  enableMetrics?: boolean;
  enableSerializer?: boolean;
  enableServerLogging?: boolean;
  cspOptions?: ICspMiddlewareOptions;
  compressionOptions?: ICompressionMiddlewareOptions;
  corsOptions?: ICorsMiddlewareOptions;
  metricsOptions?: Partial<IMetricsMiddlewareOptions>;
  loggingOptions?: ILoggingMiddlewareOptions & {logger?: IApplicationLogger};
}
/**
 * Returns an Express compatible server
 *
 * @return {express.Application}
 */
export const createServer = ({
  enableCORS = true,
  enableCompression = true,
  enableCSP = true,
  enableCookieParser = true,
  enableHttpHeadersSecurity = true,
  enableMetrics = true,
  enableSerializer = true,
  enableServerLogging = true,
  cspOptions = {},
  compressionOptions = {},
  corsOptions = {},
  metricsOptions = {},
  loggingOptions = {},
}: IMcfMiddlewareOptions = {}) => {
  const logger = buildLogger(loggingOptions.logger);
  const server = express();

  if (enableCookieParser) {
    logger.silly('enable cookie parser');
    server.use(cookieParser());
  }
  if (enableSerializer) {
    logger.silly('enable serializer');
    server.use(serializer());
  }
  if (enableHttpHeadersSecurity) {
    logger.silly('enable http headers security');
    server.use(httpHeadersMiddleware());
  }
  if (enableCSP) {
    logger.silly('enable content security policy');
    server.use(cspMiddleware(cspOptions));
  }
  if (enableCompression) {
    logger.silly('enable compression');
    server.use(compressionMiddleware(compressionOptions));
  }
  if (enableCORS) {
    logger.silly('enable CORS');
    server.use(corsMiddleware(corsOptions));
  }
  if (enableMetrics) {
    logger.silly('enable metrics collection');
    const metricsEndpoint = metricsOptions.metricsEndpoint || DEFAULT_METRICS_ENDPOINT;
    const metrics = metricsMiddleware(metricsOptions);
    server.use(metrics);
    server.use(metricsEndpoint, metrics.metricsMiddleware);
  }
  if (enableServerLogging) {
    logger.silly('enable server logging');
    server.use(
      loggingMiddleware({
        additionalTokenizers: loggingOptions.additionalTokenizers,
        hostnameType: loggingOptions.hostnameType,
        logStream: createMorganStream({logger}),
      }),
    );
  }

  return server;

};
