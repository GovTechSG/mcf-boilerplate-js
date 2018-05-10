import BoilerplateServer from './';
import supertest from 'supertest';
import {expect} from 'chai';

describe('BoilerplateServer()', () => {
  const TEST_STRING = '__test_string';
  const TEST_HTTP_CODE = 418;

  it('returns an Express compatible server', () => {
    const boilerplateServer = BoilerplateServer();
    boilerplateServer.get('/get', (req, res) => res.json(`${TEST_STRING} /get`));
    boilerplateServer.post('/post', (req, res) => res.json(`${TEST_STRING} /post`));
    boilerplateServer.delete('/delete', (req, res) => res.json(`${TEST_STRING} /delete`));
    boilerplateServer.put('/put', (req, res) => res.json(`${TEST_STRING} /put`));
    boilerplateServer.patch('/patch', (req, res) => res.json(`${TEST_STRING} /patch`));
    boilerplateServer.options('/options', (req, res) => res.json(`${TEST_STRING} /options`));
    boilerplateServer.head('/head', (req, res) => res.status(TEST_HTTP_CODE).end());
    boilerplateServer.use((req, res) => res.json(TEST_STRING));
    expect(boilerplateServer.listen).to.be.a('function');
    return Promise.all([
      supertest(boilerplateServer).get('/').expect(200).then((res) => {
        expect(res.text).to.eql(JSON.stringify(TEST_STRING));
      }),
      supertest(boilerplateServer).get('/get').expect(200).then((res) => {
        expect(res.text).to.eql(JSON.stringify(`${TEST_STRING} /get`));
      }),
      supertest(boilerplateServer).post('/post').expect(200).then((res) => {
        expect(res.text).to.eql(JSON.stringify(`${TEST_STRING} /post`));
      }),
      supertest(boilerplateServer).put('/put').expect(200).then((res) => {
        expect(res.text).to.eql(JSON.stringify(`${TEST_STRING} /put`));
      }),
      supertest(boilerplateServer).delete('/delete').expect(200).then((res) => {
        expect(res.text).to.eql(JSON.stringify(`${TEST_STRING} /delete`));
      }),
      supertest(boilerplateServer).patch('/patch').expect(200).then((res) => {
        expect(res.text).to.eql(JSON.stringify(`${TEST_STRING} /patch`));
      }),
      supertest(boilerplateServer).options('/options').expect(200).then((res) => {
        expect(res.text).to.eql(JSON.stringify(`${TEST_STRING} /options`));
      }),
      supertest(boilerplateServer).head('/head').expect(418),
    ]);
  });
});
