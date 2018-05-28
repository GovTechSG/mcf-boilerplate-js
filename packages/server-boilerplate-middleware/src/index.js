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
 * @param {Boolean} [options.disableSerializer=false]
 *
 * @return {express.Application}
 */
export default function createServer({
  disableSerializer = false,
  disableCookieParser = false,
} = {}) {
  const server = express();
  if (!disableCookieParser) {
    server.use(cookieParser());
  }
  if (!disableSerializer) {
    server.use(serializer());
  }

  return server;
}
