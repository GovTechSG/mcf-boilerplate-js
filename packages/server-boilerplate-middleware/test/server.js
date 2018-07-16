const boilerplate = require('../dist');

const server = boilerplate();
server.use('*', (req, res) => {
  res.json({
    params: req.params,
    body: req.body,
    headers: req.headers,
    timestamp: (new Date()).toISOString(),
  });
});
const serverInstance = server.listen();
serverInstance.on('listening', () => {
  console.info(`Listening on:\n\nhttp://localhost:${serverInstance.address().port}`);
});
