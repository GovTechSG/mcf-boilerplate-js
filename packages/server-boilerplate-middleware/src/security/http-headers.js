module.exports = securityMiddleware;

const DEFAULT_CSP_SRC_VALUE = ['\'none\''];
const DEFAULT_CSP_REPORT_URI = '/csp-report';

/**
 * Returns an Express compatible middleware
 *
 * @param {Object} options
 * @param {Array<String>|String} options.cspChildSrc
 * @param {Array<String>|String} options.cspDefaultSrc
 * @param {Array<String>|String} options.cspFontSrc
 * @param {Array<String>|String} options.cspImgSrc
 * @param {Array<String>|String} options.cspScriptSrc
 * @param {Array<String>|String} options.cspStyleSrc
 * @param {String} options.cspReportUri
 * @return {Function}
 */
function securityMiddleware({
  cspChildSrc = DEFAULT_CSP_SRC_VALUE,
  cspDefaultSrc = DEFAULT_CSP_SRC_VALUE,
  cspFontSrc = DEFAULT_CSP_SRC_VALUE,
  cspImgSrc = DEFAULT_CSP_SRC_VALUE,
  cspScriptSrc = DEFAULT_CSP_SRC_VALUE,
  cspStyleSrc = DEFAULT_CSP_SRC_VALUE,
  cspReportUri = DEFAULT_CSP_REPORT_URI,
} = {}) {
  if (securityMiddleware.instance === null) {
    const helmet = require('helmet');
    const cspDirectives = {
      childSrc: cspChildSrc,
      defaultSrc: cspDefaultSrc,
      fontSrc: cspFontSrc,
      imgSrc: cspImgSrc,
      scriptSrc: cspScriptSrc,
      styleSrc: cspStyleSrc,
      reportUri: cspReportUri,
    };
    securityMiddleware.instance = [
      helmet(),
      helmet.contentSecurityPolicy({
        directives: cspDirectives,
      }),
    ];
  }
  return securityMiddleware.instance;
}

securityMiddleware.instance = null;
securityMiddleware.constant = {
  defaultSrcValue: DEFAULT_CSP_SRC_VALUE,
  defaultReportUri: DEFAULT_CSP_REPORT_URI,
};
