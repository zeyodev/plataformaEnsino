import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.js';

/**
 * Coleções permitidas para acesso via REST API.
 * @type {string[]}
 */
const COLLECTIONS = [
    'Jornadas', 'Fases', 'Etapas', 'EtapaConnections',
    'Aulas', 'Pilares', 'Modulos', 'ModuloAulas',
    'CategoriasEncontros', 'Componentes', 'AdaptadorMapeamento',
    'JornadaNodes', 'NodeAulas', 'Usuarios',
    'Membros', 'Assinaturas', 'Produtos', 'ProdutoOptions', 'Mostradores',
    'CheckoutLinks', 'Clientes', 'Pagamentos', 'Cupons', 'Contratos',
    'Encontros', 'Anotacoes', 'Eventos',
];

/**
 * Cria as rotas REST da API.
 * @param {import('../repository/mongodb.js').default} repository - Instância do RepositoryMongoDB
 * @param {import('../cache/index.js').default} cache - Instância do cache em memória
 * @returns {Router}
 */
export default function createApiRoutes(repository, cache) {
    const router = Router();

    router.use(authMiddleware);

    /**
     * Valida se a coleção é permitida.
     * @param {string} collection
     * @returns {boolean}
     */
    function isValidCollection(collection) {
        return COLLECTIONS.includes(collection);
    }

    /**
     * Parseia query JSON de forma segura.
     * @param {string|undefined} raw
     * @returns {object}
     */
    function parseQuery(raw) {
        if (!raw) return {};
        try { return JSON.parse(raw); }
        catch { return {}; }
    }

    // GET /api/join/:expression - Join entre coleções (findManyToMany)
    // expression: "ModuloAulas/aula:Aulas"
    router.get('/join/:expression', async (req, res) => {
        const { expression } = req.params;
        const parts = expression.split('/');
        if (parts.length !== 2) {
            return res.status(400).json({ error: 'Expressão de join inválida. Use: Collection/key:TargetCollection' });
        }
        const mainCollection = parts[0];
        const [key, targetCollection] = parts[1].split(':');
        if (!key || !targetCollection) {
            return res.status(400).json({ error: 'Expressão de join inválida. Use: Collection/key:TargetCollection' });
        }
        if (!isValidCollection(mainCollection) || !isValidCollection(targetCollection)) {
            return res.status(400).json({ error: 'Coleção inválida' });
        }

        const query = parseQuery(req.query.q);

        try {
            const [items, err] = await repository.findMany(mainCollection, query);
            if (err) return res.status(500).json({ error: 'Erro ao buscar dados' });

            const result = [];
            for (const item of items) {
                const [target, notFound] = await repository.findOne(targetCollection, { _id: item[key] });
                if (!notFound && target) {
                    result.push({ ...item, ...target, _id: item._id });
                } else {
                    result.push(item);
                }
            }
            res.json(result);
        } catch (err) {
            res.status(500).json({ error: 'Erro ao realizar join' });
        }
    });

    // GET /api/:collection/one - Busca um documento via query
    router.get('/:collection/one', async (req, res) => {
        const { collection } = req.params;
        if (!isValidCollection(collection)) {
            return res.status(400).json({ error: 'Coleção inválida' });
        }
        const query = parseQuery(req.query.q);
        const [result, notFound] = await repository.findOne(collection, query);
        if (notFound) return res.status(404).json({ error: 'Documento não encontrado' });
        res.json(result);
    });

    // GET /api/:collection/paginated - Lista com paginação
    router.get('/:collection/paginated', async (req, res) => {
        const { collection } = req.params;
        if (!isValidCollection(collection)) {
            return res.status(400).json({ error: 'Coleção inválida' });
        }
        const query = parseQuery(req.query.q);
        const page = Math.max(1, parseInt(req.query.page) || 1);
        const pageSize = Math.min(100, Math.max(1, parseInt(req.query.pageSize) || 20));

        try {
            const col = repository.mongo.db.collection(collection);
            const total = await col.countDocuments(query);
            const totalPages = Math.ceil(total / pageSize);
            const skip = (page - 1) * pageSize;
            const data = await col.find(query).sort({ _id: 1 }).skip(skip).limit(pageSize).toArray();

            res.json({ data, total, page, pageSize, totalPages });
        } catch (err) {
            res.status(500).json({ error: 'Erro ao buscar dados paginados' });
        }
    });

    // GET /api/:collection - Lista documentos (com filtro, sort e limit opcionais)
    router.get('/:collection', async (req, res) => {
        const { collection } = req.params;
        if (!isValidCollection(collection)) {
            return res.status(400).json({ error: 'Coleção inválida' });
        }

        const query = parseQuery(req.query.q);
        const limit = parseInt(req.query.limit);
        const sort = parseInt(req.query.sort);

        // Se tem cache disponível e é uma coleção cacheada, usa o cache
        if (cache && cache.has(collection, query)) {
            const cached = cache.get(collection, query);
            if (limit && (sort === 1 || sort === -1)) {
                const sorted = [...cached].sort((a, b) => sort === 1 ? (a._id > b._id ? 1 : -1) : (a._id < b._id ? 1 : -1));
                return res.json(sorted.slice(0, limit));
            }
            return res.json(cached);
        }

        if (limit && (sort === 1 || sort === -1)) {
            const [result, err] = await repository.findManySortLimit(collection, query, limit, sort);
            if (err) return res.status(500).json({ error: 'Erro ao buscar dados' });
            return res.json(result);
        }

        const [result, err] = await repository.findMany(collection, query);
        if (err) return res.status(500).json({ error: 'Erro ao buscar dados' });
        res.json(result);
    });

    // GET /api/:collection/:id - Busca documento por ID
    router.get('/:collection/:id', async (req, res) => {
        const { collection, id } = req.params;
        if (!isValidCollection(collection)) {
            return res.status(400).json({ error: 'Coleção inválida' });
        }
        const [result, notFound] = await repository.findOne(collection, { _id: id });
        if (notFound) return res.status(404).json({ error: 'Documento não encontrado' });
        res.json(result);
    });

    // POST /api/:collection - Cria documento
    router.post('/:collection', async (req, res) => {
        const { collection } = req.params;
        if (!isValidCollection(collection)) {
            return res.status(400).json({ error: 'Coleção inválida' });
        }
        const [result, err] = await repository.create(collection, req.body);
        if (err) return res.status(500).json({ error: 'Erro ao criar documento' });
        if (cache) cache.invalidate(collection);
        res.status(201).json(result);
    });

    // PUT /api/:collection/query/update - Atualiza documento via query
    router.put('/:collection/query/update', async (req, res) => {
        const { collection } = req.params;
        if (!isValidCollection(collection)) {
            return res.status(400).json({ error: 'Coleção inválida' });
        }
        const query = parseQuery(req.query.q);
        const [result, err] = await repository.updateQuery(collection, query, req.body);
        if (err) return res.status(500).json({ error: 'Erro ao atualizar documento' });
        if (cache) cache.invalidate(collection);
        res.json(result);
    });

    // PUT /api/:collection/query/updateMany - Atualiza múltiplos documentos via query
    router.put('/:collection/query/updateMany', async (req, res) => {
        const { collection } = req.params;
        if (!isValidCollection(collection)) {
            return res.status(400).json({ error: 'Coleção inválida' });
        }
        const query = parseQuery(req.query.q);
        const [result, err] = await repository.updateMany(collection, query, req.body);
        if (err) return res.status(500).json({ error: 'Erro ao atualizar documentos' });
        if (cache) cache.invalidate(collection);
        res.json(result);
    });

    // PUT /api/:collection/:id - Atualiza documento
    router.put('/:collection/:id', async (req, res) => {
        const { collection, id } = req.params;
        if (!isValidCollection(collection)) {
            return res.status(400).json({ error: 'Coleção inválida' });
        }
        const [result, err] = await repository.update(collection, id, req.body);
        if (err) return res.status(500).json({ error: 'Erro ao atualizar documento' });
        if (cache) cache.invalidate(collection);
        res.json(result);
    });

    // DELETE /api/:collection/query/deleteMany - Remove múltiplos documentos via query
    router.delete('/:collection/query/deleteMany', async (req, res) => {
        const { collection } = req.params;
        if (!isValidCollection(collection)) {
            return res.status(400).json({ error: 'Coleção inválida' });
        }
        const query = parseQuery(req.query.q);
        const [result, err] = await repository.deleteMany(collection, query);
        if (err) return res.status(500).json({ error: 'Erro ao remover documentos' });
        if (cache) cache.invalidate(collection);
        res.json(result);
    });

    // DELETE /api/:collection/:id - Remove documento
    router.delete('/:collection/:id', async (req, res) => {
        const { collection, id } = req.params;
        if (!isValidCollection(collection)) {
            return res.status(400).json({ error: 'Coleção inválida' });
        }
        const [result, err] = await repository.delete(collection, id);
        if (err) return res.status(500).json({ error: 'Erro ao remover documento' });
        if (cache) cache.invalidate(collection);
        res.json(result);
    });

    return router;
}
