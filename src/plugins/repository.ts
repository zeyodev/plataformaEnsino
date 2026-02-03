import Repository from "../repository"
import RepositoryIndexedDB from "../repository/IndexedDB"
import RepositoryMemory from "../repository/memory"
import { ZeyoAppConstructor } from "./lib"

export default function Repository<Base extends ZeyoAppConstructor>(base: Base) {
    return class extends base {
        repository = new RepositoryIndexedDB()
        setRepository(repository?: any) {
            //this.repository = repository
            return this
        }
    }
}