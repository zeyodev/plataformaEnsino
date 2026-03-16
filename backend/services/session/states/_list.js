import { Auth } from './auth.js';

/**
 * Lista de estados disponíveis no backend.
 */
export class List {
    /** @type {{ [key: string]: import('../types/index.js').CommandList }} */
    static states = {
        'auth': Auth,
    };
}
