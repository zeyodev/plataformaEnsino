import Message from ".";
import { MsgTypesMap } from "./types";

export default class MsgText extends Message {
    text: string
    constructor(chat: string, owner: string, ...data: MsgTypesMap["text"]) {
        super("", "text", chat, owner);
        [this.text] = data;
    }
}