import Repository from ".";
import Trigger from "./Trigger";
let data: { [key: string]: any[] } = {
    AdaptadorMapeamento: [
        {
            _id: "gfdodjfg",
            setTitulo: "string:titulo",
            setLista: "component:sdfwefsdfwe"
        },
        {
            _id: "aosdfjw2d",
            setImg: "string:thumbnail",
            setTitulo: "string:title",
            setAula: "root:object"
            //onclick: ""
        },
        {
            _id: "aosdfjw3d",
            setNome: "string:titulo",
            setValor: "expression:capa",
            //onclick: ""
        },
        {
            _id: "mapRoadmapNode",
            setTitulo: "string:titulo",
            setDescricao: "string:descricao",
            setIcon: "string:icon",
            setTheme: "string:theme",
            setNodeId: "string:_id"
        }
    ],
    Componentes: [
        {
            _id: "sdfwefsdfwe",
            type: "adaptador",
            component: "CardAula",
            map: "aosdfjw2d",
            documents: { type: "repository", method: "findManyToMany", params: ["ModuloAulas/aula:Aulas", { modulo: "$modulo._id" }] },

        },
        {
            _id: "sdfwefsdfwe2",
            type: "adaptador",
            component: "ListaComTitulo",
            map: "gfdodjfg",
            documents: { type: "repository", method: "findMany", params: ["Modulos", { pilar: "$pilar._id" }] },
            context: "modulo",
        },
        {
            _id: "sdfwefsdfwe3",
            type: "adaptador",
            component: "ListaComTitulo",
            map: "gfdodjfg",
            documents: { type: "repository", method: "findMany", params: ["Modulos", { categoriasEncontros: "$categoriasEncontros._id" }] },
            context: "modulo",
        },
        {
            _id: "lksjbjlkwfo",
            type: "adaptador",
            component: "Recommendations",
            map: "aosdfjw2d",
            documents: { type: "repository", method: "findManyToMany", params: ["ModuloAulas/aula:Aulas", { modulo: "$modulo._id" }] },

        },
        {
            _id: "compRoadmapNode",
            type: "adaptador",
            component: "RoadmapNode",
            map: "mapRoadmapNode",
            documents: { type: "repository", method: "findMany", params: ["JornadaNodes", { jornada: "$jornada._id" }] },
        },
    ],
    Pilares: [
        {
            _id: "lskdjfo1",
            value: "lideranca",
            titulo: "Liderança",
            icon: "iconUsers"
        },
        {
            _id: "lskdjfo2",
            value: "recepcao",
            titulo: "Recepção",
            icon: "iconBell"
        },
        {
            _id: "lskdjfo3",
            value: "comercial",
            titulo: "Comercial",
            icon: "iconMessageCircle"
        },
        {
            _id: "lskdjfo4",
            value: "financeiro",
            titulo: "Financeiro",
            icon: "iconDollarSign"
        }
    ],
    CategoriasEncontros: [
        {
            _id: "lskdjfo1",
            value: "Mentorias",
            titulo: "Mentorias",
            icon: "iconUsers"
        },
        {
            _id: "lskdjfo2",
            value: "Tutorias",
            titulo: "Tutorias",
            icon: "iconBell"
        }
    ],
    Modulos: [
        { _id: "lskjfof1", pilar: "lskdjfo1", titulo: "O Líder Consciente Autoconhecimento e Inteligência Emocional" },
        { _id: "lskjfof2", pilar: "lskdjfo2", titulo: "Comunicação de Impacto e Cultura de Confiança" },
        { _id: "lskjfof3", pilar: "lskdjfo3", titulo: "Gestão de Equipes de Alta Performance e Delegação" },
        { _id: "lskjfof4", pilar: "lskdjfo4", titulo: "Liderança Estratégica e Gestão de Mudanças" },
        { _id: "lskjfof5", pilar: "lskdjfo1", titulo: "Liderança Estratégica e Gestão de Mudanças" },
        { _id: "lskjfof6", categoriasEncontros: "lskdjfo1", titulo: "Gravações das Mentorias" },
        { _id: "lskjfof7", categoriasEncontros: "lskdjfo2", titulo: "Gravações das Tutorias" },
    ],
    ModuloAulas: [
        { aula: "b9c56af1-ccee-4e53-81e9-e93318bab8ba", modulo: "lskjfof2" },
        { aula: "54caa5a3-a4d8-448f-953c-bd34a700585c", modulo: "lskjfof2" },
        { aula: "c4801e0b-c028-41cb-b362-c3a3658f185d", modulo: "lskjfof1" },
        { aula: "cad3cb08-4d92-443d-9dff-d13832a2788b", modulo: "lskjfof1" },
        { aula: "549049b2-686b-494e-ae81-305f3d440710", modulo: "lskjfof1" },
        { aula: "3c215b8d-d309-447e-9c6d-2b038bc097fd", modulo: "lskjfof3" },
        { aula: "cad3cb08-4d92-443d-9dff-d13832a2788b", modulo: "lskjfof5" },
        { aula: "3c215b8d-d309-447e-9c6d-2b038bc097fd", modulo: "lskjfof5" },
        { aula: "cad3cb08-4d92-443d-9dff-d13832a2788b", modulo: "lskjfof6" },
        { aula: "549049b2-686b-494e-ae81-305f3d440710", modulo: "lskjfof7" },
    ],
    Aulas: [
        {
            "_id": "b9c56af1-ccee-4e53-81e9-e93318bab8ba",
            "title": "Aula 12 - MESL - Tutoria sobre Captação de Clientes",
            "description": "",
            "status": "CONVERTED",
            "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
            "folder_id": "fecdf08c-3adc-4357-9774-0fdae91c7950",
            "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
            "live_id": null,
            "video_external_id": "4c6d7a15-c6d7-4fa2-8f87-aafe98b87123",
            "converted_at": null,
            "created_at": "2025-08-28T20:05:24.000Z",
            "updated_at": "2025-08-28T21:15:17.000Z",
            "storage_size": 3927777483,
            "length": 3716.933333,
            "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=4c6d7a15-c6d7-4fa2-8f87-aafe98b87123",
            "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/4c6d7a15-c6d7-4fa2-8f87-aafe98b87123/playlist.m3u8",
            "width": 2112,
            "height": 1080,
            "playable": true,
            "available_resolutions": [
                "360p",
                "480p",
                "720p",
                "1080p"
            ],
            "backup": true,
            "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/4c6d7a15-c6d7-4fa2-8f87-aafe98b87123/preview.webp",
            "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/4c6d7a15-c6d7-4fa2-8f87-aafe98b87123/thumbnail.jpg",
            "playback": [
                "360p",
                "480p",
                "720p",
                "1080p"
            ],
            "pending_resolutions": []
        },
        {
            "_id": "54caa5a3-a4d8-448f-953c-bd34a700585c",
            "title": "Aula 35 - Tutoria - Comprometimento que Gera Lucro: Como Construir uma Equipe que Veste a Camisa do Salão",
            "description": "",
            "status": "CONVERTED",
            "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
            "folder_id": "97d89845-c5c3-415c-8944-67803fbf371e",
            "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
            "live_id": null,
            "video_external_id": "95a78735-957b-4de8-b4ac-246bf07ef2ab",
            "converted_at": null,
            "created_at": "2025-08-27T12:55:05.000Z",
            "updated_at": "2025-08-27T22:00:05.000Z",
            "storage_size": 11377527822,
            "length": 5887.833333,
            "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=95a78735-957b-4de8-b4ac-246bf07ef2ab",
            "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/95a78735-957b-4de8-b4ac-246bf07ef2ab/playlist.m3u8",
            "width": 1920,
            "height": 1080,
            "playable": true,
            "available_resolutions": [
                "360p",
                "480p",
                "720p",
                "1080p"
            ],
            "backup": true,
            "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/95a78735-957b-4de8-b4ac-246bf07ef2ab/preview.webp",
            "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/95a78735-957b-4de8-b4ac-246bf07ef2ab/thumbnail.jpg",
            "playback": [
                "360p",
                "480p",
                "720p",
                "1080p"
            ],
            "pending_resolutions": []
        },
        {
            "_id": "c4801e0b-c028-41cb-b362-c3a3658f185d",
            "title": "53 - Sessão MSL 18.08.25",
            "description": "",
            "status": "CONVERTED",
            "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
            "folder_id": "627085ee-7d1b-4630-8230-643cb1497a0c",
            "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
            "live_id": null,
            "video_external_id": "78356c9b-dd2c-4d53-8abf-61d972ae1297",
            "converted_at": null,
            "created_at": "2025-08-19T17:19:28.000Z",
            "updated_at": "2025-08-19T17:37:39.000Z",
            "storage_size": 866016272,
            "length": 7860.72,
            "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=78356c9b-dd2c-4d53-8abf-61d972ae1297",
            "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/78356c9b-dd2c-4d53-8abf-61d972ae1297/playlist.m3u8",
            "width": 640,
            "height": 360,
            "playable": true,
            "available_resolutions": [
                "360p"
            ],
            "backup": true,
            "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/78356c9b-dd2c-4d53-8abf-61d972ae1297/preview.webp",
            "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/78356c9b-dd2c-4d53-8abf-61d972ae1297/thumbnail.jpg",
            "playback": [
                "360p",
                "480p",
                "720p",
                "1080p"
            ],
            "pending_resolutions": []
        },
        {
            "_id": "cad3cb08-4d92-443d-9dff-d13832a2788b",
            "title": "52 - Sessão MSL 18.08.25",
            "description": "",
            "status": "CONVERTED",
            "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
            "folder_id": "627085ee-7d1b-4630-8230-643cb1497a0c",
            "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
            "live_id": null,
            "video_external_id": "7021cb17-be90-4e14-8c04-61100e064c1c",
            "converted_at": null,
            "created_at": "2025-08-19T17:17:11.000Z",
            "updated_at": "2025-08-19T17:34:44.000Z",
            "storage_size": 750009706,
            "length": 7254.48,
            "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=7021cb17-be90-4e14-8c04-61100e064c1c",
            "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/7021cb17-be90-4e14-8c04-61100e064c1c/playlist.m3u8",
            "width": 640,
            "height": 360,
            "playable": true,
            "available_resolutions": [
                "360p"
            ],
            "backup": true,
            "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/7021cb17-be90-4e14-8c04-61100e064c1c/preview.webp",
            "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/7021cb17-be90-4e14-8c04-61100e064c1c/thumbnail.jpg",
            "playback": [
                "360p",
                "480p",
                "720p",
                "1080p"
            ],
            "pending_resolutions": []
        },
        {
            "_id": "549049b2-686b-494e-ae81-305f3d440710",
            "title": "Aula 34 - Tutoria - Como atrair e escolher os profissionais certos para seu salão.",
            "description": "",
            "status": "CONVERTED",
            "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
            "folder_id": "97d89845-c5c3-415c-8944-67803fbf371e",
            "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
            "live_id": null,
            "video_external_id": "d8c5aec8-e7cb-4c2b-ae64-508519ed0336",
            "converted_at": null,
            "created_at": "2025-08-12T13:48:42.000Z",
            "updated_at": "2025-08-12T15:49:31.000Z",
            "storage_size": 8435144246,
            "length": 4143.2,
            "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=d8c5aec8-e7cb-4c2b-ae64-508519ed0336",
            "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/d8c5aec8-e7cb-4c2b-ae64-508519ed0336/playlist.m3u8",
            "width": 1920,
            "height": 1080,
            "playable": true,
            "available_resolutions": [
                "360p",
                "480p",
                "720p",
                "1080p"
            ],
            "backup": true,
            "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/d8c5aec8-e7cb-4c2b-ae64-508519ed0336/preview.webp",
            "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/d8c5aec8-e7cb-4c2b-ae64-508519ed0336/thumbnail.jpg",
            "playback": [
                "360p",
                "480p",
                "720p",
                "1080p"
            ],
            "pending_resolutions": []
        },
        {
            "_id": "3c215b8d-d309-447e-9c6d-2b038bc097fd",
            "title": "Aula 11 -MESL- Como atrair e escolher os profissionais certos para seu salão. 11.08.25",
            "description": "",
            "status": "CONVERTED",
            "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
            "folder_id": "fecdf08c-3adc-4357-9774-0fdae91c7950",
            "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
            "live_id": null,
            "video_external_id": "416ff6ee-9cfc-40b4-b902-d599c271c7b4",
            "converted_at": null,
            "created_at": "2025-08-12T12:00:55.000Z",
            "updated_at": "2025-08-12T13:24:22.000Z",
            "storage_size": 2158182834,
            "length": 5570.76,
            "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=416ff6ee-9cfc-40b4-b902-d599c271c7b4",
            "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/416ff6ee-9cfc-40b4-b902-d599c271c7b4/playlist.m3u8",
            "width": 1760,
            "height": 900,
            "playable": true,
            "available_resolutions": [
                "360p",
                "480p",
                "720p"
            ],
            "backup": true,
            "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/416ff6ee-9cfc-40b4-b902-d599c271c7b4/preview.webp",
            "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/416ff6ee-9cfc-40b4-b902-d599c271c7b4/thumbnail.jpg",
            "playback": [
                "360p",
                "480p",
                "720p",
                "1080p"
            ],
            "pending_resolutions": []
        },
        // --- Aulas por nó do roadmap ---
        // Fundamentos
        { "_id": "aula-fund-1", "title": "Introdução à Microeconomia e Macroeconomia", "description": "Conceitos essenciais de economia para empreendedores.", "status": "CONVERTED", "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527", "folder_id": "fecdf08c-3adc-4357-9774-0fdae91c7950", "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781", "video_external_id": "4c6d7a15-c6d7-4fa2-8f87-aafe98b87123", "created_at": "2025-09-01T10:00:00.000Z", "updated_at": "2025-09-01T10:00:00.000Z", "length": 2400, "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=4c6d7a15-c6d7-4fa2-8f87-aafe98b87123", "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/4c6d7a15-c6d7-4fa2-8f87-aafe98b87123/playlist.m3u8", "width": 1920, "height": 1080, "playable": true, "available_resolutions": ["360p","480p","720p","1080p"], "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/4c6d7a15-c6d7-4fa2-8f87-aafe98b87123/thumbnail.jpg", "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/4c6d7a15-c6d7-4fa2-8f87-aafe98b87123/preview.webp", "playback": ["360p","480p","720p","1080p"] },
        { "_id": "aula-fund-2", "title": "Ética Empresarial e Estruturas Legais", "description": "Fundamentos jurídicos e éticos para negócios.", "status": "CONVERTED", "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527", "folder_id": "fecdf08c-3adc-4357-9774-0fdae91c7950", "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781", "video_external_id": "95a78735-957b-4de8-b4ac-246bf07ef2ab", "created_at": "2025-09-02T10:00:00.000Z", "updated_at": "2025-09-02T10:00:00.000Z", "length": 1980, "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=95a78735-957b-4de8-b4ac-246bf07ef2ab", "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/95a78735-957b-4de8-b4ac-246bf07ef2ab/playlist.m3u8", "width": 1920, "height": 1080, "playable": true, "available_resolutions": ["360p","480p","720p","1080p"], "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/95a78735-957b-4de8-b4ac-246bf07ef2ab/thumbnail.jpg", "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/95a78735-957b-4de8-b4ac-246bf07ef2ab/preview.webp", "playback": ["360p","480p","720p","1080p"] },
        // Pesquisa de Mercado
        { "_id": "aula-pesq-1", "title": "Como Fazer Pesquisa de Mercado do Zero", "description": "Descoberta de clientes e dimensionamento de mercado.", "status": "CONVERTED", "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527", "folder_id": "fecdf08c-3adc-4357-9774-0fdae91c7950", "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781", "video_external_id": "78356c9b-dd2c-4d53-8abf-61d972ae1297", "created_at": "2025-09-03T10:00:00.000Z", "updated_at": "2025-09-03T10:00:00.000Z", "length": 3120, "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=78356c9b-dd2c-4d53-8abf-61d972ae1297", "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/78356c9b-dd2c-4d53-8abf-61d972ae1297/playlist.m3u8", "width": 1920, "height": 1080, "playable": true, "available_resolutions": ["360p","480p","720p"], "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/78356c9b-dd2c-4d53-8abf-61d972ae1297/thumbnail.jpg", "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/78356c9b-dd2c-4d53-8abf-61d972ae1297/preview.webp", "playback": ["360p","480p","720p","1080p"] },
        { "_id": "aula-pesq-2", "title": "Análise de Concorrentes na Prática", "description": "Técnicas para mapear e analisar a concorrência.", "status": "CONVERTED", "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527", "folder_id": "fecdf08c-3adc-4357-9774-0fdae91c7950", "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781", "video_external_id": "7021cb17-be90-4e14-8c04-61100e064c1c", "created_at": "2025-09-04T10:00:00.000Z", "updated_at": "2025-09-04T10:00:00.000Z", "length": 2700, "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=7021cb17-be90-4e14-8c04-61100e064c1c", "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/7021cb17-be90-4e14-8c04-61100e064c1c/playlist.m3u8", "width": 1920, "height": 1080, "playable": true, "available_resolutions": ["360p","480p","720p"], "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/7021cb17-be90-4e14-8c04-61100e064c1c/thumbnail.jpg", "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/7021cb17-be90-4e14-8c04-61100e064c1c/preview.webp", "playback": ["360p","480p","720p","1080p"] },
        // Criação de Valor
        { "_id": "aula-prod-1", "title": "Design Thinking para Criação de Produtos", "description": "Metodologia para desenvolver produtos centrados no cliente.", "status": "CONVERTED", "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527", "folder_id": "fecdf08c-3adc-4357-9774-0fdae91c7950", "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781", "video_external_id": "d8c5aec8-e7cb-4c2b-ae64-508519ed0336", "created_at": "2025-09-05T10:00:00.000Z", "updated_at": "2025-09-05T10:00:00.000Z", "length": 2880, "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=d8c5aec8-e7cb-4c2b-ae64-508519ed0336", "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/d8c5aec8-e7cb-4c2b-ae64-508519ed0336/playlist.m3u8", "width": 1920, "height": 1080, "playable": true, "available_resolutions": ["360p","480p","720p","1080p"], "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/d8c5aec8-e7cb-4c2b-ae64-508519ed0336/thumbnail.jpg", "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/d8c5aec8-e7cb-4c2b-ae64-508519ed0336/preview.webp", "playback": ["360p","480p","720p","1080p"] },
        { "_id": "aula-prod-2", "title": "Construindo seu MVP - Do Conceito ao Produto", "description": "Como criar um produto mínimo viável rapidamente.", "status": "CONVERTED", "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527", "folder_id": "fecdf08c-3adc-4357-9774-0fdae91c7950", "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781", "video_external_id": "416ff6ee-9cfc-40b4-b902-d599c271c7b4", "created_at": "2025-09-06T10:00:00.000Z", "updated_at": "2025-09-06T10:00:00.000Z", "length": 3360, "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=416ff6ee-9cfc-40b4-b902-d599c271c7b4", "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/416ff6ee-9cfc-40b4-b902-d599c271c7b4/playlist.m3u8", "width": 1920, "height": 1080, "playable": true, "available_resolutions": ["360p","480p","720p"], "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/416ff6ee-9cfc-40b4-b902-d599c271c7b4/thumbnail.jpg", "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/416ff6ee-9cfc-40b4-b902-d599c271c7b4/preview.webp", "playback": ["360p","480p","720p","1080p"] },
        // Marketing
        { "_id": "aula-mkt-1", "title": "Marketing Digital para Iniciantes", "description": "Estratégias de marketing digital e captação de atenção.", "status": "CONVERTED", "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527", "folder_id": "fecdf08c-3adc-4357-9774-0fdae91c7950", "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781", "video_external_id": "4c6d7a15-c6d7-4fa2-8f87-aafe98b87123", "created_at": "2025-09-07T10:00:00.000Z", "updated_at": "2025-09-07T10:00:00.000Z", "length": 2640, "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=4c6d7a15-c6d7-4fa2-8f87-aafe98b87123", "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/4c6d7a15-c6d7-4fa2-8f87-aafe98b87123/playlist.m3u8", "width": 1920, "height": 1080, "playable": true, "available_resolutions": ["360p","480p","720p","1080p"], "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/4c6d7a15-c6d7-4fa2-8f87-aafe98b87123/thumbnail.jpg", "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/4c6d7a15-c6d7-4fa2-8f87-aafe98b87123/preview.webp", "playback": ["360p","480p","720p","1080p"] },
        { "_id": "aula-mkt-2", "title": "Posicionamento de Marca e Branding", "description": "Como posicionar sua marca no mercado.", "status": "CONVERTED", "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527", "folder_id": "fecdf08c-3adc-4357-9774-0fdae91c7950", "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781", "video_external_id": "95a78735-957b-4de8-b4ac-246bf07ef2ab", "created_at": "2025-09-08T10:00:00.000Z", "updated_at": "2025-09-08T10:00:00.000Z", "length": 3000, "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=95a78735-957b-4de8-b4ac-246bf07ef2ab", "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/95a78735-957b-4de8-b4ac-246bf07ef2ab/playlist.m3u8", "width": 1920, "height": 1080, "playable": true, "available_resolutions": ["360p","480p","720p","1080p"], "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/95a78735-957b-4de8-b4ac-246bf07ef2ab/thumbnail.jpg", "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/95a78735-957b-4de8-b4ac-246bf07ef2ab/preview.webp", "playback": ["360p","480p","720p","1080p"] },
        // Vendas
        { "_id": "aula-vend-1", "title": "Técnicas de Fechamento de Vendas", "description": "Negociação e técnicas avançadas de fechamento B2B/B2C.", "status": "CONVERTED", "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527", "folder_id": "fecdf08c-3adc-4357-9774-0fdae91c7950", "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781", "video_external_id": "78356c9b-dd2c-4d53-8abf-61d972ae1297", "created_at": "2025-09-09T10:00:00.000Z", "updated_at": "2025-09-09T10:00:00.000Z", "length": 2520, "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=78356c9b-dd2c-4d53-8abf-61d972ae1297", "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/78356c9b-dd2c-4d53-8abf-61d972ae1297/playlist.m3u8", "width": 1920, "height": 1080, "playable": true, "available_resolutions": ["360p","480p","720p"], "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/78356c9b-dd2c-4d53-8abf-61d972ae1297/thumbnail.jpg", "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/78356c9b-dd2c-4d53-8abf-61d972ae1297/preview.webp", "playback": ["360p","480p","720p","1080p"] },
        // Operações
        { "_id": "aula-ops-1", "title": "Otimização de Processos Operacionais", "description": "Como otimizar processos para máxima eficiência.", "status": "CONVERTED", "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527", "folder_id": "fecdf08c-3adc-4357-9774-0fdae91c7950", "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781", "video_external_id": "7021cb17-be90-4e14-8c04-61100e064c1c", "created_at": "2025-09-10T10:00:00.000Z", "updated_at": "2025-09-10T10:00:00.000Z", "length": 2160, "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=7021cb17-be90-4e14-8c04-61100e064c1c", "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/7021cb17-be90-4e14-8c04-61100e064c1c/playlist.m3u8", "width": 1920, "height": 1080, "playable": true, "available_resolutions": ["360p","480p","720p"], "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/7021cb17-be90-4e14-8c04-61100e064c1c/thumbnail.jpg", "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/7021cb17-be90-4e14-8c04-61100e064c1c/preview.webp", "playback": ["360p","480p","720p","1080p"] },
        { "_id": "aula-ops-2", "title": "Gestão de Supply Chain e Logística", "description": "Cadeia de suprimentos e entrega de valor ao cliente.", "status": "CONVERTED", "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527", "folder_id": "fecdf08c-3adc-4357-9774-0fdae91c7950", "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781", "video_external_id": "d8c5aec8-e7cb-4c2b-ae64-508519ed0336", "created_at": "2025-09-11T10:00:00.000Z", "updated_at": "2025-09-11T10:00:00.000Z", "length": 2340, "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=d8c5aec8-e7cb-4c2b-ae64-508519ed0336", "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/d8c5aec8-e7cb-4c2b-ae64-508519ed0336/playlist.m3u8", "width": 1920, "height": 1080, "playable": true, "available_resolutions": ["360p","480p","720p","1080p"], "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/d8c5aec8-e7cb-4c2b-ae64-508519ed0336/thumbnail.jpg", "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/d8c5aec8-e7cb-4c2b-ae64-508519ed0336/preview.webp", "playback": ["360p","480p","720p","1080p"] },
        // Finanças
        { "_id": "aula-fin-1", "title": "Fluxo de Caixa na Prática", "description": "Como gerenciar o fluxo de caixa do seu negócio.", "status": "CONVERTED", "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527", "folder_id": "fecdf08c-3adc-4357-9774-0fdae91c7950", "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781", "video_external_id": "416ff6ee-9cfc-40b4-b902-d599c271c7b4", "created_at": "2025-09-12T10:00:00.000Z", "updated_at": "2025-09-12T10:00:00.000Z", "length": 2760, "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=416ff6ee-9cfc-40b4-b902-d599c271c7b4", "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/416ff6ee-9cfc-40b4-b902-d599c271c7b4/playlist.m3u8", "width": 1920, "height": 1080, "playable": true, "available_resolutions": ["360p","480p","720p"], "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/416ff6ee-9cfc-40b4-b902-d599c271c7b4/thumbnail.jpg", "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/416ff6ee-9cfc-40b4-b902-d599c271c7b4/preview.webp", "playback": ["360p","480p","720p","1080p"] },
        { "_id": "aula-fin-2", "title": "Como Ler e Interpretar uma DRE", "description": "Demonstração de resultados para tomada de decisão.", "status": "CONVERTED", "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527", "folder_id": "fecdf08c-3adc-4357-9774-0fdae91c7950", "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781", "video_external_id": "4c6d7a15-c6d7-4fa2-8f87-aafe98b87123", "created_at": "2025-09-13T10:00:00.000Z", "updated_at": "2025-09-13T10:00:00.000Z", "length": 1800, "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=4c6d7a15-c6d7-4fa2-8f87-aafe98b87123", "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/4c6d7a15-c6d7-4fa2-8f87-aafe98b87123/playlist.m3u8", "width": 1920, "height": 1080, "playable": true, "available_resolutions": ["360p","480p","720p","1080p"], "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/4c6d7a15-c6d7-4fa2-8f87-aafe98b87123/thumbnail.jpg", "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/4c6d7a15-c6d7-4fa2-8f87-aafe98b87123/preview.webp", "playback": ["360p","480p","720p","1080p"] },
        // Estratégia
        { "_id": "aula-estr-1", "title": "Vantagem Competitiva Sustentável", "description": "Como criar e manter vantagem competitiva no mercado.", "status": "CONVERTED", "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527", "folder_id": "fecdf08c-3adc-4357-9774-0fdae91c7950", "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781", "video_external_id": "95a78735-957b-4de8-b4ac-246bf07ef2ab", "created_at": "2025-09-14T10:00:00.000Z", "updated_at": "2025-09-14T10:00:00.000Z", "length": 3240, "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=95a78735-957b-4de8-b4ac-246bf07ef2ab", "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/95a78735-957b-4de8-b4ac-246bf07ef2ab/playlist.m3u8", "width": 1920, "height": 1080, "playable": true, "available_resolutions": ["360p","480p","720p","1080p"], "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/95a78735-957b-4de8-b4ac-246bf07ef2ab/thumbnail.jpg", "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/95a78735-957b-4de8-b4ac-246bf07ef2ab/preview.webp", "playback": ["360p","480p","720p","1080p"] },
        { "_id": "aula-estr-2", "title": "Planejamento Estratégico de Longo Prazo", "description": "Ferramentas e frameworks para planejamento estratégico.", "status": "CONVERTED", "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527", "folder_id": "fecdf08c-3adc-4357-9774-0fdae91c7950", "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781", "video_external_id": "78356c9b-dd2c-4d53-8abf-61d972ae1297", "created_at": "2025-09-15T10:00:00.000Z", "updated_at": "2025-09-15T10:00:00.000Z", "length": 2940, "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=78356c9b-dd2c-4d53-8abf-61d972ae1297", "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/78356c9b-dd2c-4d53-8abf-61d972ae1297/playlist.m3u8", "width": 1920, "height": 1080, "playable": true, "available_resolutions": ["360p","480p","720p"], "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/78356c9b-dd2c-4d53-8abf-61d972ae1297/thumbnail.jpg", "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/78356c9b-dd2c-4d53-8abf-61d972ae1297/preview.webp", "playback": ["360p","480p","720p","1080p"] },
        // Liderança & Escala
        { "_id": "aula-lid-1", "title": "Liderança Executiva - Inspirando Equipes", "description": "Como liderar com visão e inspirar resultados.", "status": "CONVERTED", "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527", "folder_id": "fecdf08c-3adc-4357-9774-0fdae91c7950", "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781", "video_external_id": "7021cb17-be90-4e14-8c04-61100e064c1c", "created_at": "2025-09-16T10:00:00.000Z", "updated_at": "2025-09-16T10:00:00.000Z", "length": 2100, "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=7021cb17-be90-4e14-8c04-61100e064c1c", "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/7021cb17-be90-4e14-8c04-61100e064c1c/playlist.m3u8", "width": 1920, "height": 1080, "playable": true, "available_resolutions": ["360p","480p","720p"], "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/7021cb17-be90-4e14-8c04-61100e064c1c/thumbnail.jpg", "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/7021cb17-be90-4e14-8c04-61100e064c1c/preview.webp", "playback": ["360p","480p","720p","1080p"] },
        { "_id": "aula-lid-2", "title": "Sistemas de Escala - Crescendo sem Caos", "description": "Como escalar operações mantendo qualidade.", "status": "CONVERTED", "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527", "folder_id": "fecdf08c-3adc-4357-9774-0fdae91c7950", "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781", "video_external_id": "d8c5aec8-e7cb-4c2b-ae64-508519ed0336", "created_at": "2025-09-17T10:00:00.000Z", "updated_at": "2025-09-17T10:00:00.000Z", "length": 2580, "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=d8c5aec8-e7cb-4c2b-ae64-508519ed0336", "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/d8c5aec8-e7cb-4c2b-ae64-508519ed0336/playlist.m3u8", "width": 1920, "height": 1080, "playable": true, "available_resolutions": ["360p","480p","720p","1080p"], "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/d8c5aec8-e7cb-4c2b-ae64-508519ed0336/thumbnail.jpg", "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/d8c5aec8-e7cb-4c2b-ae64-508519ed0336/preview.webp", "playback": ["360p","480p","720p","1080p"] },
        // Auto Liderança
        { "_id": "aula-auto-1", "title": "Inteligência Emocional para Líderes", "description": "Autoconhecimento e gestão das emoções.", "status": "CONVERTED", "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527", "folder_id": "fecdf08c-3adc-4357-9774-0fdae91c7950", "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781", "video_external_id": "416ff6ee-9cfc-40b4-b902-d599c271c7b4", "created_at": "2025-09-18T10:00:00.000Z", "updated_at": "2025-09-18T10:00:00.000Z", "length": 2220, "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=416ff6ee-9cfc-40b4-b902-d599c271c7b4", "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/416ff6ee-9cfc-40b4-b902-d599c271c7b4/playlist.m3u8", "width": 1920, "height": 1080, "playable": true, "available_resolutions": ["360p","480p","720p"], "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/416ff6ee-9cfc-40b4-b902-d599c271c7b4/thumbnail.jpg", "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/416ff6ee-9cfc-40b4-b902-d599c271c7b4/preview.webp", "playback": ["360p","480p","720p","1080p"] },
        { "_id": "aula-auto-2", "title": "Gestão do Tempo e Produtividade Pessoal", "description": "Técnicas para gerenciar seu tempo com eficiência.", "status": "CONVERTED", "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527", "folder_id": "fecdf08c-3adc-4357-9774-0fdae91c7950", "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781", "video_external_id": "4c6d7a15-c6d7-4fa2-8f87-aafe98b87123", "created_at": "2025-09-19T10:00:00.000Z", "updated_at": "2025-09-19T10:00:00.000Z", "length": 1920, "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=4c6d7a15-c6d7-4fa2-8f87-aafe98b87123", "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/4c6d7a15-c6d7-4fa2-8f87-aafe98b87123/playlist.m3u8", "width": 1920, "height": 1080, "playable": true, "available_resolutions": ["360p","480p","720p","1080p"], "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/4c6d7a15-c6d7-4fa2-8f87-aafe98b87123/thumbnail.jpg", "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/4c6d7a15-c6d7-4fa2-8f87-aafe98b87123/preview.webp", "playback": ["360p","480p","720p","1080p"] },
        // Comunicação
        { "_id": "aula-com-1", "title": "Escuta Ativa e Oratória Persuasiva", "description": "Como ouvir melhor e comunicar com impacto.", "status": "CONVERTED", "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527", "folder_id": "fecdf08c-3adc-4357-9774-0fdae91c7950", "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781", "video_external_id": "95a78735-957b-4de8-b4ac-246bf07ef2ab", "created_at": "2025-09-20T10:00:00.000Z", "updated_at": "2025-09-20T10:00:00.000Z", "length": 2460, "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=95a78735-957b-4de8-b4ac-246bf07ef2ab", "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/95a78735-957b-4de8-b4ac-246bf07ef2ab/playlist.m3u8", "width": 1920, "height": 1080, "playable": true, "available_resolutions": ["360p","480p","720p","1080p"], "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/95a78735-957b-4de8-b4ac-246bf07ef2ab/thumbnail.jpg", "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/95a78735-957b-4de8-b4ac-246bf07ef2ab/preview.webp", "playback": ["360p","480p","720p","1080p"] },
        { "_id": "aula-com-2", "title": "Comunicação Não-Violenta no Trabalho", "description": "Ferramentas de CNV para o ambiente corporativo.", "status": "CONVERTED", "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527", "folder_id": "fecdf08c-3adc-4357-9774-0fdae91c7950", "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781", "video_external_id": "78356c9b-dd2c-4d53-8abf-61d972ae1297", "created_at": "2025-09-21T10:00:00.000Z", "updated_at": "2025-09-21T10:00:00.000Z", "length": 2040, "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=78356c9b-dd2c-4d53-8abf-61d972ae1297", "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/78356c9b-dd2c-4d53-8abf-61d972ae1297/playlist.m3u8", "width": 1920, "height": 1080, "playable": true, "available_resolutions": ["360p","480p","720p"], "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/78356c9b-dd2c-4d53-8abf-61d972ae1297/thumbnail.jpg", "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/78356c9b-dd2c-4d53-8abf-61d972ae1297/preview.webp", "playback": ["360p","480p","720p","1080p"] },
        // Resolução de Conflitos
        { "_id": "aula-conf-1", "title": "Mediação de Conflitos na Equipe", "description": "Como mediar disputas e manter a harmonia.", "status": "CONVERTED", "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527", "folder_id": "fecdf08c-3adc-4357-9774-0fdae91c7950", "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781", "video_external_id": "7021cb17-be90-4e14-8c04-61100e064c1c", "created_at": "2025-09-22T10:00:00.000Z", "updated_at": "2025-09-22T10:00:00.000Z", "length": 2280, "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=7021cb17-be90-4e14-8c04-61100e064c1c", "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/7021cb17-be90-4e14-8c04-61100e064c1c/playlist.m3u8", "width": 1920, "height": 1080, "playable": true, "available_resolutions": ["360p","480p","720p"], "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/7021cb17-be90-4e14-8c04-61100e064c1c/thumbnail.jpg", "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/7021cb17-be90-4e14-8c04-61100e064c1c/preview.webp", "playback": ["360p","480p","720p","1080p"] },
        { "_id": "aula-conf-2", "title": "Conversas Difíceis - Guia Prático", "description": "Navegando conversas desconfortáveis com confiança.", "status": "CONVERTED", "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527", "folder_id": "fecdf08c-3adc-4357-9774-0fdae91c7950", "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781", "video_external_id": "d8c5aec8-e7cb-4c2b-ae64-508519ed0336", "created_at": "2025-09-23T10:00:00.000Z", "updated_at": "2025-09-23T10:00:00.000Z", "length": 1860, "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=d8c5aec8-e7cb-4c2b-ae64-508519ed0336", "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/d8c5aec8-e7cb-4c2b-ae64-508519ed0336/playlist.m3u8", "width": 1920, "height": 1080, "playable": true, "available_resolutions": ["360p","480p","720p","1080p"], "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/d8c5aec8-e7cb-4c2b-ae64-508519ed0336/thumbnail.jpg", "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/d8c5aec8-e7cb-4c2b-ae64-508519ed0336/preview.webp", "playback": ["360p","480p","720p","1080p"] },
        // Formação de Equipes
        { "_id": "aula-team-1", "title": "Motivação e Engajamento de Equipes", "description": "Como motivar e engajar sua equipe de alto desempenho.", "status": "CONVERTED", "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527", "folder_id": "fecdf08c-3adc-4357-9774-0fdae91c7950", "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781", "video_external_id": "416ff6ee-9cfc-40b4-b902-d599c271c7b4", "created_at": "2025-09-24T10:00:00.000Z", "updated_at": "2025-09-24T10:00:00.000Z", "length": 2700, "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=416ff6ee-9cfc-40b4-b902-d599c271c7b4", "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/416ff6ee-9cfc-40b4-b902-d599c271c7b4/playlist.m3u8", "width": 1920, "height": 1080, "playable": true, "available_resolutions": ["360p","480p","720p"], "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/416ff6ee-9cfc-40b4-b902-d599c271c7b4/thumbnail.jpg", "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/416ff6ee-9cfc-40b4-b902-d599c271c7b4/preview.webp", "playback": ["360p","480p","720p","1080p"] },
        { "_id": "aula-team-2", "title": "A Arte da Delegação Eficaz", "description": "Delegando tarefas sem perder qualidade.", "status": "CONVERTED", "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527", "folder_id": "fecdf08c-3adc-4357-9774-0fdae91c7950", "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781", "video_external_id": "4c6d7a15-c6d7-4fa2-8f87-aafe98b87123", "created_at": "2025-09-25T10:00:00.000Z", "updated_at": "2025-09-25T10:00:00.000Z", "length": 2340, "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=4c6d7a15-c6d7-4fa2-8f87-aafe98b87123", "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/4c6d7a15-c6d7-4fa2-8f87-aafe98b87123/playlist.m3u8", "width": 1920, "height": 1080, "playable": true, "available_resolutions": ["360p","480p","720p","1080p"], "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/4c6d7a15-c6d7-4fa2-8f87-aafe98b87123/thumbnail.jpg", "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/4c6d7a15-c6d7-4fa2-8f87-aafe98b87123/preview.webp", "playback": ["360p","480p","720p","1080p"] },
        // Visão Estratégica
        { "_id": "aula-vis-1", "title": "Definindo a Visão do seu Negócio", "description": "Como criar uma visão clara e inspiradora.", "status": "CONVERTED", "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527", "folder_id": "fecdf08c-3adc-4357-9774-0fdae91c7950", "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781", "video_external_id": "95a78735-957b-4de8-b4ac-246bf07ef2ab", "created_at": "2025-09-26T10:00:00.000Z", "updated_at": "2025-09-26T10:00:00.000Z", "length": 2580, "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=95a78735-957b-4de8-b4ac-246bf07ef2ab", "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/95a78735-957b-4de8-b4ac-246bf07ef2ab/playlist.m3u8", "width": 1920, "height": 1080, "playable": true, "available_resolutions": ["360p","480p","720p","1080p"], "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/95a78735-957b-4de8-b4ac-246bf07ef2ab/thumbnail.jpg", "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/95a78735-957b-4de8-b4ac-246bf07ef2ab/preview.webp", "playback": ["360p","480p","720p","1080p"] },
        { "_id": "aula-vis-2", "title": "Alinhamento de Objetivos e OKRs", "description": "Frameworks para alinhar equipe e objetivos.", "status": "CONVERTED", "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527", "folder_id": "fecdf08c-3adc-4357-9774-0fdae91c7950", "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781", "video_external_id": "7021cb17-be90-4e14-8c04-61100e064c1c", "created_at": "2025-09-27T10:00:00.000Z", "updated_at": "2025-09-27T10:00:00.000Z", "length": 2100, "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=7021cb17-be90-4e14-8c04-61100e064c1c", "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/7021cb17-be90-4e14-8c04-61100e064c1c/playlist.m3u8", "width": 1920, "height": 1080, "playable": true, "available_resolutions": ["360p","480p","720p"], "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/7021cb17-be90-4e14-8c04-61100e064c1c/thumbnail.jpg", "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/7021cb17-be90-4e14-8c04-61100e064c1c/preview.webp", "playback": ["360p","480p","720p","1080p"] }
    ],
    Mostradores: [
        {
            _id: "123",
            titulo: "Mes de Janeiro",
            valor: 0
        }
    ],
    Jornadas: [
        { _id: "business", titulo: "Business Mastery Roadmap", descricao: "An interactive guide to learning business from the ground up. Hover over any topic to see its connections and dependencies.", icon: "iconTrendingUp" },
        { _id: "leadership", titulo: "Leadership & Management", descricao: "A structured path to becoming an effective leader, from self-management to guiding large organizations.", icon: "iconUsers" }
    ],
    JornadaNodes: [
        // Business nodes
        { _id: "basics", jornada: "business", tier: 1, titulo: "Fundamentos", descricao: "Micro & Macroeconomia, etica empresarial e estruturas legais.", icon: "iconBookOpen", theme: "blue" },
        { _id: "research", jornada: "business", tier: 2, titulo: "Pesquisa de Mercado", descricao: "Descoberta de clientes, analise de concorrentes e dimensionamento de mercado.", icon: "iconSearch", theme: "purple" },
        { _id: "product", jornada: "business", tier: 2, titulo: "Criacao de Valor", descricao: "Desenvolvimento de produto, design de servico e construcao de MVPs.", icon: "iconBox", theme: "indigo" },
        { _id: "marketing", jornada: "business", tier: 3, titulo: "Marketing", descricao: "Posicionamento de marca, marketing digital e captacao de atencao.", icon: "iconTarget", theme: "pink" },
        { _id: "sales", jornada: "business", tier: 3, titulo: "Vendas", descricao: "Ciclos de vendas B2B/B2C, negociacao e tecnicas de fechamento.", icon: "iconDollarSign", theme: "emerald" },
        { _id: "ops", jornada: "business", tier: 3, titulo: "Operacoes", descricao: "Supply chain, otimizacao de processos e entrega de valor.", icon: "iconSettings", theme: "orange" },
        { _id: "finance", jornada: "business", tier: 4, titulo: "Financas", descricao: "Contabilidade basica, fluxo de caixa, DRE e captacao de recursos.", icon: "iconPieChart", theme: "yellow" },
        { _id: "hr", jornada: "business", tier: 4, titulo: "Equipe & RH", descricao: "Contratacao, cultura organizacional, gestao e remuneracao.", icon: "iconUsers", theme: "teal" },
        { _id: "strategy", jornada: "business", tier: 5, titulo: "Estrategia de Negocios", descricao: "Vantagem competitiva, pivots, M&A e planejamento de longo prazo.", icon: "iconCompass", theme: "cyan" },
        { _id: "leadership_node", jornada: "business", tier: 6, titulo: "Lideranca & Escala", descricao: "Lideranca executiva, sistemas de escala e construcao de imperios.", icon: "iconAward", theme: "rose" },
        // Leadership nodes
        { _id: "self-leadership", jornada: "leadership", tier: 1, titulo: "Auto Lideranca", descricao: "Inteligencia emocional, gestao de tempo e autoconhecimento profundo.", icon: "iconUser", theme: "blue" },
        { _id: "communication", jornada: "leadership", tier: 2, titulo: "Comunicacao", descricao: "Escuta ativa, oratoria e articulacao clara de ideias.", icon: "iconMessageCircle", theme: "purple" },
        { _id: "conflict", jornada: "leadership", tier: 2, titulo: "Resolucao de Conflitos", descricao: "Navegacao de conversas dificeis e mediacao de disputas na equipe.", icon: "iconShield", theme: "rose" },
        { _id: "team", jornada: "leadership", tier: 3, titulo: "Formacao de Equipes", descricao: "Motivacao, delegacao e construcao de seguranca psicologica.", icon: "iconUsers", theme: "teal" },
        { _id: "vision", jornada: "leadership", tier: 4, titulo: "Visao Estrategica", descricao: "Definicao de direcao, alinhamento de objetivos e inspiracao de acao coletiva.", icon: "iconEye", theme: "indigo" }
    ],
    NodeAulas: [
        // basics - Fundamentos
        { node: "basics", aula: "aula-fund-1" },
        { node: "basics", aula: "aula-fund-2" },
        // research - Pesquisa de Mercado
        { node: "research", aula: "aula-pesq-1" },
        { node: "research", aula: "aula-pesq-2" },
        // product - Criação de Valor
        { node: "product", aula: "aula-prod-1" },
        { node: "product", aula: "aula-prod-2" },
        // marketing
        { node: "marketing", aula: "aula-mkt-1" },
        { node: "marketing", aula: "aula-mkt-2" },
        // sales - Vendas
        { node: "sales", aula: "b9c56af1-ccee-4e53-81e9-e93318bab8ba" },
        { node: "sales", aula: "aula-vend-1" },
        // ops - Operações
        { node: "ops", aula: "aula-ops-1" },
        { node: "ops", aula: "aula-ops-2" },
        // finance - Finanças
        { node: "finance", aula: "aula-fin-1" },
        { node: "finance", aula: "aula-fin-2" },
        // hr - Equipe & RH
        { node: "hr", aula: "549049b2-686b-494e-ae81-305f3d440710" },
        { node: "hr", aula: "54caa5a3-a4d8-448f-953c-bd34a700585c" },
        // strategy - Estratégia
        { node: "strategy", aula: "aula-estr-1" },
        { node: "strategy", aula: "aula-estr-2" },
        // leadership_node - Liderança & Escala
        { node: "leadership_node", aula: "aula-lid-1" },
        { node: "leadership_node", aula: "aula-lid-2" },
        // self-leadership - Auto Liderança
        { node: "self-leadership", aula: "aula-auto-1" },
        { node: "self-leadership", aula: "aula-auto-2" },
        // communication - Comunicação
        { node: "communication", aula: "aula-com-1" },
        { node: "communication", aula: "aula-com-2" },
        // conflict - Resolução de Conflitos
        { node: "conflict", aula: "aula-conf-1" },
        { node: "conflict", aula: "aula-conf-2" },
        // team - Formação de Equipes
        { node: "team", aula: "aula-team-1" },
        { node: "team", aula: "aula-team-2" },
        // vision - Visão Estratégica
        { node: "vision", aula: "aula-vis-1" },
        { node: "vision", aula: "aula-vis-2" },
    ],
    JornadaConnections: [
        // Business connections
        { _id: "c1", jornada: "business", from: "basics", to: "research" },
        { _id: "c2", jornada: "business", from: "basics", to: "product" },
        { _id: "c3", jornada: "business", from: "research", to: "marketing" },
        { _id: "c4", jornada: "business", from: "product", to: "marketing" },
        { _id: "c5", jornada: "business", from: "product", to: "ops" },
        { _id: "c6", jornada: "business", from: "marketing", to: "sales" },
        { _id: "c7", jornada: "business", from: "sales", to: "finance" },
        { _id: "c8", jornada: "business", from: "ops", to: "finance" },
        { _id: "c9", jornada: "business", from: "ops", to: "hr" },
        { _id: "c10", jornada: "business", from: "finance", to: "strategy" },
        { _id: "c11", jornada: "business", from: "hr", to: "strategy" },
        { _id: "c12", jornada: "business", from: "strategy", to: "leadership_node" },
        // Leadership connections
        { _id: "c13", jornada: "leadership", from: "self-leadership", to: "communication" },
        { _id: "c14", jornada: "leadership", from: "self-leadership", to: "conflict" },
        { _id: "c15", jornada: "leadership", from: "communication", to: "team" },
        { _id: "c16", jornada: "leadership", from: "conflict", to: "team" },
        { _id: "c17", jornada: "leadership", from: "team", to: "vision" }
    ]
};


