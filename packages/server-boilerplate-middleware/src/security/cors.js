module.exports = crossOriginResourceSharingMiddleware;

const DEFAULT_ALLOWED_HEADERS = [];
const DEFAULT_ALLOWED_METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'];
const DEFAULT_ALLOWED_ORIGINS = [];
const DEFAULT_CREDENTIALS = true;
const DEFAULT_PREFLIGHT_CONTINUE = true;

let instance = null;

/**
 * Returns an Express compatible middleware that provides cross-origin-resource-
 * sharing capabilities.
 *
 * @param {Object} [options={}]
 * @param {Array<String>} [options.allowedHeaders=[]]
 * @param {Array<String>} [options.allowedMethods=[]]
 * @param {Array<String|RegExp>} [options.allowedOrigins=[]]
 * @param {Boolean} [options.credentials=true]
 *
 * @return {Function}
 */
function crossOriginResourceSharingMiddleware({
  allowedHeaders = DEFAULT_ALLOWED_HEADERS,
  allowedMethods = DEFAULT_ALLOWED_METHODS,
  allowedOrigins = DEFAULT_ALLOWED_ORIGINS,
  credentials = DEFAULT_CREDENTIALS,
  preflightContinue = DEFAULT_PREFLIGHT_CONTINUE,
} = {}) {
  if (instance === null) {
    const cors = require('cors');
    instance = cors({
      allowedHeaders,
      methods: allowedMethods,
      origin: allowedOrigins,
      credentials,
      preflightContinue,
    });
  }
  return instance;
}

crossOriginResourceSharingMiddleware.reset = () => {
  instance = null;
};
