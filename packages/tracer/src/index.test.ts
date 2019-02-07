import * as chai from 'chai';
import express from 'express';
import * as superagent from 'superagent';
import supertest from 'supertest';
import {createTracer} from './';
import {Tracer} from 'zipkin';
import {expressMiddleware} from 'zipkin-instrumentation-express';
import {getNamespace} from 'cls-hooked';
import {MCF_TRACE_NAMESPACE} from '@mcf/logger';

const {expect} = chai;

describe('@mcf/tracer', () => {
  let waitingForZipkin;

  before(function() {
    this.timeout(30000);
    process.stdout.write('(waiting for zipkin...');
    return new Promise((resolve) => {
      (function waitForZipkin() {
        superagent
          .get('http://localhost:9411')
          .then((response) => {
            if (response.status === 200) {
              process.stdout.write(' done)\n');
              clearTimeout(waitingForZipkin);
              resolve();
            } else {
              process.stdout.write('.');
              waitingForZipkin = setTimeout(waitForZipkin, 1000);
            }
          })
          .catch(() => {
            process.stdout.write('.');
            waitingForZipkin = setTimeout(waitForZipkin, 1000);
          });
      })();
    });
  });

  describe('integration tests', () => {
    let server: express.Application;
    let tracer: Tracer;

    before(() => {
      server = express();
      tracer = createTracer({
        sampleRate: 1,
        serverHost: 'localhost',
        serverPort: '9411',
      });
    });

    describe('.getExpressMiddleware()', () => {
      before(() => {
        server.use(expressMiddleware({tracer}));
      });

      it('adds a .context property to the request object', () => {
        server.get('/_get_express_middleware', (req: express.Request, res: express.Response) => {
          expect(getNamespace(MCF_TRACE_NAMESPACE).active).to.exist;
          res.json();
        });
        return supertest(server)
          .get('/_get_express_middleware')
          .expect(200);
      });

      it('sends the correct information to zipkin', () => {
        server.get('/foo', (req: express.Request, res: express.Response) => {
          res.json({traceId: getNamespace(MCF_TRACE_NAMESPACE).active[MCF_TRACE_NAMESPACE].traceId});
        });
        return (
          supertest(server)
            .get('/foo')
            .expect(200)
            .then(({body}) => body.traceId)
            .then(
              (traceId) =>
                new Promise((resolve) => {
                  setTimeout(resolve.bind(null, traceId), 1000);
                }),
            )
            .then((traceId) => superagent.get(`http://localhost:9411/api/v2/trace/${traceId}`))
            // expect to receive 200 response, meaning traces has been sent to zipkin
            .then((response) => expect(response.status).to.equal(200))
        );
      });
    });
  });
});
