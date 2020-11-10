const boilerplate = require('../dist');
const {createLogger} = require('@mcf/logger');

const logger = createLogger({namespace: 'application'});
const server = boilerplate.createServer({
  serverLogging: {
    logger,
  },
  enableXray: true
});

const proxyPath = `http://localhost:${process.env.PROXY_PORT}`;
if (process.env.PROXY_PORT) {
  server.get('/proxy', (req, res) => {
    server
      .getRequest()(proxyPath, {
        remoteServiceName: process.env.RSVC_ID,
      })
      .then((v) => v.json())
      .then(() => {
        res.json('ok');
      });
  });
}

server.use('*', (req, res) => {
  res.json({
    params: req.params,
    body: req.body,
    headers: req.headers,
    timestamp: new Date().toISOString(),
  });
});
const serverInstance = server.listen(35349);

serverInstance.on('listening', () => {
  logger.info(`Listening on: http://localhost:${serverInstance.address().port}`);
  logger.info(`Proxying to : ${proxyPath}`);
});
