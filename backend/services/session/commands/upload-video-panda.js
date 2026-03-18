import axios from 'axios';

const PANDA_API = 'https://api-v2.pandavideo.com.br';

/**
 * Codifica um valor em Base64.
 * @param {string} value
 * @returns {string}
 */
function toBase64(value) {
    return Buffer.from(String(value)).toString('base64');
}

/**
 * Busca a lista de servidores de upload disponíveis.
 * @param {string} apiKey
 * @returns {Promise<string>} URL do servidor de upload
 */
async function getUploaderServer(apiKey) {
    const { data } = await axios.get(`${PANDA_API}/hosts/uploader`, {
        headers: { Authorization: apiKey }
    });
    // data.hosts = { us: ["uploader-us01", ...], fr: ["uploader-fr01", ...] }
    const regions = data.hosts || data;
    const firstRegion = Object.values(regions)[0];
    const host = Array.isArray(firstRegion) ? firstRegion[0] : firstRegion;
    return `https://${host}.pandavideo.com.br`;
}

/**
 * Cria o upload via TUS protocol (POST) e retorna a URL de upload.
 * @param {string} uploaderUrl
 * @param {string} apiKey
 * @param {{ name: string, size: number }} info
 * @returns {Promise<string>} Location URL para PATCH
 */
async function createTusUpload(uploaderUrl, apiKey, info) {
    const metadata = [
        `authorization ${toBase64(apiKey)}`,
        `filename ${toBase64(info.name)}`,
    ].join(',');

    const response = await axios.post(`${uploaderUrl}/files`, null, {
        headers: {
            'Tus-Resumable': '1.0.0',
            'Upload-Length': info.size,
            'Upload-Metadata': metadata,
        },
        // TUS POST retorna 201 com Location header
        validateStatus: (s) => s >= 200 && s < 300,
    });

    const location = response.headers['location'];
    if (!location) throw new Error('Servidor de upload não retornou Location header');
    return location;
}

/**
 * Envia os bytes do arquivo via PATCH (TUS) com progresso.
 * @param {string} uploadUrl - Location URL do TUS
 * @param {Buffer} fileBuffer
 * @param {(progress: number) => void} onProgress
 */
async function patchTusUpload(uploadUrl, fileBuffer, onProgress) {
    const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB chunks
    let offset = 0;
    const totalSize = fileBuffer.length;

    while (offset < totalSize) {
        const end = Math.min(offset + CHUNK_SIZE, totalSize);
        const chunk = fileBuffer.slice(offset, end);

        await axios.patch(uploadUrl, chunk, {
            headers: {
                'Tus-Resumable': '1.0.0',
                'Upload-Offset': offset,
                'Content-Type': 'application/offset+octet-stream',
                'Content-Length': chunk.length,
            },
            maxBodyLength: Infinity,
            maxContentLength: Infinity,
        });

        offset = end;
        onProgress(Math.round((offset / totalSize) * 100));
    }
}

/**
 * Busca as propriedades do vídeo na API do Panda pelo UUID.
 * @param {string} apiKey
 * @param {string} videoId - UUID v4
 * @returns {Promise<any>}
 */
async function getVideoProperties(apiKey, videoId) {
    const { data } = await axios.get(`${PANDA_API}/videos/${videoId}`, {
        headers: { Authorization: apiKey }
    });
    return data;
}

/**
 * Busca o vídeo recém-criado pelo título (filename) na lista de vídeos.
 * O TUS retorna um hash, não o UUID do vídeo, então precisamos buscar via listagem.
 * @param {string} apiKey
 * @param {string} fileName
 * @param {number} maxAttempts
 * @param {number} intervalMs
 * @returns {Promise<any>}
 */
