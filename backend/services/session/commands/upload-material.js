import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { ulid } from 'ulid';

/**
 * Cria e retorna o client S3 configurado para Cloudflare R2.
 * @returns {S3Client}
 */
function createR2Client() {
    return new S3Client({
        region: 'auto',
        endpoint: process.env.CLOUDFLARE_URL_S3_CLIENT,
        credentials: {
            accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID,
            secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY,
        },
    });
}

/**
 * Comando upload-material — faz upload de material complementar para Cloudflare R2.
 * @param {string} event
 * @param {any} args - { file: Buffer, aula_id: string, nome: string, info: { name, type, size } }
 * @param {import('../types/index.js').Session} session
 * @returns {Promise<[any, boolean]>}
 */
export default async function UploadMaterial(event, args, session) {
    const socket = session.client;
    const { file, aula_id, nome, info } = args;

    if (!process.env.CLOUDFLARE_ACCESS_KEY_ID || !process.env.CLOUDFLARE_SECRET_ACCESS_KEY) {
        socket.emit(`upload-material/${aula_id}/error`, { message: 'Credenciais Cloudflare R2 não configuradas no servidor' });
        return ['Credenciais R2 não configuradas', true];
    }

    if (!file || !aula_id) {
        socket.emit(`upload-material/${aula_id}/error`, { message: 'Arquivo e aula_id são obrigatórios' });
        return ['Dados incompletos', true];
    }

    const fileBuffer = Buffer.isBuffer(file) ? file : Buffer.from(file);
    const fileName = info?.name || nome || 'material';
    const contentType = info?.type || 'application/octet-stream';
    const ext = fileName.includes('.') ? fileName.substring(fileName.lastIndexOf('.')) : '';
    const key = `materiais/${aula_id}/${ulid()}${ext}`;

    (async () => {
        try {
            const r2 = createR2Client();

            await r2.send(new PutObjectCommand({
                Bucket: process.env.CLOUDFLARE_BUCKET,
                Key: key,
                Body: fileBuffer,
                ContentType: contentType,
            }));

            const url = `${process.env.CLOUDFLARE_API}/${key}`;

            socket.emit(`upload-material/${aula_id}/done`, {
                url,
                nome: nome || fileName,
                tipo: contentType,
            });
        } catch (err) {
            console.error('Erro no upload para R2:', err.message);
            socket.emit(`upload-material/${aula_id}/error`, {
                message: err.message || 'Erro ao enviar material para R2',
            });
        }
    })();

    return ['Upload de material iniciado', false];
}
