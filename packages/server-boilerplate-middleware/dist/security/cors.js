'use strict';

module.exports = crossOriginResourceSharingMiddleware;

var DEFAULT_ALLOWED_HEADERS = [];
var DEFAULT_ALLOWED_METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'];
var DEFAULT_ALLOWED_ORIGINS = [];
var DEFAULT_CREDENTIALS = true;
var DEFAULT_PREFLIGHT_CONTINUE = true;

var instance = null;

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
function crossOriginResourceSharingMiddleware() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$allowedHeaders = _ref.allowedHeaders,
      allowedHeaders = _ref$allowedHeaders === undefined ? DEFAULT_ALLOWED_HEADERS : _ref$allowedHeaders,
      _ref$allowedMethods = _ref.allowedMethods,
      allowedMethods = _ref$allowedMethods === undefined ? DEFAULT_ALLOWED_METHODS : _ref$allowedMethods,
      _ref$allowedOrigins = _ref.allowedOrigins,
      allowedOrigins = _ref$allowedOrigins === undefined ? DEFAULT_ALLOWED_ORIGINS : _ref$allowedOrigins,
      _ref$credentials = _ref.credentials,
      credentials = _ref$credentials === undefined ? DEFAULT_CREDENTIALS : _ref$credentials,
      _ref$preflightContinu = _ref.preflightContinue,
      preflightContinue = _ref$preflightContinu === undefined ? DEFAULT_PREFLIGHT_CONTINUE : _ref$preflightContinu;

  if (instance === null) {
    var cors = require('cors');
    instance = cors({
      allowedHeaders: allowedHeaders,
      methods: allowedMethods,
      origin: allowedOrigins,
      credentials: credentials,
      preflightContinue: preflightContinue
    });
  }
  return instance;
}

crossOriginResourceSharingMiddleware.reset = function () {
  instance = null;
};