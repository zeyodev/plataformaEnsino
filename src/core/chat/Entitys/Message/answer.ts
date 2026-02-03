import Message from ".";
import { MsgTypesMap } from "./types";

export default class MsgAnswer extends Message {
    text: string;
    data: any;

    constructor(chat: string, owner: string, ...data: MsgTypesMap["answer"]) {
        super("", "answer", chat, owner);
        [this.text, this.data] = data;
    }
}