async function findUploadedVideo(apiKey, fileName, maxAttempts = 10, intervalMs = 3000) {
    for (let i = 0; i < maxAttempts; i++) {
        const { data } = await axios.get(`${PANDA_API}/videos`, {
            headers: { Authorization: apiKey },
            params: { limit: 10 }
        });
        const videos = data.videos || data;
        const video = videos.find(v => v.title === fileName);
        if (video) return video;
        await new Promise(r => setTimeout(r, intervalMs));
    }
    throw new Error('Vídeo não encontrado após upload');
}

/**
 * Aguarda o vídeo ser processado (polling).
 * @param {string} apiKey
 * @param {string} videoId - UUID v4
 * @param {number} maxAttempts
 * @param {number} intervalMs
 * @returns {Promise<any>}
 */
async function waitForVideoReady(apiKey, videoId, maxAttempts = 30, intervalMs = 5000) {
    for (let i = 0; i < maxAttempts; i++) {
        const video = await getVideoProperties(apiKey, videoId);
        if (video.status === 'CONVERTED' || video.video_player) {
            return video;
        }
        await new Promise(r => setTimeout(r, intervalMs));
    }
    return await getVideoProperties(apiKey, videoId);
}

/**
 * Comando upload-video-panda — faz upload de vídeo para o Panda Video via TUS.
 * @param {string} event
 * @param {any} args - { file: Buffer, aula_id: string, title: string, info: { name, type, size } }
 * @param {import('../types/index.js').Session} session
 * @returns {Promise<[any, boolean]>}
 */
export default async function UploadVideoPanda(event, args, session) {
    const socket = session.client;
    const { file, aula_id, title, info } = args;
    const apiKey = process.env.PANDA_VIDEO_API_KEY;

    if (!apiKey) {
        socket.emit(`upload-video-panda/${aula_id}/error`, { message: 'PANDA_VIDEO_API_KEY não configurada no servidor' });
        return ['API key não configurada', true];
    }

    if (!file || !aula_id) {
        socket.emit(`upload-video-panda/${aula_id}/error`, { message: 'Arquivo e aula_id são obrigatórios' });
        return ['Dados incompletos', true];
    }

    const fileBuffer = Buffer.isBuffer(file) ? file : Buffer.from(file);
    const fileSize = fileBuffer.length;
    const fileName = info?.name || `${title || 'video'}.mp4`;

    // Executa o upload em background para não bloquear
    (async () => {
        try {
            // 1. Obter servidor de upload
            socket.emit(`upload-video-panda/${aula_id}/progress`, { progress: 0 });
            const uploaderUrl = await getUploaderServer(apiKey);

            // 2. Criar upload via TUS
            const location = await createTusUpload(uploaderUrl, apiKey, {
                name: fileName,
                size: fileSize,
            });

            // 3. Enviar bytes com progresso
            await patchTusUpload(location, fileBuffer, (progress) => {
                socket.emit(`upload-video-panda/${aula_id}/progress`, { progress });
            });

            // 4. Buscar vídeo recém-criado pelo filename na listagem
            const video = await findUploadedVideo(apiKey, fileName);

            // 5. Aguardar processamento se necessário
            const readyVideo = video.video_player
                ? video
                : await waitForVideoReady(apiKey, video.id);

            // 6. Emitir resultado
            socket.emit(`upload-video-panda/${aula_id}/done`, {
                video_player: readyVideo.video_player || '',
                video_hls: readyVideo.video_hls || '',
                thumbnail: readyVideo.thumbnail || '',
                status: readyVideo.status || 'CONVERTING',
                length: readyVideo.length || 0,
                video_id: readyVideo.id,
            });
        } catch (err) {
            console.error('Erro no upload para Panda Video:', err.message);
            if (err.response) {
                console.error('Status:', err.response.status);
                console.error('Data:', JSON.stringify(err.response.data));
                console.error('URL:', err.response.config?.url);
                console.error('Method:', err.response.config?.method);
            }
            socket.emit(`upload-video-panda/${aula_id}/error`, {
                message: err.response?.data?.message || err.message || 'Erro desconhecido no upload'
            });
        }
    })();

    return ['Upload iniciado', false];
}
