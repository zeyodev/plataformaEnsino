import IndexedDB from "../../config";
import Group from "./group";
import Lookup from "./lookup";
import Project from "./project";
import Stage from "./stage";
import Unwind from "./unwind";

export default class Stages extends Group(Project(Unwind(Lookup(Stage)))) {
    list: { [key: string]: (value: any, params: any,  action: (cursor: IDBCursor, value: any) => Promise<void>) => Promise<void> }
    constructor(idb: IndexedDB, transaction: IDBTransaction) {
        super(idb, transaction)
        this.list = {
            "lookup": this.lookup.bind(this),
            "unwind": this.unwind.bind(this),
            "project": this.project.bind(this),
            "group": this.group.bind(this)
        }
    }
}