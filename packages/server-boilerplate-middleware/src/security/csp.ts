import helmet from 'helmet';
import {RequestHandler} from 'express';

const DEFAULT_CSP_SRC_VALUE = ["'none'"];
const DEFAULT_CSP_REPORT_URI = '/csp-report';

export interface ICspMiddlewareOptions {
  childSrc?: string[];
  connectSrc?: string[];
  defaultSrc?: string[];
  fontSrc?: string[];
  imgSrc?: string[];
  scriptSrc?: string[];
  styleSrc?: string[];
  reportUri?: string;
}
/**
 * Returns an Express compatible middleware
 */
export const cspMiddleware = ({
  childSrc = DEFAULT_CSP_SRC_VALUE,
  connectSrc = DEFAULT_CSP_SRC_VALUE,
  defaultSrc = DEFAULT_CSP_SRC_VALUE,
  fontSrc = DEFAULT_CSP_SRC_VALUE,
  imgSrc = DEFAULT_CSP_SRC_VALUE,
  scriptSrc = DEFAULT_CSP_SRC_VALUE,
  styleSrc = DEFAULT_CSP_SRC_VALUE,
  reportUri = DEFAULT_CSP_REPORT_URI,
}: ICspMiddlewareOptions = {}): RequestHandler => {
  return helmet.contentSecurityPolicy({
    directives: {
      childSrc,
      connectSrc,
      defaultSrc,
      fontSrc,
      imgSrc,
      reportUri,
      scriptSrc,
      styleSrc,
    },
  });
};
