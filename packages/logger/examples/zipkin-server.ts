// @ts-ignore
import boilerplate from '@mcf/server-boilerplate-middleware';
import zipkin from 'zipkin';
import zipkinMiddleware from 'zipkin-instrumentation-express';
import {createLogger} from '../dist';
const server = boilerplate();
const logger = createLogger({
  formatters: [
    (info) => {
      return {
        ...info,
        // @ts-ignore
        context: ctxImpl.currentCtx,
      };
    },
  ],
  level: 'silly',
});

const ctxImpl = new zipkin.ExplicitContext();

const tracer = new zipkin.Tracer({
  ctxImpl,
  localServiceName: 'test-zipkin-server',
  // @ts-ignore
  recorder: new zipkin.ConsoleRecorder(() => void 0),
});

server.use(zipkinMiddleware.expressMiddleware({tracer}));
server.use((req: any, _res: any, next: any) => {
  // @ts-ignore
  const {spanId, parentId, traceId} = ctxImpl.currentCtx;
  req.headers['X-B3-TraceId'] = traceId;
  req.headers['X-B3-SpanId'] = spanId;
  req.headers['X-B3-ParentSpanId'] = parentId;
  next();
});
server.use('*', (req: any, res: any) => {
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
