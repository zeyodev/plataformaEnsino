import RepositoryMemory from "../repository/estatico"
import { ZeyoAppConstructor } from "./lib"

export default function RepositoryMem<Base extends ZeyoAppConstructor>(base: Base) {
    return class extends base {
        repositoryMemory: RepositoryMemory = new RepositoryMemory()
    }
}