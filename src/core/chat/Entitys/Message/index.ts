export default class Message {
    _id: string
    type: string
    chat: string
    owner: string
    constructor(_id: string, type: string, chat: string, owner: string) {
        this._id = _id
        this.type = type
        this.chat = chat
        this.owner = owner
    }
}
