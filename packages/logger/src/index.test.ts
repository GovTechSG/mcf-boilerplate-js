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

  describe('logLevel', () => {
    it('should ignore logs levels lower than info', () => {
      const logger = createLogger({
        logLevel: 'silly',
        logTransporters: [consoleLogger],
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
        logLevel: 'debug',
        logTransporters: [consoleLogger],
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
        logLevel: 'http',
        logTransporters: [consoleLogger],
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
        logLevel: 'info',
        logTransporters: [consoleLogger],
      });

      log(logger);
      expect(spy.callCount).to.equal(3);
      expect(spy).to.have.been.calledWith(match.has('message', 'info'));
      expect(spy).to.have.been.calledWith(match.has('message', 'warn'));
      expect(spy).to.have.been.calledWith(match.has('message', 'error'));
    });
    it('should ignore logs levels lower than warn', () => {
      const logger = createLogger({
        logLevel: 'warn',
        logTransporters: [consoleLogger],
      });

      log(logger);
      expect(spy.callCount).to.equal(2);
      expect(spy).to.have.been.calledWith(match.has('message', 'warn'));
      expect(spy).to.have.been.calledWith(match.has('message', 'error'));
    });
    it('should ignore logs levels lower than error', () => {
      const logger = createLogger({
        logLevel: 'error',
        logTransporters: [consoleLogger],
      });

      log(logger);
      expect(spy.callCount).to.equal(1);
      expect(spy).to.have.been.calledWith(match.has('message', 'error'));
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
