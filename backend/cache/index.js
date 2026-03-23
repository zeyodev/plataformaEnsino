/**
 * Cache em memória para dados de estrutura do produto.
 * Cacheia coleções que mudam com pouca frequência (estrutura do produto,
 * pilares, módulos, componentes, etc.) para agilizar respostas ao cliente.
 */

/**
 * Coleções que devem ser cacheadas automaticamente na inicialização.
 * São dados estruturais do produto que raramente mudam.
 */
const CACHED_COLLECTIONS = [
    'Pilares',
    'Modulos',
    'ModuloAulas',
    'CategoriasEncontros',
    'Componentes',
    'AdaptadorMapeamento',
    'Jornadas',
    'Fases',
    'Etapas',
    'EtapaConnections',
    'JornadaNodes',
    'NodeAulas',
    'Mostradores',
    'Produtos',
    'ProdutoOptions',
];

export default class MemoryCache {
    /**
     * @param {import('../repository/mongodb.js').default} repository
     * @param {object} [options]
     * @param {number} [options.ttl=300000] - TTL em milissegundos (padrão: 5 minutos)
     */
    constructor(repository, options = {}) {
        /** @type {import('../repository/mongodb.js').default} */
        this.repository = repository;
        /** @type {number} */
        this.ttl = options.ttl || 5 * 60 * 1000;
        /** @type {Map<string, { data: any[], timestamp: number }>} */
        this.store = new Map();
    }

    /**
     * Gera a chave do cache a partir da coleção e query.
     * @param {string} collection
     * @param {object} query
     * @returns {string}
     */
    _key(collection, query) {
        return `${collection}:${JSON.stringify(query)}`;
    }

    /**
     * Verifica se o cache tem dados válidos para a coleção/query.
     * @param {string} collection
     * @param {object} query
     * @returns {boolean}
     */
    has(collection, query) {
        const key = this._key(collection, query);
        const entry = this.store.get(key);
        if (!entry) return false;
        if (Date.now() - entry.timestamp > this.ttl) {
            this.store.delete(key);
            return false;
        }
        return true;
    }

    /**
     * Retorna dados do cache.
     * @param {string} collection
     * @param {object} query
     * @returns {any[]|null}
     */
    get(collection, query) {
        const key = this._key(collection, query);
        const entry = this.store.get(key);
        if (!entry) return null;
        if (Date.now() - entry.timestamp > this.ttl) {
            this.store.delete(key);
            return null;
        }
        return entry.data;
    }

    /**
     * Armazena dados no cache.
     * @param {string} collection
     * @param {object} query
     * @param {any[]} data
     */
    set(collection, query, data) {
        const key = this._key(collection, query);
        this.store.set(key, { data, timestamp: Date.now() });
    }

    /**
     * Invalida todo o cache de uma coleção (quando há mutação).
     * @param {string} collection
     */
    invalidate(collection) {
        for (const key of this.store.keys()) {
            if (key.startsWith(`${collection}:`)) {
                this.store.delete(key);
            }
        }
    }

    /**
     * Invalida todo o cache.
     */
    invalidateAll() {
        this.store.clear();
    }

    /**
     * Pré-carrega coleções estruturais do produto na memória.
     * Chamado na inicialização do servidor.
     */
    async warmup() {
        console.log('[Cache] Pré-carregando coleções estruturais...');
        for (const collection of CACHED_COLLECTIONS) {
            try {
                const [data, err] = await this.repository.findMany(collection, {});
                if (!err) {
                    this.set(collection, {}, data);
                    console.log(`[Cache] ${collection}: ${data.length} documentos carregados`);
                }
            } catch (err) {
                console.error(`[Cache] Erro ao carregar ${collection}:`, err);
            }
        }
        console.log('[Cache] Pré-carregamento concluído.');
    }
}
