import * as chai from 'chai';
import {ConsoleRecorder, ExplicitContext, sampler, Tracer} from 'zipkin';
import {createRequest} from './';

const {expect} = chai;

describe('@mcf/request', () => {
  it('works', () => {
    const {CountingSampler} = sampler;
    expect(() => {
      createRequest({
        tracer: new Tracer({
          ctxImpl: new ExplicitContext(),
          localServiceName: 'bla',
          recorder: new ConsoleRecorder(),
          sampler: new CountingSampler(1),
          traceId128Bit: true,
        }),
      });
    }).to.not.throw();
  });
});
