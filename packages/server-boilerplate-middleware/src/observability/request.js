import fetch from 'node-fetch';
import url from 'url';
import zipkinInstrumentationFetch from 'zipkin-instrumentation-fetch';

const wrappedRequester = zipkinInstrumentationFetch.bind(null, fetch);

/**
 * Returns a function for use as a request object.
 *
 * @param {Object} options
 * @param {zipkin.Tracer} options.tracer
 *
 * @return {Requester} tracer
 */
export function createRequest({tracer}) {
  return (requestUrl, options) =>
    wrappedRequester({
      tracer,
      remoteServiceName:
        options.remoteServiceName || url.parse(requestUrl).hostname,
    })(requestUrl, options);
}
