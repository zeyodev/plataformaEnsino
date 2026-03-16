/**
 * Comando DB - executa operações CRUD no banco via Socket.io (admin).
 * @param {string} event - Evento no formato "db/action/collection"
 * @param {any} args - Argumentos da operação
 * @param {import('../types/index.js').Session} session - Sessão do admin
 * @returns {Promise<[any, boolean]>}
 */
export default async function DB(event, args, session) {
    const [, action, collection] = event.split('/');
    const repository = session.repository;

    /** @type {{ [key: string]: (col: string, data: any) => Promise<[any, boolean]> }} */
    const actions = {
        create: (col, data) => repository.create(col, data),
        update: (col, data) => repository.update(col, data._id, data),
        delete: (col, data) => repository.delete(col, data._id || data),
        findMany: (col, data) => repository.findMany(col, data || {}),
        findOne: (col, data) => repository.findOne(col, data || {}),
    };

    if (!actions[action]) {
        return ['Ação inválida', true];
    }

    return await actions[action](collection, args);
}
