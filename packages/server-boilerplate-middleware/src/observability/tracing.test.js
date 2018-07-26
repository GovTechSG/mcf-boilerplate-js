import chai from 'chai';
import express from 'express';
import * as zipkin from 'zipkin';
import {createTracer} from './tracing';

const {expect} = chai;

describe.only('observability/tracing', () => {
  it('works', () => {
    expect(() => {
      createTracer();
    }).to.not.throw();
  });
  // / works

  it('returns an object with the correct methods', () => {
    const expectedKeys = [
      'getContext',
      'getLogger',
      'getMiddleware',
      'getRecorder',
      'getSampler',
      'getTracer',
    ];
    const tracing = createTracer();
    expectedKeys.forEach((key) => {
      expect(tracing).to.have.property(key);
      expect(tracing[key]).to.be.a('function');
    });
  });
  // / returns an object with the correct methods

  describe('.getContext()', () => {
    let tracing;
    let context;

    before(() => {
      tracing = createTracer();
      context = tracing.getContext();
    });

    it('has the correct properties', () => {
      expect(context).to.have.property('currentCtx');
    });

    it('returns a reference object', () => {
      const contextCopy = context;
      context.currentCtx = {
        traceId: -1,
      };
      expect(contextCopy.currentCtx.traceId).to.deep.equal(-1);
    });
  });
  // / .getContext()

  describe('.getTracer()', () => {
    let tracing;
    let tracer;

    before(() => {
      tracing = createTracer();
      tracer = tracing.getTracer();
    });

    it('returns a tracer', () => {
      expect(tracer).to.be.instanceof(zipkin.Tracer);
    });
  });
  // / .getTracer()

  describe('.getMiddleware()', () => {
    let tracing;
    let middleware;

    before(() => {
      tracing = createTracer();
      middleware = tracing.getMiddleware();
    });

    it('returns an Express compatible middleware', () => {
      const app = express();
      expect(middleware).to.be.instanceof(Array);
      expect(middleware).to.have.length(2);
      expect(() => {
        app.use(middleware);
      }).to.not.throw();
    });
  });
  // / .getMiddleware
});
