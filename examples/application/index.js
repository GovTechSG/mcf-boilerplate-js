const server = require('./core/server');
const logger = require('./core/logger');
const request = require('./core/request');

server.get('/trace/other', (req, res) => {
  logger.info(`Hitting ${process.env.SVC_TWO_URL}/trace`);
  request(`${process.env.SVC_TWO_URL}/trace`, {
    remoteServiceName: process.env.SVC_TWO_ID,
  }).then((v) => v.json())
    .then((response) => {
      res.json({
        theirs: response,
        ours: req.context,
      });
    });
});

server.get('/trace', (req, res) => {
  logger.info('Getting the trace details!');
  res.json(req.context);
});

const instance = server.listen(process.env.PORT);

instance.on('listening', () => {
  const url = `http://localhost:${instance.address().port}`;
  logger.info(`Server up and about at ${url}`);
});
