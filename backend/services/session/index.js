import State from './states/state.js';

/**
 * Classe que representa uma sessão de admin conectada via Socket.io.
 */
export default class Session {
    /**
     * @param {string} id - ID do socket
     * @param {any} client - Socket do cliente
     * @param {{ [key: string]: any }} auth - Dados de autenticação
     * @param {import('../../repository/mongodb.js').default} repository - Repositório MongoDB
     */
    constructor(id, client, auth, repository) {
        /** @type {string} */
        this.id = id;
        /** @type {State} */
        this.state = new State('auth');
        /** @type {any} */
        this.client = client;
        /** @type {{ [key: string]: any }} */
        this.auth = auth;
        /** @type {import('../../repository/mongodb.js').default} */
        this.repository = repository;
    }

    /**
     * Executa um comando baseado no evento.
     * @param {string} event - Evento no formato "comando/acao/parametro"
     * @param {any} args - Argumentos do comando
     * @returns {Promise<[any, boolean]>}
     */
    async execute(event, args) {
        const cmd = event.split('/')[0];
        if (Object.prototype.hasOwnProperty.call(this.state.commands, cmd)) {
            return await this.state.commands[cmd](event, args, this);
        }
        return [`Comando inválido: ${cmd}`, true];
    }
}
