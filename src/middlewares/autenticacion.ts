import log4js from 'log4js';

const logger = log4js.getLogger('default');

export const autenticacion = (req: any, res: any, next: any) => {
    const token = req.headers['authorization'];
    logger.info('Validando autorización!');

    if (!token) {
        logger.error('No se ha proporcionado un token de acceso', { statusCode: 401});
        return res.status(401).json({
            error: 'No se ha proporcionado un token de acceso',
        });
    }

    try {
        const decoded = true; // jwt.verify(token, 'secret');

        req.user = decoded;

        next();
    } catch (err) {
        return res.status(401).json({
            error: 'Token de acceso inválido',
        });
    }
};