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
 * @param {Boolean} [options.enableCompression=true]
 * @param {Boolean} [options.enableContentSecurityPolicy=true]
 * @param {Boolean} [options.enableCookieParser=true]
 * @param {Boolean} [options.enableHttpHeadersSecurity=true]
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
 *
 * @return {express.Application}
 */
export default function createServer({
  enableCompression = true,
  enableContentSecurityPolicy = true,
  enableCookieParser = true,
  enableHttpHeadersSecurity = true,
  enableSerializer = true,
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
