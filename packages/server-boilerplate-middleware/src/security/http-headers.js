module.exports = securityMiddleware;

const DEFAULT_CSP_SRC_VALUE = ['\'none\''];
const DEFAULT_CSP_REPORT_URI = '/csp-report';

/**
 * Returns an Express compatible middleware
 *
 * @return {Function}
 */
function securityMiddleware() {
  if (securityMiddleware.instance === null) {
    const helmet = require('helmet');
    securityMiddleware.instance = helmet();
  }
  return securityMiddleware.instance;
}

securityMiddleware.instance = null;
securityMiddleware.constant = {
  defaultSrcValue: DEFAULT_CSP_SRC_VALUE,
  defaultReportUri: DEFAULT_CSP_REPORT_URI,
};
