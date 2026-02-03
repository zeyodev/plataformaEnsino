export interface MsgTypesMap {
    "text": [text: string]
    "orderlist": [order: string]
    "orderstatus": [order: string]
    "input": [type: string, key: string, label: string, placeholder: string, clientid: string]
    "answer": [text: string, data: any]
    "select": [key: string, label: string, options: { value: string, name: string }[], clientid: string]
}

export interface Message {
    _id: string;
    type: string;
    chat: string;
    owner: string;
}

export type MsgTypeConstructor = new (chat: string, owner: string, ...data: any[]) => Message