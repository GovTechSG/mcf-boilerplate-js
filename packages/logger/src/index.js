import winston from 'winston';

const DEFAULT_LOG_LEVELS = {
  error: 0, // use for errors
  warn: 1, // use for deprecations
  info: 2, // for application logging
  access: 3, // for request logging
  debug: 4, // debug uses
  silly: 5, // all other uses
};

const DEFAULT_LOG_LEVEL = 'silly';

const DEFAULT_LOG_TRANSPORTERS = [
  new winston.transports.Console(),
];

const logger = {
  DEFAULT: {
    LOG_LEVELS: DEFAULT_LOG_LEVELS,
    LOG_LEVEL: DEFAULT_LOG_LEVEL,
    LOG_TRANSPORTERS: DEFAULT_LOG_TRANSPORTERS,
  },
  config: {},
  context: {
    instance: null,
    /**
     * Retrieves the context if it exists
     *
     * @return {Object|undefined}
     */
    get: () => {
      if (loggerContextExists()) {
        const {spanId, parentId, traceId} =
          logger.context.instance.currentCtx;
        return {
          otTraceId: traceId,
          otParentId: parentId,
          otSpanId: spanId,
        };
      }
    },
    /**
     * Sets the context
     *
     * @param {Object} context zipkin context
     */
    set: (context) => {
      logger.context.instance = context;
    },
    /**
     * Resets the context
     *
     * @return {null}
     */
    reset: () => (logger.context.instance = null),
  },
  /**
   * @param {String} logLevel level to output logs at for this stream
   * @return {Object}
   */
  getStream: (logLevel) => ({
    write: (...args) => logger[logLevel].apply(null, [...args]),
  }),
  instance: null,
  /**
   * @param {Object} opt
   * @param {Array<Function>} opt.logFormatters
   * @param {Object} opt.logLevels
   * @param {Number|String} opt.logLevel
   * @param {Array<Function>} opt.logTransporters
   */
  init: ({
    logFormatters = [],
    logLevels = DEFAULT_LOG_LEVELS,
    logLevel = DEFAULT_LOG_LEVEL,
    logTransporters = DEFAULT_LOG_TRANSPORTERS,
    openTracingContext = null,
  } = {}) => {
    // sanity check
    logLevelsSanityCheck(logLevels, logLevel);
    // save logger configurations
    configureLogger({logLevels, logLevel, openTracingContext});
    // create the logger
    logger.instance = winston.createLogger({
      exitOnError: false,
      format: winston.format.combine.apply(null, [
        ...logFormatters,
        winston.format((info) =>
          Object.assign(info, logger.context.get()))(),
        winston.format.timestamp(),
        winston.format.json(),
      ]),
      levels: logger.config.levels,
      level: logLevel,
      transports: logTransporters,
    });
    // create interface mappings
    createInterface();
  },
  /**
   * Undoes what .init() does
   */
  reset: () => {
    Object.keys(logger.config.levels)
      .forEach((level) => delete logger[level]);
    delete logger.config.levels;
    delete logger.config.level;
    logger.context.reset();
    logger.instance = null;
  },
};

export default logger;
module.exports = logger;

/**
 * Configures the logger instance
 *
 * @param {Object} opt
 * @param {Object} opt.logLevels
 * @param {Number|String} opt.logLevel
 * @param {Object} opt.openTracingContext
 */
function configureLogger({
  logLevels,
  logLevel,
  openTracingContext,
} = {}) {
  // map only log levels that do not overwrite existing properties
  // TODO why ??
  logger.config.levels = Object.keys(logLevels).reduce(
    (p, level) => Object.assign(p, {
      [level]: (!logger[level]) ? logLevels[level] : undefined,
    }),
    {}
  );
  // define the log level
  logger.config.level = logLevel;
  // set the context
  if (openTracingContext) {
    logger.context.set(openTracingContext);
  }
}

/**
 * Create interfaces to access the internal logger
 */
function createInterface() {
  Object.keys(logger.config.levels).forEach((level) => {
    if (!logger[level]) {
      logger[level] = logger.instance[level];
    }
  });
  logger.log = logger.instance.log;
}

/**
 * Verifies that the Zipkin context exists.
 *
 * @return {Boolean}
 */
function loggerContextExists() {
  return (logger.context.instance !== null)
        && (typeof logger.context.instance === 'object')
        && (logger.context.instance.currentCtx);
}

/**
 * Performs sanity checks on the provided :logLevels and :logLevel
 *
 * @param {Object} logLevels
 * @param {String|Number} logLevel
 */
function logLevelsSanityCheck(logLevels, logLevel) {
  switch (typeof logLevel) {
    case 'string':
      if (
        typeof logLevels[logLevel] === 'undefined'
      ) {
        throw new Error(
          `Specified log level "${logLevel}" could not be found `
          + `in specified log levels: [${logLevels.toString()}]`
        );
      }
      break;
    case 'number':
      const numericLogLevels =
        Object.keys(logLevels).map((l) => logLevels[l]);
      if (
        numericLogLevels.findIndex((v) => v === logLevel) === -1
      ) {
        throw new Error(
          `Specified log level ${logLevel} could not be found `
          + `in specified log levels: [${numericLogLevels.toString()}]`
        );
      }
      break;
    default:
      throw new Error(
        `Specified log level (${logLevel}) was not a Number or String`
      );
  }
}
