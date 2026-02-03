import { io as SocketClient, Socket as ClientSocket } from 'socket.io-client';
import Repository, { cbAny, cbCollection } from '.';
import { ulid } from 'ulid';

// Estrutura do Log de Operações
export interface LogEntry {
    _id: string;
    timestamp: number;
    action: "create" | "update" | "delete";
    collection: string;
    docId: string;
    data?: any;
    synced?: boolean; // Usado apenas no Frontend para saber se já enviou
}

// Payload para transmissão via Socket
interface SyncPayload {
    sourceId: string;
    collection: string;
    action: "create" | "update" | "delete";
    data?: any;
    id?: string;
    logId?: string; // ID do log original para confirmação
    timestamp?: number;
}

// --- 2. Implementação Base do Repository (Lógica de Triggers e Logs) ---

abstract class BaseRepository implements Repository {
    methodsMap: { [key: string]: any } = {};
    protected triggers: Map<string, Array<{ id: string, types: string[], cb: Function }>> = new Map();
    protected isSyncing: boolean = false;
    deleteTrigger(collection: string, type: string, triggerid: string): void {
        delete this.listeners[collection][type][triggerid]
    }
    listeners: { [key: string]: { [key: string]: any } } = {
        "all": {}
    }
    // Métodos abstratos para lidar com o Log (devem ser implementados concretamente)
    abstract saveLog(entry: LogEntry): Promise<void>;
    abstract getLogsSince(timestamp: number): Promise<LogEntry[]>; // Usado pelo Server
    abstract getUnsyncedLogs(): Promise<[LogEntry[], boolean]>; // Usado pelo Client
    abstract markLogsAsSynced(logIds: string[]): Promise<void>; // Usado pelo Client

    public async performSyncOperation<T>(operation: () => Promise<T>): Promise<T> {
        this.isSyncing = true;
        try {
            return await operation();
        } finally {
            this.isSyncing = false;
        }
    }

    protected async fireTrigger(collection: string, type: "create" | "read" | "update" | "delete", data: any) {
        if (this.isSyncing) return;

        // 1. Salvar no Histórico (Log) Automaticamente
        const logId = ulid(Date.now())
        if (type !== 'read') {
            const logEntry: LogEntry = {
                _id: logId,
                timestamp: Date.now(),
                action: type,
                collection: collection,
                docId: data._id || data.id,
                data: type === 'delete' ? undefined : data,
                synced: false // Default para frontend
            };
            await this.saveLog(logEntry);
        }

        // 2. Disparar Listeners da Aplicação
        const has = Object.prototype.hasOwnProperty
        if (has.call(this.listeners["all"], type))
            for (const triggerid in this.listeners["all"][type]) {
                this.listeners["all"][type][triggerid](collection, data, type, logId, triggerid, origin)
            }
        if (has.call(this.listeners, collection) && has.call(this.listeners[collection], type)) {
            for (const triggerid in this.listeners[collection][type]) {
                this.listeners[collection][type][triggerid](data, type, triggerid)
            }
        }
    }

    createTriggerTo<T extends string | "all">(collection: T, cb: (T extends "all" ? cbAny : cbCollection), ...types: Array<"create" | "read" | "update" | "delete">): string {
        if (!Object.prototype.hasOwnProperty.call(this.listeners, collection))
            this.listeners[collection] = {}

        const triggerid = ulid()
        for (const type of types) {
            if (Object.prototype.hasOwnProperty.call(this.listeners[collection], type))
                this.listeners[collection][type][triggerid] = cb
            else this.listeners[collection][type] = { [triggerid]: cb }
        }
        return triggerid
    }

    /* deleteTrigger(collection: string, type: string, triggerid: string): void {
        const list = this.triggers.get(collection);
        if (list) this.triggers.set(collection, list.filter(t => t.id !== triggerid));
    } */

