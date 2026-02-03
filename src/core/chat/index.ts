//import Cliente from "../entity/cliente";
import CreateMessage from "./UseCases/CreateMessage";

export default class Chat {
    constructor(public _id: string, public user: any, public usecase: CreateMessage) {
        this._id = _id;
        this.user = user;
        this.usecase = usecase;
    }
}
