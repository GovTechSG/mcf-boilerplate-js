'use strict';

module.exports = contentSecurityPolicyMiddleware;

var DEFAULT_CSP_SRC_VALUE = ['\'none\''];
var DEFAULT_CSP_REPORT_URI = '/csp-report';

/**
 * Returns an Express compatible middleware
 *
 * @param {Object} options
 * @param {Array<String>|String} options.childSrc
 * @param {Array<String>|String} options.connectSrc
 * @param {Array<String>|String} options.defaultSrc
 * @param {Array<String>|String} options.fontSrc
 * @param {Array<String>|String} options.imgSrc
 * @param {Array<String>|String} options.scriptSrc
 * @param {Array<String>|String} options.styleSrc
 * @param {String} options.reportUri
 * @return {Function}
 */
function contentSecurityPolicyMiddleware() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$childSrc = _ref.childSrc,
      childSrc = _ref$childSrc === undefined ? DEFAULT_CSP_SRC_VALUE : _ref$childSrc,
      _ref$connectSrc = _ref.connectSrc,
      connectSrc = _ref$connectSrc === undefined ? DEFAULT_CSP_SRC_VALUE : _ref$connectSrc,
      _ref$defaultSrc = _ref.defaultSrc,
      defaultSrc = _ref$defaultSrc === undefined ? DEFAULT_CSP_SRC_VALUE : _ref$defaultSrc,
      _ref$fontSrc = _ref.fontSrc,
      fontSrc = _ref$fontSrc === undefined ? DEFAULT_CSP_SRC_VALUE : _ref$fontSrc,
      _ref$imgSrc = _ref.imgSrc,
      imgSrc = _ref$imgSrc === undefined ? DEFAULT_CSP_SRC_VALUE : _ref$imgSrc,
      _ref$scriptSrc = _ref.scriptSrc,
      scriptSrc = _ref$scriptSrc === undefined ? DEFAULT_CSP_SRC_VALUE : _ref$scriptSrc,
      _ref$styleSrc = _ref.styleSrc,
      styleSrc = _ref$styleSrc === undefined ? DEFAULT_CSP_SRC_VALUE : _ref$styleSrc,
      _ref$reportUri = _ref.reportUri,
      reportUri = _ref$reportUri === undefined ? DEFAULT_CSP_REPORT_URI : _ref$reportUri;

  if (contentSecurityPolicyMiddleware.instance === null) {
    var helmet = require('helmet');
    contentSecurityPolicyMiddleware.instance = helmet.contentSecurityPolicy({
      directives: {
        childSrc: childSrc,
        connectSrc: connectSrc,
        defaultSrc: defaultSrc,
        fontSrc: fontSrc,
        imgSrc: imgSrc,
        scriptSrc: scriptSrc,
        styleSrc: styleSrc,
        reportUri: reportUri
      }
    });
  }
  return contentSecurityPolicyMiddleware.instance;
}

contentSecurityPolicyMiddleware.instance = null;