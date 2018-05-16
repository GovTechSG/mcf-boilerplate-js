import createServer from './';
import supertest from 'supertest';
import {expect} from 'chai';

describe('createServer()', () => {
  const TEST_STRING = '__test_string';
  const TEST_HTTP_CODE = 418;

  it('returns an Express compatible server', () => {
    const boilerplateServer = createServer();
    expect(boilerplateServer.listen).to.be.a('function');

    boilerplateServer
      .get('/get', (req, res) => res.json(`${TEST_STRING} /get`));
    boilerplateServer
      .post('/post', (req, res) => res.json(`${TEST_STRING} /post`));
    boilerplateServer
      .delete('/delete', (req, res) => res.json(`${TEST_STRING} /delete`));
    boilerplateServer
      .put('/put', (req, res) => res.json(`${TEST_STRING} /put`));
    boilerplateServer
      .patch('/patch', (req, res) => res.json(`${TEST_STRING} /patch`));
    boilerplateServer
      .options('/options', (req, res) => res.json(`${TEST_STRING} /options`));
    boilerplateServer
      .head('/head', (req, res) => res.status(TEST_HTTP_CODE).end());
    boilerplateServer
      .use((req, res) => res.json(TEST_STRING));

    return Promise.all([
      supertest(boilerplateServer)
        .get('/').expect(200).then((res) => {
          expect(res.text).to.eql(JSON.stringify(TEST_STRING));
        }),
      supertest(boilerplateServer)
        .get('/get').expect(200).then((res) => {
          expect(res.text).to.eql(JSON.stringify(`${TEST_STRING} /get`));
        }),
      supertest(boilerplateServer)
        .post('/post').expect(200).then((res) => {
          expect(res.text).to.eql(JSON.stringify(`${TEST_STRING} /post`));
        }),
      supertest(boilerplateServer)
        .put('/put').expect(200).then((res) => {
          expect(res.text).to.eql(JSON.stringify(`${TEST_STRING} /put`));
        }),
      supertest(boilerplateServer)
        .delete('/delete').expect(200).then((res) => {
          expect(res.text).to.eql(JSON.stringify(`${TEST_STRING} /delete`));
        }),
      supertest(boilerplateServer)
        .patch('/patch').expect(200).then((res) => {
          expect(res.text).to.eql(JSON.stringify(`${TEST_STRING} /patch`));
        }),
      supertest(boilerplateServer)
        .options('/options').expect(200).then((res) => {
          expect(res.text).to.eql(JSON.stringify(`${TEST_STRING} /options`));
        }),
      supertest(boilerplateServer)
        .head('/head').expect(418),
      ]);
    });

  it('can be imported using require', () => {
    expect(createServer).to.eql(require('./index'));
  });

  it('has cookie parsing abilities', () => {
    const cookieName1 = '_testAppToken';
    const cookieName2 = '_testAppToken2';
    const cookieValue1 = '1234567890';
    const cookieValue2 = '0987654321';
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
});
