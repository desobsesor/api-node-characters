import log4js from "log4js";

const logger = log4js.getLogger("default");

export const loggerMiddleware = (req: any, res: any, next: any) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl;
  const body = JSON.stringify(req.body);

  logger.info(`[${timestamp}] ${method} ${url}`);
  if (body) {
    logger.info(`Body: ${body}`);
  }

  next();
};
