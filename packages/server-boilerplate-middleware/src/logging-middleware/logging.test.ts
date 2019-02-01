import chai from 'chai';
import supertest from 'supertest';
import {loggingMiddleware} from './logging';
import express from 'express';

const {expect} = chai;

// loggerHasBeenCalled is there to make sure logger is called and expectations are run
// maybe it could make tests flaky ...
describe('logging-middleware', () => {
  let loggerHasBeenCalled: boolean;
  beforeEach(() => {
    loggerHasBeenCalled = false;
  });
  it('should log http call', () => {
    const server = express();
    const logStream = {
      write: (mes: string) => {
        const message: any = JSON.parse(mes);
        loggerHasBeenCalled = true;
        expect(message).to.deep.include({
          httpVersion: '1.1',
          method: 'GET',
          status: '200',
          url: '/foo',
        });
        expect(message).to.include.keys(
          'contentLength',
          'remoteAddress',
          'remoteHostname',
          'responseTimeMs',
          'serverHostname',
          'userAgent',
          'time',
        );
      },
    };
    server.use(
      loggingMiddleware({
        logStream,
      }),
    );
    server.get('/foo', (req, res) => {
      res.send('some');
    });
    return supertest(server)
      .get('/foo')
      .then(() => {
        expect(loggerHasBeenCalled).to.equal(true);
      });
  });
  it('should log http call with additional tokens', () => {
    const server = express();
    const logStream = {
      write: (mes: string) => {
        const message: any = JSON.parse(mes);
        loggerHasBeenCalled = true;
        expect(message).to.deep.include({
          additionalTokenId: 'value/foo',
          httpVersion: '1.1',
          method: 'GET',
          status: '200',
          url: '/foo',
        });
        expect(message).to.include.keys(
          'contentLength',
          'remoteAddress',
          'remoteHostname',
          'responseTimeMs',
          'serverHostname',
          'userAgent',
          'time',
        );
      },
    };
    server.use(
      loggingMiddleware({
        additionalTokenizers: [
          {
            // @ts-ignore
            fn: (req) => 'value' + req.url,
            id: 'additionalTokenId',
          },
        ],
        logStream,
      }),
    );
    server.get('/foo', (req, res) => {
      res.send('some');
    });
    return supertest(server)
      .get('/foo')
      .then(() => {
        expect(loggerHasBeenCalled).to.equal(true);
      });
  });
});
