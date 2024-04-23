import log4js from 'log4js';
import * as jwt from 'jsonwebtoken';

const logger = log4js.getLogger('default');

export const authentication = (req: any, res: any, next: any) => {
    const token = req.headers['authorization'];
    logger.info('Validating authorization!');

    if (!token) {
        logger.error('No access token provided', { statusCode: 401});
        return res.status(401).json({
            error: 'No access token provided',
        });
    }

    try {
        const decoded = jwt.verify(token, 'secret');

        req.user = decoded;

        next();
    } catch (err) {
        return res.status(401).json({
            error: 'Invalid access token',
        });
    }
};