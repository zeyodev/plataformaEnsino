import Repository from "../repository"
import RepositoryIndexedDB from "../repository/IndexedDB"
import RepositoryHTTP from "../repository/http"
import RepositoryMemory from "../repository/dontread"
import { ZeyoAppConstructor } from "./lib"

declare const process: { env: { [key: string]: string } }

export default function RepositoryPlugin<Base extends ZeyoAppConstructor>(base: Base) {
    return class extends base {
        repository: Repository = new RepositoryMemory()
        repositoryHTTP: RepositoryHTTP | null = null

        setRepository(repository?: any) {
            if (repository) this.repository = repository
            return this
        }

        setRepositoryHTTP() {
            const serverUrl = (process.env.SERVER_URL as string) || window.location.origin
            this.repositoryHTTP = new RepositoryHTTP(serverUrl, () => localStorage.getItem('accessToken'))
            this.repository = this.repositoryHTTP
            return this
        }
    }
}