'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createServer;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _serializer = require('./serializer');

var _serializer2 = _interopRequireDefault(_serializer);

var _security = require('./security');

var _security2 = _interopRequireDefault(_security);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = createServer;

/**
 * Returns a server that is:
 *  - compatible with Express.js interfaces
 *  - able to parse cookies
 *
 * @param {Object} [options={}]
 * @param {Boolean} [options.enableSerializer=true]
 * @param {Boolean} [options.enableCookieParser=true]
 * @param {Boolean} [options.enableContentSecurityPolicy=true]
 * @param {Boolean} [options.enableHttpHeadersSecurity=true]
 * @param {Object} [contentSecurityPolicy={}]
 *
 * @return {express.Application}
 */
function createServer() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$enableSerializer = _ref.enableSerializer,
      enableSerializer = _ref$enableSerializer === undefined ? true : _ref$enableSerializer,
      _ref$enableCookiePars = _ref.enableCookieParser,
      enableCookieParser = _ref$enableCookiePars === undefined ? true : _ref$enableCookiePars,
      _ref$enableHttpHeader = _ref.enableHttpHeadersSecurity,
      enableHttpHeadersSecurity = _ref$enableHttpHeader === undefined ? true : _ref$enableHttpHeader,
      _ref$enableContentSec = _ref.enableContentSecurityPolicy,
      enableContentSecurityPolicy = _ref$enableContentSec === undefined ? true : _ref$enableContentSec,
      _ref$contentSecurityP = _ref.contentSecurityPolicy,
      contentSecurityPolicy = _ref$contentSecurityP === undefined ? {} : _ref$contentSecurityP;

  var server = (0, _express2.default)();
  if (enableCookieParser) {
    server.use((0, _cookieParser2.default)());
  }
  if (enableSerializer) {
    server.use((0, _serializer2.default)());
  }
  if (enableHttpHeadersSecurity) {
    server.use(_security2.default.httpHeaders());
  }
  if (enableContentSecurityPolicy) {
    var x = _security2.default.contentSecurityPolicy(contentSecurityPolicy);
    server.use(x);
  }

  return server;
}