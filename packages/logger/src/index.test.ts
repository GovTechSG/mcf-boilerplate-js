import chai from 'chai';
import sinon, {match, SinonSpy} from 'sinon';
import sinonChai from 'sinon-chai';
import winston from 'winston';
import * as Transport from 'winston-transport';
import {createLogger} from './';

chai.use(sinonChai);
const {expect} = chai;

describe('@mcf/logger', () => {
  let consoleLogger: Transport;
  let spy: SinonSpy;

  beforeEach(() => {
    consoleLogger = new winston.transports.Console();
    spy = sinon.spy(consoleLogger, 'log');
  });

  describe('level', () => {
    it('should ignore logs levels lower than info', () => {
      const logger = createLogger({
        level: 'silly',
        transports: [consoleLogger],
      });

      log(logger);
      expect(spy.callCount).to.equal(6);
      expect(spy).to.have.been.calledWith(match.has('message', 'silly'));
      expect(spy).to.have.been.calledWith(match.has('message', 'debug'));
      expect(spy).to.have.been.calledWith(match.has('message', 'http'));
      expect(spy).to.have.been.calledWith(match.has('message', 'info'));
      expect(spy).to.have.been.calledWith(match.has('message', 'warn'));
      expect(spy).to.have.been.calledWith(match.has('message', 'error'));
    });
    it('should ignore logs levels lower than debug', () => {
      const logger = createLogger({
        level: 'debug',
        transports: [consoleLogger],
      });

      log(logger);
      expect(spy.callCount).to.equal(5);
      expect(spy).to.have.been.calledWith(match.has('message', 'debug'));
      expect(spy).to.have.been.calledWith(match.has('message', 'http'));
      expect(spy).to.have.been.calledWith(match.has('message', 'info'));
      expect(spy).to.have.been.calledWith(match.has('message', 'warn'));
      expect(spy).to.have.been.calledWith(match.has('message', 'error'));
    });
    it('should ignore logs levels lower than http', () => {
      const logger = createLogger({
        level: 'http',
        transports: [consoleLogger],
      });

      log(logger);
      expect(spy.callCount).to.equal(4);
      expect(spy).to.have.been.calledWith(match.has('message', 'http'));
      expect(spy).to.have.been.calledWith(match.has('message', 'info'));
      expect(spy).to.have.been.calledWith(match.has('message', 'warn'));
      expect(spy).to.have.been.calledWith(match.has('message', 'error'));
    });
    it('should ignore logs levels lower than info', () => {
      const logger = createLogger({
        level: 'info',
        transports: [consoleLogger],
      });

      log(logger);
      expect(spy.callCount).to.equal(3);
      expect(spy).to.have.been.calledWith(match.has('message', 'info'));
      expect(spy).to.have.been.calledWith(match.has('message', 'warn'));
      expect(spy).to.have.been.calledWith(match.has('message', 'error'));
    });
    it('should ignore logs levels lower than warn', () => {
      const logger = createLogger({
        level: 'warn',
        transports: [consoleLogger],
      });

      log(logger);
      expect(spy.callCount).to.equal(2);
      expect(spy).to.have.been.calledWith(match.has('message', 'warn'));
      expect(spy).to.have.been.calledWith(match.has('message', 'error'));
    });
    it('should ignore logs levels lower than error', () => {
      const logger = createLogger({
        level: 'error',
        transports: [consoleLogger],
      });

      log(logger);
      expect(spy.callCount).to.equal(1);
      expect(spy).to.have.been.calledWith(match.has('message', 'error'));
    });
  });
  describe('child logger', () => {
    it('should be able to create child logger with same options', () => {
      const logger = createLogger({
        level: 'error',
        transports: [consoleLogger],
      });
      const childLogger = logger.child({});

      log(childLogger);
      expect(spy.callCount).to.equal(1);
      expect(spy).to.have.been.calledWith(match.has('message', 'error'));
    });
  });
  describe('errors', () => {
    let environment: string | undefined;
    beforeEach(() => {
      environment = process.env.NODE_ENV;
    });
    afterEach(() => {
      process.env.NODE_ENV = environment;
    });
    it('should display error message and add error in meta when logging Error object through error level method', () => {
      const logger = createLogger({
        level: 'error',
        transports: [consoleLogger],
      });

      logger.error(new Error('oops'));
      expect(spy.callCount).to.equal(1);
      expect(spy).to.have.been.calledWith(
        match({
          message: 'oops',
          meta: {
            error: {
              message: 'oops',
              name: 'Error',
              stack: match.string,
            },
          },
        }),
      );
    });
    it('should display error message and add error in meta when logging Error object through warn level method', () => {
      const logger = createLogger({
        level: 'warn',
        transports: [consoleLogger],
      });

      logger.warn(new Error('oops'));
      expect(spy.callCount).to.equal(1);
      expect(spy).to.have.been.calledWith(
        match({
          message: 'oops',
          meta: {
            error: {
              message: 'oops',
              name: 'Error',
              stack: match.string,
            },
          },
        }),
      );
    });
    it('should display custom message and add error in meta when logging custom message and passing error in error meta object', () => {
      const logger = createLogger({
        level: 'error',
        transports: [consoleLogger],
      });

      logger.error('oh no', {error: new Error('oops')});
      expect(spy.callCount).to.equal(1);
      expect(spy).to.have.been.calledWith(
        match({
          message: 'oh no',
          meta: {
            error: {
              message: 'oops',
              name: 'Error',
              stack: match.string,
            },
          },
        }),
      );
    });
    it('should display custom message and add error in meta when logging custom message and passing error as meta', () => {
      const logger = createLogger({
        level: 'error',
        transports: [consoleLogger],
      });

      logger.error('oh no again', new Error('oops'));
      expect(spy.callCount).to.equal(1);
      expect(spy).to.have.been.calledWith(
        match({
          message: 'oh no again',
          meta: {
            error: {
              message: 'oops',
              name: 'Error',
              stack: match.string,
            },
          },
        }),
      );
    });
    it('should display handle custom errors', () => {
      const logger = createLogger({
        level: 'error',
        transports: [consoleLogger],
      });
      class AccessDeniedError extends Error {
        public code = 'ACCESS_DENIED';
        public name = 'AccessDeniedError';
        public message = 'You are denied from accessing the service';
      }

      logger.error('olala', new AccessDeniedError());
      expect(spy.callCount).to.equal(1);
      expect(spy).to.have.been.calledWith(
        match({
          message: 'olala',
          meta: {
            error: {
              code: 'ACCESS_DENIED',
              message: 'You are denied from accessing the service',
              name: 'AccessDeniedError',
              stack: match.string,
            },
          },
        }),
      );
    });
    it('should display custom message and add error in meta when logging custom message and passing error as meta', () => {
      const logger = createLogger({
        level: 'error',
        transports: [consoleLogger],
      });
      process.env.NODE_ENV = 'production';
      logger.error('why me', new Error('oops'));
      expect(spy.callCount).to.equal(1);
      expect(spy).to.have.been.calledWith(
        match({
          message: 'why me',
          meta: {
            error: {
              message: 'oops',
              name: 'Error',
            },
          },
        }),
      );
      expect(spy).to.have.been.calledWith(
        match((value) => {
          return value.meta.error.stack === undefined;
        }, 'stack as undefined'),
      );
    });
  });
});

function log(logger: any) {
  logger.silly('silly');
  logger.debug('debug');
  logger.http('http');
  logger.info('info');
  logger.warn('warn');
  logger.error('error');
}
