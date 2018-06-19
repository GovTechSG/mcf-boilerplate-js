const {expect} = require('chai');

const express = require('express');
const supertest = require('supertest');

const csp = require('./csp');

describe('security/csp', () => {
  it('exports a function', () => {
    expect(csp).to.be.a('function');
  });

  it('has the right keys', () => {
    expect(csp).to.have.key('instance');
  });

  it('returns an Express compatible middleware', () => {
    const server = express();
    expect(() => {
      server.use(csp());
    }).to.not.throw();
  });

  describe('configurable security headers', () => {
    describe('content security policy', () => {
      let server;

      const assertCspContains = (res, cspString) => {
        expect(res.headers['content-security-policy']).to.contain(cspString);
        expect(res.headers['x-content-security-policy']).to.contain(cspString);
        expect(res.headers['x-webkit-csp']).to.contain(cspString);
      };

      const provisionRootEndpoint = (server, securityOptions) => {
        server.use(csp(securityOptions));
        server.get('/', (req, res) => res.json('ok'));
      };

      const triggerRootEndpoint = (server) =>
        supertest(server)
          .get('/')
          .expect(200);

      beforeEach(() => {
        // resets the security module since its a singleton
        csp.instance = null;
        server = express();
      });

      after(() => {
        csp.instance = null;
      });

      it('defaults to none', () => {
        provisionRootEndpoint(server);
        return triggerRootEndpoint(server).then((res) => {
          assertCspContains(res, 'child-src \'none\'');
          assertCspContains(res, 'connect-src \'none\'');
          assertCspContains(res, 'default-src \'none\'');
          assertCspContains(res, 'font-src \'none\'');
          assertCspContains(res, 'img-src \'none\'');
          assertCspContains(res, 'script-src \'none\'');
          assertCspContains(res, 'style-src \'none\'');
          assertCspContains(res, 'report-uri /csp-report');
        });
      });

      it('can set "child-src"', () => {
        provisionRootEndpoint(server, {childSrc: ['\'self\'']});
        return triggerRootEndpoint(server).then((res) => {
          assertCspContains(res, 'child-src \'self\'');
        });
      });

      it('can set "connect-src"', () => {
        provisionRootEndpoint(server, {connectSrc: ['\'self\'']});
        return triggerRootEndpoint(server).then((res) => {
          assertCspContains(res, 'connect-src \'self\'');
        });
      });

      it('can set "default-src"', () => {
        provisionRootEndpoint(server, {defaultSrc: ['\'self\'']});
        return triggerRootEndpoint(server).then((res) => {
          assertCspContains(res, 'default-src \'self\'');
        });
      });

      it('can set "font-src"', () => {
        provisionRootEndpoint(server, {fontSrc: ['\'self\'']});
        return triggerRootEndpoint(server).then((res) => {
          assertCspContains(res, 'font-src \'self\'');
        });
      });

      it('can set "img-src"', () => {
        provisionRootEndpoint(server, {imgSrc: ['\'self\'']});
        return triggerRootEndpoint(server).then((res) => {
          assertCspContains(res, 'img-src \'self\'');
        });
      });

      it('can set "script-src"', () => {
        provisionRootEndpoint(server, {scriptSrc: ['\'self\'']});
        return triggerRootEndpoint(server).then((res) => {
          assertCspContains(res, 'script-src \'self\'');
        });
      });

      it('can set "style-src"', () => {
        provisionRootEndpoint(server, {styleSrc: ['\'self\'']});
        return triggerRootEndpoint(server).then((res) => {
          assertCspContains(res, 'style-src \'self\'');
        });
      });

      it('can set "report-uri"', () => {
        provisionRootEndpoint(server, {reportUri: '/__test/__report_uri'});
        return triggerRootEndpoint(server).then((res) => {
          assertCspContains(res, '/__test/__report_uri');
        });
      });
    });
  });
});
