import cors from 'cors';
import {RequestHandler} from 'express';

const DEFAULT_ALLOWED_HEADERS = [];
const DEFAULT_ALLOWED_METHODS: HttpMethod[] = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'];
const DEFAULT_ALLOWED_ORIGINS: string[] = [];
const DEFAULT_CREDENTIALS = true;
const DEFAULT_PREFLIGHT_CONTINUE = false;

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS';

export interface ICorsMiddlewareOptions {
  allowedHeaders?: string[];
  allowedMethods?: HttpMethod[];
  allowedOrigins?: string[];
  credentials?: boolean;
  preflightContinue?: boolean;
}

/**
 * Returns an Express compatible middleware that provides cross-origin-resource-
 * sharing capabilities.
 */
export const corsMiddleware = ({
  allowedHeaders = DEFAULT_ALLOWED_HEADERS,
  allowedMethods = DEFAULT_ALLOWED_METHODS,
  allowedOrigins = DEFAULT_ALLOWED_ORIGINS,
  credentials = DEFAULT_CREDENTIALS,
  preflightContinue = DEFAULT_PREFLIGHT_CONTINUE,
}: ICorsMiddlewareOptions = {}): RequestHandler => {
  return cors({
    allowedHeaders,
    credentials,
    methods: allowedMethods,
    origin: allowedOrigins,
    preflightContinue,
  });
};
