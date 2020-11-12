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
import http from 'http';
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
  const app = express();

  if (enableCookieParser) {
    logger.silly('enable cookie parser');
    app.use(cookieParser());
  }
  if (enableSerializer) {
    logger.silly('enable serializer');
    app.use(serializer());
  }
  if (enableHttpHeadersSecurity) {
    logger.silly('enable http headers security');
    app.use(httpHeadersMiddleware());
  }
  if (enableCSP) {
    logger.silly('enable content security policy');
    app.use(cspMiddleware(cspOptions));
  }
  if (enableCompression) {
    logger.silly('enable compression');
    app.use(compressionMiddleware(compressionOptions));
  }
  if (enableCORS) {
    logger.silly('enable CORS');
    app.use(corsMiddleware(corsOptions));
  }
  if (enableMetrics) {
    logger.silly('enable metrics collection');
    const metricsEndpoint = metricsOptions.metricsEndpoint || DEFAULT_METRICS_ENDPOINT;
    const metrics = metricsMiddleware(metricsOptions);
    app.use(metrics);
    app.use(metricsEndpoint, metrics.metricsMiddleware);
  }
  if (enableServerLogging) {
    logger.silly('enable server logging');
    app.use(
      loggingMiddleware({
        additionalTokenizers: loggingOptions.additionalTokenizers,
        hostnameType: loggingOptions.hostnameType,
        logStream: createMorganStream({logger}),
      }),
    );
  }

  const server = http.createServer(app);

  server.keepAliveTimeout = Number(process.env.KEEP_ALIVE_TIMEOUT || 5) * 1000;
  // This should be bigger than `keepAliveTimeout + your server's expected response time`
  server.headersTimeout = Number(process.env.HEADERS_TIMEOUT || 60) * 1000;

  return server;
};
