import axios from 'axios';

const PANDA_API = 'https://api-v2.pandavideo.com.br';

/**
 * Comando list-videos-panda — lista vídeos do Panda Video.
 * @param {string} event
 * @param {any} args - { page?: number, limit?: number }
 * @param {import('../types/index.js').Session} session
 * @returns {Promise<[any, boolean]>}
 */
export default async function ListVideosPanda(event, args, session) {
    const apiKey = process.env.PANDA_VIDEO_API_KEY;

    if (!apiKey) {
        return [{ error: 'PANDA_VIDEO_API_KEY não configurada no servidor' }, true];
    }

    try {
        const page = args?.page || 1;
        const limit = args?.limit || 50;

        const { data } = await axios.get(`${PANDA_API}/videos`, {
            headers: { Authorization: apiKey },
            params: { page, limit }
        });

        const videos = data.videos || data || [];

        return [{ videos }, false];
    } catch (err) {
        console.error('Erro ao listar vídeos do Panda:', err.message);
        return [{ error: err.response?.data?.message || err.message || 'Erro desconhecido' }, true];
    }
}