    abstract create(collection: string, value: any, origin?: boolean): Promise<[any, boolean]>;
    abstract update(collection: string, id: string, value: any): Promise<[any, boolean]>;
    abstract updateQuery(collection: string, query: any, value: any): Promise<[any, boolean]>;
    abstract updateMany(collection: string, query: any, value: any): Promise<[any, boolean]>;
    abstract delete(collection: string, id: string): Promise<[any, boolean]>;
    abstract deleteMany(collection: string, query: { [index: string]: any }): Promise<[Array<any>, boolean]>;
    abstract findMany(collection: string, query: { [index: string]: any }): Promise<[Array<any>, boolean]>;
    abstract findManySortLimit(collection: string, query: { [index: string]: any; }, limit: number, sort: 1 | -1): Promise<[Array<any>, boolean]>;
    abstract findOne(collection: string, query: { [index: string]: any }): Promise<[any, boolean]>;
}

// --- 3. Implementação Frontend (Com Persistência de Logs) ---

export class ClientRepository extends BaseRepository {
    // Simula tabela de logs no IndexedDB
    private localLogs: LogEntry[] = [];
    private lastSyncTimestamp: number = 0; // Guardado no localStorage na vida real

    // --- Implementação dos Métodos de Log ---
    async saveLog(entry: LogEntry): Promise<void> {
        console.log(`[Frontend Log] Salvando operação offline/local: ${entry.action} em ${entry.collection}`);
        await this.create("_Logs", entry)
    }

    async getUnsyncedLogs(): Promise<[LogEntry[], boolean]> {
        return this.findMany("_Logs", {synced: false})
    }

    async markLogsAsSynced(logIds: string[]): Promise<void> {
        console.log(logIds, this.localLogs)
        logIds.forEach(logId => this.update("_Logs", logId, {synced: true}))
        // Atualiza timestamp local
        this.lastSyncTimestamp = Date.now();
    }

    async getLogsSince(timestamp: number): Promise<LogEntry[]> {
        // Frontend raramente precisa servir logs para outros, mas implementamos por contrato
        return this.localLogs.filter(l => l.timestamp > timestamp);
    }

    getLastSyncTimestamp(): number {
        return this.lastSyncTimestamp;
    }

    setLastSyncTimestamp(ts: number) {
        this.lastSyncTimestamp = ts;
    }

    // --- Implementação dos Métodos de Dados (Mock) ---
    async create(collection: string, value: any): Promise<[any, boolean]> {
        const savedData = { ...value, _id: value._id || Math.random().toString() };
        console.log(`[Frontend IDB] Created in ${collection}`, savedData);
        await this.fireTrigger(collection, 'create', savedData);
        return [savedData, true];
    }

    async update(collection: string, id: string, value: any): Promise<[any, boolean]> {
        const updatedData = { ...value, _id: id };
        console.log(`[Frontend IDB] Updated ${id} in ${collection}`);
        await this.fireTrigger(collection, 'update', updatedData);
        return [updatedData, true];
    }

    async delete(collection: string, id: string): Promise<[any, boolean]> {
        console.log(`[Frontend IDB] Deleted ${id} from ${collection}`);
        await this.fireTrigger(collection, 'delete', { _id: id });
        return [{ _id: id }, true];
    }

    async updateQuery(c: string, q: any, v: any) { return [{}, true] as [any, boolean]; }
    async updateMany(c: string, q: any, v: any) { return [{}, true] as [any, boolean]; }
    async deleteMany(c: string, q: any) { return [[], true] as [Array<any>, boolean]; }
    async findMany(c: string, q: any) { return [[], true] as [Array<any>, boolean]; }
    async findManySortLimit(c: string, q: any, l: number, s: 1 | -1) { return [[], true] as [Array<any>, boolean]; }
    async findOne(c: string, q: any) { return [{}, true] as [any, boolean]; }
}

// --- 4. O Sincronizador (Bridge com Recuperação) ---

export class RepositorySynchronizer {
    private repo: BaseRepository;
    private socket: ClientSocket;
    private sourceId: string;
    isSetup = false
    constructor(repo: BaseRepository, socket: ClientSocket) {
        this.repo = repo;
        this.socket = socket;
        this.sourceId = `CLIENT_${ulid()}`;
    }

    setup() {
        this.isSetup = true
        this.setupRealtimeSync();
        this.setupRecoveryProtocol();

        // inicia handshake de recuperação ao conectar
        //this.initiateRecovery();
        return this
    }

