'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = serializer;

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BODY_SIZE_LIMIT = '4200kb';

module.exports = serializer;

/**
 * Returns an express.js compatible middleware which transforms POST data into
 * a JSON data structure available at req.body.
 *
 * @return {Function}
 */
function serializer() {
  return _bodyParser2.default.json({
    extended: true,
    limit: BODY_SIZE_LIMIT
  });
}