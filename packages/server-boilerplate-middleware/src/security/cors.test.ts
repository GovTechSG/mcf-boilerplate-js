import express from 'express';
import {corsMiddleware, HttpMethod} from './cors';
import chai from 'chai';
import supertest from 'supertest';

const {expect} = chai;
describe('security/cors', () => {
  const allowedHeaders = ['X-Test-Token', 'TestTestTest'];
  const allowedMethods: HttpMethod[] = ['PUT', 'GET', 'OPTIONS'];
  const allowedOrigins = ['http://localhost:65536', 'https://test.test'];
  const invalidOrigin = 'http://invalid.origin.com';

  let server;

  beforeEach(() => {
    server = express();
    server.use(
      corsMiddleware({
        allowedHeaders,
        allowedMethods,
        allowedOrigins,
      }),
    );
    server.use('/', (req, res) => {
      res.json('ok');
    });
  });

  it('correctly returns the allowed origins', () =>
    Promise.all(
      allowedOrigins.map((allowedOrigin) =>
        supertest(server)
          .get('/')
          .set('Origin', allowedOrigin)
          .expect(200)
          .then((res) => {
            expect(res.header).to.includes.keys('access-control-allow-origin');
            expect(res.header['access-control-allow-origin']).to.eql(allowedOrigin);
          }),
      ),
    ));

  it('correctly does not return the allowed origins', () =>
    supertest(server)
      .get('/')
      .set('Origin', invalidOrigin)
      .expect(200)
      .then((res) => {
        expect(res.header).to.not.includes.keys('access-control-allow-origin');
      }));

  it('correctly returns allowed methods|headers on an OPTIONS request', () =>
    Promise.all([
      supertest(server)
        .options('/')
        .set('Origin', allowedOrigins[0])
        .expect(204)
        .then((res) => res.header),
      supertest(server)
        .options('/')
        .set('Origin', invalidOrigin)
        .expect(204)
        .then((res) => res.header),
    ]).then((results) => {
      results.forEach((res) => {
        expect(res).to.includes.keys('access-control-allow-methods');
        expect(res).to.includes.keys('access-control-allow-headers');
        expect(res['access-control-allow-methods']).to.deep.equal(allowedMethods.toString());
      });
    }));

  it('correctly returns allow credentials header', () =>
    Promise.all([
      supertest(server)
        .get('/')
        .expect(200)
        .then((res) => res.header),
      supertest(server)
        .post('/')
        .expect(200)
        .then((res) => res.header),
      supertest(server)
        .put('/')
        .expect(200)
        .then((res) => res.header),
      supertest(server)
        .patch('/')
        .expect(200)
        .then((res) => res.header),
      supertest(server)
        .delete('/')
        .expect(200)
        .then((res) => res.header),
      supertest(server)
        .head('/')
        .expect(200)
        .then((res) => res.header),
      supertest(server)
        .options('/')
        .expect(204)
        .then((res) => res.header),
    ]).then((results) => {
      results.forEach((res) => {
        expect(res).to.includes.keys('access-control-allow-credentials');
        expect(res['access-control-allow-credentials']).to.deep.equal('true');
      });
    }));
});
