import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import packageJson from '../package.json';
import logger from './';

chai.use(sinonChai);
const {expect} = chai;

describe('@mcf/logger', () => {
  it('is correctly named', () => {
    expect(packageJson.name).to.equal('@mcf/logger');
  });

  it('exports an object', () => {
    expect(logger).to.be.an('object');
  });

  describe('schema', () => {
    it('has the correct keys', () => {
      expect(logger).to.have.keys([
        'DEFAULT',
        'config',
        'context',
        'getStream',
        'instance',
        'init',
        'reset',
      ]);
    });

    it('exports the correct properties', () => {
      expect(logger.DEFAULT).to.be.an('object');
      expect(logger.config).to.be.an('object');
      expect(logger.context).to.be.an('object');
    });

    it('exports the correct methods', () => {
      expect(logger.getStream).to.be.a('function');
      expect(logger.init).to.be.a('function');
      expect(logger.reset).to.be.a('function');
    });
  });

  describe('.DEFAULT', () => {
    it('defines the correct default log levels', () => {
      expect(logger.DEFAULT.LOG_LEVELS).to.have.keys([
        'error',
        'warn',
        'info',
        'access',
        'debug',
        'silly',
      ]);
    });

    it('defines the correct default log level', () => {
      expect(logger.DEFAULT.LOG_LEVEL).to.equal('silly');
    });

    it('defines the correct default log transporters', () => {
      const {Console} = require('winston').transports;
      expect(logger.DEFAULT.LOG_TRANSPORTERS).to.be.an('Array');
      expect(logger.DEFAULT.LOG_TRANSPORTERS).to.have.length(1);
      expect(logger.DEFAULT.LOG_TRANSPORTERS[0]).to.be.an.instanceof(Console);
    });
  });

  describe('.context', () => {
    describe('schema', () => {
      it('has the correct keys', () => {
        expect(logger.context).to.have.keys([
          'instance',
          'get',
          'set',
          'reset',
        ]);
      });

      it('exports the correct methods', () => {
        expect(logger.context.get).to.be.a('function');
        expect(logger.context.set).to.be.a('function');
        expect(logger.context.reset).to.be.a('function');
      });
    });

    describe('.get()', () => {
      const mockContext = {
        currentCtx: {
          spanId: '__test_span_id',
          traceId: '__test_trace_id',
          parentId: '__test_parent_id',
        },
      };

      context('context not set', () => {
        before(() => {
          logger.context.reset();
        });

        it('returns undefined', () => {
          expect(logger.context.get()).to.be.undefined;
        });
      });

      context('context has been set', () => {
        before(() => {
          logger.context.set(mockContext);
        });

        it('returns the current context', () => {
          expect(logger.context.get()).to.deep.equal(
            mockContext.currentCtx
          );
        });
      });
    });

    describe('.set()', () => {
      const original = {};

      before(() => {
        original.contextInstance = logger.context.instance;
      });

      after(() => {
        logger.context.instance = original.contextInstance;
      });

      it('sets the .context.instance property', () => {
        logger.context.set('__test_context');
        expect(logger.context.instance).to.eql('__test_context');
      });
    });

    describe('.reset()', () => {
      const original = {};

      before(() => {
        original.contextInstance = logger.context.instance;
      });

      after(() => {
        logger.context.instance = original.contextInstance;
      });

      it('unsets the .context.instance property', () => {
        logger.context.instance = '__test_context_instance';
        logger.context.reset();
        expect(logger.context.instance).to.be.null;
      });
    });
  });

  describe('.getStream()', () => {
    const {getStream} = logger;
    const spy = {};

    before(() => {
      spy.__test_log_level = sinon.spy();
      logger.__test_log_level = spy.__test_log_level;
    });

    after(() => {
      delete logger.__test_log_level;
    });

    it('returns an object with a write method', () => {
      const stream = getStream('__test_log_level');
      expect(stream).to.be.an('object');
      expect(stream).to.have.key('write');
      stream.write('__test_log_stream');
      expect(spy.__test_log_level).to.be.calledOnce;
      expect(spy.__test_log_level).to.be.calledWith('__test_log_stream');
    });
  });

  describe('.init()', () => {
    const logLevels = {
      none: 0,
      one: 1,
    };
    const logLevel = 'one';
    const openTracingContext = '__test_open_tracing_context';

    const original = {};

    before(() => {
      original.instance = logger.instance;
      original.logLevels = logger.config.levels;
      original.logLevel = logger.config.level;
      original.contextInstance = logger.context.instance;
      logger.instance = null;
      logger.init({
        logLevels,
        logLevel,
        openTracingContext,
      });
    });

    after(() => {
      logger.reset();
      logger.context.instance = original.contextInstance;
      logger.config.level = original.logLevel;
      logger.config.levels = original.logLevels;
      logger.instance = original.instance;
    });

    it('saves the configuration into .config', () => {
      expect(logger.config.levels).to.deep.equal(logLevels);
      expect(logger.config.level).to.deep.equal(logLevel);
    });

    it('sets the .instance property with a logger instance', () => {
      expect(logger.instance).to.not.be.null;
      expect(logger.instance).to.not.be.a('function');
    });

    it('sets .context.instance property if openTracingContext is set', () => {
      expect(logger.context.instance).to.deep.equal(openTracingContext);
    });

    it('creates interface mappers for specified log levels', () => {
      expect(logger).to.include.keys(Object.keys(logLevels));
    });

    context(':logLevel is a string', () => {
      const logLevels = {correct: 1};
      const logLevel = 'notFound';

      it('throws an error if the :logLevel is not found in :logLevels', () => {
        expect(() => {
          logger.init({logLevels, logLevel});
        }).to.throw();
      });
    });

    context(':logLevel is a number', () => {
      const logLevels = {correct: 1};
      const logLevel = 0;

      it('throws an error if the :logLevel is not found in :logLevels', () => {
        expect(() => {
          logger.init({logLevels, logLevel});
        }).to.throw();
      });
    });
  });

  describe('.reset()', () => {
    const logLevels = {none: 0, one: 1};
    const logLevel = 'one';
    const openTracingContext = '__test_open_tracing_context';

    beforeEach(() => {
      logger.init({
        logLevels,
        logLevel,
        openTracingContext,
      });
    });

    it('resets the custom interfaces', () => {
      expect(logger).to.include.keys(['none', 'one']);
      logger.reset();
      expect(logger).to.not.include.keys(['none', 'one']);
    });

    it('resets the logger configuration', () => {
      expect(logger.config.levels).to.not.be.undefined;
      expect(logger.config.level).to.not.be.undefined;
      logger.reset();
      expect(logger.config.levels).to.be.undefined;
      expect(logger.config.level).to.be.undefined;
    });

    it('resets the logger instance', () => {
      expect(logger.instance).to.not.be.null;
      logger.reset();
      expect(logger.instance).to.be.null;
    });

    it('resets the logger context', () => {
      expect(logger.context.instance).to.not.be.null;
      logger.reset();
      expect(logger.context.instance).to.be.null;
    });
  });
});
