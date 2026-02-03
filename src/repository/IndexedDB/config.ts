import App from "../../app";

//declare let data: { [key: string]: any[] };

export default class IndexedDB {
    indexedDB = window.indexedDB
    version = 0
    db: IDBDatabase = (null as any)
    request: IDBOpenDBRequest
    addingIndex = false
    name: string
    /**
     * 
     * @param name Nome do Banco de dados
     * @param customonupgradeneeded Serve para indicar se o on upgrade sera gerado fora da classe
     * @param version 
     */
    constructor(name: string, customonupgradeneeded?: boolean, version?: number) {
        this.name = name
        this.request = this.indexedDB.open(name);

        //talves eu nao precise guardar a versao
        this.version = Number(localStorage.getItem("IDBVersion"))
        this.request.onerror = function (event) {
            console.error("An error occuerred with IndexedDB");
            console.error(event);
        };
        if (!customonupgradeneeded)
            this.request.onupgradeneeded = this.onupgradeneeded.bind(this)
        this.request.onsuccess = this.onsuccess.bind(this)
    }

    onupgradeneeded() {
        console.log("👉 ONUPGRADENEEDED")
        const db = this.request.result;
        /* for (const key in data) {
            if (key === "TimeStamp") {
                localStorage.setItem(key, data[key].toString())
                continue
            }
            const store = db.createObjectStore(key, { keyPath: "_id" });
            console.log(data[key])
            data[key].forEach(element => {
                store.put(element)
            });
        } */
        /* store.createIndex("cars_colour", ["colour"], { unique: false });
        store.createIndex("colour_and_make", ["colour", "make"], { unique: false }); */
    }

    onsuccess() {
        this.db = this.request.result
        console.log("👉 Version", this.request.result.version)
        /* data = {} */
    }

    addIndex(collection: string, keys: string[], index: string): Promise<[any, boolean]> {
        this.addingIndex = true
        this.db.close()
        return new Promise(res => {
            const request = indexedDB.open(this.name, this.db.version + 1);
            console.log(request)
            request.onerror = (event) => {
                this.addingIndex = false
                res([`An error occuerred with IndexedDB: ${(event as any).error}`, true]);
            };

            request.onupgradeneeded = (event) => {
                const store = (event as any).target.transaction.objectStore(collection);
                const contains = store.indexNames.contains(index)
                if (!contains) {
                    console.log("nao contem", index)
                    store.createIndex(index, keys, { unique: false });
                }
            }

            request.onsuccess = () => {
                this.db = request.result;
                this.addingIndex = false
                res([this.db, false])
            }
        })
    }

    addStore(collection: string): Promise<[any, boolean]> {
        this.db.close()
        return new Promise(res => {
            const request = indexedDB.open(this.name, this.db.version + 1);
            console.log(request)
            request.onerror = (event) => {
                console.error(event)
                res([`An error occuerred with IndexedDB: ${(event as any).error}`, true]);
            };

            request.onupgradeneeded = (event) => {
                const db = (event as any).target.result;
                db.createObjectStore(collection, { keyPath: "_id" });
            }

            request.onsuccess = () => {
                this.db = request.result;
                res([this.db, false])
            }
        })
    }

    deleteStore(collection: string): Promise<[any, boolean]> {
        this.db.close()
        return new Promise(res => {
            const request = indexedDB.open(this.name, this.db.version + 1);
            console.log(request)
            request.onerror = (event) => {
                res([`An error occuerred with IndexedDB: ${(event as any).error}`, true]);
            };

            request.onupgradeneeded = (event) => {
                const db = (event as any).target.result;
                db.deleteObjectStore(collection);
            }

            request.onsuccess = () => {
                this.db = request.result;
                res([this.db, false])
            }
        })
    }

    /* async checkIfUpdated(app: App) {
        await new Promise(res => setTimeout(() => {
            res(true)
        }, 3000))

        const response = await fetch(`${location.origin}/checkupdate`)
        const update = await response.json()
        console.log(update)

        const localTimestamp = Number(localStorage.getItem("TimeStamp"))
        console.log(localTimestamp, update.TimeStamp)
        if (localTimestamp >= update.TimeStamp)
            return;

        localStorage.setItem("TimeStamp", update.TimeStamp.toString())

        console.log("atualizando dados aguarde...")
        delete update.TimeStamp
        const transaction = this.db.transaction(Object.keys(update), "readwrite")
        for (const key in update) {
            //this.db.deleteObjectStore(key)
            const store = transaction.objectStore(key);
            console.log(update[key])
            update[key].forEach((element: any) => {
                store.put(element)
            });
        }

        console.log("dados atualizados")
        app.navigation.setPage(app)
    } */
}