module.exports = contentSecurityPolicyMiddleware;

const DEFAULT_CSP_SRC_VALUE = ['\'none\''];
const DEFAULT_CSP_REPORT_URI = '/csp-report';

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
function contentSecurityPolicyMiddleware({
  childSrc = DEFAULT_CSP_SRC_VALUE,
  connectSrc = DEFAULT_CSP_SRC_VALUE,
  defaultSrc = DEFAULT_CSP_SRC_VALUE,
  fontSrc = DEFAULT_CSP_SRC_VALUE,
  imgSrc = DEFAULT_CSP_SRC_VALUE,
  scriptSrc = DEFAULT_CSP_SRC_VALUE,
  styleSrc = DEFAULT_CSP_SRC_VALUE,
  reportUri = DEFAULT_CSP_REPORT_URI,
} = {}) {
  if (contentSecurityPolicyMiddleware.instance === null) {
    const helmet = require('helmet');
    contentSecurityPolicyMiddleware.instance =
      helmet.contentSecurityPolicy({
        directives: {
          childSrc,
          connectSrc,
          defaultSrc,
          fontSrc,
          imgSrc,
          scriptSrc,
          styleSrc,
          reportUri,
        },
      });
  }
  return contentSecurityPolicyMiddleware.instance;
}

contentSecurityPolicyMiddleware.instance = null;
