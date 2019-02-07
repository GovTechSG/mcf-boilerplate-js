import helmet from 'helmet';
import {RequestHandler} from 'express';

/**
 * Returns an Express compatible middleware
 */
export const httpHeadersMiddleware = (): RequestHandler => {
  return helmet();
};
