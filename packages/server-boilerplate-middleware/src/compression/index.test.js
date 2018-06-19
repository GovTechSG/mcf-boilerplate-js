import sinon from 'sinon';
import chai from 'chai';
chai.use(require('sinon-chai'));
import {expect} from 'chai';
import supertest from 'supertest';
import express from 'express';

const compressionMiddleware = require('./');

describe('compression', () => {
  it('exports a function', () => {
    expect(compressionMiddleware).to.be.a('function');
  });

  it('has the correct properties', () => {
    expect(compressionMiddleware).to.have.keys([
      'compression',
      'constant',
      'instance',
    ]);
  });

  describe('constructor()', () => {
    const original = {};

    before(() => {
      original.instance = compressionMiddleware.instance;
    });

    after(() => {
      compressionMiddleware.instance = original.instance;
    });

    beforeEach(() => {
      compressionMiddleware.instance = null;
    });

    it('returns a singleton', () => {
      compressionMiddleware.instance = 1;
      expect(compressionMiddleware()).to.eql(1);
    });

    it('returns an express compatible middleware', () => {
      const server = express();
      expect(() => {
        server.use(compressionMiddleware());
      }).to.not.throw();
    });

    it('provides a compression function for the server', () => {
      const threshold = 10;
      const server = express();
      server.use(
        compressionMiddleware({
          threshold,
        })
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
            expect(response.headers).to.not.include.key('content-encoding');
            expect(response.headers).to.include.key('content-length');
          }),
        supertest(server)
          .get('/overlimit')
          .then((response) => {
            expect(response.headers).to.include.key('content-encoding');
            expect(response.headers['content-encoding']).to.eql('gzip');
          }),
      ]);
    });

    context('no parameters provided', () => {
      before(() => {
        sinon.stub(compressionMiddleware, 'compression');
      });

      after(() => {
        compressionMiddleware.compression.restore();
      });

      afterEach(() => {
        compressionMiddleware.compression.resetHistory();
      });

      it('uses the default values', () => {
        compressionMiddleware();
        expect(compressionMiddleware.compression).to.be.calledWith({
          chunkSize: compressionMiddleware.constant.defaultChunkSize,
          level: compressionMiddleware.constant.defaultLevel,
          threshold: compressionMiddleware.constant.defaultThreshold,
        });
      });
    });

    context('some parameters provided', () => {
      before(() => {
        sinon.stub(compressionMiddleware, 'compression');
      });

      after(() => {
        compressionMiddleware.compression.restore();
      });

      afterEach(() => {
        compressionMiddleware.compression.resetHistory();
      });

      it('uses the default values for others', () => {
        const testLevelValue = 1111111;
        compressionMiddleware({
          level: testLevelValue,
        });
        expect(compressionMiddleware.compression).to.be.calledWith({
          chunkSize: compressionMiddleware.constant.defaultChunkSize,
          level: testLevelValue,
          threshold: compressionMiddleware.constant.defaultThreshold,
        });
      });

      it('uses the provided values', () => {
        const testChunkSize = 987654;
        const testLevelValue = 123456;
        const testThresholdValue = 654321;
        compressionMiddleware({
          chunkSize: testChunkSize,
          level: testLevelValue,
          threshold: testThresholdValue,
        });
        expect(compressionMiddleware.compression).to.be.calledWith({
          chunkSize: testChunkSize,
          level: testLevelValue,
          threshold: testThresholdValue,
        });
      });
    });
  });

  describe('.constant', () => {
    it('has the correct keys', () => {
      expect(compressionMiddleware.constant).to.have.keys([
        'defaultChunkSize',
        'defaultLevel',
        'defaultThreshold',
      ]);
    });
  });
});
