import express from 'express';
import path from 'path';
import http from 'http';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { Server } from 'socket.io';
import { Mongodb } from './backend/repository/mongodb.js';
import RepositoryMongoDB from './backend/repository/mongodb.js';
import createApiRoutes from './backend/routes/api.js';
import Session from './backend/services/session/index.js';

const app = express();
const server = http.createServer(app);

// --- MongoDB ---
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017';
const mongo = new Mongodb(dbUrl);
const repository = new RepositoryMongoDB(mongo);

// --- Middleware ---
app.use(express.json());
app.use(express.static('./public'));

// --- REST API para usuários normais ---
app.use('/api', createApiRoutes(repository));

// --- Verificação de admin ---
app.get('/admin/verify', (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ isAdmin: false });
    }
    const token = authHeader.split(' ')[1];
    const secret = process.env.ACCESS_TOKEN_SECRET || '';
    jwt.verify(token, secret, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ isAdmin: false });
        }
        const [usuario, notFound] = await repository.findOne('Usuarios', { _id: decoded._id || decoded.sub });
        if (notFound || !usuario) {
            return res.json({ isAdmin: false });
        }
        res.json({ isAdmin: usuario.role === 'admin' });
    });
});

// --- Registro de usuário ---
app.post('/registrar', async (req, res) => {
    const data = req.body;
    if (!data.email || !data.senha) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }
    const [existing] = await repository.findOne('Usuarios', { email: data.email });
    if (existing) {
        return res.status(409).json({ error: 'Usuário já existe' });
    }
    const [result, err] = await repository.create('Usuarios', { ...data, role: 'user' });
    if (err) return res.status(500).json({ error: 'Erro ao criar usuário' });
    res.status(201).json(result);
});

// --- SPA fallback ---
const __dirname = path.resolve(path.dirname(''));
app.use('/', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
});

// --- Socket.io (apenas para admin) ---
const io = new Server(server, {
    cors: { origin: '*' },
    maxHttpBufferSize: 1e8,
});

io.use(async (socket, next) => {
    const accessToken = socket.handshake.auth.accessToken;
    if (!accessToken) {
        return next(new Error('Token não fornecido'));
    }
    const secret = process.env.ACCESS_TOKEN_SECRET || '';
    jwt.verify(accessToken, secret, async (err, decoded) => {
        if (err) {
            return next(new Error('Token inválido'));
        }
        // Verifica se é admin
        const [usuario, notFound] = await repository.findOne('Usuarios', { _id: decoded._id || decoded.sub });
        if (notFound || !usuario || usuario.role !== 'admin') {
            return next(new Error('Acesso negado. Apenas administradores.'));
        }
        socket.handshake.auth.usuario = usuario;
        return next();
    });
});

io.on('connection', async (socket) => {
    const usuario = socket.handshake.auth.usuario;
    console.log(`Admin conectado: ${usuario._id} (socket: ${socket.id})`);

    const session = new Session(socket.id, socket, { usuario }, repository);

    socket.onAny(async (event, args) => {
        const [result, err] = await session.execute(event, args);
        socket.emit(event, { data: result, error: err });
    });

    socket.on('disconnect', () => {
        console.log(`Admin desconectado: ${socket.id}`);
    });
});

// --- Iniciar servidor ---
const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`Duo Academy backend escutando na porta ${port}`);
});
