/**
 * @typedef {Object} Logger
 * @property {Function} info - console.info
 * @property {Function} error - console.error
 */

const DEFAULT_BASE_EXIT_CODE = 128;
const DEFAULT_LOGGER = console;
const DEFAULT_MIDDLEWARES = [];
const DEFAULT_TERMINATION_SIGNALS = ['SIGINT', 'SIGTERM'];

module.exports = provisionProcess;

/**
 * Provisions the current process with an exit signal handler
 *
 * @param {Object} options
 * @param {Number} options.baseExitCode
 * @param {Logger} options.logger
 * @param {String[]} options.terminationSignals
 */
function provisionProcess({
  baseExitCode = DEFAULT_BASE_EXIT_CODE,
  logger = DEFAULT_LOGGER,
  terminationSignals = DEFAULT_TERMINATION_SIGNALS,
} = {}) {
  provisionProcess.logger = logger;
  for (let i = 0; i < terminationSignals.length; ++i) {
    const signal = terminationSignals[i];
    const handler = provisionProcess.terminate.bind(null, {
      signal,
      exitCode: baseExitCode + i,
    });
    process.on(signal, handler);
  }
};

provisionProcess.middlewares = DEFAULT_MIDDLEWARES;
provisionProcess.logger = DEFAULT_LOGGER;

/**
 * Terminates the process.
 *
 * @param {Number} exitCode
 */
provisionProcess.exit = (exitCode) => {
  const {logger} = provisionProcess;
  logger.error(`Exiting with status code ${exitCode}.`);
  process.exit(exitCode);
};

/**
 * Terminates the application.
 *
 * @param {Object} options
 * @param {String} options.signal
 * @param {Number} options.exitCode
 */
provisionProcess.terminate = ({signal, exitCode}) => {
  const {logger, middlewares} = provisionProcess;
  logger.error(`Signal ${signal} received.`);
  if (middlewares.length > 0) {
    logger.info(`Processing ${middlewares.length} termination hooks:`);
  }
  Promise.all(
    middlewares.map((middleware) => {
      if (typeof middleware.label === 'string') {
        logger.info(`- ${middleware.label}`);
      }
      return middleware(signal);
    })
  ).then((result) => {
    console.info(result);
    provisionProcess.exit(exitCode);
  });
};

/**
 * Adds a middleware function. Chainable.
 *
 * The middleware should be a function that returns a Promise.
 *
 * @param {Function} middleware
 *
 * @return {Function}
 */
provisionProcess.addMiddleware = (middleware) => {
  if (middleware instanceof Array) {
    for (let i = 0; i < middleware.length; ++i) {
      if (typeof middleware[i] !== 'function') {
        throw new Error(
          `Provided :middleware at index ${i} is not a valid function.`
        );
      }
    }
  } else if (typeof middleware !== 'function') {
    throw new Error('Provided :middleware is not a valid function.');
  }
  provisionProcess.middlewares.push(middleware);
  return provisionProcess;
};

/**
 * Resets the .middlewares property
 *
 * @return {Array}
 */
provisionProcess.clearMiddleware = () => (provisionProcess.middlewares = []);
