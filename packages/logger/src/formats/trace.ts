import {getNamespace} from 'cls-hooked';
import {format} from 'winston';
import {TransformableInfo} from 'logform';

export const MCF_TRACE_NAMESPACE = 'mcf-trace';
export const traceFormat = format((info: TransformableInfo) => {
  const namespace = getNamespace(MCF_TRACE_NAMESPACE);
  if (namespace && namespace.active && namespace.active[MCF_TRACE_NAMESPACE]) {
    return {
      ...info,
      meta: {
        ...info.meta,
        trace: {
          parentId: namespace.active[MCF_TRACE_NAMESPACE].parentId,
          spanId: namespace.active[MCF_TRACE_NAMESPACE].spanId,
          traceId: namespace.active[MCF_TRACE_NAMESPACE].traceId,
        },
      },
    };
  }
  return info;
});
