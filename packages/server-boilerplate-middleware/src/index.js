import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

const BODY_SIZE_LIMIT = '4200kb';

module.exports = createServer;

/**
 * Returns a server that is:
 *  - compatible with Express.js interfaces
 *  - able to parse cookies
 *
 * @param {Object} [options={}]
 * @param {Boolean} [options.disableBodyParser=false]
 *
 * @return {express.Application}
 */
export default function createServer({
  disableBodyParser = false,
} = {}) {
  const server = express();
  server.use(cookieParser());
  if (!disableBodyParser) {
    server.use(bodyParser.json({
      extended: true,
      limit: BODY_SIZE_LIMIT,
    }));
  }

  return server;
}
