import fs from 'fs';
import path from 'path';

import {expect} from 'chai';
import supertest from 'supertest';

import createServer from './';

describe('createServer()', () => {
  const TEST_STRING = '__test_string';
  const TEST_HTTP_CODE = 418;

  it('exports a function', () => {
    expect(createServer).to.be.a('function');
  });

  it('can also be imported using require', () => {
    expect(createServer).to.eql(require('./index'));
  });

  describe('returns an Express compatible server', () => {
    let boilerplateServer;

    beforeEach(() => {
      boilerplateServer = createServer();
    });

    it('has a .listen() method', () => {
      expect(boilerplateServer.listen).to.be.a('function');
    });

    it('is compatible with GET requests', () => {
      boilerplateServer.get('/get', (req, res) =>
        res.json(`${TEST_STRING} /get`)
      );

      return supertest(boilerplateServer)
        .get('/get')
        .expect(200)
        .then((res) => {
          expect(res.text).to.eql(JSON.stringify(`${TEST_STRING} /get`));
        });
    });

    it('is compatible with POST requests', () => {
      boilerplateServer.post('/post', (req, res) =>
        res.json(`${TEST_STRING} /post`)
      );

      return supertest(boilerplateServer)
        .post('/post')
        .expect(200)
        .then((res) => {
          expect(res.text).to.eql(JSON.stringify(`${TEST_STRING} /post`));
        });
    });

    it('is compatible with DELETE requests', () => {
      boilerplateServer.delete('/delete', (req, res) =>
        res.json(`${TEST_STRING} /delete`)
      );

      return supertest(boilerplateServer)
        .delete('/delete')
        .expect(200)
        .then((res) => {
          expect(res.text).to.eql(JSON.stringify(`${TEST_STRING} /delete`));
        });
    });

    it('is compatible with PUT requests', () => {
      boilerplateServer.put('/put', (req, res) =>
        res.json(`${TEST_STRING} /put`)
      );

      return supertest(boilerplateServer)
        .put('/put')
        .expect(200)
        .then((res) => {
          expect(res.text).to.eql(JSON.stringify(`${TEST_STRING} /put`));
        });
    });

    it('is compatible with PATCH requests', () => {
      boilerplateServer.patch('/patch', (req, res) =>
        res.json(`${TEST_STRING} /patch`)
      );

      return supertest(boilerplateServer)
        .patch('/patch')
        .expect(200)
        .then((res) => {
          expect(res.text).to.eql(JSON.stringify(`${TEST_STRING} /patch`));
        });
    });

    it('is compatible with HEAD requests', () => {
      boilerplateServer.head('/head', (req, res) =>
        res.status(TEST_HTTP_CODE).end()
      );

      return supertest(boilerplateServer)
        .head('/head')
        .expect(418);
    });

    it('works with generalised middleware', () => {
      boilerplateServer.use((req, res) => res.json(TEST_STRING));
      return supertest(boilerplateServer)
        .get('/')
        .expect(200)
        .then((res) => {
          expect(res.text).to.eql(JSON.stringify(TEST_STRING));
        });
    });
  });

  describe('secure http header', () => {
    const contentSecurityPolicy = {
      childSrc: ['\'self\''],
      connectSrc: ['\'self\''],
      defaultSrc: ['http://mydomain.com', '\'self\''],
      fontSrc: ['\'none\''],
      imgSrc: ['data: \'self\''],
      scriptSrc: ['\'self\''],
      styleSrc: ['\'self\''],
      reportUri: '/my-csp-report-uri',
    };

    const expectedContentSecurityPolicy =
      'child-src \'self\'; connect-src \'self\'; default-src http://mydomain.com \'self\'; font-src \'none\'; img-src data: \'self\'; script-src \'self\'; style-src \'self\'; report-uri /my-csp-report-uri';

    before(() => {
      require('./security').contentSecurityPolicy.instance = null;
    });

    it('implements them correctly', () => {
      const boilerplateServer = createServer({contentSecurityPolicy});
      boilerplateServer.use((req, res) => {
        res.status(200).json(req.cookies);
      });
      return supertest(boilerplateServer)
        .get('/')
        .expect(200)
        .then((res) => {
          expect(res.headers['content-security-policy'])
            .to.deep.equal(expectedContentSecurityPolicy);
          expect(res.headers['x-content-security-policy'])
            .to.deep.equal(expectedContentSecurityPolicy);
          expect(res.headers['x-webkit-csp'])
            .to.deep.equal(expectedContentSecurityPolicy);
        });
    });
  });

  describe('cookie parsing abilities', () => {
    const cookieName1 = '_testAppToken';
    const cookieName2 = '_testAppToken2';
    const cookieValue1 = '1234567890';
    const cookieValue2 = '0987654321';

    it('has them', () => {
      const cookieHeaderValue = [
        `${cookieName1}=${cookieValue1}`,
        `${cookieName2}=${cookieValue2}`,
      ].reduce((prev, curr) => `${prev};${curr}`, '');
      const boilerplateServer = createServer();
      boilerplateServer.use((req, res) => {
        res.status(200).json(req.cookies);
      });
      return supertest(boilerplateServer)
        .get('/')
        .set('Cookie', cookieHeaderValue)
        .expect(200)
        .then((res) => {
          expect(res.body[cookieName1]).to.eql(cookieValue1);
          expect(res.body[cookieName2]).to.eql(cookieValue2);
        });
    });

    it('can be disabled', () => {
      const cookieHeaderValue = [
        `${cookieName1}=${cookieValue1}`,
        `${cookieName2}=${cookieValue2}`,
      ].reduce((prev, curr) => `${prev};${curr}`, '');
      const boilerplateServer = createServer({
        enableCookieParser: false,
      });
      boilerplateServer.use((req, res) => {
        res.status(200).json(req.cookies);
      });
      return supertest(boilerplateServer)
        .get('/')
        .set('Cookie', cookieHeaderValue)
        .expect(200)
        .then((res) => {
          expect(res.body[cookieName1]).to.be.undefined;
          expect(res.body[cookieName2]).to.be.undefined;
        });
    });
  });

  describe('body parsing abilities', () => {
    it('includes json parsing', () => {
      const testData = require('../test/resources/test.json');
      const boilerplateServer = createServer();
      boilerplateServer.use((req, res) => res.status(200).json(req.body));
      return supertest(boilerplateServer)
        .post('/')
        .send(testData)
        .type('application/json')
        .expect(200)
        .then((res) => {
          expect(res.body).to.be.an('object');
          expect(res.body.error).to.be.undefined;
          expect(res.body).to.eql(testData);
        });
    });

    it('includes urlencoded parsing', () => {
      const testData = require('../test/resources/test.json');
      const boilerplateServer = createServer();
      boilerplateServer.use((req, res) => res.status(200).json(req.body));
      return supertest(boilerplateServer)
        .post('/')
        .send(testData)
        .type('application/x-www-form-urlencoded')
        .expect(200)
        .then((res) => {
          expect(res.body).to.be.an('object');
          expect(res.body.error).to.be.undefined;
          expect(res.body.testing.bigNumberIntegrity).to.eql(
            `${testData.testing.bigNumberIntegrity}`
          );
          expect(res.body.testing.booleanIntegrity).to.eql(
            `${testData.testing.booleanIntegrity}`
          );
          expect(res.body.testing.floatIntegrity).to.eql(
            `${testData.testing.floatIntegrity}`
          );
          expect(res.body.testing.nullIntegrity).to.be.empty;
          expect(res.body.testing.numberIntegrity).to.eql(
            `${testData.testing.numberIntegrity}`
          );
          expect(res.body.testing.objectIntegrity.a).to.eql(
            `${testData.testing.objectIntegrity.a}`
          );
          expect(res.body.testing.objectIntegrity.b).to.eql(
            `${testData.testing.objectIntegrity.b}`
          );
          expect(res.body.testing.objectIntegrity.c).to.be.undefined;
          expect(res.body.testing.objectIntegrity.d).to.be.empty;
        });
    });

    it('can be disabled', () => {
      const testData = require('../test/resources/test.json');
      const boilerplateServer = createServer({enableSerializer: false});
      boilerplateServer.post('/', (req, res) => res.json(req.body));
      return supertest(boilerplateServer)
        .post('/')
        .send(testData)
        .type('application/json')
        .expect(200)
        .then((res) => {
          expect(res.body).to.be.empty;
        });
    });

    describe('large sizes', () => {
      let boilerplateServer;
      const getFileWithSize = (size) =>
        fs.readFileSync(path.join(__dirname, `../test/resources/${size}.file`));

      beforeEach(() => {
        boilerplateServer = createServer();
        boilerplateServer.use((err, req, res, next) => {
          if (err.type === 'entity.too.large') {
            res.status(413).json('ok');
          } else {
            res.status(500).json(err.message);
          }
        });
      });

      it('can handle a 3mb file with base64 encoding', () => {
        const testData = {data: getFileWithSize('3mb').toString('base64')};
        boilerplateServer.post('/', (req, res) => res.json('ok'));
        return supertest(boilerplateServer)
          .post('/')
          .send(testData)
          .expect(200);
      });

      it('should not handle a 5mb file with base64 encoding', () => {
        const testData = {data: getFileWithSize('5mb').toString('base64')};
        return supertest(boilerplateServer)
          .post('/')
          .send(testData)
          .expect(413);
      });
    });
  });
});
