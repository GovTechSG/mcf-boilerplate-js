import * as fetch from 'node-fetch';
import url from 'url';
import {Tracer} from 'zipkin';
import zipkinInstrumentationFetch from 'zipkin-instrumentation-fetch';

const wrappedRequester = zipkinInstrumentationFetch.bind(null, fetch);

export interface ICreateRequestParameters {
  tracer: Tracer;
}

export interface ICreateRequestOptions extends fetch.RequestInit {
  remoteServiceName?: string;
}

export type IRequest = (requestUrl: string, options: ICreateRequestOptions) => Promise<fetch.Response>;

export function createRequest({tracer}: ICreateRequestParameters): IRequest {
  return (requestUrl, options) =>
    wrappedRequester({
      remoteServiceName: options.remoteServiceName || url.parse(requestUrl).hostname,
      tracer,
    })(requestUrl, options);
}
