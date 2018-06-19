import compression from 'compression';

const KILOBYTE = 1024;
const DEFAULT_CHUNK_SIZE = 16 * KILOBYTE;
const DEFAULT_COMPRESSION_LEVEL = 9;
const DEFAULT_THRESHOLD = 300 * KILOBYTE;

module.exports = compressionMiddleware;

/**
 * Returns an Express compatible middleware that provides response
 * compression.
 *
 * @param {Object} options
 * @param {Number} [options.chunkSize]
 * @param {Number} [options.threshold]
 * @param {Number} [options.level]
 *
 * @return {Function}
 */
function compressionMiddleware({
  chunkSize = DEFAULT_CHUNK_SIZE,
  level = DEFAULT_COMPRESSION_LEVEL,
  threshold = DEFAULT_THRESHOLD,
} = {}) {
  if (compressionMiddleware.instance === null) {
    compressionMiddleware.instance = compressionMiddleware.compression({
      chunkSize,
      level,
      threshold,
    });
  }
  return compressionMiddleware.instance;
}

compressionMiddleware.compression = compression;
compressionMiddleware.instance = null;

compressionMiddleware.constant = {
  defaultChunkSize: DEFAULT_CHUNK_SIZE,
  defaultLevel: DEFAULT_COMPRESSION_LEVEL,
  defaultThreshold: DEFAULT_THRESHOLD,
};