export default class RepositoryMemory extends Trigger implements Repository {
    methodsMap: { [key: string]: any } = {
        "create": this.create.bind(this),
        "update": this.updateAdapter.bind(this),
        "delete": this.delete.bind(this),
    }

    async create(collection: string, value: any, origin?: string): Promise<[any, boolean]> {
        if (!Object.prototype.hasOwnProperty.call(data, collection))
            data[collection] = []

        value._id = crypto.randomUUID();
        data[collection].push(value)
        this.fireTrigger(collection, value, "create", origin)
        return [value, false]
    }

    updateAdapter(collection: string, payload: { id: string, value: any }, origin?: string): Promise<[any, boolean]> {
        return this.update(collection, payload.id, payload.value, origin)
    }

    async update(collection: string, id: string, value: any, origin?: string): Promise<[any, boolean]> {
        if (!Object.prototype.hasOwnProperty.call(data, collection))
            return [["colecao invalida"], true]

        data[collection].forEach(e => {
            if (e._id === id) Object.assign(e, value)
        })

        this.fireTrigger(collection, { id, value }, "update", origin)
        return [id, false]
    }
    updateQuery(collection: string, query: any, value: any): Promise<[any, boolean]> {
        throw new Error("Method not implemented.");
    }
    updateMany(collection: string, query: any, value: any): Promise<[any, boolean]> {
        throw new Error("Method not implemented.");
    }
    async delete(collection: string, id: string, origin?: string): Promise<[any, boolean]> {
        if (!Object.prototype.hasOwnProperty.call(data, collection))
            return [["colecao invalida"], true]

        const index = data[collection].findIndex(i => i._id === id)
        if (index < 0) return [{ deleteCount: 0 }, false]
        data[collection].splice(index, 1)
        this.fireTrigger(collection, id, "delete", origin)
        return [id, false]
    }
    deleteMany(collection: string, query: { [index: string]: any; }): Promise<[any[], boolean]> {
        throw new Error("Method not implemented.");
    }

