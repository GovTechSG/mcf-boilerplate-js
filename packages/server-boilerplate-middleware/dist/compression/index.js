'use strict';

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var KILOBYTE = 1024;
var DEFAULT_CHUNK_SIZE = 16 * KILOBYTE;
var DEFAULT_COMPRESSION_LEVEL = 9;
var DEFAULT_THRESHOLD = 300 * KILOBYTE;

module.exports = compressionMiddleware;

/**
 * Returns an Express compatible middleware that provides response
 * compression.
 *
 * @param {Object} options
 * @param {Number} [options.chunkSize]
 * @param {Number} [options.threshold]
 * @param {Number} [options.level]
 *
 * @return {Function}
 */
function compressionMiddleware() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$chunkSize = _ref.chunkSize,
      chunkSize = _ref$chunkSize === undefined ? DEFAULT_CHUNK_SIZE : _ref$chunkSize,
      _ref$level = _ref.level,
      level = _ref$level === undefined ? DEFAULT_COMPRESSION_LEVEL : _ref$level,
      _ref$threshold = _ref.threshold,
      threshold = _ref$threshold === undefined ? DEFAULT_THRESHOLD : _ref$threshold;

  if (compressionMiddleware.instance === null) {
    compressionMiddleware.instance = compressionMiddleware.compression({
      chunkSize: chunkSize,
      level: level,
      threshold: threshold
    });
  }
  return compressionMiddleware.instance;
}

compressionMiddleware.compression = _compression2.default;
compressionMiddleware.instance = null;

compressionMiddleware.constant = {
  defaultChunkSize: DEFAULT_CHUNK_SIZE,
  defaultLevel: DEFAULT_COMPRESSION_LEVEL,
  defaultThreshold: DEFAULT_THRESHOLD
};