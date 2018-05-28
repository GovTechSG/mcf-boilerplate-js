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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = createServer;

/**
 * Returns a server that is:
 *  - compatible with Express.js interfaces
 *  - able to parse cookies
 *
 * @param {Object} [options={}]
 * @param {Boolean} [options.disableSerializer=false]
 *
 * @return {express.Application}
 */
function createServer() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$disableSerialize = _ref.disableSerializer,
      disableSerializer = _ref$disableSerialize === undefined ? false : _ref$disableSerialize,
      _ref$disableCookiePar = _ref.disableCookieParser,
      disableCookieParser = _ref$disableCookiePar === undefined ? false : _ref$disableCookiePar;

  var server = (0, _express2.default)();
  if (!disableCookieParser) {
    server.use((0, _cookieParser2.default)());
  }
  if (!disableSerializer) {
    server.use((0, _serializer2.default)());
  }

  return server;
}