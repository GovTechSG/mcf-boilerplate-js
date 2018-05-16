import express from 'express';
import bodyParser from 'body-parser';
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
  server.use(bodyParser.json({extended: true}));

  return server;
}
