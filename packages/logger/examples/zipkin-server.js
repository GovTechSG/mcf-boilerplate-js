const zipkin = require('zipkin');
const zipkinMiddleware = require('zipkin-instrumentation-express');
const server = require('@mcf/server-boilerplate-middleware')();

const logger = require('../dist');


logger.init();

const ctxImpl = new zipkin.ExplicitContext();
logger.context.set(ctxImpl);

const tracer = new zipkin.Tracer({
  ctxImpl,
  recorder: new zipkin.ConsoleRecorder(() => {}),
  localServiceName: 'test-zipkin-server',
});

server.use(zipkinMiddleware.expressMiddleware({tracer}));
server.use((req, _res, next) => {
  const {spanId, parentId, traceId} = ctxImpl.currentCtx;
  req.headers['X-B3-TraceId'] = traceId;
  req.headers['X-B3-SpanId'] = spanId;
  req.headers['X-B3-ParentSpanId'] = parentId;
  next();
});
server.use('*', (req, res) => {
  logger.info({
    body: req.body,
    headers: req.headers,
    params: req.params,
    query: req.query,
  });
  res.json('ok');
});

const serverInstance = server.listen(5123);
serverInstance.on('listening', () => {
  logger.info(`Listening on http://localhost:${serverInstance.address().port}`);
});
