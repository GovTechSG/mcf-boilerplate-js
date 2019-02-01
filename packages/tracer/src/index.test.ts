import * as chai from 'chai';
import express from 'express';
import * as superagent from 'superagent';
import supertest from 'supertest';
import {ExplicitContext} from 'zipkin';
import {createTracer, getContextProviderMiddleware, getMorganTokenizers, IExpressRequestWithContext, ITracer} from './';

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
          .catch((error) => {
            process.stdout.write('.');
            waitingForZipkin = setTimeout(waitForZipkin, 1000);
          });
      })();
    });
  });

  describe('.getContextProviderMiddleware()', () => {
    it('retrieves an Express compatible middleware', () => {
      expect(() => {
        const context = new ExplicitContext();
        getContextProviderMiddleware({context});
      }).to.not.throw();
    });
  });

  describe('.getMorganTokenizers()', () => {
    it('retrieves an array of morgan tokenizers', () => {
      expect(() => getMorganTokenizers()).to.not.throw();
    });
  });

  describe('integration tests', () => {
    let server: express.Application;
    let tracer: ITracer;

    before(() => {
      server = express();
      tracer = createTracer({
        sampleRate: 1,
        serverHost: 'localhost',
        serverPort: '9411',
      });
    });

    describe('.getContext()', () => {
      it('retrieves the context in use by the tracer', () => {
        expect(() => {
          tracer.getContext();
        }).to.not.throw();
      });
    });

    describe('.getExpressMiddleware()', () => {
      before(() => {
        server.use(tracer.getExpressMiddleware());
        server.get('/_get_express_middleware', (req: IExpressRequestWithContext, res: express.Response) => {
          res.json({...req.context});
        });
      });

      it('adds a .context property to the request object', () =>
        supertest(server)
          .get('/_get_express_middleware')
          .expect(200)
          .then(({body}) => {
            expect(body).to.exist;
          }));

      it('sends the correct information to zipkin', () =>
        supertest(server)
          .get('/_get_express_middleware')
          .expect(200)
          .then(({body}) => body.traceId)
          .then(
            (traceId) =>
              new Promise((resolve, reject) => {
                setTimeout(resolve.bind(null, traceId), 1000);
              }),
          )
          .then((traceId) => superagent.get(`http://localhost:9411/api/v2/trace/${traceId}`))
          .catch((err) => {
            throw new Error("Zipkin didn't receive trace ID");
          }));
    });

    describe('.getTracer()', () => {
      it('retrieves the tracer instance', () => {
        expect(() => {
          tracer.getTracer();
        }).to.not.throw();
      });
    });
  });
});
