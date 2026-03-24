import DB from '../commands/db.js';
import UploadVideoPanda from '../commands/upload-video-panda.js';
import ListVideosPanda from '../commands/list-videos-panda.js';
import UploadMaterial from '../commands/upload-material.js';

/**
 * Comandos disponíveis no estado autenticado (admin).
 * @type {import('../types/index.js').CommandList}
 */
export const Auth = {
    'db': DB,
    'upload-video-panda': UploadVideoPanda,
    'list-videos-panda': ListVideosPanda,
    'upload-material': UploadMaterial,
};
