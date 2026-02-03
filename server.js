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