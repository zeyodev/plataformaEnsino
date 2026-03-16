import jwt from 'jsonwebtoken';

/**
 * Middleware de autenticação JWT para rotas HTTP REST.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }
    const token = authHeader.split(' ')[1];
    const secret = process.env.ACCESS_TOKEN_SECRET || '';
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token inválido' });
        }
        req.usuario = decoded;
        next();
    });
}

/**
 * Middleware que verifica se o usuário é admin.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export function adminMiddleware(req, res, next) {
    if (!req.usuario || req.usuario.role !== 'admin') {
        return res.status(403).json({ error: 'Acesso negado. Apenas administradores.' });
    }
    next();
}
