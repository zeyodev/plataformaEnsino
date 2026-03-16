import DB from '../commands/db.js';

/**
 * Comandos disponíveis no estado autenticado (admin).
 * @type {import('../types/index.js').CommandList}
 */
export const Auth = {
    'db': DB,
};
