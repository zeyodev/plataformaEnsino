import Repository from "../repository"
import RepositoryIndexedDB from "../repository/IndexedDB"
import RepositoryMemory from "../repository/memory"
import { ZeyoAppConstructor } from "./lib"

export default function Repository<Base extends ZeyoAppConstructor>(base: Base) {
    return class extends base {
        repository = new RepositoryMemory()
        setRepository(repository?: any) {
            if (repository) this.repository = repository
            return this
        }
    }
}