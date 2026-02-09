import { ulid } from "ulid";
import App from "./app";
import Root from "./states/_root";
import Context from "./states/context";
const app = new App()
const context = new Context(app, new Root())
//const idb = new IndexedDB("metaorg")
//idb.checkIfUpdated(app)
app.setRepository()
    .setContext(context)

class Queue {
    isdequeuing = false;
    queue: [database: string, action: string, collection: string, data: any][] = [];
    constructor(private app: App) {
        this.queue = [];
    }

    // Enqueue a new message to the queue
    enqueue(...params: [database: string, action: string, collection: string, data: any]) {
        this.queue.push(params);
    }

    // Dequeue and process messages from the queue
    async dequeue() {
        if (this.isdequeuing === true) return;
        this.isdequeuing = true;
        while (this.queue.length > 0) {
            const next = this.queue.shift();
            if (!next) break;
            const [database, action, collection, data] = next;
            console.log(database, action, collection, data);
            /* if(this.app.repository.idb.name === database)
                app.setRepo(this.app.repository)
            else */
                app.setDB(database);
            await this.app.dbs[database].methodsMap[action](collection, data, "repositorysync");
        }
        this.isdequeuing = false;
    }
}

const queue = new Queue(app);
window.addEventListener("load", async () => {

    

    console.log("load", document.querySelector("main"))
    const lastSync = localStorage.getItem("lastSync");
    const time = lastSync ? Number(lastSync) : 0;

    

    //app.socket.emit("uc/repositorysync", { time })
})