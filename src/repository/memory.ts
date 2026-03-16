import Repository from ".";
import Trigger from "./Trigger";
let data: { [key: string]: any[] } = {
    AdaptadorMapeamento: [
        {
            _id: "gfdodjfg",
            setModulo: "root:object",
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
        ,
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
        ,
        {
  "_id": "69a9f14095cecfce8dd4c91e",
  "id": "501bd447-1ad9-4101-8b54-396b436dde6c",
  "title": "73 - Sessão MSL 02.03.26",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "627085ee-7d1b-4630-8230-643cb1497a0c",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "ad6a4e99-d898-4f27-b919-762ebe3685ea",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:24.536Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:24.536Z"
  },
  "storage_size": 8599535178,
  "length": 5070.266667,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=ad6a4e99-d898-4f27-b919-762ebe3685ea",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/ad6a4e99-d898-4f27-b919-762ebe3685ea/playlist.m3u8",
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
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/ad6a4e99-d898-4f27-b919-762ebe3685ea/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/ad6a4e99-d898-4f27-b919-762ebe3685ea/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "501bd447-1ad9-4101-8b54-396b436dde6c"
},
{
  "_id": "69a9f14095cecfce8dd4c91f",
  "id": "1baed3dc-164a-47a1-bed6-046981d99dbf",
  "title": "0303.mp4",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "627085ee-7d1b-4630-8230-643cb1497a0c",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "439bd364-7199-4654-814e-246247e13646",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:24.635Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:24.635Z"
  },
  "storage_size": 8600636591,
  "length": 5070.266667,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=439bd364-7199-4654-814e-246247e13646",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/439bd364-7199-4654-814e-246247e13646/playlist.m3u8",
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
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/439bd364-7199-4654-814e-246247e13646/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/439bd364-7199-4654-814e-246247e13646/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "1baed3dc-164a-47a1-bed6-046981d99dbf"
},
{
  "_id": "69a9f14095cecfce8dd4c920",
  "id": "0cff3c7e-0667-4588-a252-018bf8752132",
  "title": "Aula 22 - MESL - Constância que Sustenta Resultados (como parar de oscilar e manter resultados todo mês)",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "fecdf08c-3adc-4357-9774-0fdae91c7950",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "e3bb070d-ced5-4aa9-9f0a-531aaf3a25c1",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:24.682Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:24.682Z"
  },
  "storage_size": {
    "$numberLong": "7806731845"
  },
  "length": 10116.416667,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=e3bb070d-ced5-4aa9-9f0a-531aaf3a25c1",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/e3bb070d-ced5-4aa9-9f0a-531aaf3a25c1/playlist.m3u8",
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
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/e3bb070d-ced5-4aa9-9f0a-531aaf3a25c1/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/e3bb070d-ced5-4aa9-9f0a-531aaf3a25c1/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "0cff3c7e-0667-4588-a252-018bf8752132"
},
{
  "_id": "69a9f14095cecfce8dd4c921",
  "id": "a43f8c43-a5a6-4f0f-8da7-fa9bd5972f1f",
  "title": "Tutoria Sobre: Mentalidade de Dono X Mentalidade de Profissional",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "97d89845-c5c3-415c-8944-67803fbf371e",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "d3a2c0aa-1a57-4feb-9a80-0761d0df55f1",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:24.725Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:24.725Z"
  },
  "storage_size": {
    "$numberLong": "21823371008"
  },
  "length": 9334.233333,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=d3a2c0aa-1a57-4feb-9a80-0761d0df55f1",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/d3a2c0aa-1a57-4feb-9a80-0761d0df55f1/playlist.m3u8",
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
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/d3a2c0aa-1a57-4feb-9a80-0761d0df55f1/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/d3a2c0aa-1a57-4feb-9a80-0761d0df55f1/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "a43f8c43-a5a6-4f0f-8da7-fa9bd5972f1f"
},
{
  "_id": "69a9f14095cecfce8dd4c922",
  "id": "ca5d3487-edf2-4f22-a6ab-7004ac6dc5a8",
  "title": "72 - Sessão MSL 16.02.26",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "627085ee-7d1b-4630-8230-643cb1497a0c",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "2ff877d8-81b4-423e-b5aa-e1fccf8dce7d",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:24.779Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:24.779Z"
  },
  "storage_size": {
    "$numberLong": "6757304539"
  },
  "length": 5647.125,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=2ff877d8-81b4-423e-b5aa-e1fccf8dce7d",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/2ff877d8-81b4-423e-b5aa-e1fccf8dce7d/playlist.m3u8",
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
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/2ff877d8-81b4-423e-b5aa-e1fccf8dce7d/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/2ff877d8-81b4-423e-b5aa-e1fccf8dce7d/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "ca5d3487-edf2-4f22-a6ab-7004ac6dc5a8"
},
{
  "_id": "69a9f14095cecfce8dd4c923",
  "id": "54a6bc41-414a-40ca-b78d-8dec4c0617ea",
  "title": "Tutoria sobre_ De Colaborador pra Colaborador Com Ana Kelin - 2026_02_09 16_31 GMT-03_00 - Recording.mp4",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "97d89845-c5c3-415c-8944-67803fbf371e",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "ea1bfd94-8464-4391-85ac-2aa2b43e43da",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:24.829Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:24.829Z"
  },
  "storage_size": {
    "$numberLong": "7746988023"
  },
  "length": 12498.083333,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=ea1bfd94-8464-4391-85ac-2aa2b43e43da",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/ea1bfd94-8464-4391-85ac-2aa2b43e43da/playlist.m3u8",
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
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/ea1bfd94-8464-4391-85ac-2aa2b43e43da/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/ea1bfd94-8464-4391-85ac-2aa2b43e43da/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "54a6bc41-414a-40ca-b78d-8dec4c0617ea"
},
{
  "_id": "69a9f14095cecfce8dd4c924",
  "id": "afee83d3-5b30-47a6-992c-724f9e3e0e3e",
  "title": "71 - Sessão MSL 02.02.26",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "627085ee-7d1b-4630-8230-643cb1497a0c",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "a2b5ab6b-1eaa-4059-bf05-b62fc0c1e683",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:24.891Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:24.891Z"
  },
  "storage_size": {
    "$numberLong": "7277632609"
  },
  "length": 8400.958333,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=a2b5ab6b-1eaa-4059-bf05-b62fc0c1e683",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/a2b5ab6b-1eaa-4059-bf05-b62fc0c1e683/playlist.m3u8",
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
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/a2b5ab6b-1eaa-4059-bf05-b62fc0c1e683/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/a2b5ab6b-1eaa-4059-bf05-b62fc0c1e683/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "afee83d3-5b30-47a6-992c-724f9e3e0e3e"
},
{
  "_id": "69a9f14095cecfce8dd4c925",
  "id": "dbce06b2-e111-4bca-9a3c-efdb4bf45002",
  "title": "Aula 21 - MESL - Calendário Anual de Campanha de Marketing",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "fecdf08c-3adc-4357-9774-0fdae91c7950",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "226e0ee4-5808-4a58-a373-890ece0743c6",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:24.942Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:24.942Z"
  },
  "storage_size": {
    "$numberLong": "14036490446"
  },
  "length": 7038.833333,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=226e0ee4-5808-4a58-a373-890ece0743c6",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/226e0ee4-5808-4a58-a373-890ece0743c6/playlist.m3u8",
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
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/226e0ee4-5808-4a58-a373-890ece0743c6/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/226e0ee4-5808-4a58-a373-890ece0743c6/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "dbce06b2-e111-4bca-9a3c-efdb4bf45002"
},
{
  "_id": "69a9f14095cecfce8dd4c926",
  "id": "705051e8-f1b2-4eb4-a158-6ca9b984f650",
  "title": "71 - Sessão MSL 19.01.26",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "627085ee-7d1b-4630-8230-643cb1497a0c",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "53bcba2d-2983-41c1-a956-dfe71c2b33dd",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:24.999Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:24.999Z"
  },
  "storage_size": {
    "$numberLong": "15116286514"
  },
  "length": 8230.866667,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=53bcba2d-2983-41c1-a956-dfe71c2b33dd",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/53bcba2d-2983-41c1-a956-dfe71c2b33dd/playlist.m3u8",
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
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/53bcba2d-2983-41c1-a956-dfe71c2b33dd/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/53bcba2d-2983-41c1-a956-dfe71c2b33dd/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "705051e8-f1b2-4eb4-a158-6ca9b984f650"
},
{
  "_id": "69a9f14195cecfce8dd4c927",
  "id": "40f81261-571b-43df-b88c-1c488a06d4b8",
  "title": "71 - Sessão MSL 19.01.26",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "627085ee-7d1b-4630-8230-643cb1497a0c",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "af17c2cd-23b6-4a1f-87a7-3c2f08d79ecc",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:25.051Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:25.051Z"
  },
  "storage_size": 7971385670,
  "length": 11232.083333,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=af17c2cd-23b6-4a1f-87a7-3c2f08d79ecc",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/af17c2cd-23b6-4a1f-87a7-3c2f08d79ecc/playlist.m3u8",
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
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/af17c2cd-23b6-4a1f-87a7-3c2f08d79ecc/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/af17c2cd-23b6-4a1f-87a7-3c2f08d79ecc/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "40f81261-571b-43df-b88c-1c488a06d4b8"
},
{
  "_id": "69a9f14195cecfce8dd4c928",
  "id": "f117911c-d193-4258-9678-0844ee8a5520",
  "title": "Aula 43 - Tutoria: Planejamento Pessoal",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "97d89845-c5c3-415c-8944-67803fbf371e",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "bfd55a2c-126c-4144-b9f2-4a3b791c3a36",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:25.093Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:25.093Z"
  },
  "storage_size": 6904446420,
  "length": 6719.966667,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=bfd55a2c-126c-4144-b9f2-4a3b791c3a36",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/bfd55a2c-126c-4144-b9f2-4a3b791c3a36/playlist.m3u8",
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
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/bfd55a2c-126c-4144-b9f2-4a3b791c3a36/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/bfd55a2c-126c-4144-b9f2-4a3b791c3a36/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "f117911c-d193-4258-9678-0844ee8a5520"
},
{
  "_id": "69a9f14195cecfce8dd4c929",
  "id": "a05ef6c0-32fe-4e34-b881-3b5010c5a611",
  "title": "0112(2).mp4",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "97d89845-c5c3-415c-8944-67803fbf371e",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "e49e0c2e-b069-4dd7-b2d0-0ebba80472df",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:25.136Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:25.136Z"
  },
  "storage_size": 6904559629,
  "length": 6719.966667,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=e49e0c2e-b069-4dd7-b2d0-0ebba80472df",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/e49e0c2e-b069-4dd7-b2d0-0ebba80472df/playlist.m3u8",
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
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/e49e0c2e-b069-4dd7-b2d0-0ebba80472df/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/e49e0c2e-b069-4dd7-b2d0-0ebba80472df/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "a05ef6c0-32fe-4e34-b881-3b5010c5a611"
},
{
  "_id": "69a9f14195cecfce8dd4c92a",
  "id": "d4d63c5e-9f42-459a-a06f-95458186e4e0",
  "title": "0112(2).mp4",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "97d89845-c5c3-415c-8944-67803fbf371e",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "2bc89d83-f16e-407d-855d-f438c399bbc8",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:25.191Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:25.191Z"
  },
  "storage_size": 6904446420,
  "length": 6719.966667,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=2bc89d83-f16e-407d-855d-f438c399bbc8",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/2bc89d83-f16e-407d-855d-f438c399bbc8/playlist.m3u8",
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
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/2bc89d83-f16e-407d-855d-f438c399bbc8/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/2bc89d83-f16e-407d-855d-f438c399bbc8/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "d4d63c5e-9f42-459a-a06f-95458186e4e0"
},
{
  "_id": "69a9f14195cecfce8dd4c92b",
  "id": "cb5e5f7b-7df1-4de8-b0fd-f9072f34e3a3",
  "title": "0112(2).mp4",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "97d89845-c5c3-415c-8944-67803fbf371e",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "fdec6258-282c-4cc0-b248-0370f77cfae2",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:25.244Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:25.244Z"
  },
  "storage_size": 6904337550,
  "length": 6719.966667,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=fdec6258-282c-4cc0-b248-0370f77cfae2",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/fdec6258-282c-4cc0-b248-0370f77cfae2/playlist.m3u8",
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
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/fdec6258-282c-4cc0-b248-0370f77cfae2/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/fdec6258-282c-4cc0-b248-0370f77cfae2/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "cb5e5f7b-7df1-4de8-b0fd-f9072f34e3a3"
},
{
  "_id": "69a9f14195cecfce8dd4c92c",
  "id": "f1e5d24c-c2e5-402f-8aff-7591f321688b",
  "title": "70 - Sessão MSL 06.01.26",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "627085ee-7d1b-4630-8230-643cb1497a0c",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "ad673908-8d42-447f-b387-fd4729d8108b",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:25.299Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:25.299Z"
  },
  "storage_size": 638872506,
  "length": 5510.56,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=ad673908-8d42-447f-b387-fd4729d8108b",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/ad673908-8d42-447f-b387-fd4729d8108b/playlist.m3u8",
  "width": 640,
  "height": 360,
  "playable": true,
  "available_resolutions": [
    "360p"
  ],
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/ad673908-8d42-447f-b387-fd4729d8108b/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/ad673908-8d42-447f-b387-fd4729d8108b/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "f1e5d24c-c2e5-402f-8aff-7591f321688b"
},
{
  "_id": "69a9f14195cecfce8dd4c92d",
  "id": "869629f3-9c10-45b3-bf40-1b6369794b13",
  "title": "Aula 19 - MESL - Tutoria sobre: Comece o Ano Bombando nas Venda: Estratégias Comerciais de Início de Ano.",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "fecdf08c-3adc-4357-9774-0fdae91c7950",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "f5b1ad26-589e-4d5d-b038-33b89e4288ca",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:25.356Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:25.356Z"
  },
  "storage_size": 1952231036,
  "length": 5242.72,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=f5b1ad26-589e-4d5d-b038-33b89e4288ca",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/f5b1ad26-589e-4d5d-b038-33b89e4288ca/playlist.m3u8",
  "width": 1760,
  "height": 900,
  "playable": true,
  "available_resolutions": [
    "360p",
    "480p",
    "720p"
  ],
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/f5b1ad26-589e-4d5d-b038-33b89e4288ca/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/f5b1ad26-589e-4d5d-b038-33b89e4288ca/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "869629f3-9c10-45b3-bf40-1b6369794b13"
},
{
  "_id": "69a9f14195cecfce8dd4c92e",
  "id": "933ec177-6509-4792-af7f-63bbff18a815",
  "title": "68 - Sessão MSL 15.12.25",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "627085ee-7d1b-4630-8230-643cb1497a0c",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "87339f8f-e764-495e-b635-a291a5ea74af",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:25.405Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:25.405Z"
  },
  "storage_size": 1904114193,
  "length": 4326.48,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=87339f8f-e764-495e-b635-a291a5ea74af",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/87339f8f-e764-495e-b635-a291a5ea74af/playlist.m3u8",
  "width": 1760,
  "height": 900,
  "playable": true,
  "available_resolutions": [
    "360p",
    "480p",
    "720p"
  ],
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/87339f8f-e764-495e-b635-a291a5ea74af/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/87339f8f-e764-495e-b635-a291a5ea74af/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "933ec177-6509-4792-af7f-63bbff18a815"
},
{
  "_id": "69a9f14195cecfce8dd4c92f",
  "id": "9bdbe370-072d-4423-81ea-8431c8463bff",
  "title": "69 - Sessão MSL 15.12.25",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "627085ee-7d1b-4630-8230-643cb1497a0c",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "d7c3ab2c-1f24-4efc-95b5-04821be960aa",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:25.459Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:25.459Z"
  },
  "storage_size": 1904569760,
  "length": 4326.48,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=d7c3ab2c-1f24-4efc-95b5-04821be960aa",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/d7c3ab2c-1f24-4efc-95b5-04821be960aa/playlist.m3u8",
  "width": 1760,
  "height": 900,
  "playable": true,
  "available_resolutions": [
    "360p",
    "480p",
    "720p"
  ],
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/d7c3ab2c-1f24-4efc-95b5-04821be960aa/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/d7c3ab2c-1f24-4efc-95b5-04821be960aa/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "9bdbe370-072d-4423-81ea-8431c8463bff"
},
{
  "_id": "69a9f14195cecfce8dd4c930",
  "id": "43fdad24-c62a-4f1a-9186-9061cae5277a",
  "title": "Aula 42 - Tutoria sobre: Estratégias Comerciais de Início de Ano.",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "97d89845-c5c3-415c-8944-67803fbf371e",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "3fbac0c8-b341-4614-973f-f329a28cdb6c",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:25.513Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:25.513Z"
  },
  "storage_size": 9563834927,
  "length": 6154.566667,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=3fbac0c8-b341-4614-973f-f329a28cdb6c",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/3fbac0c8-b341-4614-973f-f329a28cdb6c/playlist.m3u8",
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
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/3fbac0c8-b341-4614-973f-f329a28cdb6c/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/3fbac0c8-b341-4614-973f-f329a28cdb6c/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "43fdad24-c62a-4f1a-9186-9061cae5277a"
},
{
  "_id": "69a9f14195cecfce8dd4c931",
  "id": "8466ac95-eac1-4fe5-893f-90854ed8571b",
  "title": "66 - Sessão MSL 01.12.25",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "627085ee-7d1b-4630-8230-643cb1497a0c",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "c5d9b2bb-0404-4396-b7d3-04a9db2bf3c8",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:25.555Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:25.555Z"
  },
  "storage_size": 3073407184,
  "length": 7589.8,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=c5d9b2bb-0404-4396-b7d3-04a9db2bf3c8",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/c5d9b2bb-0404-4396-b7d3-04a9db2bf3c8/playlist.m3u8",
  "width": 1760,
  "height": 900,
  "playable": true,
  "available_resolutions": [
    "360p",
    "480p",
    "720p"
  ],
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/c5d9b2bb-0404-4396-b7d3-04a9db2bf3c8/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/c5d9b2bb-0404-4396-b7d3-04a9db2bf3c8/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "8466ac95-eac1-4fe5-893f-90854ed8571b"
},
{
  "_id": "69a9f14195cecfce8dd4c932",
  "id": "bb882798-51ef-4e86-9b59-930c87cf3310",
  "title": "67 - Sessão MSL 01.12.25",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "627085ee-7d1b-4630-8230-643cb1497a0c",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "cac91753-b176-4302-8161-09b40a225783",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:25.609Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:25.609Z"
  },
  "storage_size": 2891674252,
  "length": 8693.92,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=cac91753-b176-4302-8161-09b40a225783",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/cac91753-b176-4302-8161-09b40a225783/playlist.m3u8",
  "width": 1760,
  "height": 900,
  "playable": true,
  "available_resolutions": [
    "360p",
    "480p",
    "720p"
  ],
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/cac91753-b176-4302-8161-09b40a225783/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/cac91753-b176-4302-8161-09b40a225783/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "bb882798-51ef-4e86-9b59-930c87cf3310"
},
{
  "_id": "69a9f14195cecfce8dd4c933",
  "id": "3f0df341-e430-4aab-84b7-faa2743001fe",
  "title": "Aula 18 - MESL - Tutoria Sobre: Desperte o Líder que Existe em Você",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "fecdf08c-3adc-4357-9774-0fdae91c7950",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "011bfa18-6e4d-44c2-905d-b73960b691ff",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:25.662Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:25.662Z"
  },
  "storage_size": 1740414442,
  "length": 6709.76,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=011bfa18-6e4d-44c2-905d-b73960b691ff",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/011bfa18-6e4d-44c2-905d-b73960b691ff/playlist.m3u8",
  "width": 1760,
  "height": 900,
  "playable": true,
  "available_resolutions": [
    "360p",
    "480p",
    "720p"
  ],
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/011bfa18-6e4d-44c2-905d-b73960b691ff/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/011bfa18-6e4d-44c2-905d-b73960b691ff/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "3f0df341-e430-4aab-84b7-faa2743001fe"
},
{
  "_id": "69a9f14195cecfce8dd4c934",
  "id": "dc658ff2-0518-43bb-905a-e3ab09ea698a",
  "title": "Aula 41 - Tutoria sobre: Construindo os resultado de 2026: Planejamento financeiro, comercial e pessoal.",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "97d89845-c5c3-415c-8944-67803fbf371e",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "8914913d-5a51-4437-94cd-63c9fbf74eab",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:25.714Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:25.714Z"
  },
  "storage_size": 7938454218,
  "length": 5632.433333,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=8914913d-5a51-4437-94cd-63c9fbf74eab",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/8914913d-5a51-4437-94cd-63c9fbf74eab/playlist.m3u8",
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
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/8914913d-5a51-4437-94cd-63c9fbf74eab/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/8914913d-5a51-4437-94cd-63c9fbf74eab/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "dc658ff2-0518-43bb-905a-e3ab09ea698a"
},
{
  "_id": "69a9f14195cecfce8dd4c935",
  "id": "c7a190c5-f6a9-4313-801c-f70dfd32d3ba",
  "title": "65 - Sessão MSL 17.11.25",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "627085ee-7d1b-4630-8230-643cb1497a0c",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "a16fe4b7-03ec-4466-8555-60cc1730fd17",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:25.769Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:25.769Z"
  },
  "storage_size": 1990213032,
  "length": 5805.8,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=a16fe4b7-03ec-4466-8555-60cc1730fd17",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/a16fe4b7-03ec-4466-8555-60cc1730fd17/playlist.m3u8",
  "width": 1760,
  "height": 900,
  "playable": true,
  "available_resolutions": [
    "360p",
    "480p",
    "720p"
  ],
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/a16fe4b7-03ec-4466-8555-60cc1730fd17/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/a16fe4b7-03ec-4466-8555-60cc1730fd17/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "c7a190c5-f6a9-4313-801c-f70dfd32d3ba"
},
{
  "_id": "69a9f14195cecfce8dd4c936",
  "id": "1da02d42-6b08-4ca8-911d-ac233781f4af",
  "title": "64 - Sessão MSL 17.11.25",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "627085ee-7d1b-4630-8230-643cb1497a0c",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "7cbac0ec-fc16-4d2a-a1fd-da410b3b6f05",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:25.822Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:25.822Z"
  },
  "storage_size": 2973979329,
  "length": 7710.8,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=7cbac0ec-fc16-4d2a-a1fd-da410b3b6f05",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/7cbac0ec-fc16-4d2a-a1fd-da410b3b6f05/playlist.m3u8",
  "width": 1760,
  "height": 900,
  "playable": true,
  "available_resolutions": [
    "360p",
    "480p",
    "720p"
  ],
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/7cbac0ec-fc16-4d2a-a1fd-da410b3b6f05/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/7cbac0ec-fc16-4d2a-a1fd-da410b3b6f05/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "1da02d42-6b08-4ca8-911d-ac233781f4af"
},
{
  "_id": "69a9f14195cecfce8dd4c937",
  "id": "3cee58ec-ad9a-4150-94f0-44f50e567824",
  "title": "Aula 17 - MESL - Construindo os resultados de 2026: Planejamento financeiro, comercial e pessoal .mp4",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "fecdf08c-3adc-4357-9774-0fdae91c7950",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "70887f69-5cb9-443f-9c23-fdd70d183b78",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:25.877Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:25.877Z"
  },
  "storage_size": 2498146619,
  "length": 7531.32,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=70887f69-5cb9-443f-9c23-fdd70d183b78",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/70887f69-5cb9-443f-9c23-fdd70d183b78/playlist.m3u8",
  "width": 1760,
  "height": 900,
  "playable": true,
  "available_resolutions": [
    "360p",
    "480p",
    "720p"
  ],
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/70887f69-5cb9-443f-9c23-fdd70d183b78/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/70887f69-5cb9-443f-9c23-fdd70d183b78/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "3cee58ec-ad9a-4150-94f0-44f50e567824"
},
{
  "_id": "69a9f14195cecfce8dd4c938",
  "id": "cf58a369-7c4e-44ae-b25c-1afb840a9c83",
  "title": "Aula 40 - Tutoria - Treinamento de Vendas para Equipe",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "97d89845-c5c3-415c-8944-67803fbf371e",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "fb24a6ed-6cfb-4ab8-acf4-b50ec4e9d941",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:25.934Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:25.934Z"
  },
  "storage_size": 5850281766,
  "length": 4738,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=fb24a6ed-6cfb-4ab8-acf4-b50ec4e9d941",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/fb24a6ed-6cfb-4ab8-acf4-b50ec4e9d941/playlist.m3u8",
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
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/fb24a6ed-6cfb-4ab8-acf4-b50ec4e9d941/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/fb24a6ed-6cfb-4ab8-acf4-b50ec4e9d941/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "cf58a369-7c4e-44ae-b25c-1afb840a9c83"
},
{
  "_id": "69a9f14295cecfce8dd4c939",
  "id": "d69b131a-10ae-497c-9c0a-f4bfc68c3f07",
  "title": "63 - Sessão MSL 03.11.25",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "627085ee-7d1b-4630-8230-643cb1497a0c",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "38673ebd-ad95-4e32-8d95-b6efc41aad55",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:26.019Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:26.019Z"
  },
  "storage_size": 2089555585,
  "length": 5398.36,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=38673ebd-ad95-4e32-8d95-b6efc41aad55",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/38673ebd-ad95-4e32-8d95-b6efc41aad55/playlist.m3u8",
  "width": 1760,
  "height": 900,
  "playable": true,
  "available_resolutions": [
    "360p",
    "480p",
    "720p"
  ],
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/38673ebd-ad95-4e32-8d95-b6efc41aad55/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/38673ebd-ad95-4e32-8d95-b6efc41aad55/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "d69b131a-10ae-497c-9c0a-f4bfc68c3f07"
},
{
  "_id": "69a9f14295cecfce8dd4c93a",
  "id": "92af224f-0410-45a3-9fb4-a8fefe936963",
  "title": "62 - Sessão MSL 03.11.25",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "627085ee-7d1b-4630-8230-643cb1497a0c",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "341b32a6-59f0-4295-afd2-0bc8fa5e434a",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:26.077Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:26.077Z"
  },
  "storage_size": 3917888581,
  "length": 9493.24,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=341b32a6-59f0-4295-afd2-0bc8fa5e434a",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/341b32a6-59f0-4295-afd2-0bc8fa5e434a/playlist.m3u8",
  "width": 1760,
  "height": 900,
  "playable": true,
  "available_resolutions": [
    "360p",
    "480p",
    "720p"
  ],
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/341b32a6-59f0-4295-afd2-0bc8fa5e434a/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/341b32a6-59f0-4295-afd2-0bc8fa5e434a/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "92af224f-0410-45a3-9fb4-a8fefe936963"
},
{
  "_id": "69a9f14295cecfce8dd4c93b",
  "id": "5f0ea509-fc4d-4bdf-95ed-c338393a1994",
  "title": "Aula 16 - MESL - Inteligência emocional no trabalho como controlar a ansiedade e o estresse lidando com as situações difíceis do dia a dia..mp4",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "fecdf08c-3adc-4357-9774-0fdae91c7950",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "9dd34777-843e-48b3-a965-5af28e195709",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:26.131Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:26.131Z"
  },
  "storage_size": 7437715150,
  "length": 3721.333333,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=9dd34777-843e-48b3-a965-5af28e195709",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/9dd34777-843e-48b3-a965-5af28e195709/playlist.m3u8",
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
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/9dd34777-843e-48b3-a965-5af28e195709/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/9dd34777-843e-48b3-a965-5af28e195709/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "5f0ea509-fc4d-4bdf-95ed-c338393a1994"
},
{
  "_id": "69a9f14295cecfce8dd4c93c",
  "id": "4c7c016f-a40a-4100-9fba-7cbe6c57cd82",
  "title": "Aula 16 - MESL - Inteligência emocional no trabalho: como controlar a ansiedade e o estresse lidando com as situações difíceis do dia a dia.",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "fecdf08c-3adc-4357-9774-0fdae91c7950",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "c6ab5581-de3a-4e11-9bb5-b9ad134d3707",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:26.186Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:26.186Z"
  },
  "storage_size": 7437951171,
  "length": 3721.333333,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=c6ab5581-de3a-4e11-9bb5-b9ad134d3707",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/c6ab5581-de3a-4e11-9bb5-b9ad134d3707/playlist.m3u8",
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
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/c6ab5581-de3a-4e11-9bb5-b9ad134d3707/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/c6ab5581-de3a-4e11-9bb5-b9ad134d3707/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "4c7c016f-a40a-4100-9fba-7cbe6c57cd82"
},
{
  "_id": "69a9f14295cecfce8dd4c93d",
  "id": "2e87b950-3427-45f1-a318-99a6ff2d3c9c",
  "title": "Tutoria 27.10 .mp4",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "97d89845-c5c3-415c-8944-67803fbf371e",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "5fc327ac-5579-4545-a871-26be471948c7",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:26.238Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:26.238Z"
  },
  "storage_size": 9746513059,
  "length": 5094.6,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=5fc327ac-5579-4545-a871-26be471948c7",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/5fc327ac-5579-4545-a871-26be471948c7/playlist.m3u8",
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
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/5fc327ac-5579-4545-a871-26be471948c7/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/5fc327ac-5579-4545-a871-26be471948c7/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "2e87b950-3427-45f1-a318-99a6ff2d3c9c"
},
{
  "_id": "69a9f14295cecfce8dd4c93e",
  "id": "dd762cb3-5a1e-4419-b58d-2d95e451aacd",
  "title": "Aula 39 - Tutoria - Inteligência emocional no trabalho: Como controlar a ansiedade e o estresse lidando com as situações difíceis do dia a dia",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "97d89845-c5c3-415c-8944-67803fbf371e",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "4f684c37-b104-41df-9140-293260cbc93e",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:26.292Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:26.292Z"
  },
  "storage_size": 9746608844,
  "length": 5094.6,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=4f684c37-b104-41df-9140-293260cbc93e",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/4f684c37-b104-41df-9140-293260cbc93e/playlist.m3u8",
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
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/4f684c37-b104-41df-9140-293260cbc93e/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/4f684c37-b104-41df-9140-293260cbc93e/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "dd762cb3-5a1e-4419-b58d-2d95e451aacd"
},
{
  "_id": "69a9f14295cecfce8dd4c93f",
  "id": "2033deca-826b-4d2c-acaa-79c0bfc7e56c",
  "title": "61 - Sessão MSL 20.10.25",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "627085ee-7d1b-4630-8230-643cb1497a0c",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "ddb1457a-7bb8-4146-8ca7-8b51000a7db7",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:26.347Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:26.347Z"
  },
  "storage_size": 2305320480,
  "length": 7708.555556,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=ddb1457a-7bb8-4146-8ca7-8b51000a7db7",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/ddb1457a-7bb8-4146-8ca7-8b51000a7db7/playlist.m3u8",
  "width": 1280,
  "height": 720,
  "playable": true,
  "available_resolutions": [
    "360p",
    "480p",
    "720p"
  ],
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/ddb1457a-7bb8-4146-8ca7-8b51000a7db7/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/ddb1457a-7bb8-4146-8ca7-8b51000a7db7/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "2033deca-826b-4d2c-acaa-79c0bfc7e56c"
},
{
  "_id": "69a9f14295cecfce8dd4c940",
  "id": "fba22ce5-cb1a-4f11-adee-cfc1f35a1ba4",
  "title": "60 - Sessão MSL 20.10.25",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "627085ee-7d1b-4630-8230-643cb1497a0c",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "bc836df1-f7aa-4210-80b5-34c801c2dfd7",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:26.401Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:26.401Z"
  },
  "storage_size": 2801559948,
  "length": 7350.08,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=bc836df1-f7aa-4210-80b5-34c801c2dfd7",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/bc836df1-f7aa-4210-80b5-34c801c2dfd7/playlist.m3u8",
  "width": 1760,
  "height": 900,
  "playable": true,
  "available_resolutions": [
    "360p",
    "480p",
    "720p"
  ],
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/bc836df1-f7aa-4210-80b5-34c801c2dfd7/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/bc836df1-f7aa-4210-80b5-34c801c2dfd7/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "fba22ce5-cb1a-4f11-adee-cfc1f35a1ba4"
},
{
  "_id": "69a9f14295cecfce8dd4c941",
  "id": "043cb62e-4029-421e-938e-1a9961074969",
  "title": "Aula 38 - Tutoria - Controle de Estoque na Prática: como evitar desperdícios e garantir resultados",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "97d89845-c5c3-415c-8944-67803fbf371e",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "88c2b8b1-2aa4-4ec8-807e-2bb6fc046773",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:26.470Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:26.470Z"
  },
  "storage_size": 2812355862,
  "length": 6685.92,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=88c2b8b1-2aa4-4ec8-807e-2bb6fc046773",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/88c2b8b1-2aa4-4ec8-807e-2bb6fc046773/playlist.m3u8",
  "width": 1760,
  "height": 900,
  "playable": true,
  "available_resolutions": [
    "360p",
    "480p",
    "720p"
  ],
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/88c2b8b1-2aa4-4ec8-807e-2bb6fc046773/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/88c2b8b1-2aa4-4ec8-807e-2bb6fc046773/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "043cb62e-4029-421e-938e-1a9961074969"
},
{
  "_id": "69a9f14295cecfce8dd4c942",
  "id": "c8e1004e-59de-498b-9f4b-434ad9d6da42",
  "title": "Aula 15 - MESL - Como fazer parcerias comerciais estratégicas para alavancar seu faturamento",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "fecdf08c-3adc-4357-9774-0fdae91c7950",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "9523e84d-0223-4231-b02d-d018a4d33a1a",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:26.526Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:26.526Z"
  },
  "storage_size": {
    "$numberLong": "2225450164"
  },
  "length": 5364.36,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=9523e84d-0223-4231-b02d-d018a4d33a1a",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/9523e84d-0223-4231-b02d-d018a4d33a1a/playlist.m3u8",
  "width": 1760,
  "height": 900,
  "playable": true,
  "available_resolutions": [
    "360p",
    "480p",
    "720p"
  ],
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/9523e84d-0223-4231-b02d-d018a4d33a1a/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/9523e84d-0223-4231-b02d-d018a4d33a1a/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "c8e1004e-59de-498b-9f4b-434ad9d6da42"
},
{
  "_id": "69a9f14295cecfce8dd4c943",
  "id": "d8466c28-dcd1-4097-9d0a-0a2565d2e036",
  "title": "Aula 14 - MESL - Descubra todos os benefícios da Lei salão parceiro:",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "fecdf08c-3adc-4357-9774-0fdae91c7950",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "33ebd278-38e7-4e55-b8f2-ef3ae90c8994",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:26.592Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:26.592Z"
  },
  "storage_size": 935954052,
  "length": 10666.36,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=33ebd278-38e7-4e55-b8f2-ef3ae90c8994",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/33ebd278-38e7-4e55-b8f2-ef3ae90c8994/playlist.m3u8",
  "width": 640,
  "height": 360,
  "playable": true,
  "available_resolutions": [
    "360p"
  ],
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/33ebd278-38e7-4e55-b8f2-ef3ae90c8994/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/33ebd278-38e7-4e55-b8f2-ef3ae90c8994/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "d8466c28-dcd1-4097-9d0a-0a2565d2e036"
},
{
  "_id": "69a9f14295cecfce8dd4c944",
  "id": "afc0cb17-5e37-46d8-93b9-0b4388feef77",
  "title": "59 - Sessão MSL 06.10.25",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "627085ee-7d1b-4630-8230-643cb1497a0c",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "03bfa6fd-675a-4f8d-9b86-de1c51573e0b",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:26.649Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:26.649Z"
  },
  "storage_size": 761939545,
  "length": 7312,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=03bfa6fd-675a-4f8d-9b86-de1c51573e0b",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/03bfa6fd-675a-4f8d-9b86-de1c51573e0b/playlist.m3u8",
  "width": 640,
  "height": 360,
  "playable": true,
  "available_resolutions": [
    "360p"
  ],
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/03bfa6fd-675a-4f8d-9b86-de1c51573e0b/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/03bfa6fd-675a-4f8d-9b86-de1c51573e0b/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "afc0cb17-5e37-46d8-93b9-0b4388feef77"
},
{
  "_id": "69a9f14295cecfce8dd4c945",
  "id": "81ed9dd5-3d19-4395-b921-9a241f71fb59",
  "title": "58 - Sessão MSL 06.10.25",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "627085ee-7d1b-4630-8230-643cb1497a0c",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "28957fde-9598-4060-bd4b-b1ebecb015eb",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:26.695Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:26.695Z"
  },
  "storage_size": 4766310619,
  "length": 12471.2,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=28957fde-9598-4060-bd4b-b1ebecb015eb",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/28957fde-9598-4060-bd4b-b1ebecb015eb/playlist.m3u8",
  "width": 1760,
  "height": 900,
  "playable": true,
  "available_resolutions": [
    "360p",
    "480p",
    "720p"
  ],
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/28957fde-9598-4060-bd4b-b1ebecb015eb/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/28957fde-9598-4060-bd4b-b1ebecb015eb/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "81ed9dd5-3d19-4395-b921-9a241f71fb59"
},
{
  "_id": "69a9f14295cecfce8dd4c946",
  "id": "481f63a7-3636-4a15-b1a0-29e7d3fe07bf",
  "title": "Sessão de Mentoria - Método Salão Lucrativo .mp4",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "fecdf08c-3adc-4357-9774-0fdae91c7950",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "10e2e4b2-7eec-4d43-8138-e0db8718dda6",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:26.749Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:26.749Z"
  },
  "storage_size": 2224904782,
  "length": 5364.36,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=10e2e4b2-7eec-4d43-8138-e0db8718dda6",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/10e2e4b2-7eec-4d43-8138-e0db8718dda6/playlist.m3u8",
  "width": 1760,
  "height": 900,
  "playable": true,
  "available_resolutions": [
    "360p",
    "480p",
    "720p"
  ],
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/10e2e4b2-7eec-4d43-8138-e0db8718dda6/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/10e2e4b2-7eec-4d43-8138-e0db8718dda6/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "481f63a7-3636-4a15-b1a0-29e7d3fe07bf"
},
{
  "_id": "69a9f14295cecfce8dd4c947",
  "id": "5f2b823a-8752-4257-a14e-b6bffdb015e9",
  "title": "Aula 37 - Terapia Capilar com Léo Lopez",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "97d89845-c5c3-415c-8944-67803fbf371e",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "b7f5d311-a610-41d8-8bbb-248d22810944",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:26.791Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:26.791Z"
  },
  "storage_size": 3927696901,
  "length": 5465.3,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=b7f5d311-a610-41d8-8bbb-248d22810944",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/b7f5d311-a610-41d8-8bbb-248d22810944/playlist.m3u8",
  "width": 2022,
  "height": 1080,
  "playable": true,
  "available_resolutions": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/b7f5d311-a610-41d8-8bbb-248d22810944/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/b7f5d311-a610-41d8-8bbb-248d22810944/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "5f2b823a-8752-4257-a14e-b6bffdb015e9"
},
{
  "_id": "69a9f14295cecfce8dd4c948",
  "id": "c13fdaf7-0194-462e-983a-3ee89f8c50e7",
  "title": "Aula 01 - Definição de propósito e planejamento estratétic método Canva",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "641c90db-9dd8-4310-bace-56dc854714b3",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "d7c4735e-aa25-4363-8f94-b8949366e6a3",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:26.842Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:26.842Z"
  },
  "storage_size": 4596230517,
  "length": 1201.966667,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=d7c4735e-aa25-4363-8f94-b8949366e6a3",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/d7c4735e-aa25-4363-8f94-b8949366e6a3/playlist.m3u8",
  "width": 3840,
  "height": 2160,
  "playable": true,
  "available_resolutions": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/d7c4735e-aa25-4363-8f94-b8949366e6a3/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/d7c4735e-aa25-4363-8f94-b8949366e6a3/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "c13fdaf7-0194-462e-983a-3ee89f8c50e7"
},
{
  "_id": "69a9f14295cecfce8dd4c949",
  "id": "1795d99f-9d52-4e79-b9ef-3d619cb59762",
  "title": "57 - Sessão MSL 16.09.25",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "627085ee-7d1b-4630-8230-643cb1497a0c",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "6ff7ad3e-7c21-4f93-8613-6498cbe05526",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:26.895Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:26.895Z"
  },
  "storage_size": 580056522,
  "length": 5632,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=6ff7ad3e-7c21-4f93-8613-6498cbe05526",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/6ff7ad3e-7c21-4f93-8613-6498cbe05526/playlist.m3u8",
  "width": 640,
  "height": 360,
  "playable": true,
  "available_resolutions": [
    "360p"
  ],
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/6ff7ad3e-7c21-4f93-8613-6498cbe05526/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/6ff7ad3e-7c21-4f93-8613-6498cbe05526/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "1795d99f-9d52-4e79-b9ef-3d619cb59762"
},
{
  "_id": "69a9f14295cecfce8dd4c94a",
  "id": "ffa22b41-d928-4fbd-b6bb-a8dbf8f3f7fe",
  "title": "56 - Sessão MSL 16.09.25",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "627085ee-7d1b-4630-8230-643cb1497a0c",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "57674af1-4482-4634-8374-1106bc02287d",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:26.952Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:26.952Z"
  },
  "storage_size": 597499678,
  "length": 5990.88,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=57674af1-4482-4634-8374-1106bc02287d",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/57674af1-4482-4634-8374-1106bc02287d/playlist.m3u8",
  "width": 640,
  "height": 360,
  "playable": true,
  "available_resolutions": [
    "360p"
  ],
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/57674af1-4482-4634-8374-1106bc02287d/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/57674af1-4482-4634-8374-1106bc02287d/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "ffa22b41-d928-4fbd-b6bb-a8dbf8f3f7fe"
},
{
  "_id": "69a9f14295cecfce8dd4c94b",
  "id": "2a648875-de78-41c3-89e1-eef35275be43",
  "title": "Aula 13 - MESL -  Descubra todos os benefícios da Lei salão parceiro",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "fecdf08c-3adc-4357-9774-0fdae91c7950",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "d99dcdba-1a6b-4268-9e6e-95bac85bdf57",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:26.998Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:26.998Z"
  },
  "storage_size": 5613314238,
  "length": 3300.7,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=d99dcdba-1a6b-4268-9e6e-95bac85bdf57",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/d99dcdba-1a6b-4268-9e6e-95bac85bdf57/playlist.m3u8",
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
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/d99dcdba-1a6b-4268-9e6e-95bac85bdf57/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/d99dcdba-1a6b-4268-9e6e-95bac85bdf57/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "2a648875-de78-41c3-89e1-eef35275be43"
},
{
  "_id": "69a9f14395cecfce8dd4c94c",
  "id": "384d1115-f062-4a33-aaba-a4f07241d243",
  "title": "Aula 36 -  Tutoria - Descubra todos os benefícios da Lei salão parceiro",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "97d89845-c5c3-415c-8944-67803fbf371e",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "f1e27504-34ac-4e73-8362-799625a59a49",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:27.053Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:27.053Z"
  },
  "storage_size": 5613059043,
  "length": 3300.7,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=f1e27504-34ac-4e73-8362-799625a59a49",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/f1e27504-34ac-4e73-8362-799625a59a49/playlist.m3u8",
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
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/f1e27504-34ac-4e73-8362-799625a59a49/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/f1e27504-34ac-4e73-8362-799625a59a49/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "384d1115-f062-4a33-aaba-a4f07241d243"
},
{
  "_id": "69a9f14395cecfce8dd4c94d",
  "id": "130857d1-4d4b-4cc5-856e-c3f686228331",
  "title": "55 - Sessão MSL 01.09.25",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "627085ee-7d1b-4630-8230-643cb1497a0c",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "febcd162-304e-4c8e-a0f8-2d20dca4a3ba",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:27.108Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:27.108Z"
  },
  "storage_size": 5529635802,
  "length": 10619.2,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=febcd162-304e-4c8e-a0f8-2d20dca4a3ba",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/febcd162-304e-4c8e-a0f8-2d20dca4a3ba/playlist.m3u8",
  "width": 1760,
  "height": 900,
  "playable": true,
  "available_resolutions": [
    "360p",
    "480p",
    "720p"
  ],
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/febcd162-304e-4c8e-a0f8-2d20dca4a3ba/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/febcd162-304e-4c8e-a0f8-2d20dca4a3ba/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "130857d1-4d4b-4cc5-856e-c3f686228331"
},
{
  "_id": "69a9f14395cecfce8dd4c94e",
  "id": "800016f9-7400-423a-b8b0-ce5642f224f0",
  "title": "54 - Sessão MSL 01.09.25",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "627085ee-7d1b-4630-8230-643cb1497a0c",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "12edd875-d465-4ce2-a22f-f8218b00fbe5",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:27.168Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:27.168Z"
  },
  "storage_size": 1344424315,
  "length": 8759.16,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=12edd875-d465-4ce2-a22f-f8218b00fbe5",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/12edd875-d465-4ce2-a22f-f8218b00fbe5/playlist.m3u8",
  "width": 640,
  "height": 360,
  "playable": true,
  "available_resolutions": [
    "360p"
  ],
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/12edd875-d465-4ce2-a22f-f8218b00fbe5/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/12edd875-d465-4ce2-a22f-f8218b00fbe5/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "800016f9-7400-423a-b8b0-ce5642f224f0"
},
{
  "_id": "69a9f14395cecfce8dd4c94f",
  "id": "b9c56af1-ccee-4e53-81e9-e93318bab8ba",
  "title": "Aula 12 - MESL - Tutoria sobre Captação de Clientes",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "fecdf08c-3adc-4357-9774-0fdae91c7950",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "4c6d7a15-c6d7-4fa2-8f87-aafe98b87123",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:27.220Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:27.220Z"
  },
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
  "pending_resolutions": [],
  "video_id": "b9c56af1-ccee-4e53-81e9-e93318bab8ba"
},
{
  "_id": "69a9f14395cecfce8dd4c950",
  "id": "54caa5a3-a4d8-448f-953c-bd34a700585c",
  "title": "Aula 35 - Tutoria - Comprometimento que Gera Lucro: Como Construir uma Equipe que Veste a Camisa do Salão",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "97d89845-c5c3-415c-8944-67803fbf371e",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "95a78735-957b-4de8-b4ac-246bf07ef2ab",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:27.279Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:27.279Z"
  },
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
  "pending_resolutions": [],
  "video_id": "54caa5a3-a4d8-448f-953c-bd34a700585c"
},
{
  "_id": "69a9f14395cecfce8dd4c951",
  "id": "c4801e0b-c028-41cb-b362-c3a3658f185d",
  "title": "53 - Sessão MSL 18.08.25",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "627085ee-7d1b-4630-8230-643cb1497a0c",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "78356c9b-dd2c-4d53-8abf-61d972ae1297",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:27.342Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:27.342Z"
  },
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
  "pending_resolutions": [],
  "video_id": "c4801e0b-c028-41cb-b362-c3a3658f185d"
},
{
  "_id": "69a9f14395cecfce8dd4c952",
  "id": "cad3cb08-4d92-443d-9dff-d13832a2788b",
  "title": "52 - Sessão MSL 18.08.25",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "627085ee-7d1b-4630-8230-643cb1497a0c",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "7021cb17-be90-4e14-8c04-61100e064c1c",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:27.401Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:27.401Z"
  },
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
  "pending_resolutions": [],
  "video_id": "cad3cb08-4d92-443d-9dff-d13832a2788b"
},
{
  "_id": "69a9f14395cecfce8dd4c953",
  "id": "549049b2-686b-494e-ae81-305f3d440710",
  "title": "Aula 34 - Tutoria - Como atrair e escolher os profissionais certos para seu salão.",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "97d89845-c5c3-415c-8944-67803fbf371e",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "d8c5aec8-e7cb-4c2b-ae64-508519ed0336",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:27.447Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:27.447Z"
  },
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
  "pending_resolutions": [],
  "video_id": "549049b2-686b-494e-ae81-305f3d440710"
},
{
  "_id": "69a9f14395cecfce8dd4c954",
  "id": "3c215b8d-d309-447e-9c6d-2b038bc097fd",
  "title": "Aula 11 -MESL- Como atrair e escolher os profissionais certos para seu salão. 11.08.25",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "fecdf08c-3adc-4357-9774-0fdae91c7950",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "416ff6ee-9cfc-40b4-b902-d599c271c7b4",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:27.492Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:27.492Z"
  },
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
  "pending_resolutions": [],
  "video_id": "3c215b8d-d309-447e-9c6d-2b038bc097fd"
},
{
  "_id": "69a9f14395cecfce8dd4c955",
  "id": "06498d9a-7447-4380-b467-18fb2d65d519",
  "title": "51 - Sessão MSL 04.08.25",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "627085ee-7d1b-4630-8230-643cb1497a0c",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "348bbcf8-fcbc-4bad-86e9-9d7831765d30",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:27.541Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:27.541Z"
  },
  "storage_size": 6697477441,
  "length": 12947.12,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=348bbcf8-fcbc-4bad-86e9-9d7831765d30",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/348bbcf8-fcbc-4bad-86e9-9d7831765d30/playlist.m3u8",
  "width": 1760,
  "height": 900,
  "playable": true,
  "available_resolutions": [
    "360p",
    "480p",
    "720p"
  ],
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/348bbcf8-fcbc-4bad-86e9-9d7831765d30/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/348bbcf8-fcbc-4bad-86e9-9d7831765d30/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "06498d9a-7447-4380-b467-18fb2d65d519"
},
{
  "_id": "69a9f14395cecfce8dd4c956",
  "id": "3510f7ad-e140-497d-ae42-3f0900e47c0c",
  "title": "50 - Sessão MSL 04.08.25",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "627085ee-7d1b-4630-8230-643cb1497a0c",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "37138336-7854-4361-9d94-0ef3b92ad561",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:27.597Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:27.597Z"
  },
  "storage_size": 3277382056,
  "length": 6707.36,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=37138336-7854-4361-9d94-0ef3b92ad561",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/37138336-7854-4361-9d94-0ef3b92ad561/playlist.m3u8",
  "width": 1760,
  "height": 900,
  "playable": true,
  "available_resolutions": [
    "360p",
    "480p",
    "720p"
  ],
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/37138336-7854-4361-9d94-0ef3b92ad561/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/37138336-7854-4361-9d94-0ef3b92ad561/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "3510f7ad-e140-497d-ae42-3f0900e47c0c"
},
{
  "_id": "69a9f14395cecfce8dd4c957",
  "id": "ced4b1cd-e8e8-46cb-9afd-d5db4073d329",
  "title": "Aula 33 - Tutoria - Produtos no Salão: Quem Paga e Como Cobrar?",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "97d89845-c5c3-415c-8944-67803fbf371e",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "2cb5f0a5-e3a3-46ee-aefd-cf092421a278",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:27.641Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:27.641Z"
  },
  "storage_size": 2060763865,
  "length": 3945.833333,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=2cb5f0a5-e3a3-46ee-aefd-cf092421a278",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/2cb5f0a5-e3a3-46ee-aefd-cf092421a278/playlist.m3u8",
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
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/2cb5f0a5-e3a3-46ee-aefd-cf092421a278/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/2cb5f0a5-e3a3-46ee-aefd-cf092421a278/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "ced4b1cd-e8e8-46cb-9afd-d5db4073d329"
},
{
  "_id": "69a9f14395cecfce8dd4c958",
  "id": "e7d8ba2d-c730-4bf4-9e0f-5911faa26187",
  "title": "48 - Sessão MSL 22.07.25",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "627085ee-7d1b-4630-8230-643cb1497a0c",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "22efc804-2340-4605-bd14-598c2b9f388d",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:27.684Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:27.684Z"
  },
  "storage_size": 4526123643,
  "length": 6368.6,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=22efc804-2340-4605-bd14-598c2b9f388d",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/22efc804-2340-4605-bd14-598c2b9f388d/playlist.m3u8",
  "width": 1760,
  "height": 900,
  "playable": true,
  "available_resolutions": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/22efc804-2340-4605-bd14-598c2b9f388d/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/22efc804-2340-4605-bd14-598c2b9f388d/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "e7d8ba2d-c730-4bf4-9e0f-5911faa26187"
},
{
  "_id": "69a9f14395cecfce8dd4c959",
  "id": "57120a89-be61-4e1c-a2dc-8b9a18e6558a",
  "title": "49 - Sessão MSL 22.07.25",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "627085ee-7d1b-4630-8230-643cb1497a0c",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "8557bc95-e2bf-42fa-84ff-38909e8d27bf",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:27.726Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:27.726Z"
  },
  "storage_size": 7285024293,
  "length": 10587.8,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=8557bc95-e2bf-42fa-84ff-38909e8d27bf",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/8557bc95-e2bf-42fa-84ff-38909e8d27bf/playlist.m3u8",
  "width": 1760,
  "height": 900,
  "playable": true,
  "available_resolutions": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/8557bc95-e2bf-42fa-84ff-38909e8d27bf/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/8557bc95-e2bf-42fa-84ff-38909e8d27bf/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "57120a89-be61-4e1c-a2dc-8b9a18e6558a"
},
{
  "_id": "69a9f14395cecfce8dd4c95a",
  "id": "53780286-49d5-4409-a677-73306cba2cb7",
  "title": "Aula 32 - Tutoria - Como fazer parcerias com vouchers",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "97d89845-c5c3-415c-8944-67803fbf371e",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "b72970da-b22e-404c-93a4-6973dbfc4707",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:27.772Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:27.772Z"
  },
  "storage_size": 3180358477,
  "length": 1868.166667,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=b72970da-b22e-404c-93a4-6973dbfc4707",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/b72970da-b22e-404c-93a4-6973dbfc4707/playlist.m3u8",
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
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/b72970da-b22e-404c-93a4-6973dbfc4707/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/b72970da-b22e-404c-93a4-6973dbfc4707/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "53780286-49d5-4409-a677-73306cba2cb7"
},
{
  "_id": "69a9f14395cecfce8dd4c95b",
  "id": "cb4401e1-e514-4e10-9344-8a81d51d0cf5",
  "title": "Aula 10 - MESL - Produtos no Salão: Quem Paga e Como Cobrar?",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "fecdf08c-3adc-4357-9774-0fdae91c7950",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "51c3082b-7f3e-47ad-b068-f7e08b678e56",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:27.829Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:27.829Z"
  },
  "storage_size": 2477398988,
  "length": 3375.28,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=51c3082b-7f3e-47ad-b068-f7e08b678e56",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/51c3082b-7f3e-47ad-b068-f7e08b678e56/playlist.m3u8",
  "width": 1760,
  "height": 900,
  "playable": true,
  "available_resolutions": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/51c3082b-7f3e-47ad-b068-f7e08b678e56/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/51c3082b-7f3e-47ad-b068-f7e08b678e56/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "cb4401e1-e514-4e10-9344-8a81d51d0cf5"
},
{
  "_id": "69a9f14395cecfce8dd4c95c",
  "id": "ef7ee68a-5425-47e7-ac61-089d74e372c4",
  "title": "47 - Sessão MSL 07.07.25",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "627085ee-7d1b-4630-8230-643cb1497a0c",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "c5d6b75e-67c7-4725-b276-54f45da226cc",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:27.886Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:27.886Z"
  },
  "storage_size": 6464668270,
  "length": 9837.04,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=c5d6b75e-67c7-4725-b276-54f45da226cc",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/c5d6b75e-67c7-4725-b276-54f45da226cc/playlist.m3u8",
  "width": 1760,
  "height": 900,
  "playable": true,
  "available_resolutions": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/c5d6b75e-67c7-4725-b276-54f45da226cc/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/c5d6b75e-67c7-4725-b276-54f45da226cc/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "ef7ee68a-5425-47e7-ac61-089d74e372c4"
},
{
  "_id": "69a9f14395cecfce8dd4c95d",
  "id": "89e9f87d-f517-43a9-858c-1bf085627272",
  "title": "46 - Sessão MSL 07.07.25",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "627085ee-7d1b-4630-8230-643cb1497a0c",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "0d0b559a-36bd-4a7c-ab3f-e1a0370c762f",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:27.929Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:27.929Z"
  },
  "storage_size": 4203656036,
  "length": 7367.64,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=0d0b559a-36bd-4a7c-ab3f-e1a0370c762f",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/0d0b559a-36bd-4a7c-ab3f-e1a0370c762f/playlist.m3u8",
  "width": 640,
  "height": 360,
  "playable": true,
  "available_resolutions": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/0d0b559a-36bd-4a7c-ab3f-e1a0370c762f/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/0d0b559a-36bd-4a7c-ab3f-e1a0370c762f/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "89e9f87d-f517-43a9-858c-1bf085627272"
},
{
  "_id": "69a9f14395cecfce8dd4c95e",
  "id": "1d60a8df-a839-4fd8-89d4-e7cdcd385546",
  "title": "Aula 31 - Tutoria -  Manual de Cultura para Equipe",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "97d89845-c5c3-415c-8944-67803fbf371e",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "643399b1-a269-4b29-9f43-7e42ea28f6a2",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:27.984Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:27.984Z"
  },
  "storage_size": 8726965231,
  "length": 3447,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=643399b1-a269-4b29-9f43-7e42ea28f6a2",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/643399b1-a269-4b29-9f43-7e42ea28f6a2/playlist.m3u8",
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
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/643399b1-a269-4b29-9f43-7e42ea28f6a2/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/643399b1-a269-4b29-9f43-7e42ea28f6a2/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "1d60a8df-a839-4fd8-89d4-e7cdcd385546"
},
{
  "_id": "69a9f14495cecfce8dd4c95f",
  "id": "ac124533-7d69-47e1-9b6f-5c4a289eb774",
  "title": "45 - Sessão MSL 23.06.25",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "627085ee-7d1b-4630-8230-643cb1497a0c",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "3b4a45b1-8fb2-4c42-8a8a-f543c69efcad",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:28.031Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:28.031Z"
  },
  "storage_size": 1468282748,
  "length": 6191.36,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=3b4a45b1-8fb2-4c42-8a8a-f543c69efcad",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/3b4a45b1-8fb2-4c42-8a8a-f543c69efcad/playlist.m3u8",
  "width": 640,
  "height": 360,
  "playable": true,
  "available_resolutions": [
    "360p"
  ],
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/3b4a45b1-8fb2-4c42-8a8a-f543c69efcad/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/3b4a45b1-8fb2-4c42-8a8a-f543c69efcad/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "ac124533-7d69-47e1-9b6f-5c4a289eb774"
},
{
  "_id": "69a9f14495cecfce8dd4c960",
  "id": "a8c5fe84-32bf-4003-b823-aad08d054160",
  "title": "0612.mp4",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "97d89845-c5c3-415c-8944-67803fbf371e",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "5cc91401-b50a-43d9-afc4-35c1b3abcc40",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:28.074Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:28.074Z"
  },
  "storage_size": 17408170364,
  "length": 7676.333333,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=5cc91401-b50a-43d9-afc4-35c1b3abcc40",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/5cc91401-b50a-43d9-afc4-35c1b3abcc40/playlist.m3u8",
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
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/5cc91401-b50a-43d9-afc4-35c1b3abcc40/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/5cc91401-b50a-43d9-afc4-35c1b3abcc40/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "a8c5fe84-32bf-4003-b823-aad08d054160"
},
{
  "_id": "69a9f14495cecfce8dd4c961",
  "id": "378921bd-0c6e-4aa8-ada9-89ca8aad881a",
  "title": "Aula 30 - Tutoria - Treinamento para Gerentes do Salão: Liderança, Vendas e Gestão de Pessoas",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "97d89845-c5c3-415c-8944-67803fbf371e",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "274fd5b3-6391-43c3-a78c-c446f7b5984c",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:28.115Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:28.115Z"
  },
  "storage_size": 7166906159,
  "length": 3187.433333,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=274fd5b3-6391-43c3-a78c-c446f7b5984c",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/274fd5b3-6391-43c3-a78c-c446f7b5984c/playlist.m3u8",
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
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/274fd5b3-6391-43c3-a78c-c446f7b5984c/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/274fd5b3-6391-43c3-a78c-c446f7b5984c/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "378921bd-0c6e-4aa8-ada9-89ca8aad881a"
},
{
  "_id": "69a9f14495cecfce8dd4c962",
  "id": "b10f210c-8b4c-4c49-ab53-ee1e097f340c",
  "title": "Aula 09 -MESL -  Manual de Cultura para Equipe: Desenvolvendo uma Postura e Mentalidade que Diferenciam Profissionais que Crescem no Salão",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "fecdf08c-3adc-4357-9774-0fdae91c7950",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "8f12086e-b90b-4829-aa1e-ce276050b3eb",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:28.169Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:28.169Z"
  },
  "storage_size": 5772456555,
  "length": 8390.48,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=8f12086e-b90b-4829-aa1e-ce276050b3eb",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/8f12086e-b90b-4829-aa1e-ce276050b3eb/playlist.m3u8",
  "width": 640,
  "height": 360,
  "playable": true,
  "available_resolutions": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/8f12086e-b90b-4829-aa1e-ce276050b3eb/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/8f12086e-b90b-4829-aa1e-ce276050b3eb/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "b10f210c-8b4c-4c49-ab53-ee1e097f340c"
},
{
  "_id": "69a9f14495cecfce8dd4c963",
  "id": "b27fa0e5-ff01-4e21-ba9c-e3c420a4e3b7",
  "title": "Aula 29 - Tutoria - Implementação de CRM na recepção 26.05.25",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "97d89845-c5c3-415c-8944-67803fbf371e",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "56f0cfde-3736-4f98-a7a6-80020eafae02",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:28.223Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:28.223Z"
  },
  "storage_size": 3337766059,
  "length": 6550.92,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=56f0cfde-3736-4f98-a7a6-80020eafae02",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/56f0cfde-3736-4f98-a7a6-80020eafae02/playlist.m3u8",
  "width": 1760,
  "height": 900,
  "playable": true,
  "available_resolutions": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/56f0cfde-3736-4f98-a7a6-80020eafae02/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/56f0cfde-3736-4f98-a7a6-80020eafae02/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "b27fa0e5-ff01-4e21-ba9c-e3c420a4e3b7"
},
{
  "_id": "69a9f14495cecfce8dd4c964",
  "id": "40724517-ffd4-4cf9-9326-483717f9c089",
  "title": "Aula 28 - Tutoria - Como criar as metas para os colaboradores 12.05.25",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "97d89845-c5c3-415c-8944-67803fbf371e",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "dce6ef9b-74f2-413a-af4b-ef5d90fd7132",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:28.267Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:28.267Z"
  },
  "storage_size": 4216477820,
  "length": 2398,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=dce6ef9b-74f2-413a-af4b-ef5d90fd7132",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/dce6ef9b-74f2-413a-af4b-ef5d90fd7132/playlist.m3u8",
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
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/dce6ef9b-74f2-413a-af4b-ef5d90fd7132/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/dce6ef9b-74f2-413a-af4b-ef5d90fd7132/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "40724517-ffd4-4cf9-9326-483717f9c089"
},
{
  "_id": "69a9f14495cecfce8dd4c965",
  "id": "b2cf69a9-959e-4fe9-a2b5-7523db18c599",
  "title": "Aula 08 -MESL - Como criar as metas para os colaboradores 12.05.25",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "fecdf08c-3adc-4357-9774-0fdae91c7950",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "544b97d0-ffe2-49bf-b065-7496a74aaf76",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:28.316Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:28.316Z"
  },
  "storage_size": 6037518908,
  "length": 8319.44,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=544b97d0-ffe2-49bf-b065-7496a74aaf76",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/544b97d0-ffe2-49bf-b065-7496a74aaf76/playlist.m3u8",
  "width": 1760,
  "height": 900,
  "playable": true,
  "available_resolutions": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/544b97d0-ffe2-49bf-b065-7496a74aaf76/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/544b97d0-ffe2-49bf-b065-7496a74aaf76/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "b2cf69a9-959e-4fe9-a2b5-7523db18c599"
},
{
  "_id": "69a9f14495cecfce8dd4c966",
  "id": "3dde8397-d159-4ae6-b4ec-7d10232734d1",
  "title": "Aula 27 - Tutoria - Como Definir a Comissão dos Profissionais.mp4",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "97d89845-c5c3-415c-8944-67803fbf371e",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "c803ed6d-d455-4aa4-ac84-e09ad91233c1",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:28.369Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:28.369Z"
  },
  "storage_size": 9682871847,
  "length": 9556.92,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=c803ed6d-d455-4aa4-ac84-e09ad91233c1",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/c803ed6d-d455-4aa4-ac84-e09ad91233c1/playlist.m3u8",
  "width": 1760,
  "height": 900,
  "playable": true,
  "available_resolutions": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/c803ed6d-d455-4aa4-ac84-e09ad91233c1/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/c803ed6d-d455-4aa4-ac84-e09ad91233c1/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "3dde8397-d159-4ae6-b4ec-7d10232734d1"
},
{
  "_id": "69a9f14495cecfce8dd4c967",
  "id": "7946c90e-eb54-48b5-a41a-92e867f94584",
  "title": "Aula 07 -MESL - Captação de Clientes 14.04.24",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "fecdf08c-3adc-4357-9774-0fdae91c7950",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "867d818b-0ea2-476d-900e-9574b04a7e01",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:28.425Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:28.425Z"
  },
  "storage_size": 646674569,
  "length": 6166.24,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=867d818b-0ea2-476d-900e-9574b04a7e01",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/867d818b-0ea2-476d-900e-9574b04a7e01/playlist.m3u8",
  "width": 1760,
  "height": 900,
  "playable": true,
  "available_resolutions": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/867d818b-0ea2-476d-900e-9574b04a7e01/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/867d818b-0ea2-476d-900e-9574b04a7e01/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "7946c90e-eb54-48b5-a41a-92e867f94584"
},
{
  "_id": "69a9f14495cecfce8dd4c968",
  "id": "9e6d4eed-b6e4-4546-92de-114fbc268589",
  "title": "Aula 26 - Tutoria - Captação de Clientes 14.04.25",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "97d89845-c5c3-415c-8944-67803fbf371e",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "10d2a994-9567-475c-b1dd-7908f840e78b",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:28.477Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:28.477Z"
  },
  "storage_size": 12199074088,
  "length": 6287.2,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=10d2a994-9567-475c-b1dd-7908f840e78b",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/10d2a994-9567-475c-b1dd-7908f840e78b/playlist.m3u8",
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
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/10d2a994-9567-475c-b1dd-7908f840e78b/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/10d2a994-9567-475c-b1dd-7908f840e78b/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "9e6d4eed-b6e4-4546-92de-114fbc268589"
},
{
  "_id": "69a9f14495cecfce8dd4c969",
  "id": "e5f62267-3d56-4b82-9c97-3632acf2a512",
  "title": "Aula 25 - Tutoria - Explicando Planilha de Precificação 31.03.2025",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "97d89845-c5c3-415c-8944-67803fbf371e",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "021c819d-0d20-4158-8487-a662c690c3c0",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:28.531Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:28.531Z"
  },
  "storage_size": 5564575586,
  "length": 6532.533333,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=021c819d-0d20-4158-8487-a662c690c3c0",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/021c819d-0d20-4158-8487-a662c690c3c0/playlist.m3u8",
  "width": 1920,
  "height": 1080,
  "playable": true,
  "available_resolutions": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "backup": false,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/021c819d-0d20-4158-8487-a662c690c3c0/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/021c819d-0d20-4158-8487-a662c690c3c0/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "e5f62267-3d56-4b82-9c97-3632acf2a512"
},
{
  "_id": "69a9f14495cecfce8dd4c96a",
  "id": "a2c84e41-c2c4-422b-8cd3-5f1c0dc39131",
  "title": "Aula 24 - Tutoria - Vendas para a Equipe com Ana Kelin 17.03.2025",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "97d89845-c5c3-415c-8944-67803fbf371e",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "84a7a49d-880e-46df-83f6-08385b1e3013",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:28.595Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:28.595Z"
  },
  "storage_size": 14476919387,
  "length": 6934.133333,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=84a7a49d-880e-46df-83f6-08385b1e3013",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/84a7a49d-880e-46df-83f6-08385b1e3013/playlist.m3u8",
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
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/84a7a49d-880e-46df-83f6-08385b1e3013/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/84a7a49d-880e-46df-83f6-08385b1e3013/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "a2c84e41-c2c4-422b-8cd3-5f1c0dc39131"
},
{
  "_id": "69a9f14495cecfce8dd4c96b",
  "id": "4fe996d3-cb24-4813-a00c-bf46a66df10d",
  "title": "Aula 06 - MESL- Separação de Pessoa Física e Pessoa Jurídica 17.03.25",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "fecdf08c-3adc-4357-9774-0fdae91c7950",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "97b05553-3c67-4560-a665-30e807b5ab06",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:28.649Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:28.649Z"
  },
  "storage_size": 3324005796,
  "length": 5514.92,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=97b05553-3c67-4560-a665-30e807b5ab06",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/97b05553-3c67-4560-a665-30e807b5ab06/playlist.m3u8",
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
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/97b05553-3c67-4560-a665-30e807b5ab06/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/97b05553-3c67-4560-a665-30e807b5ab06/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "4fe996d3-cb24-4813-a00c-bf46a66df10d"
},
{
  "_id": "69a9f14495cecfce8dd4c96c",
  "id": "9b157ca9-db75-4b0c-b2ad-b19bb0590e58",
  "title": "17.03.2025 - Tutoria l Vendas para a Equipe com Ana Kelin",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "97d89845-c5c3-415c-8944-67803fbf371e",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "6267cf75-f008-41f3-bad6-c0e16e28e970",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:28.691Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:28.691Z"
  },
  "storage_size": 6679929359,
  "length": 7422.08,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=6267cf75-f008-41f3-bad6-c0e16e28e970",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/6267cf75-f008-41f3-bad6-c0e16e28e970/playlist.m3u8",
  "width": 640,
  "height": 360,
  "playable": true,
  "available_resolutions": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/6267cf75-f008-41f3-bad6-c0e16e28e970/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/6267cf75-f008-41f3-bad6-c0e16e28e970/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "9b157ca9-db75-4b0c-b2ad-b19bb0590e58"
},
{
  "_id": "69a9f14495cecfce8dd4c96d",
  "id": "0655daef-2dd2-4ea1-9bd1-e51a2bd0e241",
  "title": "Webnário.mp4",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "f6fc5e3b-1aaf-4ccc-a3d2-a223032d51a3",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "31cff360-92eb-4741-9d6b-cd98e3b18616",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:28.746Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:28.746Z"
  },
  "storage_size": 11068411164,
  "length": 2564.433333,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=31cff360-92eb-4741-9d6b-cd98e3b18616",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/31cff360-92eb-4741-9d6b-cd98e3b18616/playlist.m3u8",
  "width": 3840,
  "height": 2160,
  "playable": true,
  "available_resolutions": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/31cff360-92eb-4741-9d6b-cd98e3b18616/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/31cff360-92eb-4741-9d6b-cd98e3b18616/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "0655daef-2dd2-4ea1-9bd1-e51a2bd0e241"
},
{
  "_id": "69a9f14495cecfce8dd4c96e",
  "id": "fa91d8d3-9fbb-4218-b51c-51a68729b919",
  "title": "Aula 23 - Separação de Pessoa Física e Pessoa Jurídica 24.02.2025",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "97d89845-c5c3-415c-8944-67803fbf371e",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "f7d2483c-7559-4d21-87e3-8aea87542cb6",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:28.799Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:28.799Z"
  },
  "storage_size": 5796550543,
  "length": 6289.72,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=f7d2483c-7559-4d21-87e3-8aea87542cb6",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/f7d2483c-7559-4d21-87e3-8aea87542cb6/playlist.m3u8",
  "width": 640,
  "height": 360,
  "playable": true,
  "available_resolutions": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/f7d2483c-7559-4d21-87e3-8aea87542cb6/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/f7d2483c-7559-4d21-87e3-8aea87542cb6/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "fa91d8d3-9fbb-4218-b51c-51a68729b919"
},
{
  "_id": "69a9f14495cecfce8dd4c96f",
  "id": "908f5e85-a6ff-46b6-9361-6a9d88db3eab",
  "title": "Como fazer uma Entrevista de Emprego na Prática - Presencial",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "6256361c-e9fd-4c58-9887-3f935a61f623",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "993a28c0-eeef-42b8-aa39-219bcf929d27",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:28.851Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:28.851Z"
  },
  "storage_size": 5133418607,
  "length": 1706.466667,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=993a28c0-eeef-42b8-aa39-219bcf929d27",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/993a28c0-eeef-42b8-aa39-219bcf929d27/playlist.m3u8",
  "width": 3840,
  "height": 2160,
  "playable": true,
  "available_resolutions": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/993a28c0-eeef-42b8-aa39-219bcf929d27/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/993a28c0-eeef-42b8-aa39-219bcf929d27/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "908f5e85-a6ff-46b6-9361-6a9d88db3eab"
},
{
  "_id": "69a9f14495cecfce8dd4c970",
  "id": "e1b3e14a-5e55-40d4-ab6d-a87165933bd5",
  "title": "Como fazer uma Entrevista de Emprego na Prática - Online",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "6256361c-e9fd-4c58-9887-3f935a61f623",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "c726d039-abf8-42c0-b429-8dfde3a6cea0",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:28.892Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:28.892Z"
  },
  "storage_size": 3060470623,
  "length": 1132.033333,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=c726d039-abf8-42c0-b429-8dfde3a6cea0",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/c726d039-abf8-42c0-b429-8dfde3a6cea0/playlist.m3u8",
  "width": 3840,
  "height": 2160,
  "playable": true,
  "available_resolutions": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/c726d039-abf8-42c0-b429-8dfde3a6cea0/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/c726d039-abf8-42c0-b429-8dfde3a6cea0/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "e1b3e14a-5e55-40d4-ab6d-a87165933bd5"
},
{
  "_id": "69a9f14495cecfce8dd4c971",
  "id": "fd674337-8180-4c96-b8ba-543590a071f8",
  "title": "Aula 05 - MESL - Plano de carreira 17.02.25",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "fecdf08c-3adc-4357-9774-0fdae91c7950",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "6ec6cdb3-17fc-4946-87c9-cb7f15a401c0",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:28.953Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:28.953Z"
  },
  "storage_size": 6518236555,
  "length": 7116.4,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=6ec6cdb3-17fc-4946-87c9-cb7f15a401c0",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/6ec6cdb3-17fc-4946-87c9-cb7f15a401c0/playlist.m3u8",
  "width": 640,
  "height": 360,
  "playable": true,
  "available_resolutions": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/6ec6cdb3-17fc-4946-87c9-cb7f15a401c0/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/6ec6cdb3-17fc-4946-87c9-cb7f15a401c0/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "fd674337-8180-4c96-b8ba-543590a071f8"
},
{
  "_id": "69a9f14595cecfce8dd4c972",
  "id": "a54e0997-0b3b-4236-8e8d-a77ee2fe3355",
  "title": "Aula 14 - Tutoria - Plano de Carreira  10.02.25",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "97d89845-c5c3-415c-8944-67803fbf371e",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "c453c4ea-119b-46a7-85c9-c53910915ad0",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:29.006Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:29.006Z"
  },
  "storage_size": 6783748823,
  "length": 10975.68,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=c453c4ea-119b-46a7-85c9-c53910915ad0",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/c453c4ea-119b-46a7-85c9-c53910915ad0/playlist.m3u8",
  "width": 640,
  "height": 360,
  "playable": true,
  "available_resolutions": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/c453c4ea-119b-46a7-85c9-c53910915ad0/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/c453c4ea-119b-46a7-85c9-c53910915ad0/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "a54e0997-0b3b-4236-8e8d-a77ee2fe3355"
},
{
  "_id": "69a9f14595cecfce8dd4c973",
  "id": "e1901f89-8e52-42e5-8d0f-e25417a4057e",
  "title": "Aula 22 - Tutoria - Como transformar seu intagram em uma máquina 05.02.25",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "97d89845-c5c3-415c-8944-67803fbf371e",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "47794ba5-0030-4a64-ae1b-6dd1ddb11f76",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:29.059Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:29.059Z"
  },
  "storage_size": 4205860256,
  "length": 6806.4,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=47794ba5-0030-4a64-ae1b-6dd1ddb11f76",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/47794ba5-0030-4a64-ae1b-6dd1ddb11f76/playlist.m3u8",
  "width": 1686,
  "height": 768,
  "playable": true,
  "available_resolutions": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/47794ba5-0030-4a64-ae1b-6dd1ddb11f76/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/47794ba5-0030-4a64-ae1b-6dd1ddb11f76/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "e1901f89-8e52-42e5-8d0f-e25417a4057e"
},
{
  "_id": "69a9f14595cecfce8dd4c974",
  "id": "7d6eca4a-471b-4d01-a58a-610b53c333cb",
  "title": "Aula 21 - Tutoria - Posicionamento e Público Alvo 28.01.2025",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "97d89845-c5c3-415c-8944-67803fbf371e",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "504ada0c-8e6b-4970-91ec-5656cf8e3c5b",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:29.113Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:29.113Z"
  },
  "storage_size": 4178949944,
  "length": 7980.68,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=504ada0c-8e6b-4970-91ec-5656cf8e3c5b",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/504ada0c-8e6b-4970-91ec-5656cf8e3c5b/playlist.m3u8",
  "width": 1760,
  "height": 900,
  "playable": true,
  "available_resolutions": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/504ada0c-8e6b-4970-91ec-5656cf8e3c5b/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/504ada0c-8e6b-4970-91ec-5656cf8e3c5b/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "7d6eca4a-471b-4d01-a58a-610b53c333cb"
},
{
  "_id": "69a9f14595cecfce8dd4c975",
  "id": "7200a33f-8482-4c81-9903-0b8c3298ffae",
  "title": "12.08.2024 -Tutoria Condensada-Jornada do Cliente-aula 04-Pilar Vendas.mp4",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "0d0462e6-80ef-4aa8-97c2-82b9f7d06441",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "a5555ef3-4b36-4790-92e6-709cde36f776",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:29.164Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:29.164Z"
  },
  "storage_size": 2447023116,
  "length": 846.433333,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=a5555ef3-4b36-4790-92e6-709cde36f776",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/a5555ef3-4b36-4790-92e6-709cde36f776/playlist.m3u8",
  "width": 3840,
  "height": 2160,
  "playable": true,
  "available_resolutions": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/a5555ef3-4b36-4790-92e6-709cde36f776/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/a5555ef3-4b36-4790-92e6-709cde36f776/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "7200a33f-8482-4c81-9903-0b8c3298ffae"
},
{
  "_id": "69a9f14595cecfce8dd4c976",
  "id": "a0f817e6-f89e-4af5-96b9-9d7d437fbc90",
  "title": "15.04.2024-Tutoria Condensada-Recrutamento-aula 01-Pilar Liderança.mp4",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "641c90db-9dd8-4310-bace-56dc854714b3",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "10ca9c8a-36e5-4357-8349-12abc62d33ec",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:29.207Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:29.207Z"
  },
  "storage_size": 3651981677,
  "length": 1270.666667,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=10ca9c8a-36e5-4357-8349-12abc62d33ec",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/10ca9c8a-36e5-4357-8349-12abc62d33ec/playlist.m3u8",
  "width": 3840,
  "height": 2160,
  "playable": true,
  "available_resolutions": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/10ca9c8a-36e5-4357-8349-12abc62d33ec/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/10ca9c8a-36e5-4357-8349-12abc62d33ec/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "a0f817e6-f89e-4af5-96b9-9d7d437fbc90"
},
{
  "_id": "69a9f14595cecfce8dd4c977",
  "id": "8a521db0-24b4-434b-94b2-3457b5a0e56c",
  "title": "22.07.2024 - Tutoria Condensada-Marketing-aula 03-Pilar Vendas.mp4",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "0d0462e6-80ef-4aa8-97c2-82b9f7d06441",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "f9d6ba31-46e0-4974-a31a-f87ad6f969a7",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:29.251Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:29.251Z"
  },
  "storage_size": 2719335815,
  "length": 1052.966667,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=f9d6ba31-46e0-4974-a31a-f87ad6f969a7",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/f9d6ba31-46e0-4974-a31a-f87ad6f969a7/playlist.m3u8",
  "width": 3840,
  "height": 2160,
  "playable": true,
  "available_resolutions": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/f9d6ba31-46e0-4974-a31a-f87ad6f969a7/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/f9d6ba31-46e0-4974-a31a-f87ad6f969a7/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "8a521db0-24b4-434b-94b2-3457b5a0e56c"
},
{
  "_id": "69a9f14595cecfce8dd4c978",
  "id": "39056fbb-8001-4d6a-96d6-ba1312c65603",
  "title": "29.04.2024-Tutoria Condensada-Recrutamento e Seleção de Pessoas-Aula 01-Pilar Vendas.mp4",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "0d0462e6-80ef-4aa8-97c2-82b9f7d06441",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "df089fdd-c0ab-441c-83d2-15b3b6b05661",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:29.300Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:29.300Z"
  },
  "storage_size": 2881423154,
  "length": 1466.866667,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=df089fdd-c0ab-441c-83d2-15b3b6b05661",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/df089fdd-c0ab-441c-83d2-15b3b6b05661/playlist.m3u8",
  "width": 3840,
  "height": 2160,
  "playable": true,
  "available_resolutions": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/df089fdd-c0ab-441c-83d2-15b3b6b05661/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/df089fdd-c0ab-441c-83d2-15b3b6b05661/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "39056fbb-8001-4d6a-96d6-ba1312c65603"
},
{
  "_id": "69a9f14595cecfce8dd4c979",
  "id": "2c9ecd90-944e-48cb-b1e2-54c851b5edb3",
  "title": "26.08.2024 Tutoria Condensada-Planos, pacotes e assinaturas-aula 05-Pilar Vendas",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "0d0462e6-80ef-4aa8-97c2-82b9f7d06441",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "dc52bb84-b6df-4e1c-acc2-b175015f7a86",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:29.345Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:29.345Z"
  },
  "storage_size": 1734345337,
  "length": 750,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=dc52bb84-b6df-4e1c-acc2-b175015f7a86",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/dc52bb84-b6df-4e1c-acc2-b175015f7a86/playlist.m3u8",
  "width": 1920,
  "height": 1080,
  "playable": true,
  "available_resolutions": "360p,480p,720p,1080p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/dc52bb84-b6df-4e1c-acc2-b175015f7a86/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/dc52bb84-b6df-4e1c-acc2-b175015f7a86/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "2c9ecd90-944e-48cb-b1e2-54c851b5edb3"
},
{
  "_id": "69a9f14595cecfce8dd4c97a",
  "id": "95640785-c72e-4fc3-a3f8-541337bd077b",
  "title": "14.10.2024  Tutoria Condensada-Estratégias Comerciais-aula 06-Pilar Vendas",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "0d0462e6-80ef-4aa8-97c2-82b9f7d06441",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "5f2ff8ed-6a26-4155-95f8-ee2c0031fbe4",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:29.387Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:29.387Z"
  },
  "storage_size": 1968400454,
  "length": 919.8,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=5f2ff8ed-6a26-4155-95f8-ee2c0031fbe4",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/5f2ff8ed-6a26-4155-95f8-ee2c0031fbe4/playlist.m3u8",
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
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/5f2ff8ed-6a26-4155-95f8-ee2c0031fbe4/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/5f2ff8ed-6a26-4155-95f8-ee2c0031fbe4/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "95640785-c72e-4fc3-a3f8-541337bd077b"
},
{
  "_id": "69a9f14595cecfce8dd4c97b",
  "id": "7e51a68f-7d85-4cd9-bc5e-f328d0f9a2a0",
  "title": "27.05.2024 Tutoria Condensada-Metas-aula 02-Pilar Vendas",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "0d0462e6-80ef-4aa8-97c2-82b9f7d06441",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "20b2f626-d79d-4c5e-9139-11cc9a3ec507",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:29.437Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:29.437Z"
  },
  "storage_size": 1861481335,
  "length": 916.2,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=20b2f626-d79d-4c5e-9139-11cc9a3ec507",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/20b2f626-d79d-4c5e-9139-11cc9a3ec507/playlist.m3u8",
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
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/20b2f626-d79d-4c5e-9139-11cc9a3ec507/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/20b2f626-d79d-4c5e-9139-11cc9a3ec507/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "7e51a68f-7d85-4cd9-bc5e-f328d0f9a2a0"
},
{
  "_id": "69a9f14595cecfce8dd4c97c",
  "id": "d7356be4-f7db-41c9-b7a8-0f7e246ce494",
  "title": "Aula 20 - Tutoria Como Fazer Reuniões com Colaboradores 13.01.2025",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "97d89845-c5c3-415c-8944-67803fbf371e",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "b2d6a58e-ddfe-4c36-a299-677f51025a70",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:29.496Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:29.496Z"
  },
  "storage_size": 4997519820,
  "length": 5254.88,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=b2d6a58e-ddfe-4c36-a299-677f51025a70",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/b2d6a58e-ddfe-4c36-a299-677f51025a70/playlist.m3u8",
  "width": 1760,
  "height": 900,
  "playable": true,
  "available_resolutions": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/b2d6a58e-ddfe-4c36-a299-677f51025a70/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/b2d6a58e-ddfe-4c36-a299-677f51025a70/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "d7356be4-f7db-41c9-b7a8-0f7e246ce494"
},
{
  "_id": "69a9f14595cecfce8dd4c97d",
  "id": "0742c7c1-7dad-4925-9d57-77aacd073b27",
  "title": "Aula 04 - MESL - Definição de Propósito Elaboração de Plano de Negócios 13.01.25",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "fecdf08c-3adc-4357-9774-0fdae91c7950",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "d468b162-f8c6-44c3-be6f-fd52dad50f2d",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:29.544Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:29.544Z"
  },
  "storage_size": 4406718352,
  "length": 4479.12,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=d468b162-f8c6-44c3-be6f-fd52dad50f2d",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/d468b162-f8c6-44c3-be6f-fd52dad50f2d/playlist.m3u8",
  "width": 1760,
  "height": 900,
  "playable": true,
  "available_resolutions": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/d468b162-f8c6-44c3-be6f-fd52dad50f2d/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/d468b162-f8c6-44c3-be6f-fd52dad50f2d/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "0742c7c1-7dad-4925-9d57-77aacd073b27"
},
{
  "_id": "69a9f14595cecfce8dd4c97e",
  "id": "7a6aa6b4-4ac4-42a8-9eca-5d931d88b22a",
  "title": "Aula 19 - Tutoria Liderança - 23.12.2024",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "97d89845-c5c3-415c-8944-67803fbf371e",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "749a3fe2-5fd3-4563-bbed-2ea81546cf20",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:29.588Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:29.588Z"
  },
  "storage_size": 1200945754,
  "length": 7460.88,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=749a3fe2-5fd3-4563-bbed-2ea81546cf20",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/749a3fe2-5fd3-4563-bbed-2ea81546cf20/playlist.m3u8",
  "width": 640,
  "height": 360,
  "playable": true,
  "available_resolutions": [
    "360p"
  ],
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/749a3fe2-5fd3-4563-bbed-2ea81546cf20/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/749a3fe2-5fd3-4563-bbed-2ea81546cf20/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "7a6aa6b4-4ac4-42a8-9eca-5d931d88b22a"
},
{
  "_id": "69a9f14595cecfce8dd4c97f",
  "id": "c49cdd62-ace7-43c7-a7df-4adf96528814",
  "title": "Aula 18 - Tutoria - Planejamento Anual 09.12.2024",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "97d89845-c5c3-415c-8944-67803fbf371e",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "ccfda024-325b-4380-8ac1-623b8e917483",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:29.639Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:29.639Z"
  },
  "storage_size": 8810811457,
  "length": 8792,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=ccfda024-325b-4380-8ac1-623b8e917483",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/ccfda024-325b-4380-8ac1-623b8e917483/playlist.m3u8",
  "width": 1920,
  "height": 1080,
  "playable": true,
  "available_resolutions": "360p,480p,720p,1080p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/ccfda024-325b-4380-8ac1-623b8e917483/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/ccfda024-325b-4380-8ac1-623b8e917483/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "c49cdd62-ace7-43c7-a7df-4adf96528814"
},
{
  "_id": "69a9f14595cecfce8dd4c980",
  "id": "1daccb2f-15f3-4a80-b8a8-27757ea9906a",
  "title": "Aula03 -MESL- Planejamento Anual 09.12.24",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "fecdf08c-3adc-4357-9774-0fdae91c7950",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "d2d73458-20a4-4eee-aca8-2b059f8d0254",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:29.692Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:29.692Z"
  },
  "storage_size": 7097539639,
  "length": 7586,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=d2d73458-20a4-4eee-aca8-2b059f8d0254",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/d2d73458-20a4-4eee-aca8-2b059f8d0254/playlist.m3u8",
  "width": 1920,
  "height": 1080,
  "playable": true,
  "available_resolutions": "360p,480p,720p,1080p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/d2d73458-20a4-4eee-aca8-2b059f8d0254/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/d2d73458-20a4-4eee-aca8-2b059f8d0254/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "1daccb2f-15f3-4a80-b8a8-27757ea9906a"
},
{
  "_id": "69a9f14595cecfce8dd4c981",
  "id": "622bd56e-24d4-4697-af5a-9327d2436eed",
  "title": "Aula 02 -MESL - Gestão de Fluxo de Caixa 25.11.24",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "fecdf08c-3adc-4357-9774-0fdae91c7950",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "f335132b-2f1b-4b27-b90a-0d54944f031e",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:29.738Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:29.738Z"
  },
  "storage_size": 3719373847,
  "length": 5181,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=f335132b-2f1b-4b27-b90a-0d54944f031e",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/f335132b-2f1b-4b27-b90a-0d54944f031e/playlist.m3u8",
  "width": 1760,
  "height": 900,
  "playable": true,
  "available_resolutions": "360p,480p,720p,1080p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/f335132b-2f1b-4b27-b90a-0d54944f031e/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/f335132b-2f1b-4b27-b90a-0d54944f031e/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "622bd56e-24d4-4697-af5a-9327d2436eed"
},
{
  "_id": "69a9f14795cecfce8dd4c982",
  "id": "d8bc957c-1cec-437c-800a-3b2d94d60252",
  "title": "Aula 17 - Tutoria Social Media  25.11.2024",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "97d89845-c5c3-415c-8944-67803fbf371e",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "41268bed-a441-46d9-bf26-4ba6ec9c6d72",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:31.139Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:31.139Z"
  },
  "storage_size": 903455168,
  "length": 5741,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=41268bed-a441-46d9-bf26-4ba6ec9c6d72",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/41268bed-a441-46d9-bf26-4ba6ec9c6d72/playlist.m3u8",
  "width": 640,
  "height": 360,
  "playable": true,
  "available_resolutions": "360p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/41268bed-a441-46d9-bf26-4ba6ec9c6d72/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/41268bed-a441-46d9-bf26-4ba6ec9c6d72/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "d8bc957c-1cec-437c-800a-3b2d94d60252"
},
{
  "_id": "69a9f14795cecfce8dd4c983",
  "id": "fe68a643-ddec-4b92-a271-b74da41f6f89",
  "title": "Aula 16 - Tutoria - Tráfego Pago 11.11.2024",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "97d89845-c5c3-415c-8944-67803fbf371e",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "7f85cb4e-c4a4-41e2-9b1f-e77384a2dfba",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:31.183Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:31.183Z"
  },
  "storage_size": 985878981,
  "length": 8487,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=7f85cb4e-c4a4-41e2-9b1f-e77384a2dfba",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/7f85cb4e-c4a4-41e2-9b1f-e77384a2dfba/playlist.m3u8",
  "width": 640,
  "height": 360,
  "playable": true,
  "available_resolutions": "360p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/7f85cb4e-c4a4-41e2-9b1f-e77384a2dfba/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/7f85cb4e-c4a4-41e2-9b1f-e77384a2dfba/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "fe68a643-ddec-4b92-a271-b74da41f6f89"
},
{
  "_id": "69a9f14795cecfce8dd4c984",
  "id": "f558056d-affc-46d2-8e64-a29d77cd41a1",
  "title": "Aula 15\n  - Tutoria - Manual de Cultura 28.10.2024",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "97d89845-c5c3-415c-8944-67803fbf371e",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "4ece10f0-9ca2-4950-96a5-ba07841de010",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:31.235Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:31.235Z"
  },
  "storage_size": 7721421362,
  "length": 6454,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=4ece10f0-9ca2-4950-96a5-ba07841de010",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/4ece10f0-9ca2-4950-96a5-ba07841de010/playlist.m3u8",
  "width": 1920,
  "height": 1080,
  "playable": true,
  "available_resolutions": "360p,480p,720p,1080p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/4ece10f0-9ca2-4950-96a5-ba07841de010/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/4ece10f0-9ca2-4950-96a5-ba07841de010/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "f558056d-affc-46d2-8e64-a29d77cd41a1"
},
{
  "_id": "69a9f14795cecfce8dd4c985",
  "id": "11d1d539-4024-4699-96ba-9fe29d473d7b",
  "title": "Aula 01 - MESL - Alavancas de Faturamento 21.10.24",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "fecdf08c-3adc-4357-9774-0fdae91c7950",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "1acedcd3-ba79-445a-985a-d87b8eb34a58",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:31.291Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:31.291Z"
  },
  "storage_size": 2829937940,
  "length": 3231,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=1acedcd3-ba79-445a-985a-d87b8eb34a58",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/1acedcd3-ba79-445a-985a-d87b8eb34a58/playlist.m3u8",
  "width": 1760,
  "height": 900,
  "playable": true,
  "available_resolutions": "360p,480p,720p,1080p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/1acedcd3-ba79-445a-985a-d87b8eb34a58/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/1acedcd3-ba79-445a-985a-d87b8eb34a58/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "11d1d539-4024-4699-96ba-9fe29d473d7b"
},
{
  "_id": "69a9f14795cecfce8dd4c986",
  "id": "c9b920b3-53f0-4a53-9a88-85a7ef4d822c",
  "title": "Aula 06 - Estratégias Comerciais",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "97d89845-c5c3-415c-8944-67803fbf371e",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "2c2e677c-19ab-405b-9c12-870b990ff46d",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:31.334Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:31.334Z"
  },
  "storage_size": 10749599618,
  "length": 12341,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=2c2e677c-19ab-405b-9c12-870b990ff46d",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/2c2e677c-19ab-405b-9c12-870b990ff46d/playlist.m3u8",
  "width": 1920,
  "height": 1080,
  "playable": true,
  "available_resolutions": "360p,480p,720p,1080p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/2c2e677c-19ab-405b-9c12-870b990ff46d/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/2c2e677c-19ab-405b-9c12-870b990ff46d/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "c9b920b3-53f0-4a53-9a88-85a7ef4d822c"
},
{
  "_id": "69a9f14795cecfce8dd4c987",
  "id": "4162df64-f8b2-4e8d-9af3-7243b2d498bb",
  "title": "Aula 12 - Tutoria - Regime Tributário e Lei Salão Parceiro 23.09.2024",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "97d89845-c5c3-415c-8944-67803fbf371e",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "7635f0e2-4473-4bbf-9331-feb18cf0cff7",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:31.391Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:31.391Z"
  },
  "storage_size": 14976990143,
  "length": 9845,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=7635f0e2-4473-4bbf-9331-feb18cf0cff7",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/7635f0e2-4473-4bbf-9331-feb18cf0cff7/playlist.m3u8",
  "width": 1920,
  "height": 1080,
  "playable": true,
  "available_resolutions": "360p,480p,720p,1080p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/7635f0e2-4473-4bbf-9331-feb18cf0cff7/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/7635f0e2-4473-4bbf-9331-feb18cf0cff7/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "4162df64-f8b2-4e8d-9af3-7243b2d498bb"
},
{
  "_id": "69a9f14795cecfce8dd4c988",
  "id": "7879ed9a-16fc-45ad-9545-5a98a5bc206d",
  "title": "Aula 11  - Tutoria - Gestão Fluxo de Caixa 09.09.2024",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "97d89845-c5c3-415c-8944-67803fbf371e",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "bd389d53-43cc-4e75-a205-c64f4995d4f1",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:31.444Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:31.444Z"
  },
  "storage_size": 1072427724,
  "length": 6802,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=bd389d53-43cc-4e75-a205-c64f4995d4f1",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/bd389d53-43cc-4e75-a205-c64f4995d4f1/playlist.m3u8",
  "width": 640,
  "height": 360,
  "playable": true,
  "available_resolutions": "360p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/bd389d53-43cc-4e75-a205-c64f4995d4f1/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/bd389d53-43cc-4e75-a205-c64f4995d4f1/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "7879ed9a-16fc-45ad-9545-5a98a5bc206d"
},
{
  "_id": "69a9f14795cecfce8dd4c989",
  "id": "4d57b914-cd4f-46cd-af64-0190f2d143ab",
  "title": "Aula 10 - Tutoria Planos pacotes e assinaturas 26.08.2024",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "97d89845-c5c3-415c-8944-67803fbf371e",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "882cef8d-22f9-4af7-8662-1395bd727ab9",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:31.497Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:31.497Z"
  },
  "storage_size": 7257462451,
  "length": 9087,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=882cef8d-22f9-4af7-8662-1395bd727ab9",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/882cef8d-22f9-4af7-8662-1395bd727ab9/playlist.m3u8",
  "width": 1760,
  "height": 900,
  "playable": true,
  "available_resolutions": "360p,480p,720p,1080p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/882cef8d-22f9-4af7-8662-1395bd727ab9/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/882cef8d-22f9-4af7-8662-1395bd727ab9/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "4d57b914-cd4f-46cd-af64-0190f2d143ab"
},
{
  "_id": "69a9f14795cecfce8dd4c98a",
  "id": "e24d4f03-a0d3-438b-986d-324171dedac3",
  "title": "Aula 09 - Tutoria Jornada do Cliente 12.08.2024",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "97d89845-c5c3-415c-8944-67803fbf371e",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "d9e127b4-95a8-4cb6-9bbf-def40a832b73",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:31.542Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:31.542Z"
  },
  "storage_size": 8305590155,
  "length": 8042,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=d9e127b4-95a8-4cb6-9bbf-def40a832b73",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/d9e127b4-95a8-4cb6-9bbf-def40a832b73/playlist.m3u8",
  "width": 1920,
  "height": 1080,
  "playable": true,
  "available_resolutions": "360p,480p,720p,1080p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/d9e127b4-95a8-4cb6-9bbf-def40a832b73/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/d9e127b4-95a8-4cb6-9bbf-def40a832b73/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "e24d4f03-a0d3-438b-986d-324171dedac3"
},
{
  "_id": "69a9f14695cecfce8dd4c98b",
  "id": "cd4536b4-3d00-447d-99e3-8cd4f4c86832",
  "title": "Aula 08 - Tutoria - Tutoria Marketing 22.07.2024",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "97d89845-c5c3-415c-8944-67803fbf371e",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "5d015ce9-d1ef-4e03-8072-2e5748b506cd",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:30.924Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:30.924Z"
  },
  "storage_size": 1213642736,
  "length": 7902,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=5d015ce9-d1ef-4e03-8072-2e5748b506cd",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/5d015ce9-d1ef-4e03-8072-2e5748b506cd/playlist.m3u8",
  "width": 640,
  "height": 360,
  "playable": true,
  "available_resolutions": "360p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/5d015ce9-d1ef-4e03-8072-2e5748b506cd/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/5d015ce9-d1ef-4e03-8072-2e5748b506cd/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "cd4536b4-3d00-447d-99e3-8cd4f4c86832"
},
{
  "_id": "69a9f14695cecfce8dd4c98c",
  "id": "5d0c903d-582d-45c9-90a3-df1f26d29027",
  "title": "Aula 07 - Tutoria Precificação 08.07.2024",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "97d89845-c5c3-415c-8944-67803fbf371e",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "04f148f2-5c6e-448e-a01a-c750807c0c73",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:30.981Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:30.981Z"
  },
  "storage_size": 7474959830,
  "length": 8233,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=04f148f2-5c6e-448e-a01a-c750807c0c73",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/04f148f2-5c6e-448e-a01a-c750807c0c73/playlist.m3u8",
  "width": 1920,
  "height": 1080,
  "playable": true,
  "available_resolutions": "360p,480p,720p,1080p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/04f148f2-5c6e-448e-a01a-c750807c0c73/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/04f148f2-5c6e-448e-a01a-c750807c0c73/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "5d0c903d-582d-45c9-90a3-df1f26d29027"
},
{
  "_id": "69a9f14795cecfce8dd4c98d",
  "id": "6fdf1f9d-7824-45b7-98af-03c9af2a7ee0",
  "title": "Aula 06 - Tutoria - Treinamento de Recepcionistas 24.06.2024",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "97d89845-c5c3-415c-8944-67803fbf371e",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "8aed8510-8cd9-414e-af29-ba5d75fe113b",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:31.031Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:31.031Z"
  },
  "storage_size": 1165905706,
  "length": 7538,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=8aed8510-8cd9-414e-af29-ba5d75fe113b",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/8aed8510-8cd9-414e-af29-ba5d75fe113b/playlist.m3u8",
  "width": 640,
  "height": 360,
  "playable": true,
  "available_resolutions": "360p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/8aed8510-8cd9-414e-af29-ba5d75fe113b/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/8aed8510-8cd9-414e-af29-ba5d75fe113b/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "6fdf1f9d-7824-45b7-98af-03c9af2a7ee0"
},
{
  "_id": "69a9f14795cecfce8dd4c98e",
  "id": "628596da-e321-41e4-af60-2b6e3c5ad672",
  "title": "Aula 05 - Tutoria - Treinamento de Vendas para a equipe 10.06.2024",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "97d89845-c5c3-415c-8944-67803fbf371e",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "c8ec059b-10d4-4937-831d-c31b148218ce",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:31.084Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:31.084Z"
  },
  "storage_size": 3727099079,
  "length": 7303,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=c8ec059b-10d4-4937-831d-c31b148218ce",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/c8ec059b-10d4-4937-831d-c31b148218ce/playlist.m3u8",
  "width": 1920,
  "height": 720,
  "playable": true,
  "available_resolutions": "360p,480p,720p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/c8ec059b-10d4-4937-831d-c31b148218ce/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/c8ec059b-10d4-4937-831d-c31b148218ce/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "628596da-e321-41e4-af60-2b6e3c5ad672"
},
{
  "_id": "69a9f14795cecfce8dd4c98f",
  "id": "46005126-5bb8-447e-9023-81dcfb1d95ff",
  "title": "Aula 04 - Tutoria - Metas 27.05.2024",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "97d89845-c5c3-415c-8944-67803fbf371e",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "743611ea-1d82-4053-8380-4050b6ee5fa3",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:31.132Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:31.132Z"
  },
  "storage_size": 5017817434,
  "length": 5775,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=743611ea-1d82-4053-8380-4050b6ee5fa3",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/743611ea-1d82-4053-8380-4050b6ee5fa3/playlist.m3u8",
  "width": 1760,
  "height": 900,
  "playable": true,
  "available_resolutions": "360p,480p,720p,1080p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/743611ea-1d82-4053-8380-4050b6ee5fa3/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/743611ea-1d82-4053-8380-4050b6ee5fa3/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "46005126-5bb8-447e-9023-81dcfb1d95ff"
},
{
  "_id": "69a9f14795cecfce8dd4c990",
  "id": "bab8bab2-c83f-4410-992a-0b61017eab80",
  "title": "Aula 03- Tutoria - Treinamento de equipe 13.05.2024",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "97d89845-c5c3-415c-8944-67803fbf371e",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "855be787-c74b-4d13-a453-851033940584",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:31.187Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:31.187Z"
  },
  "storage_size": 967832774,
  "length": 5837,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=855be787-c74b-4d13-a453-851033940584",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/855be787-c74b-4d13-a453-851033940584/playlist.m3u8",
  "width": 640,
  "height": 360,
  "playable": true,
  "available_resolutions": "360p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/855be787-c74b-4d13-a453-851033940584/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/855be787-c74b-4d13-a453-851033940584/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "bab8bab2-c83f-4410-992a-0b61017eab80"
},
{
  "_id": "69a9f14795cecfce8dd4c991",
  "id": "fc24b3bc-311b-4b9c-8e45-522173c7b1da",
  "title": "Aula 14 - Cabelo Crespo",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "8365fbf9-4583-4503-985d-fdea1567b383",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "1aa16032-8608-452e-8c94-2a34e6a2f9fa",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:31.241Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:31.241Z"
  },
  "storage_size": 1764709760,
  "length": 442,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=1aa16032-8608-452e-8c94-2a34e6a2f9fa",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/1aa16032-8608-452e-8c94-2a34e6a2f9fa/playlist.m3u8",
  "width": 1920,
  "height": 1080,
  "playable": true,
  "available_resolutions": "360p,480p,720p,1080p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/1aa16032-8608-452e-8c94-2a34e6a2f9fa/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/1aa16032-8608-452e-8c94-2a34e6a2f9fa/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "fc24b3bc-311b-4b9c-8e45-522173c7b1da"
},
{
  "_id": "69a9f14795cecfce8dd4c992",
  "id": "21178b2a-14c0-4eaf-8cd4-02d1ffff61a2",
  "title": "Aula 12 - Recapitulando",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "8365fbf9-4583-4503-985d-fdea1567b383",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "05e83a90-1a01-4f95-a3e2-8be5a6f0e862",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:31.295Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:31.295Z"
  },
  "storage_size": 3664428557,
  "length": 1106,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=05e83a90-1a01-4f95-a3e2-8be5a6f0e862",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/05e83a90-1a01-4f95-a3e2-8be5a6f0e862/playlist.m3u8",
  "width": 1920,
  "height": 1080,
  "playable": true,
  "available_resolutions": "360p,480p,720p,1080p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/05e83a90-1a01-4f95-a3e2-8be5a6f0e862/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/05e83a90-1a01-4f95-a3e2-8be5a6f0e862/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "21178b2a-14c0-4eaf-8cd4-02d1ffff61a2"
},
{
  "_id": "69a9f14795cecfce8dd4c993",
  "id": "eb8e4ec1-2cb0-4f51-8b36-7ac2c4c02f23",
  "title": "Aula 13 - Tratamentos",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "8365fbf9-4583-4503-985d-fdea1567b383",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "56cac8ac-85a7-4c81-a325-6058f7dfc017",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:31.345Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:31.345Z"
  },
  "storage_size": 2202132406,
  "length": 593,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=56cac8ac-85a7-4c81-a325-6058f7dfc017",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/56cac8ac-85a7-4c81-a325-6058f7dfc017/playlist.m3u8",
  "width": 1920,
  "height": 1080,
  "playable": true,
  "available_resolutions": "360p,480p,720p,1080p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/56cac8ac-85a7-4c81-a325-6058f7dfc017/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/56cac8ac-85a7-4c81-a325-6058f7dfc017/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "eb8e4ec1-2cb0-4f51-8b36-7ac2c4c02f23"
},
{
  "_id": "69a9f14795cecfce8dd4c994",
  "id": "fd96fc57-b908-4bda-bfef-73adebb7c7ec",
  "title": "Aula 11 - Babyliss | História do Maurício | Comunicação",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "8365fbf9-4583-4503-985d-fdea1567b383",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "c4509744-e8d4-40f4-a337-84b6aeff48b7",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:31.390Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:31.390Z"
  },
  "storage_size": 8335028374,
  "length": 2263,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=c4509744-e8d4-40f4-a337-84b6aeff48b7",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/c4509744-e8d4-40f4-a337-84b6aeff48b7/playlist.m3u8",
  "width": 1920,
  "height": 1080,
  "playable": true,
  "available_resolutions": "360p,480p,720p,1080p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/c4509744-e8d4-40f4-a337-84b6aeff48b7/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/c4509744-e8d4-40f4-a337-84b6aeff48b7/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "fd96fc57-b908-4bda-bfef-73adebb7c7ec"
},
{
  "_id": "69a9f14795cecfce8dd4c995",
  "id": "a146a8e2-96bb-4c50-86fb-eaa90bed6094",
  "title": "Aula 10 - Escova Modelada",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "8365fbf9-4583-4503-985d-fdea1567b383",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "b370feb8-d964-4919-bf6b-805f0790b7d6",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:31.438Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:31.438Z"
  },
  "storage_size": 10484991670,
  "length": 2665,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=b370feb8-d964-4919-bf6b-805f0790b7d6",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/b370feb8-d964-4919-bf6b-805f0790b7d6/playlist.m3u8",
  "width": 1920,
  "height": 1080,
  "playable": true,
  "available_resolutions": "360p,480p,720p,1080p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/b370feb8-d964-4919-bf6b-805f0790b7d6/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/b370feb8-d964-4919-bf6b-805f0790b7d6/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "a146a8e2-96bb-4c50-86fb-eaa90bed6094"
},
{
  "_id": "69a9f14795cecfce8dd4c996",
  "id": "bf30417d-ee4e-4994-b3f7-f739ed060df3",
  "title": "Aula 09 - Escova",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "8365fbf9-4583-4503-985d-fdea1567b383",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "a3624b24-dd69-43c5-b14f-a5d2f4b582f1",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:31.492Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:31.492Z"
  },
  "storage_size": 4837274402,
  "length": 1239,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=a3624b24-dd69-43c5-b14f-a5d2f4b582f1",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/a3624b24-dd69-43c5-b14f-a5d2f4b582f1/playlist.m3u8",
  "width": 1920,
  "height": 1080,
  "playable": true,
  "available_resolutions": "360p,480p,720p,1080p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/a3624b24-dd69-43c5-b14f-a5d2f4b582f1/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/a3624b24-dd69-43c5-b14f-a5d2f4b582f1/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "bf30417d-ee4e-4994-b3f7-f739ed060df3"
},
{
  "_id": "69a9f14795cecfce8dd4c997",
  "id": "10344c62-4bc6-4fa8-99e3-eb2ffcce9e91",
  "title": "Aula 08 - Secagem",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "8365fbf9-4583-4503-985d-fdea1567b383",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "1cc5b15c-f150-49ba-a9cc-a5b16da60301",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:31.547Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:31.547Z"
  },
  "storage_size": 2950181826,
  "length": 760,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=1cc5b15c-f150-49ba-a9cc-a5b16da60301",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/1cc5b15c-f150-49ba-a9cc-a5b16da60301/playlist.m3u8",
  "width": 1920,
  "height": 1080,
  "playable": true,
  "available_resolutions": "360p,480p,720p,1080p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/1cc5b15c-f150-49ba-a9cc-a5b16da60301/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/1cc5b15c-f150-49ba-a9cc-a5b16da60301/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "10344c62-4bc6-4fa8-99e3-eb2ffcce9e91"
},
{
  "_id": "69a9f14795cecfce8dd4c998",
  "id": "8ebb6066-4fb2-42d0-abde-e8f5cd80bc0e",
  "title": "Aula 07 - Lavatório",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "8365fbf9-4583-4503-985d-fdea1567b383",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "c68ea9af-7234-4474-9f64-010798c5aa77",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:31.602Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:31.602Z"
  },
  "storage_size": 3104084849,
  "length": 824,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=c68ea9af-7234-4474-9f64-010798c5aa77",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/c68ea9af-7234-4474-9f64-010798c5aa77/playlist.m3u8",
  "width": 1920,
  "height": 1080,
  "playable": true,
  "available_resolutions": "360p,480p,720p,1080p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/c68ea9af-7234-4474-9f64-010798c5aa77/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/c68ea9af-7234-4474-9f64-010798c5aa77/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "8ebb6066-4fb2-42d0-abde-e8f5cd80bc0e"
},
{
  "_id": "69a9f14795cecfce8dd4c999",
  "id": "1e5b26e3-4bca-4678-a956-fe4e7d7cec20",
  "title": "Aula 06 - Oferta de Serviços",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "8365fbf9-4583-4503-985d-fdea1567b383",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "18e00468-bb71-425a-a1aa-722c196642b5",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:31.655Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:31.655Z"
  },
  "storage_size": 695454233,
  "length": 201,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=18e00468-bb71-425a-a1aa-722c196642b5",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/18e00468-bb71-425a-a1aa-722c196642b5/playlist.m3u8",
  "width": 1920,
  "height": 1080,
  "playable": true,
  "available_resolutions": "360p,480p,720p,1080p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/18e00468-bb71-425a-a1aa-722c196642b5/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/18e00468-bb71-425a-a1aa-722c196642b5/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "1e5b26e3-4bca-4678-a956-fe4e7d7cec20"
},
{
  "_id": "69a9f14795cecfce8dd4c99a",
  "id": "b021420c-9fd2-42b6-8696-545b0b130be3",
  "title": "Aula 05 - Tempo",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "8365fbf9-4583-4503-985d-fdea1567b383",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "d880dae2-a51a-4a14-a9d0-8ad6716ad093",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:31.702Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:31.702Z"
  },
  "storage_size": 968830143,
  "length": 278,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=d880dae2-a51a-4a14-a9d0-8ad6716ad093",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/d880dae2-a51a-4a14-a9d0-8ad6716ad093/playlist.m3u8",
  "width": 1920,
  "height": 1080,
  "playable": true,
  "available_resolutions": "360p,480p,720p,1080p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/d880dae2-a51a-4a14-a9d0-8ad6716ad093/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/d880dae2-a51a-4a14-a9d0-8ad6716ad093/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "b021420c-9fd2-42b6-8696-545b0b130be3"
},
{
  "_id": "69a9f14795cecfce8dd4c99b",
  "id": "a4cf6f92-2525-42c8-ac22-2e1595bf65ba",
  "title": "Aula 04 - Padronização parte 2",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "8365fbf9-4583-4503-985d-fdea1567b383",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "28cd113c-4746-42c0-9b24-30711192dd5a",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:31.757Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:31.757Z"
  },
  "storage_size": 2073886569,
  "length": 593,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=28cd113c-4746-42c0-9b24-30711192dd5a",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/28cd113c-4746-42c0-9b24-30711192dd5a/playlist.m3u8",
  "width": 1920,
  "height": 1080,
  "playable": true,
  "available_resolutions": "360p,480p,720p,1080p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/28cd113c-4746-42c0-9b24-30711192dd5a/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/28cd113c-4746-42c0-9b24-30711192dd5a/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "a4cf6f92-2525-42c8-ac22-2e1595bf65ba"
},
{
  "_id": "69a9f14795cecfce8dd4c99c",
  "id": "b5b10065-44cf-4a55-bf99-ee1f629004bd",
  "title": "Aula  03 - Padronização",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "8365fbf9-4583-4503-985d-fdea1567b383",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "3b9caa6b-9b2e-4129-bd2e-f7fb183a5e18",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:31.812Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:31.812Z"
  },
  "storage_size": 725520432,
  "length": 200,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=3b9caa6b-9b2e-4129-bd2e-f7fb183a5e18",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/3b9caa6b-9b2e-4129-bd2e-f7fb183a5e18/playlist.m3u8",
  "width": 1920,
  "height": 1080,
  "playable": true,
  "available_resolutions": "360p,480p,720p,1080p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/3b9caa6b-9b2e-4129-bd2e-f7fb183a5e18/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/3b9caa6b-9b2e-4129-bd2e-f7fb183a5e18/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "b5b10065-44cf-4a55-bf99-ee1f629004bd"
},
{
  "_id": "69a9f14795cecfce8dd4c99d",
  "id": "3d1ad8bb-2cb9-40db-86b5-f528e06386c6",
  "title": "Aula 02 - Primeiro contato",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "8365fbf9-4583-4503-985d-fdea1567b383",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "18130510-c8e7-4143-b925-2dce6c28a091",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:31.870Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:31.870Z"
  },
  "storage_size": 1586398832,
  "length": 444,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=18130510-c8e7-4143-b925-2dce6c28a091",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/18130510-c8e7-4143-b925-2dce6c28a091/playlist.m3u8",
  "width": 1920,
  "height": 1080,
  "playable": true,
  "available_resolutions": "360p,480p,720p,1080p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/18130510-c8e7-4143-b925-2dce6c28a091/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/18130510-c8e7-4143-b925-2dce6c28a091/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "3d1ad8bb-2cb9-40db-86b5-f528e06386c6"
},
{
  "_id": "69a9f14795cecfce8dd4c99e",
  "id": "1c4f6b8c-7a01-4329-bb36-9947bc0d4a8e",
  "title": "Aula 01 - Introdução",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "8365fbf9-4583-4503-985d-fdea1567b383",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "52fb901a-417f-413d-b421-4c13ee33429e",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:31.924Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:31.924Z"
  },
  "storage_size": 483362092,
  "length": 433,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=52fb901a-417f-413d-b421-4c13ee33429e",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/52fb901a-417f-413d-b421-4c13ee33429e/playlist.m3u8",
  "width": 1920,
  "height": 1080,
  "playable": true,
  "available_resolutions": "360p,480p,720p,1080p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/52fb901a-417f-413d-b421-4c13ee33429e/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/52fb901a-417f-413d-b421-4c13ee33429e/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "1c4f6b8c-7a01-4329-bb36-9947bc0d4a8e"
},
{
  "_id": "69a9f14795cecfce8dd4c99f",
  "id": "8737e1af-3ea7-405e-8486-3a01a95c0c3a",
  "title": "Aula 02 - Tutoria - Vendas 29.04.2024",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "97d89845-c5c3-415c-8944-67803fbf371e",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "aaaf63da-a657-4f18-9a51-a1e97f973eec",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:31.977Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:31.977Z"
  },
  "storage_size": 896723903,
  "length": 5268,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=aaaf63da-a657-4f18-9a51-a1e97f973eec",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/aaaf63da-a657-4f18-9a51-a1e97f973eec/playlist.m3u8",
  "width": 640,
  "height": 360,
  "playable": true,
  "available_resolutions": "360p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/aaaf63da-a657-4f18-9a51-a1e97f973eec/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/aaaf63da-a657-4f18-9a51-a1e97f973eec/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "8737e1af-3ea7-405e-8486-3a01a95c0c3a"
},
{
  "_id": "69a9f14895cecfce8dd4c9a0",
  "id": "a5381e7b-0471-4dea-8516-f55cabaf3b33",
  "title": "Aula 01 - Tutoria - Recrutamento e seleção de pessoas 15.04.2024",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "97d89845-c5c3-415c-8944-67803fbf371e",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "e8418a73-c418-4111-a466-d9d4c4163db2",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:32.036Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:32.036Z"
  },
  "storage_size": 959584154,
  "length": 5831,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=e8418a73-c418-4111-a466-d9d4c4163db2",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/e8418a73-c418-4111-a466-d9d4c4163db2/playlist.m3u8",
  "width": 640,
  "height": 360,
  "playable": true,
  "available_resolutions": "360p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/e8418a73-c418-4111-a466-d9d4c4163db2/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/e8418a73-c418-4111-a466-d9d4c4163db2/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "a5381e7b-0471-4dea-8516-f55cabaf3b33"
},
{
  "_id": "69a9f14895cecfce8dd4c9a1",
  "id": "9b049507-6cd1-4b6d-add7-95f5658d7c12",
  "title": "live de teste",
  "description": "live-6c697665-eb8b-4417-b880-943effe83272",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": null,
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": "6c697665-eb8b-4417-b880-943effe83272",
  "video_external_id": "8d941e12-f4ff-4f07-b6be-739ed20f20bd",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:32.092Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:32.092Z"
  },
  "storage_size": 5044417,
  "length": 31,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=8d941e12-f4ff-4f07-b6be-739ed20f20bd",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/8d941e12-f4ff-4f07-b6be-739ed20f20bd/playlist.m3u8",
  "width": 1920,
  "height": 1080,
  "playable": true,
  "available_resolutions": "360p,480p,720p,1080p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/8d941e12-f4ff-4f07-b6be-739ed20f20bd/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/8d941e12-f4ff-4f07-b6be-739ed20f20bd/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "9b049507-6cd1-4b6d-add7-95f5658d7c12"
},
{
  "_id": "69a9f14895cecfce8dd4c9a2",
  "id": "fc4fc911-38ee-4fbe-98ad-b410e11a83e9",
  "title": "Live 2024-02-23",
  "description": "live-6c697665-fdf0-448e-b8a3-e4497a701699",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": null,
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": "6c697665-fdf0-448e-b8a3-e4497a701699",
  "video_external_id": "ec111e50-a223-408d-998e-f259df0a60f4",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:32.136Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:32.136Z"
  },
  "storage_size": 1772454,
  "length": 26,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=ec111e50-a223-408d-998e-f259df0a60f4",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/ec111e50-a223-408d-998e-f259df0a60f4/playlist.m3u8",
  "width": 128,
  "height": 240,
  "playable": true,
  "available_resolutions": "240p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/ec111e50-a223-408d-998e-f259df0a60f4/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/ec111e50-a223-408d-998e-f259df0a60f4/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "fc4fc911-38ee-4fbe-98ad-b410e11a83e9"
},
{
  "_id": "69a9f14895cecfce8dd4c9a3",
  "id": "61015ee6-f548-406c-9fdb-d2d21a1146a0",
  "title": "papel da recepcao.mp4",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "c76313ef-d558-4157-8aff-1f4d26b2a035",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "2271b1df-efa3-4038-8da3-1a71b0039d33",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:32.191Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:32.191Z"
  },
  "storage_size": 1349536531,
  "length": 391,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=2271b1df-efa3-4038-8da3-1a71b0039d33",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/2271b1df-efa3-4038-8da3-1a71b0039d33/playlist.m3u8",
  "width": 1920,
  "height": 1080,
  "playable": true,
  "available_resolutions": "360p,480p,720p,1080p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/2271b1df-efa3-4038-8da3-1a71b0039d33/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/2271b1df-efa3-4038-8da3-1a71b0039d33/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "61015ee6-f548-406c-9fdb-d2d21a1146a0"
},
{
  "_id": "69a9f14895cecfce8dd4c9a4",
  "id": "3df3cc56-1301-4671-9cf0-e72b0457c15f",
  "title": "modelos de comicionamento.mp4",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "c76313ef-d558-4157-8aff-1f4d26b2a035",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "473560ba-fd1e-4fb2-aeae-4af663710a32",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:32.245Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:32.245Z"
  },
  "storage_size": 1451212319,
  "length": 416,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=473560ba-fd1e-4fb2-aeae-4af663710a32",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/473560ba-fd1e-4fb2-aeae-4af663710a32/playlist.m3u8",
  "width": 1920,
  "height": 1080,
  "playable": true,
  "available_resolutions": "360p,480p,720p,1080p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/473560ba-fd1e-4fb2-aeae-4af663710a32/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/473560ba-fd1e-4fb2-aeae-4af663710a32/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "3df3cc56-1301-4671-9cf0-e72b0457c15f"
},
{
  "_id": "69a9f14895cecfce8dd4c9a5",
  "id": "0b347dcb-8f0d-4840-a922-0c9e75ec6f57",
  "title": "modelo de contraato.mp4",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "c76313ef-d558-4157-8aff-1f4d26b2a035",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "b3b46edf-5fac-42fa-b366-9615f623f102",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:32.295Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:32.295Z"
  },
  "storage_size": 1684394952,
  "length": 538,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=b3b46edf-5fac-42fa-b366-9615f623f102",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/b3b46edf-5fac-42fa-b366-9615f623f102/playlist.m3u8",
  "width": 1920,
  "height": 1080,
  "playable": true,
  "available_resolutions": "360p,480p,720p,1080p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/b3b46edf-5fac-42fa-b366-9615f623f102/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/b3b46edf-5fac-42fa-b366-9615f623f102/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "0b347dcb-8f0d-4840-a922-0c9e75ec6f57"
},
{
  "_id": "69a9f14895cecfce8dd4c9a6",
  "id": "7b8afc24-77f1-481a-9398-da4c37b227d5",
  "title": "marketing-.mp4",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "c76313ef-d558-4157-8aff-1f4d26b2a035",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "ee089acc-4ffd-4e03-89d9-883b7351e205",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:32.346Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:32.346Z"
  },
  "storage_size": 843425679,
  "length": 304,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=ee089acc-4ffd-4e03-89d9-883b7351e205",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/ee089acc-4ffd-4e03-89d9-883b7351e205/playlist.m3u8",
  "width": 1920,
  "height": 1080,
  "playable": true,
  "available_resolutions": "360p,480p,720p,1080p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/ee089acc-4ffd-4e03-89d9-883b7351e205/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/ee089acc-4ffd-4e03-89d9-883b7351e205/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "7b8afc24-77f1-481a-9398-da4c37b227d5"
},
{
  "_id": "69a9f14895cecfce8dd4c9a7",
  "id": "2108c0ff-41b8-48f6-932a-44315d7398a4",
  "title": "marketing digital-.mp4",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "c76313ef-d558-4157-8aff-1f4d26b2a035",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "b793fa9e-5476-4248-9ca0-078cfbe57bce",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:32.400Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:32.400Z"
  },
  "storage_size": 690368585,
  "length": 536,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=b793fa9e-5476-4248-9ca0-078cfbe57bce",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/b793fa9e-5476-4248-9ca0-078cfbe57bce/playlist.m3u8",
  "width": 1920,
  "height": 1080,
  "playable": true,
  "available_resolutions": "360p,480p,720p,1080p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/b793fa9e-5476-4248-9ca0-078cfbe57bce/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/b793fa9e-5476-4248-9ca0-078cfbe57bce/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "2108c0ff-41b8-48f6-932a-44315d7398a4"
},
{
  "_id": "69a9f14895cecfce8dd4c9a8",
  "id": "c2500736-e6d9-4df7-9976-37e3f8ec2fae",
  "title": "limpeza e organizacao da empresa-_1.mp4",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "c76313ef-d558-4157-8aff-1f4d26b2a035",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "97a1c30b-5842-4a26-ae4c-398691d554ae",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:32.453Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:32.453Z"
  },
  "storage_size": 786152912,
  "length": 260,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=97a1c30b-5842-4a26-ae4c-398691d554ae",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/97a1c30b-5842-4a26-ae4c-398691d554ae/playlist.m3u8",
  "width": 1920,
  "height": 1080,
  "playable": true,
  "available_resolutions": "360p,480p,720p,1080p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/97a1c30b-5842-4a26-ae4c-398691d554ae/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/97a1c30b-5842-4a26-ae4c-398691d554ae/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "c2500736-e6d9-4df7-9976-37e3f8ec2fae"
},
{
  "_id": "69a9f14895cecfce8dd4c9a9",
  "id": "e42b58d0-c5a6-43db-b8ee-a6a4a9f1f3e6",
  "title": "gestao de pessoas -.mp4",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "c76313ef-d558-4157-8aff-1f4d26b2a035",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "d55589af-06de-4f33-900d-56c02ccbdc86",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:32.504Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:32.504Z"
  },
  "storage_size": 2170393156,
  "length": 897,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=d55589af-06de-4f33-900d-56c02ccbdc86",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/d55589af-06de-4f33-900d-56c02ccbdc86/playlist.m3u8",
  "width": 1920,
  "height": 1080,
  "playable": true,
  "available_resolutions": "360p,480p,720p,1080p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/d55589af-06de-4f33-900d-56c02ccbdc86/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/d55589af-06de-4f33-900d-56c02ccbdc86/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "e42b58d0-c5a6-43db-b8ee-a6a4a9f1f3e6"
},
{
  "_id": "69a9f14895cecfce8dd4c9aa",
  "id": "d47148c1-94a4-4b5e-9a63-9f07c02e7ac2",
  "title": "indicadores de desempenho dos profissionais no salao.mp4",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "c76313ef-d558-4157-8aff-1f4d26b2a035",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "e27951d3-1031-4057-8767-f6349f4e6788",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:32.558Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:32.558Z"
  },
  "storage_size": 672322173,
  "length": 393,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=e27951d3-1031-4057-8767-f6349f4e6788",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/e27951d3-1031-4057-8767-f6349f4e6788/playlist.m3u8",
  "width": 1920,
  "height": 1080,
  "playable": true,
  "available_resolutions": "360p,480p,720p,1080p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/e27951d3-1031-4057-8767-f6349f4e6788/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/e27951d3-1031-4057-8767-f6349f4e6788/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "d47148c1-94a4-4b5e-9a63-9f07c02e7ac2"
},
{
  "_id": "69a9f14895cecfce8dd4c9ab",
  "id": "8a0d0805-2476-4a7f-9bde-db1191185c02",
  "title": "etapas da venda-_1.mp4",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "c76313ef-d558-4157-8aff-1f4d26b2a035",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "95bc62de-bffe-48a3-beb8-49e1b0a749cc",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:32.609Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:32.609Z"
  },
  "storage_size": 2043242698,
  "length": 644,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=95bc62de-bffe-48a3-beb8-49e1b0a749cc",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/95bc62de-bffe-48a3-beb8-49e1b0a749cc/playlist.m3u8",
  "width": 1920,
  "height": 1080,
  "playable": true,
  "available_resolutions": "360p,480p,720p,1080p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/95bc62de-bffe-48a3-beb8-49e1b0a749cc/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/95bc62de-bffe-48a3-beb8-49e1b0a749cc/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "8a0d0805-2476-4a7f-9bde-db1191185c02"
},
{
  "_id": "69a9f14895cecfce8dd4c9ac",
  "id": "0a699ac4-48f3-4f85-a5a5-f201bb48a6ab",
  "title": "etapas da venda-.mp4",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "c76313ef-d558-4157-8aff-1f4d26b2a035",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "aaaeb48b-db26-472e-9d53-273ec4c91a9b",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:32.663Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:32.663Z"
  },
  "storage_size": 731972038,
  "length": 231,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=aaaeb48b-db26-472e-9d53-273ec4c91a9b",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/aaaeb48b-db26-472e-9d53-273ec4c91a9b/playlist.m3u8",
  "width": 1920,
  "height": 1080,
  "playable": true,
  "available_resolutions": "360p,480p,720p,1080p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/aaaeb48b-db26-472e-9d53-273ec4c91a9b/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/aaaeb48b-db26-472e-9d53-273ec4c91a9b/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "0a699ac4-48f3-4f85-a5a5-f201bb48a6ab"
},
{
  "_id": "69a9f14895cecfce8dd4c9ad",
  "id": "65ab0d38-6bed-4efc-83a5-98d74d81fbb8",
  "title": "lideranca -.mp4",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "c76313ef-d558-4157-8aff-1f4d26b2a035",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "d9d1863e-7a0c-4be9-891a-c5921763ccad",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:32.710Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:32.710Z"
  },
  "storage_size": 1786557838,
  "length": 569,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=d9d1863e-7a0c-4be9-891a-c5921763ccad",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/d9d1863e-7a0c-4be9-891a-c5921763ccad/playlist.m3u8",
  "width": 1920,
  "height": 1080,
  "playable": true,
  "available_resolutions": "360p,480p,720p,1080p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/d9d1863e-7a0c-4be9-891a-c5921763ccad/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/d9d1863e-7a0c-4be9-891a-c5921763ccad/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "65ab0d38-6bed-4efc-83a5-98d74d81fbb8"
},
{
  "_id": "69a9f14895cecfce8dd4c9ae",
  "id": "6048cdba-1983-4f80-890a-edcdaf95ebd6",
  "title": "limpeza e organizacao da empresa-.mp4",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "c76313ef-d558-4157-8aff-1f4d26b2a035",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "d8b7b9a3-bf1f-4e16-8714-531a360535a3",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:32.752Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:32.752Z"
  },
  "storage_size": 786132268,
  "length": 260,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=d8b7b9a3-bf1f-4e16-8714-531a360535a3",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/d8b7b9a3-bf1f-4e16-8714-531a360535a3/playlist.m3u8",
  "width": 1920,
  "height": 1080,
  "playable": true,
  "available_resolutions": "360p,480p,720p,1080p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/d8b7b9a3-bf1f-4e16-8714-531a360535a3/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/d8b7b9a3-bf1f-4e16-8714-531a360535a3/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "6048cdba-1983-4f80-890a-edcdaf95ebd6"
},
{
  "_id": "69a9f14895cecfce8dd4c9af",
  "id": "7fc12fe7-3da0-4080-87f5-95d83a214866",
  "title": "jornada do cliente -.mp4",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "c76313ef-d558-4157-8aff-1f4d26b2a035",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "ca1a423e-8bd8-4c24-8785-6962a2f51214",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:32.804Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:32.804Z"
  },
  "storage_size": 1321551542,
  "length": 602,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=ca1a423e-8bd8-4c24-8785-6962a2f51214",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/ca1a423e-8bd8-4c24-8785-6962a2f51214/playlist.m3u8",
  "width": 1920,
  "height": 1080,
  "playable": true,
  "available_resolutions": "360p,480p,720p,1080p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/ca1a423e-8bd8-4c24-8785-6962a2f51214/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/ca1a423e-8bd8-4c24-8785-6962a2f51214/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "7fc12fe7-3da0-4080-87f5-95d83a214866"
},
{
  "_id": "69a9f14895cecfce8dd4c9b0",
  "id": "7de7173e-731e-42b3-ba49-c981a9074343",
  "title": "estrategias para o aumento de faturamento.mp4",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "c76313ef-d558-4157-8aff-1f4d26b2a035",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "b3789b18-8e61-4414-b9c3-c3d0fc793037",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:32.854Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:32.854Z"
  },
  "storage_size": 790561702,
  "length": 534,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=b3789b18-8e61-4414-b9c3-c3d0fc793037",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/b3789b18-8e61-4414-b9c3-c3d0fc793037/playlist.m3u8",
  "width": 1920,
  "height": 1080,
  "playable": true,
  "available_resolutions": "360p,480p,720p,1080p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/b3789b18-8e61-4414-b9c3-c3d0fc793037/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/b3789b18-8e61-4414-b9c3-c3d0fc793037/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "7de7173e-731e-42b3-ba49-c981a9074343"
},
{
  "_id": "69a9f14895cecfce8dd4c9b1",
  "id": "03ad608e-2cd4-4db4-bf72-f8aa1acf0423",
  "title": "controle de estoque-.mp4",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "c76313ef-d558-4157-8aff-1f4d26b2a035",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "61b88336-e132-4ee4-a4fa-104c67d88e53",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:32.898Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:32.898Z"
  },
  "storage_size": 1116763093,
  "length": 357,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=61b88336-e132-4ee4-a4fa-104c67d88e53",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/61b88336-e132-4ee4-a4fa-104c67d88e53/playlist.m3u8",
  "width": 1920,
  "height": 1080,
  "playable": true,
  "available_resolutions": "360p,480p,720p,1080p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/61b88336-e132-4ee4-a4fa-104c67d88e53/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/61b88336-e132-4ee4-a4fa-104c67d88e53/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "03ad608e-2cd4-4db4-bf72-f8aa1acf0423"
},
{
  "_id": "69a9f14895cecfce8dd4c9b2",
  "id": "5597d849-7250-40a9-868f-77f2872b83ca",
  "title": "como gerir conflitos -.mp4",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "c76313ef-d558-4157-8aff-1f4d26b2a035",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "cbc8ffaa-c81f-4c0f-8d78-062cbccef1c3",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:32.951Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:32.951Z"
  },
  "storage_size": 937792061,
  "length": 324,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=cbc8ffaa-c81f-4c0f-8d78-062cbccef1c3",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/cbc8ffaa-c81f-4c0f-8d78-062cbccef1c3/playlist.m3u8",
  "width": 1920,
  "height": 1080,
  "playable": true,
  "available_resolutions": "360p,480p,720p,1080p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/cbc8ffaa-c81f-4c0f-8d78-062cbccef1c3/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/cbc8ffaa-c81f-4c0f-8d78-062cbccef1c3/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "5597d849-7250-40a9-868f-77f2872b83ca"
},
{
  "_id": "69a9f14995cecfce8dd4c9b3",
  "id": "188f7e95-3f3a-4625-ad47-25e1f171418d",
  "title": "como demitir um funcionario -.mp4",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "c76313ef-d558-4157-8aff-1f4d26b2a035",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "8d33fe30-0190-4242-bd06-aea03e67575c",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:33.006Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:33.006Z"
  },
  "storage_size": 884034292,
  "length": 298,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=8d33fe30-0190-4242-bd06-aea03e67575c",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/8d33fe30-0190-4242-bd06-aea03e67575c/playlist.m3u8",
  "width": 1920,
  "height": 1080,
  "playable": true,
  "available_resolutions": "360p,480p,720p,1080p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/8d33fe30-0190-4242-bd06-aea03e67575c/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/8d33fe30-0190-4242-bd06-aea03e67575c/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "188f7e95-3f3a-4625-ad47-25e1f171418d"
},
{
  "_id": "69a9f14995cecfce8dd4c9b4",
  "id": "79e7a71c-89ac-4cd3-a09f-674854155a0f",
  "title": "captaçao de clientes-.mp4",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "c76313ef-d558-4157-8aff-1f4d26b2a035",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "ac9b7653-cb1e-40a0-a0dd-1bab13b4ca1a",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:33.059Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:33.059Z"
  },
  "storage_size": 927661312,
  "length": 334,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=ac9b7653-cb1e-40a0-a0dd-1bab13b4ca1a",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/ac9b7653-cb1e-40a0-a0dd-1bab13b4ca1a/playlist.m3u8",
  "width": 1920,
  "height": 1080,
  "playable": true,
  "available_resolutions": "360p,480p,720p,1080p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/ac9b7653-cb1e-40a0-a0dd-1bab13b4ca1a/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/ac9b7653-cb1e-40a0-a0dd-1bab13b4ca1a/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "79e7a71c-89ac-4cd3-a09f-674854155a0f"
},
{
  "_id": "69a9f14995cecfce8dd4c9b5",
  "id": "23aadee6-4e78-471e-9d50-14e3dd78d0e5",
  "title": "capital de giro.mp4",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "c76313ef-d558-4157-8aff-1f4d26b2a035",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "1fb30011-3dbb-49cc-aa3a-02d219c9587e",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:33.110Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:33.110Z"
  },
  "storage_size": 1344938816,
  "length": 387,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=1fb30011-3dbb-49cc-aa3a-02d219c9587e",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/1fb30011-3dbb-49cc-aa3a-02d219c9587e/playlist.m3u8",
  "width": 1920,
  "height": 1080,
  "playable": true,
  "available_resolutions": "360p,480p,720p,1080p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/1fb30011-3dbb-49cc-aa3a-02d219c9587e/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/1fb30011-3dbb-49cc-aa3a-02d219c9587e/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "23aadee6-4e78-471e-9d50-14e3dd78d0e5"
},
{
  "_id": "69a9f14995cecfce8dd4c9b6",
  "id": "7c82ed66-e4c7-4bc0-937d-b53fc194be92",
  "title": "aumento de ticket -.mp4",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "c76313ef-d558-4157-8aff-1f4d26b2a035",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "c9013cd5-9690-4620-9f9a-67cba621d2b5",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:33.163Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:33.163Z"
  },
  "storage_size": 852075390,
  "length": 310,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=c9013cd5-9690-4620-9f9a-67cba621d2b5",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/c9013cd5-9690-4620-9f9a-67cba621d2b5/playlist.m3u8",
  "width": 1920,
  "height": 1080,
  "playable": true,
  "available_resolutions": "360p,480p,720p,1080p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/c9013cd5-9690-4620-9f9a-67cba621d2b5/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/c9013cd5-9690-4620-9f9a-67cba621d2b5/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "7c82ed66-e4c7-4bc0-937d-b53fc194be92"
},
{
  "_id": "69a9f14995cecfce8dd4c9b7",
  "id": "10a961a8-8825-46ba-a8b9-ca0eed778adf",
  "title": "aula 01 gestao de fluxo de caixa.mp4",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "c76313ef-d558-4157-8aff-1f4d26b2a035",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "1dd4c488-49dd-4c02-8ae0-941ca9de47df",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:33.206Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:33.206Z"
  },
  "storage_size": 1498335005,
  "length": 443,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=1dd4c488-49dd-4c02-8ae0-941ca9de47df",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/1dd4c488-49dd-4c02-8ae0-941ca9de47df/playlist.m3u8",
  "width": 1920,
  "height": 1080,
  "playable": true,
  "available_resolutions": "360p,480p,720p,1080p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/1dd4c488-49dd-4c02-8ae0-941ca9de47df/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/1dd4c488-49dd-4c02-8ae0-941ca9de47df/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "10a961a8-8825-46ba-a8b9-ca0eed778adf"
},
{
  "_id": "69a9f14995cecfce8dd4c9b8",
  "id": "54e6298a-9b6b-4593-adbf-b31bb6250ec0",
  "title": "aula 03 custos variaveis.mp4",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "c76313ef-d558-4157-8aff-1f4d26b2a035",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "27df77e9-6289-4829-862b-b8394b9f6307",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:33.253Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:33.253Z"
  },
  "storage_size": 1398813752,
  "length": 495,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=27df77e9-6289-4829-862b-b8394b9f6307",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/27df77e9-6289-4829-862b-b8394b9f6307/playlist.m3u8",
  "width": 1920,
  "height": 1080,
  "playable": true,
  "available_resolutions": "360p,480p,720p,1080p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/27df77e9-6289-4829-862b-b8394b9f6307/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/27df77e9-6289-4829-862b-b8394b9f6307/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "54e6298a-9b6b-4593-adbf-b31bb6250ec0"
},
{
  "_id": "69a9f14995cecfce8dd4c9b9",
  "id": "356555c8-3e8f-4944-a2f0-0600f37a8370",
  "title": "Prepare-se para decolar (Intro 5).mp4",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "f3b55040-0892-430c-a396-941ef732324a",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "e4454479-d156-4d1c-834e-ffb432f99ffc",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:33.303Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:33.303Z"
  },
  "storage_size": 88477332,
  "length": 160,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=e4454479-d156-4d1c-834e-ffb432f99ffc",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/e4454479-d156-4d1c-834e-ffb432f99ffc/playlist.m3u8",
  "width": 1280,
  "height": 720,
  "playable": true,
  "available_resolutions": "360p,480p,720p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/e4454479-d156-4d1c-834e-ffb432f99ffc/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/e4454479-d156-4d1c-834e-ffb432f99ffc/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "356555c8-3e8f-4944-a2f0-0600f37a8370"
},
{
  "_id": "69a9f14995cecfce8dd4c9ba",
  "id": "abe4d197-0452-4a27-915e-3cdc57d6a40a",
  "title": "Seja bem-vindo (Intro 1).mp4",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "f3b55040-0892-430c-a396-941ef732324a",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "a85eec2b-fa1e-4d52-a7c7-a5106eeed9ce",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:33.356Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:33.356Z"
  },
  "storage_size": 46335016,
  "length": 87,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=a85eec2b-fa1e-4d52-a7c7-a5106eeed9ce",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/a85eec2b-fa1e-4d52-a7c7-a5106eeed9ce/playlist.m3u8",
  "width": 1280,
  "height": 720,
  "playable": true,
  "available_resolutions": "360p,480p,720p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/a85eec2b-fa1e-4d52-a7c7-a5106eeed9ce/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/a85eec2b-fa1e-4d52-a7c7-a5106eeed9ce/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "abe4d197-0452-4a27-915e-3cdc57d6a40a"
},
{
  "_id": "69a9f14995cecfce8dd4c9bb",
  "id": "ca237aef-4577-43b0-a8ea-171bfa9637ad",
  "title": "Passo a passo do aprendizado",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "f3b55040-0892-430c-a396-941ef732324a",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "703db9fa-46cf-4cfe-8b54-e89362dc8f64",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:33.408Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:33.408Z"
  },
  "storage_size": 73195299,
  "length": 134,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=703db9fa-46cf-4cfe-8b54-e89362dc8f64",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/703db9fa-46cf-4cfe-8b54-e89362dc8f64/playlist.m3u8",
  "width": 1280,
  "height": 720,
  "playable": true,
  "available_resolutions": "360p,480p,720p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/703db9fa-46cf-4cfe-8b54-e89362dc8f64/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/703db9fa-46cf-4cfe-8b54-e89362dc8f64/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "ca237aef-4577-43b0-a8ea-171bfa9637ad"
},
{
  "_id": "69a9f14995cecfce8dd4c9bc",
  "id": "53d29bee-1207-49fb-bac4-a3fa52d278ce",
  "title": "O que você irá aprender neste curso?",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "f3b55040-0892-430c-a396-941ef732324a",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "c3457c69-5876-4bee-a2ab-56b1c8a94da0",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:33.461Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:33.461Z"
  },
  "storage_size": 167249278,
  "length": 308,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=c3457c69-5876-4bee-a2ab-56b1c8a94da0",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/c3457c69-5876-4bee-a2ab-56b1c8a94da0/playlist.m3u8",
  "width": 1280,
  "height": 720,
  "playable": true,
  "available_resolutions": "360p,480p,720p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/c3457c69-5876-4bee-a2ab-56b1c8a94da0/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/c3457c69-5876-4bee-a2ab-56b1c8a94da0/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "53d29bee-1207-49fb-bac4-a3fa52d278ce"
},
{
  "_id": "69a9f14995cecfce8dd4c9bd",
  "id": "7efc017e-f9bd-43a6-99a5-294f599cabd6",
  "title": "Conheça seu Professor (Intro 4).mp4",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "f3b55040-0892-430c-a396-941ef732324a",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "1004efe8-fc46-4a23-9ae2-cee4c255eef7",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:33.512Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:33.512Z"
  },
  "storage_size": 60871403,
  "length": 114,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=1004efe8-fc46-4a23-9ae2-cee4c255eef7",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/1004efe8-fc46-4a23-9ae2-cee4c255eef7/playlist.m3u8",
  "width": 1280,
  "height": 720,
  "playable": true,
  "available_resolutions": "360p,480p,720p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/1004efe8-fc46-4a23-9ae2-cee4c255eef7/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/1004efe8-fc46-4a23-9ae2-cee4c255eef7/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "7efc017e-f9bd-43a6-99a5-294f599cabd6"
},
{
  "_id": "69a9f14995cecfce8dd4c9be",
  "id": "8b70dda4-dc3d-4f58-83bf-333d85ce5565",
  "title": "04 jornada financeira -.mp4",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "c76313ef-d558-4157-8aff-1f4d26b2a035",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "1097a0d8-c939-441d-9639-e73d48f05b35",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:33.564Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:33.564Z"
  },
  "storage_size": 1660548370,
  "length": 475,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=1097a0d8-c939-441d-9639-e73d48f05b35",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/1097a0d8-c939-441d-9639-e73d48f05b35/playlist.m3u8",
  "width": 1920,
  "height": 1080,
  "playable": true,
  "available_resolutions": "360p,480p,720p,1080p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/1097a0d8-c939-441d-9639-e73d48f05b35/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/1097a0d8-c939-441d-9639-e73d48f05b35/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "8b70dda4-dc3d-4f58-83bf-333d85ce5565"
},
{
  "_id": "69a9f14995cecfce8dd4c9bf",
  "id": "e7995d40-823a-44ed-8703-c599134a468b",
  "title": "2 aula custo fixo x variavel.mp4",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "c76313ef-d558-4157-8aff-1f4d26b2a035",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "a6b63757-627e-434a-a643-4a9525ed6261",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:33.614Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:33.614Z"
  },
  "storage_size": 1637305775,
  "length": 601,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=a6b63757-627e-434a-a643-4a9525ed6261",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/a6b63757-627e-434a-a643-4a9525ed6261/playlist.m3u8",
  "width": 1920,
  "height": 1080,
  "playable": true,
  "available_resolutions": "360p,480p,720p,1080p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/a6b63757-627e-434a-a643-4a9525ed6261/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/a6b63757-627e-434a-a643-4a9525ed6261/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "e7995d40-823a-44ed-8703-c599134a468b"
},
{
  "_id": "69a9f14995cecfce8dd4c9c0",
  "id": "a00296a4-5a08-4ae0-b849-ccd8d80fa189",
  "title": "Aula 32 - Planejamento Anual",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "f3b55040-0892-430c-a396-941ef732324a",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "efe1bc94-c500-4f95-b4e5-c046338ed846",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:33.658Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:33.658Z"
  },
  "storage_size": 287443423,
  "length": 507,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=efe1bc94-c500-4f95-b4e5-c046338ed846",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/efe1bc94-c500-4f95-b4e5-c046338ed846/playlist.m3u8",
  "width": 1280,
  "height": 720,
  "playable": true,
  "available_resolutions": "360p,480p,720p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/efe1bc94-c500-4f95-b4e5-c046338ed846/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/efe1bc94-c500-4f95-b4e5-c046338ed846/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "a00296a4-5a08-4ae0-b849-ccd8d80fa189"
},
{
  "_id": "69a9f14995cecfce8dd4c9c1",
  "id": "308f47ff-805e-486c-abd5-d302ed055b23",
  "title": "Aula 31 - Treinamento de Equipe",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "f3b55040-0892-430c-a396-941ef732324a",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "63b2135a-e866-46a8-a707-dbb545ea40d5",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:33.701Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:33.701Z"
  },
  "storage_size": 182505728,
  "length": 332,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=63b2135a-e866-46a8-a707-dbb545ea40d5",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/63b2135a-e866-46a8-a707-dbb545ea40d5/playlist.m3u8",
  "width": 1280,
  "height": 720,
  "playable": true,
  "available_resolutions": "360p,480p,720p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/63b2135a-e866-46a8-a707-dbb545ea40d5/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/63b2135a-e866-46a8-a707-dbb545ea40d5/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "308f47ff-805e-486c-abd5-d302ed055b23"
},
{
  "_id": "69a9f14995cecfce8dd4c9c2",
  "id": "1cfc7d8c-8d17-4c4f-848b-1288c809a911",
  "title": "Aula 30 - Reuniões de Equipe",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "f3b55040-0892-430c-a396-941ef732324a",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "5c878213-bb2b-41d4-97a8-c67615f8fd52",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:33.744Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:33.744Z"
  },
  "storage_size": 322860479,
  "length": 577,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=5c878213-bb2b-41d4-97a8-c67615f8fd52",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/5c878213-bb2b-41d4-97a8-c67615f8fd52/playlist.m3u8",
  "width": 1280,
  "height": 720,
  "playable": true,
  "available_resolutions": "360p,480p,720p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/5c878213-bb2b-41d4-97a8-c67615f8fd52/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/5c878213-bb2b-41d4-97a8-c67615f8fd52/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "1cfc7d8c-8d17-4c4f-848b-1288c809a911"
},
{
  "_id": "69a9f14995cecfce8dd4c9c3",
  "id": "13c1913e-480d-42df-b143-f4d89e1bf345",
  "title": "Aula 29 - Recepção Ativa e Passiva",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "f3b55040-0892-430c-a396-941ef732324a",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "cbe2a320-267b-4012-ad4d-4998e03004e7",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:33.785Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:33.785Z"
  },
  "storage_size": 304065984,
  "length": 568,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=cbe2a320-267b-4012-ad4d-4998e03004e7",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/cbe2a320-267b-4012-ad4d-4998e03004e7/playlist.m3u8",
  "width": 1280,
  "height": 720,
  "playable": true,
  "available_resolutions": "360p,480p,720p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/cbe2a320-267b-4012-ad4d-4998e03004e7/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/cbe2a320-267b-4012-ad4d-4998e03004e7/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "13c1913e-480d-42df-b143-f4d89e1bf345"
},
{
  "_id": "69a9f14995cecfce8dd4c9c4",
  "id": "62c8283b-786a-47c6-9301-0f5d172bd974",
  "title": "Aula 28 - Indicadores de Desempenho",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "f3b55040-0892-430c-a396-941ef732324a",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "2d9753cb-48f1-4ead-b8ff-7287c9bfd1ab",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:33.827Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:33.827Z"
  },
  "storage_size": 290964582,
  "length": 536,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=2d9753cb-48f1-4ead-b8ff-7287c9bfd1ab",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/2d9753cb-48f1-4ead-b8ff-7287c9bfd1ab/playlist.m3u8",
  "width": 1280,
  "height": 720,
  "playable": true,
  "available_resolutions": "360p,480p,720p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/2d9753cb-48f1-4ead-b8ff-7287c9bfd1ab/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/2d9753cb-48f1-4ead-b8ff-7287c9bfd1ab/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "62c8283b-786a-47c6-9301-0f5d172bd974"
},
{
  "_id": "69a9f14995cecfce8dd4c9c5",
  "id": "56456ccc-781b-4fce-a362-43586c40441f",
  "title": "Aula 27 - Metas",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "f3b55040-0892-430c-a396-941ef732324a",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "407db4ac-0105-475e-bbbc-ae34961aea6e",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:33.880Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:33.880Z"
  },
  "storage_size": 352006472,
  "length": 721,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=407db4ac-0105-475e-bbbc-ae34961aea6e",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/407db4ac-0105-475e-bbbc-ae34961aea6e/playlist.m3u8",
  "width": 1280,
  "height": 720,
  "playable": true,
  "available_resolutions": "360p,480p,720p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/407db4ac-0105-475e-bbbc-ae34961aea6e/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/407db4ac-0105-475e-bbbc-ae34961aea6e/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "56456ccc-781b-4fce-a362-43586c40441f"
},
{
  "_id": "69a9f14995cecfce8dd4c9c6",
  "id": "1beaac42-a22b-4d05-a7b9-838a7d7e056b",
  "title": "Aula 26 - Técnicas de Vendas (Parte 3)",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "f3b55040-0892-430c-a396-941ef732324a",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "9436bd59-e8f7-483c-92b8-ef724dab63d0",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:33.922Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:33.922Z"
  },
  "storage_size": 230189296,
  "length": 364,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=9436bd59-e8f7-483c-92b8-ef724dab63d0",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/9436bd59-e8f7-483c-92b8-ef724dab63d0/playlist.m3u8",
  "width": 1280,
  "height": 720,
  "playable": true,
  "available_resolutions": "360p,480p,720p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/9436bd59-e8f7-483c-92b8-ef724dab63d0/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/9436bd59-e8f7-483c-92b8-ef724dab63d0/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "1beaac42-a22b-4d05-a7b9-838a7d7e056b"
},
{
  "_id": "69a9f14995cecfce8dd4c9c7",
  "id": "022b0a7f-e236-4cc5-a17f-182da9a81b31",
  "title": "Aula 25 - Técnicas de Vendas (Parte 2)",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "f3b55040-0892-430c-a396-941ef732324a",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "590d2478-44bf-4186-b07b-1ea52ec72079",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:33.973Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:33.973Z"
  },
  "storage_size": 364424358,
  "length": 1076,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=590d2478-44bf-4186-b07b-1ea52ec72079",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/590d2478-44bf-4186-b07b-1ea52ec72079/playlist.m3u8",
  "width": 1280,
  "height": 720,
  "playable": true,
  "available_resolutions": "360p,480p,720p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/590d2478-44bf-4186-b07b-1ea52ec72079/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/590d2478-44bf-4186-b07b-1ea52ec72079/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "022b0a7f-e236-4cc5-a17f-182da9a81b31"
},
{
  "_id": "69a9f14a95cecfce8dd4c9c8",
  "id": "f903b9c2-4b4b-4833-bf66-4268c9711402",
  "title": "Aula 24 - Técnica de vendas (Parte 1)",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "f3b55040-0892-430c-a396-941ef732324a",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "ff548881-55aa-4c91-9692-6ffc729fc6bc",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:34.015Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:34.015Z"
  },
  "storage_size": 394093878,
  "length": 662,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=ff548881-55aa-4c91-9692-6ffc729fc6bc",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/ff548881-55aa-4c91-9692-6ffc729fc6bc/playlist.m3u8",
  "width": 1280,
  "height": 720,
  "playable": true,
  "available_resolutions": "360p,480p,720p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/ff548881-55aa-4c91-9692-6ffc729fc6bc/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/ff548881-55aa-4c91-9692-6ffc729fc6bc/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "f903b9c2-4b4b-4833-bf66-4268c9711402"
},
{
  "_id": "69a9f14a95cecfce8dd4c9c9",
  "id": "573cdc65-ced4-4281-8ac3-992a1c7503ca",
  "title": "Aula 23 - Marketing (Parte 3)",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "f3b55040-0892-430c-a396-941ef732324a",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "30483bea-00a5-45a3-a507-157e4669442b",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:34.061Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:34.061Z"
  },
  "storage_size": 280117893,
  "length": 428,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=30483bea-00a5-45a3-a507-157e4669442b",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/30483bea-00a5-45a3-a507-157e4669442b/playlist.m3u8",
  "width": 1280,
  "height": 720,
  "playable": true,
  "available_resolutions": "360p,480p,720p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/30483bea-00a5-45a3-a507-157e4669442b/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/30483bea-00a5-45a3-a507-157e4669442b/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "573cdc65-ced4-4281-8ac3-992a1c7503ca"
},
{
  "_id": "69a9f14a95cecfce8dd4c9ca",
  "id": "dc184c2b-2ea4-4f92-909d-b2cb058c2e42",
  "title": "Aula 22 - Marketing (Parte 2)",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "f3b55040-0892-430c-a396-941ef732324a",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "b0ea4b64-b1e4-4e1a-abcc-667bb3bd8a67",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:34.102Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:34.102Z"
  },
  "storage_size": 232358882,
  "length": 728,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=b0ea4b64-b1e4-4e1a-abcc-667bb3bd8a67",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/b0ea4b64-b1e4-4e1a-abcc-667bb3bd8a67/playlist.m3u8",
  "width": 1280,
  "height": 720,
  "playable": true,
  "available_resolutions": "360p,480p,720p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/b0ea4b64-b1e4-4e1a-abcc-667bb3bd8a67/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/b0ea4b64-b1e4-4e1a-abcc-667bb3bd8a67/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "dc184c2b-2ea4-4f92-909d-b2cb058c2e42"
},
{
  "_id": "69a9f14a95cecfce8dd4c9cb",
  "id": "fc207778-cdec-4ae3-a1ec-53f5bdf6e039",
  "title": "Aula 21 - Marketing (Parte 1)",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "f3b55040-0892-430c-a396-941ef732324a",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "7b77837d-99db-409e-a013-916a6227da52",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:34.144Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:34.144Z"
  },
  "storage_size": 509696224,
  "length": 811,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=7b77837d-99db-409e-a013-916a6227da52",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/7b77837d-99db-409e-a013-916a6227da52/playlist.m3u8",
  "width": 1280,
  "height": 720,
  "playable": true,
  "available_resolutions": "360p,480p,720p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/7b77837d-99db-409e-a013-916a6227da52/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/7b77837d-99db-409e-a013-916a6227da52/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "fc207778-cdec-4ae3-a1ec-53f5bdf6e039"
},
{
  "_id": "69a9f14a95cecfce8dd4c9cc",
  "id": "51f5565b-515a-4b81-a283-69b17b9cb42a",
  "title": "Aula 20 - Quanto custa montar um Salão?",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "f3b55040-0892-430c-a396-941ef732324a",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "38e9c73c-d474-4514-bcbc-982bc683586d",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:34.187Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:34.187Z"
  },
  "storage_size": 566611813,
  "length": 1003,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=38e9c73c-d474-4514-bcbc-982bc683586d",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/38e9c73c-d474-4514-bcbc-982bc683586d/playlist.m3u8",
  "width": 1280,
  "height": 720,
  "playable": true,
  "available_resolutions": "360p,480p,720p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/38e9c73c-d474-4514-bcbc-982bc683586d/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/38e9c73c-d474-4514-bcbc-982bc683586d/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "51f5565b-515a-4b81-a283-69b17b9cb42a"
},
{
  "_id": "69a9f14a95cecfce8dd4c9cd",
  "id": "845a13c1-8732-43d2-bc0e-64efa2ae1266",
  "title": "Aula 19 - Gestão de Pessoas",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "f3b55040-0892-430c-a396-941ef732324a",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "1a51019a-bdd1-41cd-aeee-1f439535f38f",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:34.246Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:34.246Z"
  },
  "storage_size": 528225621,
  "length": 917,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=1a51019a-bdd1-41cd-aeee-1f439535f38f",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/1a51019a-bdd1-41cd-aeee-1f439535f38f/playlist.m3u8",
  "width": 1280,
  "height": 720,
  "playable": true,
  "available_resolutions": "360p,480p,720p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/1a51019a-bdd1-41cd-aeee-1f439535f38f/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/1a51019a-bdd1-41cd-aeee-1f439535f38f/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "845a13c1-8732-43d2-bc0e-64efa2ae1266"
},
{
  "_id": "69a9f14a95cecfce8dd4c9ce",
  "id": "491dcbbf-251b-449c-9825-58b17d8e3e52",
  "title": "Aula 18 - Estrutura mínima de um Salão",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "f3b55040-0892-430c-a396-941ef732324a",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "8b5687fe-268a-4918-a629-13ace3c55095",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:34.287Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:34.287Z"
  },
  "storage_size": 576713107,
  "length": 984,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=8b5687fe-268a-4918-a629-13ace3c55095",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/8b5687fe-268a-4918-a629-13ace3c55095/playlist.m3u8",
  "width": 1280,
  "height": 720,
  "playable": true,
  "available_resolutions": "360p,480p,720p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/8b5687fe-268a-4918-a629-13ace3c55095/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/8b5687fe-268a-4918-a629-13ace3c55095/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "491dcbbf-251b-449c-9825-58b17d8e3e52"
},
{
  "_id": "69a9f14a95cecfce8dd4c9cf",
  "id": "09754ad5-6486-4c73-8bdd-20e41f049882",
  "title": "Aula 17 - Plano de Carreira",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "f3b55040-0892-430c-a396-941ef732324a",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "958fb783-c8f2-4caf-adff-76784f600537",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:34.330Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:34.330Z"
  },
  "storage_size": 236553667,
  "length": 390,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=958fb783-c8f2-4caf-adff-76784f600537",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/958fb783-c8f2-4caf-adff-76784f600537/playlist.m3u8",
  "width": 1280,
  "height": 720,
  "playable": true,
  "available_resolutions": "360p,480p,720p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/958fb783-c8f2-4caf-adff-76784f600537/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/958fb783-c8f2-4caf-adff-76784f600537/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "09754ad5-6486-4c73-8bdd-20e41f049882"
},
{
  "_id": "69a9f14a95cecfce8dd4c9d0",
  "id": "6c7b65b0-f1c1-4886-87e4-8a1a88aaeab2",
  "title": "Aula 16 - Controle de Estoque (Parte 2)",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "f3b55040-0892-430c-a396-941ef732324a",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "1dcae356-dfd8-40d0-91ba-8027987a1fbc",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:34.373Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:34.373Z"
  },
  "storage_size": 314786867,
  "length": 550,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=1dcae356-dfd8-40d0-91ba-8027987a1fbc",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/1dcae356-dfd8-40d0-91ba-8027987a1fbc/playlist.m3u8",
  "width": 1280,
  "height": 720,
  "playable": true,
  "available_resolutions": "360p,480p,720p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/1dcae356-dfd8-40d0-91ba-8027987a1fbc/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/1dcae356-dfd8-40d0-91ba-8027987a1fbc/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "6c7b65b0-f1c1-4886-87e4-8a1a88aaeab2"
},
{
  "_id": "69a9f14a95cecfce8dd4c9d1",
  "id": "51c0b24f-0862-4c1b-a3db-98ebacfc4745",
  "title": "Aula 15 - Controle de Estoque (Parte 1).mp4",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "f3b55040-0892-430c-a396-941ef732324a",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "48586ec0-fc20-4b9b-9c32-ce730344d516",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:34.414Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:34.414Z"
  },
  "storage_size": 509061482,
  "length": 821,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=48586ec0-fc20-4b9b-9c32-ce730344d516",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/48586ec0-fc20-4b9b-9c32-ce730344d516/playlist.m3u8",
  "width": 1280,
  "height": 720,
  "playable": true,
  "available_resolutions": "360p,480p,720p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/48586ec0-fc20-4b9b-9c32-ce730344d516/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/48586ec0-fc20-4b9b-9c32-ce730344d516/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "51c0b24f-0862-4c1b-a3db-98ebacfc4745"
},
{
  "_id": "69a9f14a95cecfce8dd4c9d2",
  "id": "eb27743a-ac45-419b-908d-e52d8c8d7faa",
  "title": "Aula 15 - Controle de Estoque (Parte 1)",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "f3b55040-0892-430c-a396-941ef732324a",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "79edbabb-57dc-4d76-a395-18bb8eeec750",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:34.456Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:34.456Z"
  },
  "storage_size": 509061482,
  "length": 821,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=79edbabb-57dc-4d76-a395-18bb8eeec750",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/79edbabb-57dc-4d76-a395-18bb8eeec750/playlist.m3u8",
  "width": 1280,
  "height": 720,
  "playable": true,
  "available_resolutions": "360p,480p,720p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/79edbabb-57dc-4d76-a395-18bb8eeec750/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/79edbabb-57dc-4d76-a395-18bb8eeec750/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "eb27743a-ac45-419b-908d-e52d8c8d7faa"
},
{
  "_id": "69a9f14a95cecfce8dd4c9d3",
  "id": "37af4dbc-3c8f-4cf7-a874-641d8bb386aa",
  "title": "Aula 14 - Jornada do Cliente no Salão",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "f3b55040-0892-430c-a396-941ef732324a",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "e5bd8c34-4fcb-4bb8-85a4-e9cb6abe7c9f",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:34.498Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:34.498Z"
  },
  "storage_size": 483781042,
  "length": 840,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=e5bd8c34-4fcb-4bb8-85a4-e9cb6abe7c9f",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/e5bd8c34-4fcb-4bb8-85a4-e9cb6abe7c9f/playlist.m3u8",
  "width": 1280,
  "height": 720,
  "playable": true,
  "available_resolutions": "360p,480p,720p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/e5bd8c34-4fcb-4bb8-85a4-e9cb6abe7c9f/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/e5bd8c34-4fcb-4bb8-85a4-e9cb6abe7c9f/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "37af4dbc-3c8f-4cf7-a874-641d8bb386aa"
},
{
  "_id": "69a9f14a95cecfce8dd4c9d4",
  "id": "493211ce-9355-4652-bf65-b314d9a2f459",
  "title": "Aula 13 - Como aumentar o faturamento (Parte 2)",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "f3b55040-0892-430c-a396-941ef732324a",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "1ec8bea4-6cec-422a-9d4a-1e82ed760149",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:34.552Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:34.552Z"
  },
  "storage_size": 288423349,
  "length": 516,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=1ec8bea4-6cec-422a-9d4a-1e82ed760149",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/1ec8bea4-6cec-422a-9d4a-1e82ed760149/playlist.m3u8",
  "width": 1280,
  "height": 720,
  "playable": true,
  "available_resolutions": "360p,480p,720p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/1ec8bea4-6cec-422a-9d4a-1e82ed760149/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/1ec8bea4-6cec-422a-9d4a-1e82ed760149/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "493211ce-9355-4652-bf65-b314d9a2f459"
},
{
  "_id": "69a9f14a95cecfce8dd4c9d5",
  "id": "02daf570-0f4a-462a-8ac6-bd11c12568ac",
  "title": "Aula 12 - Como aumentar o faturamento (Parte 1)",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "f3b55040-0892-430c-a396-941ef732324a",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "e977d6db-6110-43af-b77f-381641689de1",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:34.593Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:34.593Z"
  },
  "storage_size": 632560313,
  "length": 1249,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=e977d6db-6110-43af-b77f-381641689de1",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/e977d6db-6110-43af-b77f-381641689de1/playlist.m3u8",
  "width": 1280,
  "height": 720,
  "playable": true,
  "available_resolutions": "360p,480p,720p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/e977d6db-6110-43af-b77f-381641689de1/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/e977d6db-6110-43af-b77f-381641689de1/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "02daf570-0f4a-462a-8ac6-bd11c12568ac"
},
{
  "_id": "69a9f14a95cecfce8dd4c9d6",
  "id": "39a45093-273a-4649-9ad3-57a1fa79b782",
  "title": "Aula 11 - Precificação (Parte 2)",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "f3b55040-0892-430c-a396-941ef732324a",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "d100629f-58b8-499f-9f92-20eef201cfce",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:34.644Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:34.644Z"
  },
  "storage_size": 285256392,
  "length": 606,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=d100629f-58b8-499f-9f92-20eef201cfce",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/d100629f-58b8-499f-9f92-20eef201cfce/playlist.m3u8",
  "width": 1280,
  "height": 720,
  "playable": true,
  "available_resolutions": "360p,480p,720p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/d100629f-58b8-499f-9f92-20eef201cfce/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/d100629f-58b8-499f-9f92-20eef201cfce/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "39a45093-273a-4649-9ad3-57a1fa79b782"
},
{
  "_id": "69a9f14a95cecfce8dd4c9d7",
  "id": "930d0a38-a87b-42e7-94ee-493deb64049e",
  "title": "Aula 10 - Precificação (Parte 1)",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "f3b55040-0892-430c-a396-941ef732324a",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "541a694b-b4ee-4889-b8f6-2d7ec4c9d48a",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:34.697Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:34.697Z"
  },
  "storage_size": 708551700,
  "length": 1592,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=541a694b-b4ee-4889-b8f6-2d7ec4c9d48a",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/541a694b-b4ee-4889-b8f6-2d7ec4c9d48a/playlist.m3u8",
  "width": 1280,
  "height": 720,
  "playable": true,
  "available_resolutions": "360p,480p,720p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/541a694b-b4ee-4889-b8f6-2d7ec4c9d48a/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/541a694b-b4ee-4889-b8f6-2d7ec4c9d48a/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "930d0a38-a87b-42e7-94ee-493deb64049e"
},
{
  "_id": "69a9f14a95cecfce8dd4c9d8",
  "id": "082ae4cd-1f96-42a1-bb01-c34985798d88",
  "title": "Aula 9 - Custo de Produtos",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "f3b55040-0892-430c-a396-941ef732324a",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "b8bd0d21-aecb-4343-a0fd-b15ee83d6b9a",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:34.740Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:34.740Z"
  },
  "storage_size": 269456935,
  "length": 633,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=b8bd0d21-aecb-4343-a0fd-b15ee83d6b9a",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/b8bd0d21-aecb-4343-a0fd-b15ee83d6b9a/playlist.m3u8",
  "width": 1280,
  "height": 720,
  "playable": true,
  "available_resolutions": "360p,480p,720p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/b8bd0d21-aecb-4343-a0fd-b15ee83d6b9a/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/b8bd0d21-aecb-4343-a0fd-b15ee83d6b9a/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "082ae4cd-1f96-42a1-bb01-c34985798d88"
},
{
  "_id": "69a9f14a95cecfce8dd4c9d9",
  "id": "eb4612dd-81fc-4408-989f-c0f74e87a85c",
  "title": "Aula 8 - Legalização da Empresa",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "f3b55040-0892-430c-a396-941ef732324a",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "63bfb083-7fcd-487c-b4af-f4312a148f51",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:34.794Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:34.794Z"
  },
  "storage_size": 471068963,
  "length": 994,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=63bfb083-7fcd-487c-b4af-f4312a148f51",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/63bfb083-7fcd-487c-b4af-f4312a148f51/playlist.m3u8",
  "width": 1280,
  "height": 720,
  "playable": true,
  "available_resolutions": "360p,480p,720p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/63bfb083-7fcd-487c-b4af-f4312a148f51/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/63bfb083-7fcd-487c-b4af-f4312a148f51/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "eb4612dd-81fc-4408-989f-c0f74e87a85c"
},
{
  "_id": "69a9f14a95cecfce8dd4c9da",
  "id": "28ce2c13-e5d2-4971-bef3-637b282e668d",
  "title": "Aula 7 - Capital de Giro",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "f3b55040-0892-430c-a396-941ef732324a",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "046eba20-0712-404b-8c68-d78d600ce9d4",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:34.837Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:34.837Z"
  },
  "storage_size": 341620634,
  "length": 654,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=046eba20-0712-404b-8c68-d78d600ce9d4",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/046eba20-0712-404b-8c68-d78d600ce9d4/playlist.m3u8",
  "width": 1280,
  "height": 720,
  "playable": true,
  "available_resolutions": "360p,480p,720p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/046eba20-0712-404b-8c68-d78d600ce9d4/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/046eba20-0712-404b-8c68-d78d600ce9d4/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "28ce2c13-e5d2-4971-bef3-637b282e668d"
},
{
  "_id": "69a9f14a95cecfce8dd4c9db",
  "id": "15183016-c01e-4053-a0ef-c44781d53ffb",
  "title": "Aula 6 - Comissionamento",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "f3b55040-0892-430c-a396-941ef732324a",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "fc9fa9fe-d8e6-400a-bca1-d6bd435ca00a",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:34.893Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:34.893Z"
  },
  "storage_size": 395187176,
  "length": 885,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=fc9fa9fe-d8e6-400a-bca1-d6bd435ca00a",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/fc9fa9fe-d8e6-400a-bca1-d6bd435ca00a/playlist.m3u8",
  "width": 1280,
  "height": 720,
  "playable": true,
  "available_resolutions": "360p,480p,720p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/fc9fa9fe-d8e6-400a-bca1-d6bd435ca00a/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/fc9fa9fe-d8e6-400a-bca1-d6bd435ca00a/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "15183016-c01e-4053-a0ef-c44781d53ffb"
},
{
  "_id": "69a9f14a95cecfce8dd4c9dc",
  "id": "cf630d21-61c6-4ba9-a493-d9623decdc6d",
  "title": "Aula 5 - Estrutura Financeira (Parte 2)",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "f3b55040-0892-430c-a396-941ef732324a",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "42d98508-6952-4d9e-ba13-2fade35ac03c",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:34.937Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:34.937Z"
  },
  "storage_size": 485948941,
  "length": 1071,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=42d98508-6952-4d9e-ba13-2fade35ac03c",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/42d98508-6952-4d9e-ba13-2fade35ac03c/playlist.m3u8",
  "width": 1280,
  "height": 720,
  "playable": true,
  "available_resolutions": "360p,480p,720p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/42d98508-6952-4d9e-ba13-2fade35ac03c/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/42d98508-6952-4d9e-ba13-2fade35ac03c/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "cf630d21-61c6-4ba9-a493-d9623decdc6d"
},
{
  "_id": "69a9f14a95cecfce8dd4c9dd",
  "id": "0a093e38-d230-40bd-9269-314f5227e20c",
  "title": "Aula 4 - Estrutura Financeira",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "f3b55040-0892-430c-a396-941ef732324a",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "fd1d6326-9bfa-4d70-a1c4-cbe2a6ed89cd",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:34.980Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:34.980Z"
  },
  "storage_size": 287925753,
  "length": 505,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=fd1d6326-9bfa-4d70-a1c4-cbe2a6ed89cd",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/fd1d6326-9bfa-4d70-a1c4-cbe2a6ed89cd/playlist.m3u8",
  "width": 1280,
  "height": 720,
  "playable": true,
  "available_resolutions": "360p,480p,720p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/fd1d6326-9bfa-4d70-a1c4-cbe2a6ed89cd/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/fd1d6326-9bfa-4d70-a1c4-cbe2a6ed89cd/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "0a093e38-d230-40bd-9269-314f5227e20c"
},
{
  "_id": "69a9f14b95cecfce8dd4c9de",
  "id": "84c0a087-6225-4940-912b-92184a6f764e",
  "title": "Imersão Online Básico Bem Feito",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "b986a508-a33a-4c38-8782-13468c917a95",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "c2f042cd-05db-4245-ae31-8717581afe49",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:35.032Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:35.032Z"
  },
  "storage_size": 5735617790,
  "length": 21930,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=c2f042cd-05db-4245-ae31-8717581afe49",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/c2f042cd-05db-4245-ae31-8717581afe49/playlist.m3u8",
  "width": 1280,
  "height": 680,
  "playable": true,
  "available_resolutions": "360p,480p,720p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/c2f042cd-05db-4245-ae31-8717581afe49/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/c2f042cd-05db-4245-ae31-8717581afe49/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "84c0a087-6225-4940-912b-92184a6f764e"
},
{
  "_id": "69a9f14b95cecfce8dd4c9df",
  "id": "25ad8523-7a96-4206-813c-be522e3380b0",
  "title": "Aula 3 - Recrutamento e treinamento",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "f3b55040-0892-430c-a396-941ef732324a",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "f33bf425-2573-43fb-be8b-5769095a0870",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:35.085Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:35.085Z"
  },
  "storage_size": 449444166,
  "length": 861,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=f33bf425-2573-43fb-be8b-5769095a0870",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/f33bf425-2573-43fb-be8b-5769095a0870/playlist.m3u8",
  "width": 1280,
  "height": 720,
  "playable": true,
  "available_resolutions": "360p,480p,720p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/f33bf425-2573-43fb-be8b-5769095a0870/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/f33bf425-2573-43fb-be8b-5769095a0870/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "25ad8523-7a96-4206-813c-be522e3380b0"
},
{
  "_id": "69a9f14b95cecfce8dd4c9e0",
  "id": "bcf7ce04-19b8-4e59-aa09-cb6c642203d9",
  "title": "Aula 2 - Canvas",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "f3b55040-0892-430c-a396-941ef732324a",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "17cafcee-d100-4a27-af01-4632b0f6bddd",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:35.137Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:35.137Z"
  },
  "storage_size": 431871898,
  "length": 1037,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=17cafcee-d100-4a27-af01-4632b0f6bddd",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/17cafcee-d100-4a27-af01-4632b0f6bddd/playlist.m3u8",
  "width": 1280,
  "height": 720,
  "playable": true,
  "available_resolutions": "360p,480p,720p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/17cafcee-d100-4a27-af01-4632b0f6bddd/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/17cafcee-d100-4a27-af01-4632b0f6bddd/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "bcf7ce04-19b8-4e59-aa09-cb6c642203d9"
},
{
  "_id": "69a9f14b95cecfce8dd4c9e1",
  "id": "aa63542e-d86d-40a8-afa3-95dee099586a",
  "title": "Aula 1 - Definindo o propósito",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "f3b55040-0892-430c-a396-941ef732324a",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "e84688c0-8872-4b3d-9334-36fcd75446cf",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:35.190Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:35.190Z"
  },
  "storage_size": 293679493,
  "length": 548,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=e84688c0-8872-4b3d-9334-36fcd75446cf",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/e84688c0-8872-4b3d-9334-36fcd75446cf/playlist.m3u8",
  "width": 1280,
  "height": 720,
  "playable": true,
  "available_resolutions": "360p,480p,720p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/e84688c0-8872-4b3d-9334-36fcd75446cf/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/e84688c0-8872-4b3d-9334-36fcd75446cf/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "aa63542e-d86d-40a8-afa3-95dee099586a"
},
{
  "_id": "69a9f14b95cecfce8dd4c9e2",
  "id": "f4f5e396-8ac4-4d39-953e-d666d48b2bf3",
  "title": "Recrutamento, seleção, modelo de contrato e de remuneração | Liderança de Propósito",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "f37076d3-9f53-4895-90a7-86e7c5831a19",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "bf861a59-f483-43cb-b076-66d629c612af",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:35.242Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:35.242Z"
  },
  "storage_size": 785327831,
  "length": 7113,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=bf861a59-f483-43cb-b076-66d629c612af",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/bf861a59-f483-43cb-b076-66d629c612af/playlist.m3u8",
  "width": 640,
  "height": 360,
  "playable": true,
  "available_resolutions": "360p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/bf861a59-f483-43cb-b076-66d629c612af/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/bf861a59-f483-43cb-b076-66d629c612af/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "f4f5e396-8ac4-4d39-953e-d666d48b2bf3"
},
{
  "_id": "69a9f14b95cecfce8dd4c9e3",
  "id": "0a821ad2-737b-4e97-bf45-8e66bf19fb18",
  "title": "Plano de metas, reuniões e treinamento de equipe | Liderança de Propósito",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "f37076d3-9f53-4895-90a7-86e7c5831a19",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "393e3826-b21d-4b6a-a72e-5be09474552d",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:35.285Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:35.285Z"
  },
  "storage_size": 848730631,
  "length": 8085,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=393e3826-b21d-4b6a-a72e-5be09474552d",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/393e3826-b21d-4b6a-a72e-5be09474552d/playlist.m3u8",
  "width": 640,
  "height": 360,
  "playable": true,
  "available_resolutions": "360p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/393e3826-b21d-4b6a-a72e-5be09474552d/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/393e3826-b21d-4b6a-a72e-5be09474552d/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "0a821ad2-737b-4e97-bf45-8e66bf19fb18"
},
{
  "_id": "69a9f14b95cecfce8dd4c9e4",
  "id": "385eeb4a-ae6a-4d46-8d50-380b30872a1c",
  "title": "O verdadeiro propósito de tudo | Liderança de Propósito",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "f37076d3-9f53-4895-90a7-86e7c5831a19",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "d8ec56d6-0df5-42f8-9d04-e0a61ab74217",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:35.327Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:35.327Z"
  },
  "storage_size": 862557771,
  "length": 9725,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=d8ec56d6-0df5-42f8-9d04-e0a61ab74217",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/d8ec56d6-0df5-42f8-9d04-e0a61ab74217/playlist.m3u8",
  "width": 640,
  "height": 360,
  "playable": true,
  "available_resolutions": "360p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/d8ec56d6-0df5-42f8-9d04-e0a61ab74217/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/d8ec56d6-0df5-42f8-9d04-e0a61ab74217/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "385eeb4a-ae6a-4d46-8d50-380b30872a1c"
},
{
  "_id": "69a9f14b95cecfce8dd4c9e5",
  "id": "5fb7d2c8-4df9-4910-b691-1e2e7a4d8f4e",
  "title": "Cultura, Liderança e Gestão | Liderança de Propósito",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "f37076d3-9f53-4895-90a7-86e7c5831a19",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "618a8d84-b20f-4c63-94e0-b9f9416e92e6",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:35.377Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:35.377Z"
  },
  "storage_size": 943065129,
  "length": 8486,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=618a8d84-b20f-4c63-94e0-b9f9416e92e6",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/618a8d84-b20f-4c63-94e0-b9f9416e92e6/playlist.m3u8",
  "width": 640,
  "height": 360,
  "playable": true,
  "available_resolutions": "360p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/618a8d84-b20f-4c63-94e0-b9f9416e92e6/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/618a8d84-b20f-4c63-94e0-b9f9416e92e6/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "5fb7d2c8-4df9-4910-b691-1e2e7a4d8f4e"
},
{
  "_id": "69a9f14c95cecfce8dd4c9e6",
  "id": "20d8e809-f62a-4818-932b-13031c9435f3",
  "title": "Autoavaliação e avaliação dos liderados através dos temperamentos | Liderança de Propósito",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "f37076d3-9f53-4895-90a7-86e7c5831a19",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "c9ee45ec-de70-405f-8526-50f14d8ee7a5",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:36.434Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:36.434Z"
  },
  "storage_size": 2218557047,
  "length": 8176,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=c9ee45ec-de70-405f-8526-50f14d8ee7a5",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/c9ee45ec-de70-405f-8526-50f14d8ee7a5/playlist.m3u8",
  "width": 1280,
  "height": 680,
  "playable": true,
  "available_resolutions": "360p,480p,720p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/c9ee45ec-de70-405f-8526-50f14d8ee7a5/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/c9ee45ec-de70-405f-8526-50f14d8ee7a5/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "20d8e809-f62a-4818-932b-13031c9435f3"
},
{
  "_id": "69a9f14c95cecfce8dd4c9e7",
  "id": "2cb3c7ff-6ea2-4a8b-952a-a282f278c8b0",
  "title": "Sessão Mentoria sobre o Método Recepção Lucrativa para donos, gestores e gerentes.mp4",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "a913efea-82da-477e-857a-2cab7a8ed95b",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "9dcb728a-6725-4f5f-a01b-8a103d65d3ba",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:36.476Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:36.476Z"
  },
  "storage_size": 4177886982,
  "length": 7612,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=9dcb728a-6725-4f5f-a01b-8a103d65d3ba",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/9dcb728a-6725-4f5f-a01b-8a103d65d3ba/playlist.m3u8",
  "width": 1280,
  "height": 720,
  "playable": true,
  "available_resolutions": "360p,480p,720p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/9dcb728a-6725-4f5f-a01b-8a103d65d3ba/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/9dcb728a-6725-4f5f-a01b-8a103d65d3ba/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "2cb3c7ff-6ea2-4a8b-952a-a282f278c8b0"
},
{
  "_id": "69a9f14c95cecfce8dd4c9e8",
  "id": "e65e3953-0c4c-402e-8629-cdb1c9556ae3",
  "title": "MRL - Aula 1 - Conheça quem é o Maurício",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "a913efea-82da-477e-857a-2cab7a8ed95b",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "7f0018e9-e3a7-4835-b161-94b6ab906ce7",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:36.529Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:36.529Z"
  },
  "storage_size": 152960539,
  "length": 186,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=7f0018e9-e3a7-4835-b161-94b6ab906ce7",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/7f0018e9-e3a7-4835-b161-94b6ab906ce7/playlist.m3u8",
  "width": 1280,
  "height": 720,
  "playable": true,
  "available_resolutions": "360p,480p,720p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/7f0018e9-e3a7-4835-b161-94b6ab906ce7/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/7f0018e9-e3a7-4835-b161-94b6ab906ce7/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "e65e3953-0c4c-402e-8629-cdb1c9556ae3"
},
{
  "_id": "69a9f14c95cecfce8dd4c9e9",
  "id": "ffa10e42-455b-42b0-9d32-0fde46bbe030",
  "title": "Aula 24 - Fechamento de Caixa",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "a913efea-82da-477e-857a-2cab7a8ed95b",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "aebd2172-0b73-42cb-bc83-f1c1cdd5ebd6",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:36.581Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:36.581Z"
  },
  "storage_size": 471289807,
  "length": 838,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=aebd2172-0b73-42cb-bc83-f1c1cdd5ebd6",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/aebd2172-0b73-42cb-bc83-f1c1cdd5ebd6/playlist.m3u8",
  "width": 1280,
  "height": 720,
  "playable": true,
  "available_resolutions": "360p,480p,720p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/aebd2172-0b73-42cb-bc83-f1c1cdd5ebd6/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/aebd2172-0b73-42cb-bc83-f1c1cdd5ebd6/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "ffa10e42-455b-42b0-9d32-0fde46bbe030"
},
{
  "_id": "69a9f14c95cecfce8dd4c9ea",
  "id": "958b3a35-7f40-4a1b-a60c-26e2c24949f5",
  "title": "Aula 23 - Rotinas Administrativas",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "a913efea-82da-477e-857a-2cab7a8ed95b",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "b0f96471-538f-4523-9ef7-9a15299c2ba4",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:36.636Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:36.636Z"
  },
  "storage_size": 690541696,
  "length": 891,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=b0f96471-538f-4523-9ef7-9a15299c2ba4",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/b0f96471-538f-4523-9ef7-9a15299c2ba4/playlist.m3u8",
  "width": 1280,
  "height": 720,
  "playable": true,
  "available_resolutions": "360p,480p,720p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/b0f96471-538f-4523-9ef7-9a15299c2ba4/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/b0f96471-538f-4523-9ef7-9a15299c2ba4/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "958b3a35-7f40-4a1b-a60c-26e2c24949f5"
},
{
  "_id": "69a9f14c95cecfce8dd4c9eb",
  "id": "c9cf1ae9-224f-4403-bbe2-7697db92c848",
  "title": "MRL - Aula 26 - Redes sociais: Como contribuir para vender mais o salão através das redes sociais",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "a913efea-82da-477e-857a-2cab7a8ed95b",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "fc1c3cda-a415-4c8c-b525-11142ea16855",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:36.688Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:36.688Z"
  },
  "storage_size": 200755267,
  "length": 282,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=fc1c3cda-a415-4c8c-b525-11142ea16855",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/fc1c3cda-a415-4c8c-b525-11142ea16855/playlist.m3u8",
  "width": 1280,
  "height": 720,
  "playable": true,
  "available_resolutions": "360p,480p,720p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/fc1c3cda-a415-4c8c-b525-11142ea16855/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/fc1c3cda-a415-4c8c-b525-11142ea16855/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "c9cf1ae9-224f-4403-bbe2-7697db92c848"
},
{
  "_id": "69a9f14c95cecfce8dd4c9ec",
  "id": "6fcfa663-7130-48e7-9c79-19eb6e95a677",
  "title": "MRL - Aula 24 - Vendas: Upsell de serviços",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "a913efea-82da-477e-857a-2cab7a8ed95b",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "f8d7ff54-d167-4edd-8fdd-650fc6f1b1ef",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:36.730Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:36.730Z"
  },
  "storage_size": 249810139,
  "length": 381,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=f8d7ff54-d167-4edd-8fdd-650fc6f1b1ef",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/f8d7ff54-d167-4edd-8fdd-650fc6f1b1ef/playlist.m3u8",
  "width": 1280,
  "height": 720,
  "playable": true,
  "available_resolutions": "360p,480p,720p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/f8d7ff54-d167-4edd-8fdd-650fc6f1b1ef/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/f8d7ff54-d167-4edd-8fdd-650fc6f1b1ef/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "6fcfa663-7130-48e7-9c79-19eb6e95a677"
},
{
  "_id": "69a9f14c95cecfce8dd4c9ed",
  "id": "8463719d-8ba1-49ef-8f3d-af4b66da7aa3",
  "title": "Aula 22 - Vendas: Fechamento de Vendas",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "a913efea-82da-477e-857a-2cab7a8ed95b",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "056c3e21-8a2f-4695-b311-e26009947a1c",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:36.774Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:36.774Z"
  },
  "storage_size": 472300984,
  "length": 698,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=056c3e21-8a2f-4695-b311-e26009947a1c",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/056c3e21-8a2f-4695-b311-e26009947a1c/playlist.m3u8",
  "width": 1280,
  "height": 720,
  "playable": true,
  "available_resolutions": "360p,480p,720p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/056c3e21-8a2f-4695-b311-e26009947a1c/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/056c3e21-8a2f-4695-b311-e26009947a1c/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "8463719d-8ba1-49ef-8f3d-af4b66da7aa3"
},
{
  "_id": "69a9f14c95cecfce8dd4c9ee",
  "id": "b2860fc4-447d-4396-85c5-d7abaaa58249",
  "title": "Aula 20 - Vendas: Produtos de Revenda",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "a913efea-82da-477e-857a-2cab7a8ed95b",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "7f7b7163-5e8e-4659-b2d8-3747397c7c1f",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:36.821Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:36.821Z"
  },
  "storage_size": 190980935,
  "length": 251,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=7f7b7163-5e8e-4659-b2d8-3747397c7c1f",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/7f7b7163-5e8e-4659-b2d8-3747397c7c1f/playlist.m3u8",
  "width": 1280,
  "height": 720,
  "playable": true,
  "available_resolutions": "360p,480p,720p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/7f7b7163-5e8e-4659-b2d8-3747397c7c1f/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/7f7b7163-5e8e-4659-b2d8-3747397c7c1f/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "b2860fc4-447d-4396-85c5-d7abaaa58249"
},
{
  "_id": "69a9f14c95cecfce8dd4c9ef",
  "id": "80deb9db-e970-44ee-bbe6-ddf78a3026e3",
  "title": "Aula 21 - Vendas: Upsell de Serviços",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "a913efea-82da-477e-857a-2cab7a8ed95b",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "119033cb-9357-4f07-a5ca-647763171a14",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:36.864Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:36.864Z"
  },
  "storage_size": 343382725,
  "length": 544,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=119033cb-9357-4f07-a5ca-647763171a14",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/119033cb-9357-4f07-a5ca-647763171a14/playlist.m3u8",
  "width": 1280,
  "height": 720,
  "playable": true,
  "available_resolutions": "360p,480p,720p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/119033cb-9357-4f07-a5ca-647763171a14/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/119033cb-9357-4f07-a5ca-647763171a14/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "80deb9db-e970-44ee-bbe6-ddf78a3026e3"
},
{
  "_id": "69a9f14c95cecfce8dd4c9f0",
  "id": "32d0bad0-1174-4433-ab3e-2f5025be7659",
  "title": "Aula 19 - Vendas: Contorno de Objeções",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "a913efea-82da-477e-857a-2cab7a8ed95b",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "404a42e8-c5ec-45cc-962b-c5f93f41a158",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:36.918Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:36.918Z"
  },
  "storage_size": 386439077,
  "length": 623,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=404a42e8-c5ec-45cc-962b-c5f93f41a158",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/404a42e8-c5ec-45cc-962b-c5f93f41a158/playlist.m3u8",
  "width": 1280,
  "height": 720,
  "playable": true,
  "available_resolutions": "360p,480p,720p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/404a42e8-c5ec-45cc-962b-c5f93f41a158/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/404a42e8-c5ec-45cc-962b-c5f93f41a158/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "32d0bad0-1174-4433-ab3e-2f5025be7659"
},
{
  "_id": "69a9f14c95cecfce8dd4c9f1",
  "id": "544fb025-dd8f-4ac3-b3b0-aced80cdbe4f",
  "title": "Aula 17 - Vendas: Técnicas de Vendas",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "a913efea-82da-477e-857a-2cab7a8ed95b",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "0271165c-cf6b-49d8-8749-ecaa6d678eea",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:36.960Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:36.960Z"
  },
  "storage_size": 408755959,
  "length": 584,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=0271165c-cf6b-49d8-8749-ecaa6d678eea",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/0271165c-cf6b-49d8-8749-ecaa6d678eea/playlist.m3u8",
  "width": 1280,
  "height": 720,
  "playable": true,
  "available_resolutions": "360p,480p,720p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/0271165c-cf6b-49d8-8749-ecaa6d678eea/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/0271165c-cf6b-49d8-8749-ecaa6d678eea/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "544fb025-dd8f-4ac3-b3b0-aced80cdbe4f"
},
{
  "_id": "69a9f14d95cecfce8dd4c9f2",
  "id": "7e09f977-0bb8-4ac0-b95f-d3f111d0eb07",
  "title": "Aula 16 - Vendas: A diferença entre vender e atender",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "a913efea-82da-477e-857a-2cab7a8ed95b",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "99018751-73b2-4174-a0af-c2875b08ee81",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:37.002Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:37.002Z"
  },
  "storage_size": 403328050,
  "length": 585,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=99018751-73b2-4174-a0af-c2875b08ee81",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/99018751-73b2-4174-a0af-c2875b08ee81/playlist.m3u8",
  "width": 1280,
  "height": 720,
  "playable": true,
  "available_resolutions": "360p,480p,720p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/99018751-73b2-4174-a0af-c2875b08ee81/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/99018751-73b2-4174-a0af-c2875b08ee81/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "7e09f977-0bb8-4ac0-b95f-d3f111d0eb07"
},
{
  "_id": "69a9f14d95cecfce8dd4c9f3",
  "id": "8d5e4206-1314-4ad7-8a30-d04abd62e692",
  "title": "Aula 15 - Gestão da Agenda",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "a913efea-82da-477e-857a-2cab7a8ed95b",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "6f15f95c-b067-4173-b2dc-16c03d3b1944",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:37.046Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:37.046Z"
  },
  "storage_size": 265638398,
  "length": 389,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=6f15f95c-b067-4173-b2dc-16c03d3b1944",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/6f15f95c-b067-4173-b2dc-16c03d3b1944/playlist.m3u8",
  "width": 1280,
  "height": 720,
  "playable": true,
  "available_resolutions": "360p,480p,720p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/6f15f95c-b067-4173-b2dc-16c03d3b1944/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/6f15f95c-b067-4173-b2dc-16c03d3b1944/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "8d5e4206-1314-4ad7-8a30-d04abd62e692"
},
{
  "_id": "69a9f14d95cecfce8dd4c9f4",
  "id": "adef2631-10da-4d69-842c-12a568dc2bbc",
  "title": "Aula 14 - Clientes Inativos ⏰",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "a913efea-82da-477e-857a-2cab7a8ed95b",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "03b93ffd-b7a2-4e66-9d64-14aee18bea25",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:37.090Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:37.090Z"
  },
  "storage_size": 212429343,
  "length": 367,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=03b93ffd-b7a2-4e66-9d64-14aee18bea25",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/03b93ffd-b7a2-4e66-9d64-14aee18bea25/playlist.m3u8",
  "width": 1280,
  "height": 720,
  "playable": true,
  "available_resolutions": "360p,480p,720p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/03b93ffd-b7a2-4e66-9d64-14aee18bea25/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/03b93ffd-b7a2-4e66-9d64-14aee18bea25/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "adef2631-10da-4d69-842c-12a568dc2bbc"
},
{
  "_id": "69a9f14d95cecfce8dd4c9f5",
  "id": "3889ccf9-7360-4694-a8ee-e6c1dc12857d",
  "title": "MRL - Aula 16 - Aniversariante do mês",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "a913efea-82da-477e-857a-2cab7a8ed95b",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "82d894c7-9f3f-40c4-b8d9-bf46b1a2fda1",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:37.134Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:37.134Z"
  },
  "storage_size": 201072572,
  "length": 251,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=82d894c7-9f3f-40c4-b8d9-bf46b1a2fda1",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/82d894c7-9f3f-40c4-b8d9-bf46b1a2fda1/playlist.m3u8",
  "width": 1280,
  "height": 720,
  "playable": true,
  "available_resolutions": "360p,480p,720p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/82d894c7-9f3f-40c4-b8d9-bf46b1a2fda1/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/82d894c7-9f3f-40c4-b8d9-bf46b1a2fda1/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "3889ccf9-7360-4694-a8ee-e6c1dc12857d"
},
{
  "_id": "69a9f14d95cecfce8dd4c9f6",
  "id": "7810b475-4c7b-4698-8738-e6f07512c076",
  "title": "Aula 12 - Pesquisa de Satisfação",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "a913efea-82da-477e-857a-2cab7a8ed95b",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "632fc4fb-8013-4367-b3f9-0cefa54875d9",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:37.176Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:37.176Z"
  },
  "storage_size": 202584179,
  "length": 443,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=632fc4fb-8013-4367-b3f9-0cefa54875d9",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/632fc4fb-8013-4367-b3f9-0cefa54875d9/playlist.m3u8",
  "width": 1280,
  "height": 720,
  "playable": true,
  "available_resolutions": "360p,480p,720p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/632fc4fb-8013-4367-b3f9-0cefa54875d9/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/632fc4fb-8013-4367-b3f9-0cefa54875d9/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "7810b475-4c7b-4698-8738-e6f07512c076"
},
{
  "_id": "69a9f14d95cecfce8dd4c9f7",
  "id": "462b95ba-2a5e-48d7-91ce-f2d5e55ad9bc",
  "title": "MRL - Aula 13 - Agenda ativa",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "a913efea-82da-477e-857a-2cab7a8ed95b",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "a7b8bab0-0326-4cc1-9dd5-7bbf0a7430c3",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:37.219Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:37.219Z"
  },
  "storage_size": 293097014,
  "length": 450,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=a7b8bab0-0326-4cc1-9dd5-7bbf0a7430c3",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/a7b8bab0-0326-4cc1-9dd5-7bbf0a7430c3/playlist.m3u8",
  "width": 1280,
  "height": 720,
  "playable": true,
  "available_resolutions": "360p,480p,720p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/a7b8bab0-0326-4cc1-9dd5-7bbf0a7430c3/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/a7b8bab0-0326-4cc1-9dd5-7bbf0a7430c3/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "462b95ba-2a5e-48d7-91ce-f2d5e55ad9bc"
},
{
  "_id": "69a9f14d95cecfce8dd4c9f8",
  "id": "dd6030a0-7a49-4e02-8f8f-09ff3a470706",
  "title": "MRL - Aula 12 - Como lidar com situações críticas",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "a913efea-82da-477e-857a-2cab7a8ed95b",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "66ca18e6-e793-46e9-b8a4-0d79145ea7e6",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:37.272Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:37.272Z"
  },
  "storage_size": 460370450,
  "length": 576,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=66ca18e6-e793-46e9-b8a4-0d79145ea7e6",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/66ca18e6-e793-46e9-b8a4-0d79145ea7e6/playlist.m3u8",
  "width": 1280,
  "height": 720,
  "playable": true,
  "available_resolutions": "360p,480p,720p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/66ca18e6-e793-46e9-b8a4-0d79145ea7e6/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/66ca18e6-e793-46e9-b8a4-0d79145ea7e6/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "dd6030a0-7a49-4e02-8f8f-09ff3a470706"
},
{
  "_id": "69a9f14d95cecfce8dd4c9f9",
  "id": "456e33b7-2588-4081-9d27-30a7fb2a52c4",
  "title": "MRL - Aula 11 - Ferramentas de suporte (WhatsApp Business)",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "a913efea-82da-477e-857a-2cab7a8ed95b",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "9e8849e3-da78-40b1-9d27-705b12f805ac",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:37.315Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:37.315Z"
  },
  "storage_size": 601661213,
  "length": 1184,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=9e8849e3-da78-40b1-9d27-705b12f805ac",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/9e8849e3-da78-40b1-9d27-705b12f805ac/playlist.m3u8",
  "width": 1280,
  "height": 720,
  "playable": true,
  "available_resolutions": "360p,480p,720p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/9e8849e3-da78-40b1-9d27-705b12f805ac/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/9e8849e3-da78-40b1-9d27-705b12f805ac/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "456e33b7-2588-4081-9d27-30a7fb2a52c4"
},
{
  "_id": "69a9f14d95cecfce8dd4c9fa",
  "id": "21fb5321-3f35-4739-87c7-b020261deea0",
  "title": "Aula 7 - Atendimento Online 📱",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "a913efea-82da-477e-857a-2cab7a8ed95b",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "f1c61f39-c883-483e-9666-4e3d46f05332",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:37.359Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:37.359Z"
  },
  "storage_size": 745825625,
  "length": 1014,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=f1c61f39-c883-483e-9666-4e3d46f05332",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/f1c61f39-c883-483e-9666-4e3d46f05332/playlist.m3u8",
  "width": 1280,
  "height": 720,
  "playable": true,
  "available_resolutions": "360p,480p,720p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/f1c61f39-c883-483e-9666-4e3d46f05332/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/f1c61f39-c883-483e-9666-4e3d46f05332/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "21fb5321-3f35-4739-87c7-b020261deea0"
},
{
  "_id": "69a9f14d95cecfce8dd4c9fb",
  "id": "1b292e55-4473-4c55-8a10-9a2b08e3c9c6",
  "title": "MRL - Aula 10 - Ferramentas de suporte (Todoist)",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "a913efea-82da-477e-857a-2cab7a8ed95b",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "1a8baf3a-dcf6-4f97-a31d-8aeef39b131b",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:37.401Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:37.401Z"
  },
  "storage_size": 256195202,
  "length": 643,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=1a8baf3a-dcf6-4f97-a31d-8aeef39b131b",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/1a8baf3a-dcf6-4f97-a31d-8aeef39b131b/playlist.m3u8",
  "width": 1280,
  "height": 720,
  "playable": true,
  "available_resolutions": "360p,480p,720p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/1a8baf3a-dcf6-4f97-a31d-8aeef39b131b/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/1a8baf3a-dcf6-4f97-a31d-8aeef39b131b/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "1b292e55-4473-4c55-8a10-9a2b08e3c9c6"
},
{
  "_id": "69a9f14d95cecfce8dd4c9fc",
  "id": "f7a3e62c-6981-421d-8465-84adf029bde4",
  "title": "Aula 6 - Atendimento Encantador",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "a913efea-82da-477e-857a-2cab7a8ed95b",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "0aef081e-e932-4c2e-83aa-ea2abd96fcd4",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:37.455Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:37.455Z"
  },
  "storage_size": 533008642,
  "length": 665,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=0aef081e-e932-4c2e-83aa-ea2abd96fcd4",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/0aef081e-e932-4c2e-83aa-ea2abd96fcd4/playlist.m3u8",
  "width": 1280,
  "height": 720,
  "playable": true,
  "available_resolutions": "360p,480p,720p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/0aef081e-e932-4c2e-83aa-ea2abd96fcd4/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/0aef081e-e932-4c2e-83aa-ea2abd96fcd4/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "f7a3e62c-6981-421d-8465-84adf029bde4"
},
{
  "_id": "69a9f14d95cecfce8dd4c9fd",
  "id": "b3ac90d0-7181-463f-8fc6-655092f8d89a",
  "title": "Aula 5 - Check-list de atividades ✔",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "a913efea-82da-477e-857a-2cab7a8ed95b",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "985fa620-b72c-4445-a5b0-ffb117ddfd08",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:37.505Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:37.505Z"
  },
  "storage_size": 231178012,
  "length": 282,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=985fa620-b72c-4445-a5b0-ffb117ddfd08",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/985fa620-b72c-4445-a5b0-ffb117ddfd08/playlist.m3u8",
  "width": 1280,
  "height": 720,
  "playable": true,
  "available_resolutions": "360p,480p,720p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/985fa620-b72c-4445-a5b0-ffb117ddfd08/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/985fa620-b72c-4445-a5b0-ffb117ddfd08/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "b3ac90d0-7181-463f-8fc6-655092f8d89a"
},
{
  "_id": "69a9f14d95cecfce8dd4c9fe",
  "id": "7bba3517-f19b-4799-b437-8e4ab0653faf",
  "title": "Aula 4 - Comportamento e padrão mental de um profissional de sucesso",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "a913efea-82da-477e-857a-2cab7a8ed95b",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "8e40089c-0e19-4b97-a3ad-76479f141482",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:37.547Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:37.547Z"
  },
  "storage_size": 461629105,
  "length": 477,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=8e40089c-0e19-4b97-a3ad-76479f141482",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/8e40089c-0e19-4b97-a3ad-76479f141482/playlist.m3u8",
  "width": 1280,
  "height": 720,
  "playable": true,
  "available_resolutions": "360p,480p,720p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/8e40089c-0e19-4b97-a3ad-76479f141482/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/8e40089c-0e19-4b97-a3ad-76479f141482/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "7bba3517-f19b-4799-b437-8e4ab0653faf"
},
{
  "_id": "69a9f14d95cecfce8dd4c9ff",
  "id": "404b757a-849c-4cc1-8292-8c6ee7e84b9f",
  "title": "Aula 3 - Apresentação pessoal e postura",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "a913efea-82da-477e-857a-2cab7a8ed95b",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "247b6b52-2c80-44b0-ab5a-52df2f85f63a",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:37.589Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:37.589Z"
  },
  "storage_size": 405605180,
  "length": 476,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=247b6b52-2c80-44b0-ab5a-52df2f85f63a",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/247b6b52-2c80-44b0-ab5a-52df2f85f63a/playlist.m3u8",
  "width": 1280,
  "height": 720,
  "playable": true,
  "available_resolutions": "360p,480p,720p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/247b6b52-2c80-44b0-ab5a-52df2f85f63a/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/247b6b52-2c80-44b0-ab5a-52df2f85f63a/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "404b757a-849c-4cc1-8292-8c6ee7e84b9f"
},
{
  "_id": "69a9f14d95cecfce8dd4ca00",
  "id": "3c8aefea-02b1-45e2-b28f-f0c0c5f6c2c3",
  "title": "Aula 2 - O que faz uma recepcionista",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "a913efea-82da-477e-857a-2cab7a8ed95b",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "9df4b59a-280d-49c0-92ad-40c439293af8",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:37.637Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:37.637Z"
  },
  "storage_size": 729311260,
  "length": 867,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=9df4b59a-280d-49c0-92ad-40c439293af8",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/9df4b59a-280d-49c0-92ad-40c439293af8/playlist.m3u8",
  "width": 1280,
  "height": 720,
  "playable": true,
  "available_resolutions": "360p,480p,720p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/9df4b59a-280d-49c0-92ad-40c439293af8/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/9df4b59a-280d-49c0-92ad-40c439293af8/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "3c8aefea-02b1-45e2-b28f-f0c0c5f6c2c3"
},
{
  "_id": "69a9f14d95cecfce8dd4ca01",
  "id": "4325b12a-de98-4fc6-8bb7-009d2c922073",
  "title": "Aula 1 - O que é uma recepção lucrativa",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "a913efea-82da-477e-857a-2cab7a8ed95b",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "4f2fd772-d2dc-416f-8cb8-e0202246a303",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:37.680Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:37.680Z"
  },
  "storage_size": 287289750,
  "length": 331,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=4f2fd772-d2dc-416f-8cb8-e0202246a303",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/4f2fd772-d2dc-416f-8cb8-e0202246a303/playlist.m3u8",
  "width": 1280,
  "height": 720,
  "playable": true,
  "available_resolutions": "360p,480p,720p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/4f2fd772-d2dc-416f-8cb8-e0202246a303/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/4f2fd772-d2dc-416f-8cb8-e0202246a303/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "4325b12a-de98-4fc6-8bb7-009d2c922073"
},
{
  "_id": "69a9f14d95cecfce8dd4ca02",
  "id": "5c557ba2-570e-4def-8f83-4c4c4bf8650e",
  "title": "Aula - Apresentação",
  "description": "",
  "status": "CONVERTED",
  "user_id": "e65c3ee3-72dd-45f7-85d1-fdc9ba64a527",
  "folder_id": "a913efea-82da-477e-857a-2cab7a8ed95b",
  "library_id": "50ddf211-6190-4fe2-b9aa-71dc84707781",
  "live_id": null,
  "video_external_id": "e0efb3b5-bb36-43bb-86d5-b5db725c008c",
  "converted_at": null,
  "created_at": {
    "$date": "2026-03-05T21:10:37.741Z"
  },
  "updated_at": {
    "$date": "2026-03-05T21:10:37.741Z"
  },
  "storage_size": 159200514,
  "length": 186,
  "video_player": "https://player-vz-b35d55b6-835.tv.pandavideo.com.br/embed/?v=e0efb3b5-bb36-43bb-86d5-b5db725c008c",
  "video_hls": "https://b-vz-b35d55b6-835.tv.pandavideo.com.br/e0efb3b5-bb36-43bb-86d5-b5db725c008c/playlist.m3u8",
  "width": 1280,
  "height": 720,
  "playable": true,
  "available_resolutions": "360p,480p,720p",
  "backup": true,
  "preview": "https://cdn.pandavideo.com/vz-b35d55b6-835/e0efb3b5-bb36-43bb-86d5-b5db725c008c/preview.webp",
  "thumbnail": "https://cdn.pandavideo.com/vz-b35d55b6-835/e0efb3b5-bb36-43bb-86d5-b5db725c008c/thumbnail.jpg",
  "playback": [
    "360p",
    "480p",
    "720p",
    "1080p"
  ],
  "pending_resolutions": [],
  "video_id": "5c557ba2-570e-4def-8f83-4c4c4bf8650e"
}
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
        { _id: "leadership", titulo: "Leadership & Management", descricao: "A structured path to becoming an effective leader, from self-management to guiding large organizations.", icon: "iconUsers" },
        {
    "_id": "jornada-gestao-salao-distancia",
    "titulo": "Gestão Eficaz do Salão de Beleza à Distância",
    "descricao": "Uma jornada para proprietários de salões de beleza que precisam gerenciar seus negócios remotamente, garantindo lucratividade e controle, mesmo com afastamento médico.",
    "icon": "iconBriefcase"
  },
        {
            _id: "transformacao-salao-lucrativo",
            titulo: "Transformação do Salão Lucrativo",
            descricao: "Jornada completa para dobrar o faturamento, melhorar a precificação, otimizar a gestão administrativa e criar uma cultura de vendas de alta performance no seu salão de beleza.",
            icon: "iconTrendingUp"
        }
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
    ],
    Fases: [
        // Business Mastery Roadmap
        { _id: "fase-blindagem", jornada: "business", ordem: 1, titulo: "Blindagem Jurídica e Tributária", descricao: "Regularizar a relação com os profissionais e escolher o regime tributário ideal para evitar multas e bitributação.", icon: "iconShield", theme: "rose" },
        { _id: "fase-operacao", jornada: "business", ordem: 2, titulo: "Gestão da Operação à Distância", descricao: "Criar processos padronizados e manuais operacionais que permitam que o negócio funcione no piloto automático sob gestão remota.", icon: "iconSettings", theme: "blue" },
        { _id: "fase-financeira", jornada: "business", ordem: 3, titulo: "Gestão Financeira e Estratégica", descricao: "Deixar de ver o dinheiro como dinheiro de venda e passar a vê-lo como lucro gerado, com foco em estratégias de aumento de faturamento.", icon: "iconDollarSign", theme: "emerald" },
        { _id: "fase-estruturacao", jornada: "business", ordem: 4, titulo: "Estruturação Final e Ação", descricao: "Definir o próximo passo imediato e o plano de ação para consolidar os aprendizados.", icon: "iconTarget", theme: "purple" },
        // Leadership & Management
        { _id: "fase-autoconhecimento", jornada: "leadership", ordem: 1, titulo: "Autoconhecimento e Fundamentos", descricao: "Desenvolver inteligência emocional, gestão de tempo e autoconhecimento profundo como base da liderança.", icon: "iconUser", theme: "blue" },
        { _id: "fase-comunicacao", jornada: "leadership", ordem: 2, titulo: "Comunicação e Relacionamento", descricao: "Dominar escuta ativa, oratória e resolução de conflitos para liderar com eficácia.", icon: "iconMessageCircle", theme: "purple" },
        { _id: "fase-equipe", jornada: "leadership", ordem: 3, titulo: "Formação e Gestão de Equipes", descricao: "Motivar, delegar e construir segurança psicológica para equipes de alto desempenho.", icon: "iconUsers", theme: "teal" },
        //
        {
      "_id": "fase-1-desafios-e-prioridades",
      "jornada": "jornada-gestao-salao-distancia",
      "ordem": 1,
      "titulo": "Entendendo os Desafios e Definindo Prioridades",
      "descricao": "Mapear as principais dificuldades na gestão remota e estabelecer as prioridades para garantir a continuidade e o sucesso do salão.",
      "icon": "iconShield",
      "theme": "rose"
    },
    {
      "_id": "fase-2-legalidade-e-contabilidade",
      "jornada": "jornada-gestao-salao-distancia",
      "ordem": 2,
      "titulo": "Legalidade e Contabilidade: Protegendo seu Negócio",
      "descricao": "Compreender a Lei do Salão Parceiro e garantir a conformidade legal e contábil, minimizando riscos trabalhistas e de tributação.",
      "icon": "iconDollarSign",
      "theme": "amber"
    },
    {
      "_id": "fase-3-financas-e-planejamento",
      "jornada": "jornada-gestao-salao-distancia",
      "ordem": 3,
      "titulo": "Planejamento Financeiro e Controle de Custos",
      "descricao": "Estabelecer um plano financeiro sólido, controlar os custos operacionais e garantir a rentabilidade do salão, mesmo à distância.",
      "icon": "iconTarget",
      "theme": "emerald"
    },
    {
      "_id": "fase-4-marketing-digital-e-atendimento",
      "jornada": "jornada-gestao-salao-distancia",
      "ordem": 4,
      "titulo": "Marketing Digital e Atendimento ao Cliente Remoto",
      "descricao": "Implementar estratégias de marketing digital para atrair e fidelizar clientes, e otimizar o atendimento ao cliente à distância.",
      "icon": "iconHeart",
      "theme": "cyan"
    },
    {
      "_id": "fase-5-equipe-e-gestao-remota",
      "jornada": "jornada-gestao-salao-distancia",
      "ordem": 5,
      "titulo": "Gestão de Equipe Remota e Produtividade",
      "descricao": "Gerenciar a equipe à distância, promover a comunicação, o engajamento e a produtividade, garantindo um ambiente de trabalho positivo.",
      "icon": "iconUsers",
      "theme": "blue"
    },
        // Transformação do Salão Lucrativo
        { _id: "fundacao-financeira", jornada: "transformacao-salao-lucrativo", ordem: 1, titulo: "Fundação Financeira e Precificação", descricao: "Entenda a estrutura financeira, custos e precificação para garantir margem de lucro saudável e capital de giro suficiente.", icon: "iconShield", theme: "rose" },
        { _id: "estrategia-comercial", jornada: "transformacao-salao-lucrativo", ordem: 2, titulo: "Estratégia Comercial e Captação de Clientes", descricao: "Desenvolva técnicas de vendas, marketing e estratégias de atração para aumentar a agenda e reduzir a volatilidade de faturamento.", icon: "iconTarget", theme: "blue" },
        { _id: "operacoes-ferramentas", jornada: "transformacao-salao-lucrativo", ordem: 3, titulo: "Operações e Ferramentas de Controle", descricao: "Implemente rotinas administrativas, controle de estoque e ferramentas de suporte para ganhar eficiência e liberar tempo para a estratégia.", icon: "iconTool", theme: "emerald" },
        { _id: "gestao-pessoas-cultura", jornada: "transformacao-salao-lucrativo", ordem: 4, titulo: "Gestão de Pessoas e Cultura de Vendas", descricao: "Alinhe a equipe, crie plano de carreira, metas e indicadores, e desenvolva uma cultura de vendas e engajamento.", icon: "iconUsers", theme: "purple" },
        { _id: "planejamento-expansao", jornada: "transformacao-salao-lucrativo", ordem: 5, titulo: "Planejamento Estratégico e Expansão", descricao: "Estruture o plano de negócios, análise de viabilidade e passos para expansão física com segurança financeira.", icon: "iconFlag", theme: "amber" }
    ],
    Etapas: [
        // Fase 1 - Blindagem Jurídica e Tributária
        { _id: "etapa-recrutamento", fase: "fase-blindagem", ordem: 1, aula: "69a9f14895cecfce8dd4c9a0", titulo: "Recrutamento e Seleção de Pessoas", motivo: "Explica os 3 regimes de contratação (CLT, Parceria e Aluguel de Cadeira). É fundamental entender a diferença entre parceiro e empregado para evitar processos trabalhistas." },
        { _id: "etapa-regime-tributario", fase: "fase-blindagem", ordem: 2, aula: "69a9f14795cecfce8dd4c987", titulo: "Regime Tributário e Lei Salão Parceiro", motivo: "Explica detalhadamente a Lei do Salão Parceiro, como reduzir a carga tributária, riscos do MEI vs. Simples Nacional, e como evitar a bitributação." },
        { _id: "etapa-plano-carreira", fase: "fase-blindagem", ordem: 3, aula: "69a9f14a95cecfce8dd4c9cf", titulo: "Plano de Carreira e Retenção", motivo: "Mostra como criar um plano de carreira para a equipe técnica, ajudando a reter profissionais sem precisar de vínculo empregatício." },
        // Fase 2 - Gestão da Operação à Distância
        { _id: "etapa-padronizacao1", fase: "fase-operacao", ordem: 1, aula: "69a9f14795cecfce8dd4c99c", titulo: "Padronização (Parte 1)", motivo: "Essencial para garantir que, sem a dona no local, o atendimento seja o mesmo. Ensina a criar processos repetíveis." },
        { _id: "etapa-padronizacao2", fase: "fase-operacao", ordem: 2, aula: "69a9f14795cecfce8dd4c99b", titulo: "Padronização (Parte 2)", motivo: "Aprofunda a criação de manuais e checklists, permitindo que a equipe siga um roteiro claro sem necessidade de supervisão constante." },
        { _id: "etapa-modelo-negocio", fase: "fase-operacao", ordem: 3, aula: "69a9f14795cecfce8dd4c99e", titulo: "Introdução: O Modelo de Negócio", motivo: "Ajuda a definir a linguagem e o propósito do negócio, permitindo treinar a equipe remotamente para manter a cultura viva à distância." },
        { _id: "etapa-treinamento", fase: "fase-operacao", ordem: 4, aula: "69a9f14795cecfce8dd4c990", titulo: "Treinamento de Equipe", motivo: "Estratégias para treinar a equipe remota, garantindo que entendam os padrões de qualidade definidos." },
        // Fase 3 - Gestão Financeira e Estratégica
        { _id: "etapa-faturamento", fase: "fase-financeira", ordem: 1, aula: "69a9f14a95cecfce8dd4c9d5", titulo: "Como Aumentar o Faturamento", motivo: "Ensina as 3 alavancas de crescimento: mais clientes, ticket médio maior e frequência maior. Fundamental para sair da estagnação." },
        { _id: "etapa-precificacao", fase: "fase-financeira", ordem: 2, aula: "69a9f14a95cecfce8dd4c9d7", titulo: "Precificação", motivo: "Sem uma precificação correta, o negócio não dá lucro. Ensina a calcular o preço real dos serviços para garantir a margem de lucro." },
        { _id: "etapa-estrategias", fase: "fase-financeira", ordem: 3, aula: "69a9f14795cecfce8dd4c986", titulo: "Estratégias Comerciais", motivo: "Oferece táticas práticas para vender mais e aumentar o valor gasto por cliente (ticket médio)." },
        { _id: "etapa-gestao-pessoas", fase: "fase-financeira", ordem: 4, aula: "69a9f14a95cecfce8dd4c9cd", titulo: "Gestão de Pessoas", motivo: "Aborda a gestão do time técnico, essencial para quem não pode estar presente o dia todo. Como motivar e cobrar resultados." },
        // Fase 4 - Estruturação Final e Ação
        { _id: "etapa-proposito", fase: "fase-estruturacao", ordem: 1, aula: "69a9f14295cecfce8dd4c948", titulo: "Definição de Propósito e Planejamento", motivo: "Ajuda a desenhar o plano estratégico de curto e longo prazo com o método Canvas." },
        { _id: "etapa-jornada-cliente", fase: "fase-estruturacao", ordem: 2, aula: "69a9f14895cecfce8dd4c9af", titulo: "Jornada do Cliente", motivo: "Para garantir que o cliente tenha uma experiência perfeita mesmo com a gestão à distância." },
        // Leadership - Fase Autoconhecimento
        { _id: "etapa-ie", fase: "fase-autoconhecimento", ordem: 1, aula: "aula-auto-1", titulo: "Inteligência Emocional", motivo: "Base fundamental para qualquer líder: autoconhecimento e gestão das próprias emoções." },
        { _id: "etapa-tempo", fase: "fase-autoconhecimento", ordem: 2, aula: "aula-auto-2", titulo: "Gestão do Tempo", motivo: "Técnicas para gerenciar seu tempo com eficiência e produtividade pessoal." },
        // Leadership - Fase Comunicação
        { _id: "etapa-escuta", fase: "fase-comunicacao", ordem: 1, aula: "aula-com-1", titulo: "Escuta Ativa e Oratória", motivo: "Como ouvir melhor e comunicar com impacto para liderar equipes." },
        { _id: "etapa-cnv", fase: "fase-comunicacao", ordem: 2, aula: "aula-com-2", titulo: "Comunicação Não-Violenta", motivo: "Ferramentas de CNV para resolver conflitos e manter harmonia no ambiente." },
        { _id: "etapa-mediacao", fase: "fase-comunicacao", ordem: 3, aula: "aula-conf-1", titulo: "Mediação de Conflitos", motivo: "Navegação de conversas difíceis e mediação de disputas na equipe." },
        // Leadership - Fase Equipe
        { _id: "etapa-motivacao", fase: "fase-equipe", ordem: 1, aula: "aula-team-1", titulo: "Motivação e Engajamento", motivo: "Como motivar e engajar sua equipe para alto desempenho." },
        { _id: "etapa-delegacao", fase: "fase-equipe", ordem: 2, aula: "aula-team-2", titulo: "Delegação Eficaz", motivo: "Delegando tarefas sem perder qualidade e construindo segurança psicológica." },
        { _id: "etapa-visao", fase: "fase-equipe", ordem: 3, aula: "aula-vis-1", titulo: "Visão Estratégica", motivo: "Definição de direção, alinhamento de objetivos e inspiração de ação coletiva." },
        //
        //
        {
      "_id": "etapa-1-desafios-e-prioridades-1",
      "fase": "fase-1-desafios-e-prioridades",
      "ordem": 1,
      "aula": "Aula - Apresentação.md",
      "titulo": "Entendendo a Situação Atual",
      "motivo": "Apresentação inicial para contextualizar a jornada e identificar os principais desafios da gestão remota."
    },
    {
      "_id": "etapa-1-desafios-e-prioridades-2",
      "fase": "fase-1-desafios-e-prioridades",
      "ordem": 2,
      "aula": "Aula 01 - Definição de propósito e planejamento estratétic método Canva.md",
      "titulo": "Definindo o Propósito do Salão",
      "motivo": "Estabelecer o propósito do salão como base para tomada de decisões e estratégias de gestão."
    },
    {
      "_id": "etapa-2-legalidade-e-contabilidade-1",
      "fase": "fase-2-legalidade-e-contabilidade",
      "ordem": 1,
      "aula": "Aula 01 - Introdução.md",
      "titulo": "Fundamentos da Lei do Salão Parceiro",
      "motivo": "Introdução aos conceitos básicos da Lei do Salão Parceiro e seus impactos na gestão do salão."
    },
    {
      "_id": "etapa-2-legalidade-e-contabilidade-2",
      "fase": "fase-2-legalidade-e-contabilidade",
      "ordem": 2,
      "aula": "Aula 01 - Recrutamento e Seleção de Pessoas.md",
      "titulo": "Contratação e Aspectos Legais",
      "motivo": "Garantir a conformidade legal na contratação de profissionais e evitar riscos trabalhistas."
    },
    {
      "_id": "etapa-3-financas-e-planejamento-1",
      "fase": "fase-3-financas-e-planejamento",
      "ordem": 1,
      "aula": "Aula 02 - Pilar de Vendas.md",
      "titulo": "Análise de Custos e Precificação",
      "motivo": "Entender os custos operacionais e definir a precificação dos serviços para garantir a rentabilidade do salão."
    },
    {
      "_id": "etapa-3-financas-e-planejamento-2",
      "fase": "fase-3-financas-e-planejamento",
      "ordem": 2,
      "aula": "Aula 02 - Primeiro contato.md",
      "titulo": "Planejamento Financeiro Estratégico",
      "motivo": "Criar um plano financeiro estratégico para o salão, incluindo projeções de receita, despesas e fluxo de caixa."
    },
    {
      "_id": "etapa-4-marketing-digital-e-atendimento-1",
      "fase": "fase-4-marketing-digital-e-atendimento",
      "ordem": 1,
      "aula": "Aula 02 - Pilar de Vendas.md",
      "titulo": "Estratégias de Marketing Digital",
      "motivo": "Implementar estratégias de marketing digital para atrair e fidelizar clientes, como redes sociais e e-mail marketing."
    },
    {
      "_id": "etapa-4-marketing-digital-e-atendimento-2",
      "fase": "fase-4-marketing-digital-e-atendimento",
      "ordem": 2,
      "aula": "Aula 02 - Tutoria - Recrutamento e seleção de pessoas 15042024.md",
      "titulo": "Atendimento ao Cliente Remoto",
      "motivo": "Otimizar o atendimento ao cliente à distância, utilizando ferramentas de comunicação online e oferecendo um atendimento personalizado."
    },
    {
      "_id": "etapa-5-equipe-e-gestao-remota-1",
      "fase": "fase-5-equipe-e-gestao-remota",
      "ordem": 1,
      "aula": "Aula 02 - Pilar de Vendas.md",
      "titulo": "Gestão de Equipe Remota",
      "motivo": "Implementar estratégias de gestão de equipe remota, como comunicação eficaz, feedback e reconhecimento."
    },
    {
      "_id": "etapa-5-equipe-e-gestao-remota-2",
      "fase": "fase-5-equipe-e-gestao-remota",
      "ordem": 2,
      "aula": "Aula 02 - Tutoria - Vendas 29042024.md",
      "titulo": "Cultura de Confiança e Colaboração",
      "motivo": "Promover uma cultura de confiança e colaboração entre os membros da equipe, mesmo à distância."
    },
        // Transformação do Salão Lucrativo - Fase: Fundação Financeira
        { _id: "etapa-estrutura-financeira", fase: "fundacao-financeira", ordem: 1, aula: "Aula 4 - Estrutura Financeira.md", titulo: "Entendendo a Estrutura Financeira do Salão", motivo: "Fornece os fundamentos para saber se o salão gera lucro, qual a margem atual e quais são os indicadores financeiros essenciais." },
        { _id: "etapa-ponto-equilibrio", fase: "fundacao-financeira", ordem: 2, aula: "Aula 5 - Estrutura Financeira Parte 2.md", titulo: "Ponto de Equilíbrio e Capital de Giro", motivo: "Ensina a calcular o ponto de equilíbrio e a importância de manter capital de giro para evitar a volatilidade de caixa." },
        { _id: "etapa-custo-produtos", fase: "fundacao-financeira", ordem: 3, aula: "Aula 9 - Custo de Produtos.md", titulo: "Mapeamento dos Custos de Produtos", motivo: "Ajuda a detalhar custos fixos e variáveis dos serviços, essencial para precificação correta." },
        { _id: "etapa-precificacao-parte-1", fase: "fundacao-financeira", ordem: 4, aula: "Aula 10 - Precificação Parte 1.md", titulo: "Fundamentos da Precificação", motivo: "Apresenta a lógica de formação de preço baseada em custos e valor percebido, corrigindo preços subestimados." },
        { _id: "etapa-precificacao-parte-2", fase: "fundacao-financeira", ordem: 5, aula: "Aula 11 - Precificação Parte 2.md", titulo: "Montagem da Tabela de Preços", motivo: "Ensina a montar a tabela de preços alinhada ao custo real e à margem desejada, aumentando a lucratividade." },
        { _id: "etapa-capital-giro", fase: "fundacao-financeira", ordem: 6, aula: "Aula 7 - Capital de Giro.md", titulo: "Construindo e Gerindo o Capital de Giro", motivo: "Mostra como planejar recursos financeiros para cobrir despesas mensais e evitar a necessidade de injetar capital emergencialmente." },
        // Transformação do Salão Lucrativo - Fase: Estratégia Comercial
        { _id: "etapa-estrategias-captar-clientes", fase: "estrategia-comercial", ordem: 1, aula: "Estratégias para captar novos clientes.md", titulo: "Estratégias de Captação de Clientes", motivo: "Apresenta múltiplas táticas além das redes sociais, reduzindo a dependência de um único canal de aquisição." },
        { _id: "etapa-marketing-basico", fase: "estrategia-comercial", ordem: 2, aula: "Aula 03 - Marketing.md", titulo: "Fundamentos de Marketing para Salões", motivo: "Define posicionamento, público‑alvo e canais de comunicação para atrair clientes de forma consistente." },
        { _id: "etapa-marketing-parte-1", fase: "estrategia-comercial", ordem: 3, aula: "Aula 21 - Marketing Parte 1.md", titulo: "Marketing Parte 1 – Comunicação e Relacionamento", motivo: "Ensina a criar mensagens que convertem e a manter relacionamento ativo com a base de clientes." },
        { _id: "etapa-marketing-parte-2", fase: "estrategia-comercial", ordem: 4, aula: "Aula 22 - Marketing Parte 2.md", titulo: "Marketing Parte 2 – Estratégias no Instagram", motivo: "Aprofunda o uso do Instagram como ferramenta de captação, otimizando tempo e criatividade." },
        { _id: "etapa-marketing-parte-3", fase: "estrategia-comercial", ordem: 5, aula: "Aula 23 - Marketing Parte 3.md", titulo: "Marketing Parte 3 – Endomarketing e Estratégias Offline", motivo: "Complementa o digital com ações internas e offline que aumentam a frequência e o ticket médio." },
        { _id: "etapa-vendas-basico", fase: "estrategia-comercial", ordem: 6, aula: "Aula 01 - Vendas.md", titulo: "Fundamentos da Área Comercial", motivo: "Mostra como a venda é o motor do faturamento e introduz a mentalidade comercial para toda a equipe." },
        { _id: "etapa-upsell-servicos", fase: "estrategia-comercial", ordem: 7, aula: "Aula 21 - Vendas Upsell de Serviços.md", titulo: "Upsell de Serviços", motivo: "Ensina a aumentar o ticket médio oferecendo serviços complementares no momento da marcação." },
        { _id: "etapa-fechamento-vendas", fase: "estrategia-comercial", ordem: 8, aula: "Aula 22 - Vendas Fechamento de Vendas.md", titulo: "Fechamento de Vendas", motivo: "Capacita a recepcionista e a equipe a concluir a venda de forma eficaz, aumentando a taxa de conversão." },
        { _id: "etapa-tecnica-vendas-1", fase: "estrategia-comercial", ordem: 9, aula: "Aula 24 - Técnica de vendas Parte 1.md", titulo: "Técnicas de Vendas – Parte 1", motivo: "Apresenta o processo de venda estruturado, essencial para padronizar a abordagem comercial." },
        { _id: "etapa-tecnica-vendas-2", fase: "estrategia-comercial", ordem: 10, aula: "Aula 25 - Técnicas de Vendas Parte 2.md", titulo: "Técnicas de Vendas – Parte 2", motivo: "Aprofunda técnicas de persuasão e negociação para melhorar a taxa de fechamento." },
        { _id: "etapa-tecnica-vendas-3", fase: "estrategia-comercial", ordem: 11, aula: "Aula 26 - Técnicas de Vendas Parte 3.md", titulo: "Técnicas de Vendas – Parte 3", motivo: "Trata da gestão emocional e da construção de relacionamento de longo prazo com o cliente." },
        // Transformação do Salão Lucrativo - Fase: Operações e Ferramentas
        { _id: "etapa-rotinas-administrativas", fase: "operacoes-ferramentas", ordem: 1, aula: "Aula 23 - Rotinas Administrativas.md", titulo: "Rotinas Administrativas do Salão", motivo: "Define processos claros para reduzir sobrecarga e permitir delegação eficaz das tarefas operacionais." },
        { _id: "etapa-controle-estoque", fase: "operacoes-ferramentas", ordem: 2, aula: "Aula 15 - Controle de Estoque Parte 1.md", titulo: "Controle de Estoque – Parte 1", motivo: "Ensina a organizar insumos e produtos, evitando perdas e melhorando a margem de lucro." },
        { _id: "etapa-ferramentas-suporte-1", fase: "operacoes-ferramentas", ordem: 3, aula: "Aula 8 - Ferramentas de Suporte I.md", titulo: "Ferramentas de Suporte – Parte I (Todoist)", motivo: "Apresenta uma ferramenta prática para gestão de tarefas e acompanhamento de processos." },
        { _id: "etapa-ferramentas-suporte-2", fase: "operacoes-ferramentas", ordem: 4, aula: "Aula 9 - Ferramentas de Suporte II.md", titulo: "Ferramentas de Suporte – Parte II (Anotações e Organização)", motivo: "Complementa o uso de ferramentas simples para registrar demandas diárias da recepção." },
        { _id: "etapa-checklist-atividades", fase: "operacoes-ferramentas", ordem: 5, aula: "Aula 5 - Check-list de atividades.md", titulo: "Checklist de Atividades Diárias, Semanais e Mensais", motivo: "Garante que nenhuma tarefa crítica seja esquecida, aumentando a consistência operacional." },
        { _id: "etapa-fechamento-caixa", fase: "operacoes-ferramentas", ordem: 6, aula: "Aula 24 - Fechamento de Caixa.md", titulo: "Fechamento de Caixa e Controle Financeiro Diário", motivo: "Ensina a registrar entradas e saídas corretamente, facilitando a análise de resultados e a separação das finanças pessoais." },
        // Transformação do Salão Lucrativo - Fase: Gestão de Pessoas e Cultura
        { _id: "etapa-recrutamento-treinamento", fase: "gestao-pessoas-cultura", ordem: 1, aula: "Aula 3 - Recrutamento e treinamento.md", titulo: "Recrutamento e Treinamento de Colaboradores", motivo: "Fornece estratégias para atrair profissionais qualificados e prepará‑los para a cultura do salão." },
        { _id: "etapa-plano-carreira-tsl", fase: "gestao-pessoas-cultura", ordem: 2, aula: "Aula 17 - Plano de Carreira.md", titulo: "Desenvolvimento de Plano de Carreira", motivo: "Cria caminhos de crescimento interno, reduz turnover e aumenta o engajamento da equipe." },
        { _id: "etapa-gestao-pessoas-tsl", fase: "gestao-pessoas-cultura", ordem: 3, aula: "Aula 19 - Gestão de Pessoas.md", titulo: "Gestão de Pessoas e Alinhamento de Comissionamento", motivo: "Ensina a estruturar comissionamento justo e alinhado ao custo dos serviços, evitando desalinhamento." },
        { _id: "etapa-treinamento-equipe", fase: "gestao-pessoas-cultura", ordem: 4, aula: "Aula 31 - Treinamento de Equipe.md", titulo: "Treinamento Contínuo da Equipe", motivo: "Desenvolve habilidades comerciais e operacionais, preparando a equipe para metas de crescimento." },
        { _id: "etapa-reunioes-equipe", fase: "gestao-pessoas-cultura", ordem: 5, aula: "Aula 30 - Reuniões de Equipe.md", titulo: "Condução de Reuniões de Alinhamento", motivo: "Estabelece um ritmo de comunicação que reduz resistência a mudanças e mantém todos focados nos objetivos." },
        { _id: "etapa-metas", fase: "gestao-pessoas-cultura", ordem: 6, aula: "Aula 27 - Metas.md", titulo: "Definição e Acompanhamento de Metas", motivo: "Cria metas claras e mensuráveis que direcionam a equipe para o aumento de faturamento." },
        { _id: "etapa-indicadores-desempenho", fase: "gestao-pessoas-cultura", ordem: 7, aula: "Aula 28 - Indicadores de Desempenho.md", titulo: "Indicadores de Desempenho para Gestão Estratégica", motivo: "Ensina a monitorar KPIs críticos, permitindo ajustes rápidos para melhorar a lucratividade." },
        // Transformação do Salão Lucrativo - Fase: Planejamento e Expansão
        { _id: "etapa-canvas-negocio", fase: "planejamento-expansao", ordem: 1, aula: "Aula 2 - Canvas.md", titulo: "Canvas do Modelo de Negócio", motivo: "Ajuda a visualizar todos os componentes do salão, identificando oportunidades de melhoria e expansão." },
        { _id: "etapa-planejamento-anual", fase: "planejamento-expansao", ordem: 2, aula: "Aula 32 - Planejamento Anual.md", titulo: "Planejamento Anual Estratégico", motivo: "Define um roadmap de 12 meses para alcançar a meta de R$250 mil de faturamento." },
        { _id: "etapa-pilar-vendas", fase: "planejamento-expansao", ordem: 3, aula: "Aula 02 - Pilar de Vendas.md", titulo: "Pilar de Vendas – Estrutura de Metas e Bonificações", motivo: "Estabelece sistema de metas, bonificações e incentivos que cria cultura comercial." },
        { _id: "etapa-legalizacao-empresa", fase: "planejamento-expansao", ordem: 4, aula: "Aula 8 - Legalização da Empresa.md", titulo: "Legalização e Regularização do Salão", motivo: "Garante que a expansão esteja em conformidade legal, evitando custos inesperados." },
        { _id: "etapa-custo-montagem-salao", fase: "planejamento-expansao", ordem: 5, aula: "Aula 20 - Quanto custa montar um Salão.md", titulo: "Custo de Montagem e Expansão Física", motivo: "Fornece parâmetros financeiros para planejar a abertura de nova unidade ou reforma, alinhado ao capital de giro." }
    ],
    EtapaConnections: [
        // Business - fluxo sequencial entre etapas
        { _id: "ec1", jornada: "business", from: "etapa-recrutamento", to: "etapa-regime-tributario" },
        { _id: "ec2", jornada: "business", from: "etapa-regime-tributario", to: "etapa-plano-carreira" },
        { _id: "ec3", jornada: "business", from: "etapa-plano-carreira", to: "etapa-padronizacao1" },
        { _id: "ec4", jornada: "business", from: "etapa-padronizacao1", to: "etapa-padronizacao2" },
        { _id: "ec5", jornada: "business", from: "etapa-padronizacao2", to: "etapa-modelo-negocio" },
        { _id: "ec6", jornada: "business", from: "etapa-modelo-negocio", to: "etapa-treinamento" },
        { _id: "ec7", jornada: "business", from: "etapa-treinamento", to: "etapa-faturamento" },
        { _id: "ec8", jornada: "business", from: "etapa-faturamento", to: "etapa-precificacao" },
        { _id: "ec9", jornada: "business", from: "etapa-precificacao", to: "etapa-estrategias" },
        { _id: "ec10", jornada: "business", from: "etapa-estrategias", to: "etapa-gestao-pessoas" },
        { _id: "ec11", jornada: "business", from: "etapa-gestao-pessoas", to: "etapa-proposito" },
        { _id: "ec12", jornada: "business", from: "etapa-proposito", to: "etapa-jornada-cliente" },
        // Leadership - fluxo entre etapas
        { _id: "ec13", jornada: "leadership", from: "etapa-ie", to: "etapa-tempo" },
        { _id: "ec14", jornada: "leadership", from: "etapa-tempo", to: "etapa-escuta" },
        { _id: "ec15", jornada: "leadership", from: "etapa-escuta", to: "etapa-cnv" },
        { _id: "ec16", jornada: "leadership", from: "etapa-cnv", to: "etapa-mediacao" },
        { _id: "ec17", jornada: "leadership", from: "etapa-mediacao", to: "etapa-motivacao" },
        { _id: "ec18", jornada: "leadership", from: "etapa-motivacao", to: "etapa-delegacao" },
        { _id: "ec19", jornada: "leadership", from: "etapa-delegacao", to: "etapa-visao" },
        {
      "_id": "ec1",
      "jornada": "jornada-gestao-salao-distancia",
      "from": "etapa-1-desafios-e-prioridades-1",
      "to": "etapa-1-desafios-e-prioridades-2"
    },
    {
      "_id": "ec2",
      "jornada": "jornada-gestao-salao-distancia",
      "from": "etapa-1-desafios-e-prioridades-2",
      "to": "etapa-2-legalidade-e-contabilidade-1"
    },
    {
      "_id": "ec3",
      "jornada": "jornada-gestao-salao-distancia",
      "from": "etapa-2-legalidade-e-contabilidade-1",
      "to": "etapa-2-legalidade-e-contabilidade-2"
    },
    {
      "_id": "ec4",
      "jornada": "jornada-gestao-salao-distancia",
      "from": "etapa-2-legalidade-e-contabilidade-2",
      "to": "etapa-3-financas-e-planejamento-1"
    },
    {
      "_id": "ec5",
      "jornada": "jornada-gestao-salao-distancia",
      "from": "etapa-3-financas-e-planejamento-1",
      "to": "etapa-3-financas-e-planejamento-2"
    },
    {
      "_id": "ec6",
      "jornada": "jornada-gestao-salao-distancia",
      "from": "etapa-3-financas-e-planejamento-2",
      "to": "etapa-4-marketing-digital-e-atendimento-1"
    },
    {
      "_id": "ec7",
      "jornada": "jornada-gestao-salao-distancia",
      "from": "etapa-4-marketing-digital-e-atendimento-1",
      "to": "etapa-4-marketing-digital-e-atendimento-2"
    },
    {
      "_id": "ec8",
      "jornada": "jornada-gestao-salao-distancia",
      "from": "etapa-4-marketing-digital-e-atendimento-2",
      "to": "etapa-5-equipe-e-gestao-remota-1"
    },
    {
      "_id": "ec9",
      "jornada": "jornada-gestao-salao-distancia",
      "from": "etapa-5-equipe-e-gestao-remota-1",
      "to": "etapa-5-equipe-e-gestao-remota-2"
    },
        // Transformação do Salão Lucrativo
        { _id: "tsl-ec1", jornada: "transformacao-salao-lucrativo", from: "etapa-estrutura-financeira", to: "etapa-ponto-equilibrio" },
        { _id: "tsl-ec2", jornada: "transformacao-salao-lucrativo", from: "etapa-ponto-equilibrio", to: "etapa-custo-produtos" },
        { _id: "tsl-ec3", jornada: "transformacao-salao-lucrativo", from: "etapa-custo-produtos", to: "etapa-precificacao-parte-1" },
        { _id: "tsl-ec4", jornada: "transformacao-salao-lucrativo", from: "etapa-precificacao-parte-1", to: "etapa-precificacao-parte-2" },
        { _id: "tsl-ec5", jornada: "transformacao-salao-lucrativo", from: "etapa-precificacao-parte-2", to: "etapa-capital-giro" },
        { _id: "tsl-ec6", jornada: "transformacao-salao-lucrativo", from: "etapa-capital-giro", to: "etapa-estrategias-captar-clientes" },
        { _id: "tsl-ec7", jornada: "transformacao-salao-lucrativo", from: "etapa-estrategias-captar-clientes", to: "etapa-marketing-basico" },
        { _id: "tsl-ec8", jornada: "transformacao-salao-lucrativo", from: "etapa-marketing-basico", to: "etapa-marketing-parte-1" },
        { _id: "tsl-ec9", jornada: "transformacao-salao-lucrativo", from: "etapa-marketing-parte-1", to: "etapa-marketing-parte-2" },
        { _id: "tsl-ec10", jornada: "transformacao-salao-lucrativo", from: "etapa-marketing-parte-2", to: "etapa-marketing-parte-3" },
        { _id: "tsl-ec11", jornada: "transformacao-salao-lucrativo", from: "etapa-marketing-parte-3", to: "etapa-vendas-basico" },
        { _id: "tsl-ec12", jornada: "transformacao-salao-lucrativo", from: "etapa-vendas-basico", to: "etapa-upsell-servicos" },
        { _id: "tsl-ec13", jornada: "transformacao-salao-lucrativo", from: "etapa-upsell-servicos", to: "etapa-fechamento-vendas" },
        { _id: "tsl-ec14", jornada: "transformacao-salao-lucrativo", from: "etapa-fechamento-vendas", to: "etapa-tecnica-vendas-1" },
        { _id: "tsl-ec15", jornada: "transformacao-salao-lucrativo", from: "etapa-tecnica-vendas-1", to: "etapa-tecnica-vendas-2" },
        { _id: "tsl-ec16", jornada: "transformacao-salao-lucrativo", from: "etapa-tecnica-vendas-2", to: "etapa-tecnica-vendas-3" },
        { _id: "tsl-ec17", jornada: "transformacao-salao-lucrativo", from: "etapa-tecnica-vendas-3", to: "etapa-rotinas-administrativas" },
        { _id: "tsl-ec18", jornada: "transformacao-salao-lucrativo", from: "etapa-rotinas-administrativas", to: "etapa-controle-estoque" },
        { _id: "tsl-ec19", jornada: "transformacao-salao-lucrativo", from: "etapa-controle-estoque", to: "etapa-ferramentas-suporte-1" },
        { _id: "tsl-ec20", jornada: "transformacao-salao-lucrativo", from: "etapa-ferramentas-suporte-1", to: "etapa-ferramentas-suporte-2" },
        { _id: "tsl-ec21", jornada: "transformacao-salao-lucrativo", from: "etapa-ferramentas-suporte-2", to: "etapa-checklist-atividades" },
        { _id: "tsl-ec22", jornada: "transformacao-salao-lucrativo", from: "etapa-checklist-atividades", to: "etapa-fechamento-caixa" },
        { _id: "tsl-ec23", jornada: "transformacao-salao-lucrativo", from: "etapa-fechamento-caixa", to: "etapa-recrutamento-treinamento" },
        { _id: "tsl-ec24", jornada: "transformacao-salao-lucrativo", from: "etapa-recrutamento-treinamento", to: "etapa-plano-carreira-tsl" },
        { _id: "tsl-ec25", jornada: "transformacao-salao-lucrativo", from: "etapa-plano-carreira-tsl", to: "etapa-gestao-pessoas-tsl" },
        { _id: "tsl-ec26", jornada: "transformacao-salao-lucrativo", from: "etapa-gestao-pessoas-tsl", to: "etapa-treinamento-equipe" },
        { _id: "tsl-ec27", jornada: "transformacao-salao-lucrativo", from: "etapa-treinamento-equipe", to: "etapa-reunioes-equipe" },
        { _id: "tsl-ec28", jornada: "transformacao-salao-lucrativo", from: "etapa-reunioes-equipe", to: "etapa-metas" },
        { _id: "tsl-ec29", jornada: "transformacao-salao-lucrativo", from: "etapa-metas", to: "etapa-indicadores-desempenho" },
        { _id: "tsl-ec30", jornada: "transformacao-salao-lucrativo", from: "etapa-indicadores-desempenho", to: "etapa-canvas-negocio" },
        { _id: "tsl-ec31", jornada: "transformacao-salao-lucrativo", from: "etapa-canvas-negocio", to: "etapa-planejamento-anual" },
        { _id: "tsl-ec32", jornada: "transformacao-salao-lucrativo", from: "etapa-planejamento-anual", to: "etapa-pilar-vendas" },
        { _id: "tsl-ec33", jornada: "transformacao-salao-lucrativo", from: "etapa-pilar-vendas", to: "etapa-legalizacao-empresa" },
        { _id: "tsl-ec34", jornada: "transformacao-salao-lucrativo", from: "etapa-legalizacao-empresa", to: "etapa-custo-montagem-salao" }
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
            if (!item || item[key] !== query[key]) return false
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