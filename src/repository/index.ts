export type cbCollection = (value: any, type: string, triggerid: string) => void
export type cbAny = (collection: string, value: any, type: string, triggerid: string, origin: string) => void

export default interface Repository {
    methodsMap: { [key: string]: any }
    create(collection: string, value: any): Promise<[any, boolean]>;
    update(collection: string, id: string, value: any): Promise<[any, boolean]>
    updateQuery(collection: string, query: any, value: any): Promise<[any, boolean]>
    updateMany(collection: string, query: any, value: any): Promise<[any, boolean]>
    delete(collection: string, id: string): Promise<[any, boolean]>
    deleteMany(collection: string, query: { [index: string]: any }): Promise<[Array<any>, boolean]>;
    findMany(collection: string, query: { [index: string]: any }): Promise<[Array<any>, boolean]>;
    findManySortLimit(collection: string, query: { [index: string]: any; }, limit: number, sort: 1 | -1): Promise<[Array<any>, boolean]>;
    findOne(collection: string, query: { [index: string]: any }): Promise<[any, boolean]>;
    createTriggerTo<T extends string | "all">(collection: T, cb: (T extends "all" ? cbAny : cbCollection), ...types: Array<"create" | "read" | "update" | "delete">): string
    deleteTrigger(collection: string, type: string, triggerid: string): void
}