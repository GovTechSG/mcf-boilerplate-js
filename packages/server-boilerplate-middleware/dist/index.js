'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createServer;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BODY_SIZE_LIMIT = '4200kb';

module.exports = createServer;

/**
 * Returns a server that is:
 *  - compatible with Express.js interfaces
 *  - able to parse cookies
 *
 * @param {Object} [options={}]
 * @param {Boolean} [options.disableBodyParser=false]
 *
 * @return {express.Application}
 */
function createServer() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$disableBodyParse = _ref.disableBodyParser,
      disableBodyParser = _ref$disableBodyParse === undefined ? false : _ref$disableBodyParse;

  var server = (0, _express2.default)();
  server.use((0, _cookieParser2.default)());
  if (!disableBodyParser) {
    server.use(_bodyParser2.default.json({
      extended: true,
      limit: BODY_SIZE_LIMIT
    }));
  }

  return server;
}