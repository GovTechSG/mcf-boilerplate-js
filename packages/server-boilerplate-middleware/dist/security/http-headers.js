'use strict';

module.exports = securityMiddleware;

var DEFAULT_CSP_SRC_VALUE = ['\'none\''];
var DEFAULT_CSP_REPORT_URI = '/csp-report';

/**
 * Returns an Express compatible middleware
 *
 * @return {Function}
 */
function securityMiddleware() {
  if (securityMiddleware.instance === null) {
    var helmet = require('helmet');
    securityMiddleware.instance = helmet();
  }
  return securityMiddleware.instance;
}

securityMiddleware.instance = null;
securityMiddleware.constant = {
  defaultSrcValue: DEFAULT_CSP_SRC_VALUE,
  defaultReportUri: DEFAULT_CSP_REPORT_URI
};