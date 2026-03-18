import DB from '../commands/db.js';
import UploadVideoPanda from '../commands/upload-video-panda.js';

/**
 * Comandos disponíveis no estado autenticado (admin).
 * @type {import('../types/index.js').CommandList}
 */
export const Auth = {
    'db': DB,
    'upload-video-panda': UploadVideoPanda,
};
