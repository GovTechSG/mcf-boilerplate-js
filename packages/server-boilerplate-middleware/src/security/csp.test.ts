import {expect} from 'chai';
import express from 'express';
import supertest from 'supertest';
import {cspMiddleware} from './csp';

describe('security/csp', () => {
  describe('content security policy', () => {
    let server;

    const assertCspContains = (res, cspString) => {
      expect(res.headers['content-security-policy']).to.contain(cspString);
      expect(res.headers['x-content-security-policy']).to.contain(cspString);
      expect(res.headers['x-webkit-csp']).to.contain(cspString);
    };

    const provisionRootEndpoint = (securityOptions = {}) => {
      server.use(cspMiddleware(securityOptions));
      server.get('/', (req, res) => res.json('ok'));
    };

    const triggerRootEndpoint = () =>
      supertest(server)
        .get('/')
        .expect(200);

    beforeEach(() => {
      server = express();
    });

    it('defaults to none', () => {
      provisionRootEndpoint();
      return triggerRootEndpoint().then((res) => {
        assertCspContains(res, "child-src 'none'");
        assertCspContains(res, "connect-src 'none'");
        assertCspContains(res, "default-src 'none'");
        assertCspContains(res, "font-src 'none'");
        assertCspContains(res, "img-src 'none'");
        assertCspContains(res, "script-src 'none'");
        assertCspContains(res, "style-src 'none'");
        assertCspContains(res, 'report-uri /csp-report');
      });
    });

    it('can set "child-src"', () => {
      provisionRootEndpoint({childSrc: ["'self'"]});
      return triggerRootEndpoint().then((res) => {
        assertCspContains(res, "child-src 'self'");
      });
    });

    it('can set "connect-src"', () => {
      provisionRootEndpoint({connectSrc: ["'self'"]});
      return triggerRootEndpoint().then((res) => {
        assertCspContains(res, "connect-src 'self'");
      });
    });

    it('can set "default-src"', () => {
      provisionRootEndpoint({defaultSrc: ["'self'"]});
      return triggerRootEndpoint().then((res) => {
        assertCspContains(res, "default-src 'self'");
      });
    });

    it('can set "font-src"', () => {
      provisionRootEndpoint({fontSrc: ["'self'"]});
      return triggerRootEndpoint().then((res) => {
        assertCspContains(res, "font-src 'self'");
      });
    });

    it('can set "img-src"', () => {
      provisionRootEndpoint({imgSrc: ["'self'"]});
      return triggerRootEndpoint().then((res) => {
        assertCspContains(res, "img-src 'self'");
      });
    });

    it('can set "script-src"', () => {
      provisionRootEndpoint({scriptSrc: ["'self'"]});
      return triggerRootEndpoint().then((res) => {
        assertCspContains(res, "script-src 'self'");
      });
    });

    it('can set "style-src"', () => {
      provisionRootEndpoint({styleSrc: ["'self'"]});
      return triggerRootEndpoint().then((res) => {
        assertCspContains(res, "style-src 'self'");
      });
    });

    it('can set "report-uri"', () => {
      provisionRootEndpoint({reportUri: '/__test/__report_uri'});
      return triggerRootEndpoint().then((res) => {
        assertCspContains(res, '/__test/__report_uri');
      });
    });
  });
});