    private setupRealtimeSync() {
        // Envio em Tempo Real (Só envia se estiver online)
        this.repo.createTriggerTo("all", async (collection: string, data: any, type: string, logId) => {
            if (this.socket.connected) {
                const payload: SyncPayload = {
                    sourceId: this.sourceId,
                    collection: collection,
                    action: type as any,
                    data: type === 'delete' ? undefined : data,
                    id: data._id || data.id,
                    timestamp: Date.now(),
                    logId
                };
                this.socket.emit("repository:realtime", payload);
                const [, err] = await this.socket.wait(`sync:realtime_ack_${payload.logId}`, 4000)
                console.log("Recebeu Ack:", err)
                if(!err)
                    this.repo.markLogsAsSynced([logId])
                // TODO: servidor não está confirmado ack no realtime
            }
        }, "create", "update", "delete");

        // Recebimento em Tempo Real
        this.socket.on("repository:realtime", async (payload: SyncPayload) => {
            if (payload.sourceId === this.sourceId) return;
            await this.applyChange(payload);

            // Atualiza o timestamp da última sync
            if (payload.timestamp) {
                (this.repo as ClientRepository).setLastSyncTimestamp(payload.timestamp);
            }
        });
    }

    private setupRecoveryProtocol() {
        // === LADO CLIENTE ===

        // Ao conectar/reconectar, inicia a recuperação

        // Resposta do Servidor com dados perdidos
        this.socket.on('sync:recovery_data', async (logs: LogEntry[]) => {
            console.log(`[Sync] Recebidos ${logs.length} logs perdidos do servidor.`);
            for (const log of logs) {
                await this.applyChange({
                    sourceId: 'SERVER_HISTORY',
                    collection: log.collection,
                    action: log.action,
                    data: log.data,
                    id: log.docId
                });
            }
            if (logs.length > 0) {
                const lastTs = logs[logs.length - 1].timestamp;
                (this.repo as ClientRepository).setLastSyncTimestamp(lastTs);
            }
        });

        // Confirmação do Servidor que recebeu nossos dados offline
        this.socket.on('sync:ack', async (logIds: string[]) => {
            await this.repo.markLogsAsSynced(logIds);
            console.log(`[Sync] ${logIds.length} operações locais confirmadas pelo servidor.`);
        });


    }

    dumpDataList: { collection: string, documents: any[] }[] = []
    isDumping = false

    async setData() {
        const event = 'sync:request_dump'
        this.socket.emit(event, {});
        this.socket.on(event, async (data) => {
            const {collection} = data
            if(collection === "_Logs") return
            this.dumpDataList.push(data)
            if (this.isDumping) return
            this.dumpData()
        });
    }

    async dumpData() {
        this.isDumping = true
        const data = this.dumpDataList.shift()
        if (!data) return this.isDumping = false
        const { collection, documents } = data
        for (const document of documents) {
            await this.repo.create(collection, document, true)
        }
        this.dumpData()
    }

    // Processo de Recuperação (Executado pelo Cliente)
    async initiateRecovery() {
        console.log("chegou no initiateRecovery")
        const clientRepo = this.repo as ClientRepository;
        const lastSync = clientRepo.getLastSyncTimestamp();

        // 1. Pedir ao servidor o que eu perdi (PULL)
        this.socket.emit('sync:request_missing', { lastSyncTimestamp: lastSync });

        // 2. Enviar ao servidor o que eu fiz offline (PUSH)
        const [unsynced] = await clientRepo.getUnsyncedLogs();
        if (unsynced.length > 0) {
            console.log(`[Sync] Enviando ${unsynced.length} operações pendentes para o servidor.`);
            this.socket.emit('sync:push_offline', unsynced);
        }
    }

    // Aplica a mudança no banco local
    private async applyChange(payload: SyncPayload) {
        await this.repo.performSyncOperation(async () => {
            switch (payload.action) {
                case "create":
                    await this.repo.create(payload.collection, payload.data);
                    break;
                case "update":
                    if (payload.id) await this.repo.update(payload.collection, payload.id, payload.data);
                    break;
                case "delete":
                    if (payload.id) await this.repo.delete(payload.collection, payload.id);
                    break;
            }
        });
    }
}