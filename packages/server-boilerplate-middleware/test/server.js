const boilerplate = require('../dist');

const server = boilerplate();
server.use('/', (req, res) => {
  res.json({
    params: req.params,
    body: req.body,
    headers: req.headers,
    timestamp: (new Date()).toISOString(),
  });
});
const serverInstance = server.listen(() => {
  console.info(`Listening on http://localhost:${serverInstance.address().port}`);
});
