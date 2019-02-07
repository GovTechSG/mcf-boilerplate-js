import fetch from 'node-fetch';
import {Tracer} from 'zipkin';
import wrapFetch from 'zipkin-instrumentation-fetch';

export const createRequest = (tracer: Tracer) => (remoteServiceName: string) =>
  wrapFetch(fetch, {
    remoteServiceName,
    tracer,
  });
