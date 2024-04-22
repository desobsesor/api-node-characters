import log4js from 'log4js';

const logger = log4js.getLogger('default');

export const loggerMiddleware = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl;
  const body = req.body;

  console.log(`[${timestamp}] ${method} ${url}`);
  logger.info(`[${timestamp}] ${method} ${url}`);
  if (body) {
    console.log('Body:', body);
  }

  next();
};