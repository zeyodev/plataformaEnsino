import Repository, { cbAny, cbCollection } from ".";
export default class RepositoryEmpty implements Repository {
    methodsMap: { [key: string]: any; }= {};
    createTriggerTo<T extends string | "all">(collection: T, cb: (T extends "all" ? cbAny : cbCollection), ...types: Array<"create" | "read" | "update" | "delete">): string {
        throw new Error("Method not implemented.");
    }
    deleteTrigger(collection: string, type: string, triggerid: string): void {
        throw new Error("Method not implemented.");
    }
    create(collection: string, value: any): Promise<[any, boolean]> {
        throw new Error("Method not implemented.");
    }
    update(collection: string, id: string, value: any): Promise<[any, boolean]> {
        throw new Error("Method not implemented.");
    }
    updateQuery(collection: string, query: any, value: any): Promise<[any, boolean]> {
        throw new Error("Method not implemented.");
    }
    updateMany(collection: string, query: any, value: any): Promise<[any, boolean]> {
        throw new Error("Method not implemented.");
    }
    delete(collection: string, id: string): Promise<[any, boolean]> {
        throw new Error("Method not implemented.");
    }
    deleteMany(collection: string, query: { [index: string]: any; }): Promise<[any[], boolean]> {
        throw new Error("Method not implemented.");
    }
    findMany(collection: string, query: { [index: string]: any; }): Promise<[any[], boolean]> {
        throw new Error("Method not implemented.");
    }
    findManySortLimit(collection: string, query: { [index: string]: any; }, limit: number, sort: 1 | -1): Promise<[any[], boolean]> {
        throw new Error("Method not implemented.");
    }
    findOne(collection: string, query: { [index: string]: any; }): Promise<[any, boolean]> {
        throw new Error("Method not implemented.");
    }
}