import App from "../app";
import RepositoryIndexedDB from "../repository/IndexedDB"
import IndexedDB from "../repository/IndexedDB/config";
import { ZeyoAppConstructor } from "./lib"



export default function DBs<Base extends ZeyoAppConstructor>(base: Base) {
    return class extends base {
        dbs: {[key: string]: RepositoryIndexedDB} = {};
        setRepo(repository: RepositoryIndexedDB) {
            this.dbs[repository.idb.name] = repository
            return this;
        }
        setDB(dbname: string) {
            if(Object.prototype.hasOwnProperty.call(this.dbs, dbname))
                return this;
            
            const idb = new IndexedDB(dbname);
            this.dbs[dbname] = new RepositoryIndexedDB(idb);
            return this;
        }
    }
}