import express from 'express';
import path from 'path'
import 'dotenv/config';

const app = express();
console.log(process.cwd());
app.use(express.static('./public'))
const __dirname = path.resolve(path.dirname(''))
console.log(__dirname.split(/[\\\/]/));

app.use('/', (req, res) => {
    const dir = __dirname.split(/[\\\/]/)
    res.sendFile(`${__dirname}/public/index.html`);
});

const port = process.env.PORT ? process.env.PORT : 5000
app.listen(port, _ => {
    console.log(`escutando na ${port}`);
});

WebSocket.io = new Server(server, {
    cors: {
        origin: '*'
    },
    maxHttpBufferSize: 1e8,
})

WebSocket.io.use(async (socket, next) => {
    const accessToken = socket.handshake.auth.accessToken;
    if (!accessToken) {
        return next(new Error('No token provided'));
    }
    const access = process.env.ACCESS_TOKEN_SECRET ? process.env.ACCESS_TOKEN_SECRET : ""
    verify(accessToken, access, async (err) => {
        if (err) {
            return next(new Error('Invalid Token'));
        } else {
            socket.handshake.auth.usuario = user;
            return next();
        }
    })
});

const commands = {
    db: DBSync,
    uc: UsecaseNovo
}

WebSocket.io.on('connection', async (socket) => {
    const usuario = socket.handshake.auth.usuario;
    usuario.socket_id = socket.id
    //todo: aqui tenho que colocar o id da organizacao
    socketclients.push("websocket", usuario._id, socket.id)
    socket.onAny(async (event, args) => {
        const cmd = event.split("/")[0]
        console.log(cmd, Object.prototype.hasOwnProperty.call(commands, cmd))
        if (Object.prototype.hasOwnProperty.call(commands, cmd))
        socket.emit(event, await commands[cmd](event, args, app, usuario))
    })

    socket.on("disconnect", () => {
        socketclients.remove(socket.id)
    })
});