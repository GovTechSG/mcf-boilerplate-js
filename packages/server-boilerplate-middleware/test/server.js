const boilerplate = require('../dist');

const server = boilerplate({
  serverLogging: {
    logStream: {
      write: (...args) => console.info.apply(null, [...args]),
    },
  },
  tracing: {
    localServiceName: process.env.SVC_ID,
    serverHost: 'localhost',
    serverPort: '9411',
  },
});

const proxyPath = `http://localhost:${process.env.PROXY_PORT}`;
if (process.env.PROXY_PORT) {
  server.get('/proxy', (req, res) => {
    server.getRequest()(proxyPath, {
      remoteServiceName: process.env.RSVC_ID,
    })
      .then((v) => v.json())
      .then((response) => {
        res.json('ok');
      });
  });
}

server.use('*', (req, res) => {
  res.json({
    params: req.params,
    body: req.body,
    headers: req.headers,
    timestamp: (new Date()).toISOString(),
  });
});
const serverInstance = server.listen(process.env.PORT);
serverInstance.on('listening', () => {
  console.info(`Listening on:\n\thttp://localhost:${serverInstance.address().port}`);
  console.info(`Proxying to :\n\t${proxyPath}`);
});
