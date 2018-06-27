const express = require('express');
const supertest = require('supertest');

const chai = require('chai');
const {expect} = chai;

const corsMiddleware = require('./cors');

describe('security/cors', () => {
  it('exports a function', () => {
    expect(corsMiddleware).to.be.a('function');
  });

  it('returns an Express compatible middleware', () => {
    expect(() => {
      express().use(corsMiddleware());
    }).to.not.throw();
  });

  describe('.constructor()', () => {
    const allowedHeaders = ['X-Test-Token', 'TestTestTest'];
    const allowedMethods = ['PUT', 'GET', 'OPTIONS'];
    const allowedOrigins = ['http://localhost:65536', 'https://test.test'];
    const invalidOrigin = 'http://invalid.origin.com';

    let server;

    beforeEach(() => {
      corsMiddleware.reset();
      server = express();
      server.use(
        corsMiddleware({
          allowedHeaders,
          allowedMethods,
          allowedOrigins,
        })
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
              expect(res.headers).to.contain.key('access-control-allow-origin');
              expect(res.headers['access-control-allow-origin']).to.eql(
                allowedOrigin
              );
            })
        )
      ));

    it('correctly does not return the allowed origins', () =>
      supertest(server)
        .get('/')
        .set('Origin', invalidOrigin)
        .expect(200)
        .then((res) => {
          expect(res.headers).to.not.contain.key('access-control-allow-origin');
        }));

    it('correctly returns allowed methods|headers on an OPTIONS request', () =>
      Promise.all([
        supertest(server)
          .options('/')
          .set('Origin', allowedOrigins[0])
          .expect(204)
          .then((res) => res.headers),
        supertest(server)
          .options('/')
          .set('Origin', invalidOrigin)
          .expect(204)
          .then((res) => res.headers),
      ]).then((results) => {
        results.forEach((res) => {
          expect(res).to.contain.key('access-control-allow-methods');
          expect(res).to.contain.key('access-control-allow-headers');
          expect(res['access-control-allow-methods']).to.deep.equal(
            allowedMethods.toString()
          );
        });
      }));

    it('correctly returns allow credentials header', () =>
      Promise.all([
        supertest(server).get('/').expect(200).then((res) => res.headers),
        supertest(server).post('/').expect(200).then((res) => res.headers),
        supertest(server).put('/').expect(200).then((res) => res.headers),
        supertest(server).delete('/').expect(200).then((res) => res.headers),
        supertest(server).head('/').expect(200).then((res) => res.headers),
        supertest(server).options('/').expect(204).then((res) => res.headers),
      ]).then((results) => {
        results.forEach((res) => {
          expect(res).to.contain.key('access-control-allow-credentials');
          expect(res['access-control-allow-credentials']).to.deep.equal('true');
        });
      })
    );
  });
});
