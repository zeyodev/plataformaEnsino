import Chat from "..";
import App from "../../../app";
//import Cliente from "../../entity/cliente";
import MsgAnswer from "../Entitys/Message/answer";
import MsgText from "../Entitys/Message/text";
import { MsgTypeConstructor, MsgTypesMap } from "../Entitys/Message/types";

export default class CreateMessage {
    public app: App;

    constructor(app: App) {
        this.app = app;
    }
    listMsgTypes: { [key: string]: MsgTypeConstructor } = {
        "text": MsgText,
        "answer": MsgAnswer,
        /* "input": MsgInput,
        "select": MsgSelect,
        "orderlist": MsgOrderList,
        "orderstatus": MsgOrderStatus, */
    }
    /**
     * Essa metodo cria uma mensagem e envia para o repositório
     * @param type 
     * @param chat 
     * @param sender 
     */
    public async execute<T extends keyof MsgTypesMap>(type: T, chat: Chat, sender: any, ...data: MsgTypesMap[T]) {
        // Para cada tipo de mensagem cria uma nova instancia
        const message = new this.listMsgTypes[type](chat._id, sender._id, ...data);
        const [result, error] = await this.app.repository.create("Chatmensagens", message);
        // Na classe Participante tem um exemplo de como fazer o answer do input
        console.log(result, error);
    }
}
