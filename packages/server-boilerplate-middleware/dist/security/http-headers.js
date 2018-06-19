'use strict';

module.exports = securityMiddleware;

var DEFAULT_CSP_SRC_VALUE = ['\'none\''];
var DEFAULT_CSP_REPORT_URI = '/csp-report';

/**
 * Returns an Express compatible middleware
 *
 * @param {Object} options
 * @param {Array<String>|String} options.cspChildSrc
 * @param {Array<String>|String} options.cspConnectSrc
 * @param {Array<String>|String} options.cspDefaultSrc
 * @param {Array<String>|String} options.cspFontSrc
 * @param {Array<String>|String} options.cspImgSrc
 * @param {Array<String>|String} options.cspScriptSrc
 * @param {Array<String>|String} options.cspStyleSrc
 * @param {String} options.cspReportUri
 * @return {Function}
 */
function securityMiddleware() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$cspChildSrc = _ref.cspChildSrc,
      cspChildSrc = _ref$cspChildSrc === undefined ? DEFAULT_CSP_SRC_VALUE : _ref$cspChildSrc,
      _ref$cspConnectSrc = _ref.cspConnectSrc,
      cspConnectSrc = _ref$cspConnectSrc === undefined ? DEFAULT_CSP_SRC_VALUE : _ref$cspConnectSrc,
      _ref$cspDefaultSrc = _ref.cspDefaultSrc,
      cspDefaultSrc = _ref$cspDefaultSrc === undefined ? DEFAULT_CSP_SRC_VALUE : _ref$cspDefaultSrc,
      _ref$cspFontSrc = _ref.cspFontSrc,
      cspFontSrc = _ref$cspFontSrc === undefined ? DEFAULT_CSP_SRC_VALUE : _ref$cspFontSrc,
      _ref$cspImgSrc = _ref.cspImgSrc,
      cspImgSrc = _ref$cspImgSrc === undefined ? DEFAULT_CSP_SRC_VALUE : _ref$cspImgSrc,
      _ref$cspScriptSrc = _ref.cspScriptSrc,
      cspScriptSrc = _ref$cspScriptSrc === undefined ? DEFAULT_CSP_SRC_VALUE : _ref$cspScriptSrc,
      _ref$cspStyleSrc = _ref.cspStyleSrc,
      cspStyleSrc = _ref$cspStyleSrc === undefined ? DEFAULT_CSP_SRC_VALUE : _ref$cspStyleSrc,
      _ref$cspReportUri = _ref.cspReportUri,
      cspReportUri = _ref$cspReportUri === undefined ? DEFAULT_CSP_REPORT_URI : _ref$cspReportUri;

  if (securityMiddleware.instance === null) {
    var helmet = require('helmet');
    var cspDirectives = {
      childSrc: cspChildSrc,
      connectSrc: cspConnectSrc,
      defaultSrc: cspDefaultSrc,
      fontSrc: cspFontSrc,
      imgSrc: cspImgSrc,
      scriptSrc: cspScriptSrc,
      styleSrc: cspStyleSrc,
      reportUri: cspReportUri
    };
    securityMiddleware.instance = [helmet(), helmet.contentSecurityPolicy({
      directives: cspDirectives
    })];
  }
  return securityMiddleware.instance;
}

securityMiddleware.instance = null;
securityMiddleware.constant = {
  defaultSrcValue: DEFAULT_CSP_SRC_VALUE,
  defaultReportUri: DEFAULT_CSP_REPORT_URI
};