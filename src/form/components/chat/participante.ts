import App from "../../../app"

type MsgTypeConstructor = new (chat: string, owner: string, ...data: any[]) => Msg

interface MsgTypesMap {
    "text": [text: string]
    "orderlist": [order: string]
    "orderstatus": [order: string]
    "input": [type: string, key: string, label: string, placeholder: string, clientid: string]
    "answer": [text: string, data: any]
    "select": [key: string, label: string, options: { value: string, name: string }[], clientid: string]
}

interface MsgTypesReturnMap {
    "text": void
    "orderlist": void
    "orderstatus": void
    "input": Promise<any>
    "answer": void
    "select": Promise<any>
}
class Msg {
    type: string
    chat: string
    owner: string
    constructor(type: string, chat: string, owner: string) {
        this.type = type
        this.chat = chat
        this.owner = owner
    }
}
class MsgText extends Msg {
    text: string
    constructor(chat: string, owner: string, ...data: MsgTypesMap["text"]) {
        super("text", chat, owner);
        [this.text] = data;
    }
}

class MsgAnswer extends Msg {
    text: string
    data: any
    constructor(chat: string, owner: string, ...data: MsgTypesMap["answer"]) {
        super("answer", chat, owner);
        [this.text, this.data] = data;
    }
}

class MsgOrderList<T extends "orderlist"> extends Msg {
    order: string
    constructor(chat: string, owner: string, ...data: MsgTypesMap[T]) {
        super("orderlist", chat, owner);
        [this.order] = data
    }
}

class MsgOrderStatus<T extends "orderstatus"> extends Msg {
    order: string
    constructor(chat: string, owner: string, ...data: MsgTypesMap[T]) {
        super("orderstatus", chat, owner);
        [this.order] = data
    }
}

class MsgInput<T extends "input"> extends Msg {
    inputType: string
    key: string
    label: string
    placeholder: string
    clientid: string
    constructor(chat: string, owner: string, ...data: MsgTypesMap[T]) {
        super("input", chat, owner);
        [this.inputType, this.key, this.label, this.placeholder, this.clientid] = data
    }
}

class MsgSelect<T extends "select"> extends Msg {
    key: string
    label: string
    options: { value: string, name: string }[]
    clientid: string
    constructor(chat: string, owner: string, ...data: MsgTypesMap[T]) {
        super("select", chat, owner);
        [this.key, this.label, this.options, this.clientid] = data
    }
}
export default class Participante {
    id: string
    app: App
    chat: any
    local: boolean
    constructor(app: App, id: string, local?: boolean) {
        this.app = app
        this.id = id
        this.local = local ? local : false
    }
    setChat(chat: any) {
        this.chat = chat
    }

    listMsgTypes: { [key: string]: MsgTypeConstructor } = {
        "text": MsgText,
        "orderlist": MsgOrderList,
        "orderstatus": MsgOrderStatus,
        "input": MsgInput,
        "answer": MsgAnswer,
        "select": MsgSelect,
    }
    async createMsg<T extends keyof MsgTypesMap>(type: T, ...data: MsgTypesMap[T]): Promise<any> {
        const msg = new this.listMsgTypes[type](this.chat._id, this.id, ...data)
        this.app.repositoryMemory.create("Chatmensagens", msg)
        if (msg.type === "select" || msg.type === "input")
            return new Promise(res => {
                this.app.repositoryMemory.createTriggerTo("Chatmensagens", (m, t, triggerid) => {
                    if (m.type === "answer" && m.owner === (msg as any).clientid) {
                        this.app.repositoryMemory.deleteTrigger("Chatmensagens", t, triggerid)
                        res(m.data)
                    }
                }, "create")
            })
        else return {}
    }
}