    findManySortLimit(collection: string, query: { [index: string]: any; }, limit: number, sort: 1 | -1): Promise<[any[], boolean]> {
        throw new Error("Method not implemented.");
    }

    async findMany(collection: string, query: { [index: string]: any; }): Promise<[any[], boolean]> {
        if (!Object.prototype.hasOwnProperty.call(data, collection))
            return [["colecao invalida"], true]

        const list: any[] = []
        for (const item of data[collection]) {
            if (this.check(item, query)) list.push(item)
        }
        return [list, false]
    }

    async findManyToMany(collection: string, query: { [index: string]: any; }): Promise<[any[], boolean]> {
        const [mainCollection, keyCollection] = collection.split("/")
        const [key, targetCollection] = keyCollection.split(":")
        if (!Object.prototype.hasOwnProperty.call(data, mainCollection))
            return [["colecao invalida"], true]

        const list: any[] = []
        for (const item of data[mainCollection]) {
            if (this.check(item, query)) {
                const [full] = await this.findOne(targetCollection, { _id: item[key] })
                Object.assign(item, full)
                list.push(item)
            }
        }
        return [list, false]
    }

    async findOne(collection: string, query: { [index: string]: any; }): Promise<[any, boolean]> {
        if (!Object.prototype.hasOwnProperty.call(data, collection))
            return ["colecao invalida", true]
        for (const item of data[collection]) {
            if (this.check(item, query)) return [item, false]
        }
        return ["nao encontrado", true]
    }

    check(item: any, query: any) {
        for (const key in query) {
            if (item[key] !== query[key]) return false
        }
        return true
    }
    read(collection: string, query: any): Promise<[any[], boolean]> {
        throw new Error("Method not implemented.");
    }
    readMany(collection: string, id: string): Promise<[any[], boolean]> {
        throw new Error("Method not implemented.");
    }
    readMore(collection: string, query: any): Promise<[any[], boolean]> {
        throw new Error("Method not implemented.");
    }
    usecase<T>(name: string, data?: any): Promise<[T, boolean]> {
        throw new Error("Method not implemented.");
    }
}