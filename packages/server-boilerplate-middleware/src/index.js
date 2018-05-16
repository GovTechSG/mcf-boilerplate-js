import express from 'express';
import cookieParser from 'cookie-parser';

module.exports = createServer;

/**
 * Returns a server that is:
 *  - compatible with Express.js interfaces
 *  - able to parse cookies
 *
 * @return {express.Application}
 */
export default function createServer() {
  const server = express();
  server.use(cookieParser());

  return server;
}
