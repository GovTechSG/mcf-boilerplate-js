import chai, {expect} from 'chai';
import sinonChai from 'sinon-chai';
import supertest from 'supertest';
import express from 'express';
chai.use(sinonChai);

import {compressionMiddleware} from './compression';

describe('compression-middleware', () => {
  it('should use gzip when threshold is reached', () => {
    const threshold = 10;
    const server = express();
    server.use(
      compressionMiddleware({
        threshold,
      }),
    );
    server.get('/underlimit', (req, res) => {
      res.send(new Array(threshold).join('o'));
    });
    server.get('/overlimit', (req, res) => {
      res.send(new Array(threshold + 1).join('o'));
    });

    return Promise.all([
      supertest(server)
        .get('/underlimit')
        .then((response) => {
          expect(response.header).to.not.include.keys('content-encoding');
          expect(response.header).to.include.keys('content-length');
        }),
      supertest(server)
        .get('/overlimit')
        .then((response) => {
          expect(response.header).to.include.keys('content-encoding');
          expect(response.header['content-encoding']).to.equal('gzip');
        }),
    ]);
  });
});
