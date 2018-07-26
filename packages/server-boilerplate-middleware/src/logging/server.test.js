import chai from 'chai';
import sinon from 'sinon';

const {expect} = chai;
const serverLoggingMiddleware = require('./server');

describe('logging/server', () => {
  it('exports a function', () => {
    expect(serverLoggingMiddleware).to.be.a('function');
  });

  it('has the right properties', () => {
    expect(serverLoggingMiddleware).to.has.keys([
      'getFormatter',
      'morgan',
      'provisionCustomTokens',
    ]);
  });

  describe('constructor()', () => {
    const logLevel = '_test_log_level';
    const hostnameType = '_test_hostname_type';

    let original = {};

    before(() => {
      original.instance = serverLoggingMiddleware.instance;
      sinon.stub(serverLoggingMiddleware, 'getFormatter');
      sinon.stub(serverLoggingMiddleware, 'morgan');
      sinon.stub(serverLoggingMiddleware, 'provisionCustomTokens');
    });

    beforeEach(() => {
      serverLoggingMiddleware.instance = null;
    });

    after(() => {
      serverLoggingMiddleware.instance = original.instance;
      serverLoggingMiddleware.getFormatter.restore();
      serverLoggingMiddleware.morgan.restore();
      serverLoggingMiddleware.provisionCustomTokens.restore();
    });

    afterEach(() => {
      serverLoggingMiddleware.getFormatter.resetHistory();
      serverLoggingMiddleware.morgan.resetHistory();
      serverLoggingMiddleware.provisionCustomTokens.resetHistory();
    });

    context(':logStream specified', () => {
      const logStream = '_test_log_stream';

      it('works as expected', () => {
        serverLoggingMiddleware({
          logLevel,
          logStream,
          hostnameType,
        });
        expect(serverLoggingMiddleware.provisionCustomTokens).to.be.calledOnce;
        expect(serverLoggingMiddleware.provisionCustomTokens)
          .to.be.calledWith(
            serverLoggingMiddleware.morgan,
            {hostnameType, tracer: {}}
          );
        expect(serverLoggingMiddleware.getFormatter).to.be.calledOnce;
        expect(serverLoggingMiddleware.getFormatter)
          .to.be.calledWith({logLevel});
        expect(serverLoggingMiddleware.morgan).to.be.calledOnce;
        expect(serverLoggingMiddleware.morgan).to.be.calledWith(
          undefined, {stream: logStream}
        );
      });
    });

    context(':logStream not specified', () => {
      it('works as expected', () => {
        serverLoggingMiddleware({
          logLevel,
          hostnameType,
        });
        expect(serverLoggingMiddleware.provisionCustomTokens).to.be.calledOnce;
        expect(serverLoggingMiddleware.provisionCustomTokens)
          .to.be.calledWith(
            serverLoggingMiddleware.morgan,
            {hostnameType, tracer: {}}
          );
        expect(serverLoggingMiddleware.getFormatter).to.be.calledOnce;
        expect(serverLoggingMiddleware.getFormatter)
          .to.be.calledWith({logLevel});
        expect(serverLoggingMiddleware.morgan).to.be.calledOnce;
      });
    });
  });

  describe('.provisionCustomTokens()', () => {
    const tokenSpy = sinon.spy();
    let morganLoggerMock;

    before(() => {
      morganLoggerMock = {
        token: tokenSpy,
      };
    });

    afterEach(() => {
      tokenSpy.resetHistory();
    });

    it('creates the correct tokens', () => {
      serverLoggingMiddleware.provisionCustomTokens(morganLoggerMock);
      expect(tokenSpy).to.be.calledWith('hostname');
      expect(tokenSpy).to.be.calledWith('trace-id');
      expect(tokenSpy).to.be.calledWith('parent-span-id');
      expect(tokenSpy).to.be.calledWith('span-id');
      expect(tokenSpy).to.be.calledWith('sampled');
    });
  });

  describe('.getFormatter()', () => {
    let tokenMock;

    before(() => {
      tokenMock = {
        'method': sinon.spy(),
        'url': sinon.spy(),
        'status': sinon.spy(),
        'res': sinon.spy(),
        'response-time': sinon.spy(),
        'trace-id': sinon.spy(),
        'span-id': sinon.spy(),
        'parent-span-id': sinon.spy(),
        'sampled': sinon.spy(),
        'http-version': sinon.spy(),
        'referrer': sinon.spy(),
        'remote-addr': sinon.spy(),
        'hostname': sinon.spy(),
        'date': sinon.spy(),
        'user-agent': sinon.spy(),
      };
    });

    afterEach(() => {
      Object.keys(tokenMock).forEach((key) => {
        tokenMock[key].resetHistory();
      });
    });

    it('returns a function', () => {
      expect(serverLoggingMiddleware.getFormatter()).to.be.a('function');
    });

    it('returns a function that returns a valid JSON string', () => {
      const fn = serverLoggingMiddleware.getFormatter();
      const returnedValue = fn(tokenMock, 'res', 'req');
      expect(returnedValue).to.be.a('string');
      expect(() => {
        JSON.parse(returnedValue);
      }).to.not.throw();
    });

    it('calls the required tokens as required', () => {
      const fn = serverLoggingMiddleware.getFormatter();
      fn(tokenMock, 'res', 'req');
      expect(tokenMock['method']).to.be.calledOnce;
      expect(tokenMock['url']).to.be.calledOnce;
      expect(tokenMock['status']).to.be.calledOnce;
      expect(tokenMock['res']).to.be.calledOnce;
      expect(tokenMock['response-time']).to.be.calledOnce;
      expect(tokenMock['trace-id']).to.be.calledOnce;
      expect(tokenMock['span-id']).to.be.calledOnce;
      expect(tokenMock['parent-span-id']).to.be.calledOnce;
      expect(tokenMock['sampled']).to.be.calledOnce;
      expect(tokenMock['http-version']).to.be.calledOnce;
      expect(tokenMock['referrer']).to.be.calledOnce;
      expect(tokenMock['remote-addr']).to.be.calledOnce;
      expect(tokenMock['hostname']).to.be.calledOnce;
      expect(tokenMock['date']).to.be.calledOnce;
      expect(tokenMock['user-agent']).to.be.calledOnce;
    });

    it('returns a correctly shaped object', () => {
      const fn = serverLoggingMiddleware.getFormatter();
      expect(JSON.parse(fn({
        'method': () => true,
        'url': () => true,
        'status': () => true,
        'res': () => true,
        'response-time': () => true,
        'trace-id': () => true,
        'span-id': () => true,
        'parent-span-id': () => true,
        'sampled': () => true,
        'http-version': () => true,
        'referrer': () => true,
        'remote-addr': () => true,
        'hostname': () => true,
        'date': () => true,
        'user-agent': () => true,
      }, {
        'hostname': true,
      }, '__res'))).to.have.keys([
        'level',
        'method',
        'url',
        'status',
        'contentLength',
        'responseTimeMs',
        'traceId',
        'spanId',
        'parentSpanId',
        'sampled',
        'httpVersion',
        'referrer',
        'remoteHostname',
        'remoteAddress',
        'serverHostname',
        'time',
        'userAgent',
      ]);
    });
  });
});
