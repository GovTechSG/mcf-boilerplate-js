// duplicate of https://github.com/openzipkin/zipkin-js/blob/master/packages/zipkin-context-cls/src/CLSContext.js
// using cls-hooked for async/await support
import {createNamespace, getNamespace, Namespace} from 'cls-hooked';
import {MCF_TRACE_NAMESPACE} from '@mcf/logger';

export class CLSContext {
  private session: Namespace;
  constructor() {
    this.session = getNamespace(MCF_TRACE_NAMESPACE) || createNamespace(MCF_TRACE_NAMESPACE);
  }

  public setContext(ctx) {
    this.session.set(MCF_TRACE_NAMESPACE, ctx);
  }

  public getContext() {
    const currentCtx = this.session.get(MCF_TRACE_NAMESPACE);
    if (currentCtx != null) {
      return currentCtx;
    } else {
      return null; // explicitly return null (not undefined)
    }
  }

  public scoped(callable) {
    let result;
    this.session.run(() => {
      result = callable();
    });
    return result;
  }

  public letContext(ctx, callable) {
    return this.scoped(() => {
      this.setContext(ctx);
      return callable();
    });
  }
}
