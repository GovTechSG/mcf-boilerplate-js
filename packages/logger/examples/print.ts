import {createLogger} from '../dist';
const logger = createLogger({logLevel: 'silly'});

logger.silly('[SILLY] - this is a .silly log');
logger.debug('[DEBUG] - this is a .debug log');
logger.http('[HTTP] - this is a .http log');
logger.info('[INFO]  - this is .info');
logger.warn('[WARN]  - and this is warn');
logger.error("[ERROR] - and when everything's on fire");
