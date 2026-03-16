import express from 'express';
import path from 'path';
import http from 'http';
import crypto from 'crypto';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import argon2 from 'argon2';
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

// --- Helpers LGPD ---
const pepper = process.env.PEPPER || '';

function hashPII(value) {
    return crypto.createHmac('sha256', pepper).update(value).digest('hex');
}

async function hashSenha(senha) {
    const peppered = senha + pepper;
    return argon2.hash(peppered, { type: argon2.argon2id });
}

async function verificarSenha(hash, senha) {
    const peppered = senha + pepper;
    return argon2.verify(hash, peppered);
}

// --- Registro de usuário ---
app.post('/registrar', async (req, res) => {
    const data = req.body;
    if (!data.email || !data.senha) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    const emailHash = hashPII(data.email);
    const [existing] = await repository.findOne('Usuarios', { emailHash });
    if (existing) {
        return res.status(409).json({ error: 'Usuário já existe' });
    }

    const senhaHash = await hashSenha(data.senha);
    const { senha, ...resto } = data;

    const usuario = {
        ...resto,
        nome: resto.nome ? hashPII(resto.nome) : undefined,
        email: hashPII(data.email),
        emailHash,
        senhaHash,
        role: 'user',
    };

    const [result, err] = await repository.create('Usuarios', usuario);
    if (err) return res.status(500).json({ error: 'Erro ao criar usuário' });
    res.status(201).json({ _id: result._id, role: result.role });
});

// --- Login ---
app.post('/login', async (req, res) => {
    const { email, senha } = req.body;
    if (!email || !senha) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    const emailHash = hashPII(email);
    const [usuario, notFound] = await repository.findOne('Usuarios', { emailHash });
    if (notFound || !usuario) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const senhaValida = await verificarSenha(usuario.senhaHash, senha);
    if (!senhaValida) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const secret = process.env.ACCESS_TOKEN_SECRET || '';
    const accessToken = jwt.sign({ _id: usuario._id, role: usuario.role }, secret, { expiresIn: '7d' });

    res.json({ accessToken, usuario: { _id: usuario._id, role: usuario.role } });
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
