import express from 'express';
import cookieParser from 'cookie-parser';
import serializer from './serializer';

module.exports = createServer;

/**
 * Returns a server that is:
 *  - compatible with Express.js interfaces
 *  - able to parse cookies
 *
 * @param {Object} [options={}]
 * @param {Boolean} [options.enableSerializer=true]
 *
 * @return {express.Application}
 */
export default function createServer({
  enableSerializer = true,
  enableCookieParser = true,
} = {}) {
  const server = express();
  if (enableCookieParser) {
    server.use(cookieParser());
  }
  if (enableSerializer) {
    server.use(serializer());
  }

  return server;
}
