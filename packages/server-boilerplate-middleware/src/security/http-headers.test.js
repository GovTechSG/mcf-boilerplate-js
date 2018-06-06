const {expect} = require('chai');

const express = require('express');
const supertest = require('supertest');

const security = require('./http-headers');

describe('security', () => {
  it('exports a function', () => {
    expect(security).to.be.a('function');
  });

  it('has the right keys', () => {
    expect(security).to.have.keys(['constant', 'instance']);
  });

  it('returns an Express compatible middleware', () => {
    const server = express();
    expect(() => {
      server.use(security());
    }).to.not.throw();
  });

  describe('static response header protections', () => {
    const headers = {};
    let server;

    before(() => {
      server = express();
      server.get('/unprotected', (req, res) => res.json(req.headers));
      server.use(security());
      server.get('/protected', (req, res) => res.json(req.headers));
      return Promise.all([
        supertest(server)
          .get('/unprotected')
          .expect(200)
          .then((res) => {
            headers.unprotected = res.headers;
          }),
        supertest(server)
          .get('/protected')
          .expect(200)
          .then((res) => {
            headers.protected = res.headers;
          }),
      ]);
    });

    // hinders information gathering by malicious users - also possible with
    // `app.disable('x-powered-by')`.
    // @see https://github.com/expressjs/discussions/issues/39
    it('removes "x-powered-by"', () => {
      expect(headers.unprotected).to.include.key('x-powered-by');
      expect(headers.protected).to.not.include.key('x-powered-by');
    });

    // prevent pre-fetching to avoid being vulnerable to dns caching
    // @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/x-dns-prefetch-control
    it('implements "x-dns-prefetch-control"', () => {
      expect(headers.unprotected).to.not.include.key('x-dns-prefetch-control');
      expect(headers.protected).to.include.key('x-dns-prefetch-control');
      expect(headers.protected['x-dns-prefetch-control']).to.equal('off');
    });

    // allow iframe inclusions only from websites from the same domain
    // @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/x-frame-options
    it('implements "x-frame-options"', () => {
      expect(headers.unprotected).to.not.include.key('x-frame-options');
      expect(headers.protected).to.include.key('x-frame-options');
      expect(headers.protected['x-frame-options']).to.equal('SAMEORIGIN');
    });

    // prevent http connection for returning users - prevents mitm where ssl
    // is disabled
    // @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/strict-transport-security
    it('implements "strict-transport-security"', () => {
      expect(headers.unprotected).to.not.include.key(
        'strict-transport-security'
      );
      expect(headers.protected).to.include.key('strict-transport-security');
      expect(headers.protected['strict-transport-security']).to.equal(
        'max-age=15552000; includeSubDomains'
      );
    });

    // prevent ie8 from opening any maliciously injected webpages and download
    // it instead
    // @see https://www.nwebsec.com/HttpHeaders/SecurityHeaders/XDownloadOptions
    it('implements "x-download-options"', () => {
      expect(headers.unprotected).to.not.include.key('x-download-options');
      expect(headers.protected).to.include.key('x-download-options');
      expect(headers.protected['x-download-options']).to.equal('noopen');
    });

    // force server to respond with a mime type corresponding to the requested
    // mime type - so we don't load a javascript when a css was requested for
    // @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/x-content-type-options
    it('implements "x-content-type-options"', () => {
      expect(headers.unprotected).to.not.include.key('x-content-type-options');
      expect(headers.protected).to.include.key('x-content-type-options');
      expect(headers.protected['x-content-type-options']).to.equal('nosniff');
    });

    // stop loading page if cross site scripting is detected
    // @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/x-xss-protection
    it('implements "x-xss-protection"', () => {
      expect(headers.unprotected).to.not.include.key('x-xss-protection');
      expect(headers.protected).to.include.key('x-xss-protection');
      expect(headers.protected['x-xss-protection']).to.equal('1; mode=block');
    });

    describe('content-security-policy', () => {
      it('implements "content-security-policy"', () => {
        expect(headers.protected).to.include.key('content-security-policy');
      });

      it('implements "x-content-security-policy"', () => {
        expect(headers.protected).to.include.key('x-content-security-policy');
      });

      it('implements "x-webkit-csp"', () => {
        expect(headers.protected).to.include.key('x-webkit-csp');
      });
    });
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
        server.use(security(securityOptions));
        server.get('/', (req, res) => res.json('ok'));
      };

      const triggerRootEndpoint = (server) =>
        supertest(server).get('/').expect(200);

      beforeEach(() => {
        // resets the security module since its a singleton
        security.instance = null;
        server = express();
      });

      after(() => {
        security.instance = null;
      });

      it('defaults to none', () => {
        provisionRootEndpoint(server);
        return triggerRootEndpoint(server).then((res) => {
          assertCspContains(res, 'child-src \'none\'');
          assertCspContains(res, 'default-src \'none\'');
          assertCspContains(res, 'font-src \'none\'');
          assertCspContains(res, 'img-src \'none\'');
          assertCspContains(res, 'script-src \'none\'');
          assertCspContains(res, 'style-src \'none\'');
          assertCspContains(res, 'report-uri /csp-report');
        });
      });

      it('can set "child-src"', () => {
        provisionRootEndpoint(server, {cspChildSrc: ['\'self\'']});
        return triggerRootEndpoint(server).then((res) => {
          assertCspContains(res, 'child-src \'self\'');
        });
      });

      it('can set "default-src"', () => {
        provisionRootEndpoint(server, {cspDefaultSrc: ['\'self\'']});
        return triggerRootEndpoint(server).then((res) => {
          assertCspContains(res, 'default-src \'self\'');
        });
      });

      it('can set "font-src"', () => {
        provisionRootEndpoint(server, {cspFontSrc: ['\'self\'']});
        return triggerRootEndpoint(server).then((res) => {
          assertCspContains(res, 'font-src \'self\'');
        });
      });

      it('can set "img-src"', () => {
        provisionRootEndpoint(server, {cspImgSrc: ['\'self\'']});
        return triggerRootEndpoint(server).then((res) => {
          assertCspContains(res, 'img-src \'self\'');
        });
      });

      it('can set "script-src"', () => {
        provisionRootEndpoint(server, {cspScriptSrc: ['\'self\'']});
        return triggerRootEndpoint(server).then((res) => {
          assertCspContains(res, 'script-src \'self\'');
        });
      });

      it('can set "style-src"', () => {
        provisionRootEndpoint(server, {cspStyleSrc: ['\'self\'']});
        return triggerRootEndpoint(server).then((res) => {
          assertCspContains(res, 'style-src \'self\'');
        });
      });

      it('can set "report-uri"', () => {
        provisionRootEndpoint(server, {cspReportUri: '/__test/__report_uri'});
        return triggerRootEndpoint(server).then((res) => {
          assertCspContains(res, '/__test/__report_uri');
        });
      });
    });
  });
});
