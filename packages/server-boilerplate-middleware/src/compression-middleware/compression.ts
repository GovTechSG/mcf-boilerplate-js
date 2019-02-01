import compression from 'compression';
import {RequestHandler} from 'express';

const KILOBYTE = 1024;
const DEFAULT_CHUNK_SIZE = 16 * KILOBYTE;
const DEFAULT_COMPRESSION_LEVEL = 9;
const DEFAULT_THRESHOLD = 300 * KILOBYTE;

export type ICompressionMiddlewareOptions = Pick<compression.CompressionOptions, 'chunkSize' | 'level' | 'threshold'>;
/**
 * Returns an Express compatible middleware that provides response
 * compression.
 */
export const compressionMiddleware = ({
  chunkSize = DEFAULT_CHUNK_SIZE,
  level = DEFAULT_COMPRESSION_LEVEL,
  threshold = DEFAULT_THRESHOLD,
}: ICompressionMiddlewareOptions = {}): RequestHandler => {
  return compression({chunkSize, level, threshold});
};
