import express from 'express';
import cookieParser from 'cookie-parser';
import serializer from './serializer';
import security from './security';
import compression from './compression';

module.exports = createServer;

/**
 * Returns a server that is:
 *  - compatible with Express.js interfaces
 *  - able to parse cookies
 *
 * @param {Object} [options={}]
 * @param {Boolean} [options.enableSerializer=true]
 * @param {Boolean} [options.enableCookieParser=true]
 * @param {Boolean} [options.enableContentSecurityPolicy=true]
 * @param {Boolean} [options.enableHttpHeadersSecurity=true]
 * @param {Object} [contentSecurityPolicy={}]
 *
 * @return {express.Application}
 */
export default function createServer({
  enableSerializer = true,
  enableCookieParser = true,
  enableHttpHeadersSecurity = true,
  enableContentSecurityPolicy = true,
  enableCompression = true,
  contentSecurityPolicy = {},
  compressionOptions = {},
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

  return server;
}
