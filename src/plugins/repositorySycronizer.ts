import RepositoryMemory from "../repository/memory"
import { RepositorySynchronizer } from "../repository/sync"
import { ZeyoAppConstructor } from "./lib"

export default function RepositorySyncronizer<Base extends ZeyoAppConstructor>(base: Base) {
    return class extends base {
        synchronizer: RepositorySynchronizer = new RepositorySynchronizer(({} as any), ({} as any))
        setSyncronizer(repository: any, socket: any) {
            if (!this.synchronizer.isSetup)
                this.synchronizer = new RepositorySynchronizer(repository, socket).setup()
        }
    }
}