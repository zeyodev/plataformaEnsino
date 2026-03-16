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
    'JornadaNodes', 'NodeAulas', 'Usuarios'
];

/**
 * Cria as rotas REST da API.
 * @param {import('../repository/mongodb.js').default} repository - Instância do RepositoryMongoDB
 * @returns {Router}
 */
export default function createApiRoutes(repository) {
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

    // GET /api/:collection - Lista documentos (com filtro opcional via query)
    router.get('/:collection', async (req, res) => {
        const { collection } = req.params;
        if (!isValidCollection(collection)) {
            return res.status(400).json({ error: 'Coleção inválida' });
        }
        const query = req.query.q ? JSON.parse(req.query.q) : {};
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
        res.status(201).json(result);
    });

    // PUT /api/:collection/:id - Atualiza documento
    router.put('/:collection/:id', async (req, res) => {
        const { collection, id } = req.params;
        if (!isValidCollection(collection)) {
            return res.status(400).json({ error: 'Coleção inválida' });
        }
        const [result, err] = await repository.update(collection, id, req.body);
        if (err) return res.status(500).json({ error: 'Erro ao atualizar documento' });
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
        res.json(result);
    });

    return router;
}
