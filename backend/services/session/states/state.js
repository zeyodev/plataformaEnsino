import { List } from './_list.js';

/**
 * Classe que gerencia o estado atual da sessão no backend.
 */
export default class State {
    /**
     * @param {string} state - Nome do estado inicial
     */
    constructor(state) {
        /** @type {string} */
        this.name = state;
        /** @type {import('../types/index.js').CommandList} */
        this.commands = List.states[state];
    }

    /**
     * Muda o estado atual.
     * @param {string} state - Nome do novo estado
     */
    setState(state) {
        this.name = state;
        this.commands = List.states[state];
    }
}
