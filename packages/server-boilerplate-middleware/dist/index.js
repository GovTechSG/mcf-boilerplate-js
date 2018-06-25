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

var _compression = require('./compression');

var _compression2 = _interopRequireDefault(_compression);

var _observability = require('./observability');

var _observability2 = _interopRequireDefault(_observability);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_METRICS_ENDPOINT = '/metrics';

module.exports = createServer;

/**
 * Returns a server that is:
 *  - compatible with Express.js interfaces
 *  - able to parse cookies
 *
 * @param {Object} [options={}]
 * @param {Boolean} [options.enableCORS=true]
 * @param {Boolean} [options.enableCompression=true]
 * @param {Boolean} [options.enableContentSecurityPolicy=true]
 * @param {Boolean} [options.enableCookieParser=true]
 * @param {Boolean} [options.enableHttpHeadersSecurity=true]
 * @param {Boolean} [options.enableMetricsCollection=true]
 * @param {Boolean} [options.enableSerializer=true]
 * @param {Object} [contentSecurityPolicy={}]
 * @param {Array<String>} contentSecurityPolicy.childSrc
 * @param {Array<String>} contentSecurityPolicy.connectSrc
 * @param {Array<String>} contentSecurityPolicy.defaultSrc
 * @param {Array<String>} contentSecurityPolicy.fontSrc
 * @param {Array<String>} contentSecurityPolicy.imgSrc
 * @param {Array<String>} contentSecurityPolicy.scriptSrc
 * @param {Array<String>} contentSecurityPolicy.styleSrc
 * @param {String} contentSecurityPolicy.reportUri
 * @param {Object} [compressionOptions={}]
 * @param {Number} compressionOptions.chunkSize
 * @param {Number} compressionOptions.level
 * @param {Number} compressionOptions.threshold
 * @param {Object} [crossOriginResourceSharing={}]
 * @param {Array<String>} crossOriginResourceSharing.allowedHeaders
 * @param {Array<String>} crossOriginResourceSharing.allowedMethods
 * @param {Array<String>} crossOriginResourceSharing.allowedOrigins
 * @param {Boolean} crossOriginResourceSharing.credentials
 * @param {Boolean} crossOriginResourceSharing.preflightContinue
 * @param {Object} [metricsCollection={}]
 * @param {String} metricsCollection.livenessCheckEndpoint
 * @param {String} metricsCollection.metricsEndpoint
 * @param {Number} metricsCollection.probeIntervalInMilliseconds=
 * @param {String} metricsCollection.readinessCheckEndpoint
 *
 * @return {express.Application}
 */
function createServer() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$enableCORS = _ref.enableCORS,
      enableCORS = _ref$enableCORS === undefined ? true : _ref$enableCORS,
      _ref$enableCompressio = _ref.enableCompression,
      enableCompression = _ref$enableCompressio === undefined ? true : _ref$enableCompressio,
      _ref$enableContentSec = _ref.enableContentSecurityPolicy,
      enableContentSecurityPolicy = _ref$enableContentSec === undefined ? true : _ref$enableContentSec,
      _ref$enableCookiePars = _ref.enableCookieParser,
      enableCookieParser = _ref$enableCookiePars === undefined ? true : _ref$enableCookiePars,
      _ref$enableHttpHeader = _ref.enableHttpHeadersSecurity,
      enableHttpHeadersSecurity = _ref$enableHttpHeader === undefined ? true : _ref$enableHttpHeader,
      _ref$enableMetricsCol = _ref.enableMetricsCollection,
      enableMetricsCollection = _ref$enableMetricsCol === undefined ? true : _ref$enableMetricsCol,
      _ref$enableSerializer = _ref.enableSerializer,
      enableSerializer = _ref$enableSerializer === undefined ? true : _ref$enableSerializer,
      _ref$contentSecurityP = _ref.contentSecurityPolicy,
      contentSecurityPolicy = _ref$contentSecurityP === undefined ? {} : _ref$contentSecurityP,
      _ref$compressionOptio = _ref.compressionOptions,
      compressionOptions = _ref$compressionOptio === undefined ? {} : _ref$compressionOptio,
      _ref$crossOriginResou = _ref.crossOriginResourceSharing,
      crossOriginResourceSharing = _ref$crossOriginResou === undefined ? {} : _ref$crossOriginResou,
      _ref$metricsCollectio = _ref.metricsCollection,
      metricsCollection = _ref$metricsCollectio === undefined ? {} : _ref$metricsCollectio;

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
    server.use(_security2.default.contentSecurityPolicy(contentSecurityPolicy));
  }
  if (enableCompression) {
    server.use((0, _compression2.default)(compressionOptions));
  }
  if (enableCORS) {
    server.use(_security2.default.crossOriginResourceSharing(crossOriginResourceSharing));
  }
  if (enableMetricsCollection) {
    var metricsEndpoint = metricsCollection.metricsEndpoint ? metricsCollection.metricsEndpoint : _observability2.default.metrics.constant.defaultMetricsEndpoint;
    server.use(_observability2.default.metrics(metricsCollection));
    server.use(metricsEndpoint, _observability2.default.metrics.getMetricsEndpointHandler());
  }

  return server;
}