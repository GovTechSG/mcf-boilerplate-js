const logger = require('../dist');
logger.init();

logger.silly('[SILLY] - this is a .silly log');
logger.debug('[DEBUG] - this is a .debug log');
logger.access('[ACCESS] - this is a .access log');
logger.info( '[INFO]  - this is .info');
logger.warn( '[WARN]  - and this is warn');
logger.error('[ERROR] - and when everything\'s on fire');
