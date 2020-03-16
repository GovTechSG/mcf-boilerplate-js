import {CLSContext} from './cls-context';
import {expect} from 'chai';

describe('CLSContext', () => {
  it('should start with context null', () => {
    const ctx = new CLSContext();
    expect(ctx.getContext()).to.equal(null);
  });

  it('should set an inner context', () => {
    const ctx = new CLSContext();
    ctx.letContext('foo', () => {
      expect(ctx.getContext()).to.equal('foo');
    });
  });

  it('should set an inner context with setContext', () => {
    const ctx = new CLSContext();
    ctx.scoped(() => {
      ctx.setContext('bla');
      expect(ctx.getContext()).to.equal('bla');
    });
    expect(ctx.getContext()).to.equal(null);
  });

  it('should return the inner value', () => {
    const ctx = new CLSContext();
    const returnValue = ctx.letContext('foo', () => 123);
    expect(returnValue).to.equal(123);
  });

  it('should be reset after the callback', () => {
    const ctx = new CLSContext();
    ctx.letContext('foo', () => {
      // do nothing
    });
    expect(ctx.getContext()).to.equal(null);
  });

  it('should support nested contexts', () => {
    const ctx = new CLSContext();
    const finalReturnValue = ctx.letContext('foo', () => {
      expect(ctx.getContext()).to.equal('foo');
      const innerReturnValue = ctx.letContext('bar', () => {
        expect(ctx.getContext()).to.equal('bar');
        return 1;
      });
      expect(ctx.getContext()).to.equal('foo');
      return innerReturnValue + 2;
    });
    expect(ctx.getContext()).to.equal(null);
    expect(finalReturnValue).to.equal(3);
  });

  it('should support CLS contexts (setTimeout etc)', (done) => {
    const ctx = new CLSContext();
    function callback() {
      expect(ctx.getContext()).to.equal('foo');
      done();
    }
    ctx.letContext('foo', () => {
      setTimeout(callback, 10);
    });
  });
  it('supports async/await contexts', async () => {
    const ctx = new CLSContext();
    const log = async () => {
      return ctx.getContext();
    };

    const afn = async () => {
      const cid1 = await log();
      const cid2 = await log();
      return {cid1, cid2};
    };

    const newP = async (id) => {
      const {cid1, cid2} = await ctx.letContext(id, () => afn());
      expect(cid1).to.equal(121);
      expect(cid2).to.equal(121);
    };
    await newP(121);
  });
});
