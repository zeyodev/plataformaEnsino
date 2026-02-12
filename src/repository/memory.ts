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
            _id: "lksjbjlkwfo",
            type: "adaptador",
            component: "Recommendations",
            map: "aosdfjw2d",
            documents: { type: "repository", method: "findManyToMany", params: ["ModuloAulas/aula:Aulas", { modulo: "$modulo._id" }] },

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
    Modulos: [
        { _id: "lskjfof1", pilar: "lskdjfo1", titulo: "O Líder Consciente Autoconhecimento e Inteligência Emocional" },
        { _id: "lskjfof2", pilar: "lskdjfo2", titulo: "Comunicação de Impacto e Cultura de Confiança" },
        { _id: "lskjfof3", pilar: "lskdjfo3", titulo: "Gestão de Equipes de Alta Performance e Delegação" },
        { _id: "lskjfof4", pilar: "lskdjfo4", titulo: "Liderança Estratégica e Gestão de Mudanças" },
        { _id: "lskjfof5", pilar: "lskdjfo1", titulo: "Liderança Estratégica e Gestão de Mudanças" },
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
        }
    ],
    Mostradores: [
        {
            _id: "123",
            titulo: "Mes de Janeiro",
            valor: 0
        }
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