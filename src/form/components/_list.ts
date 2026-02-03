import Button from "./button";
import Esqueci from "./esqueceu";
import ObjectV from "./objectv";
import Password from "./password";
import Input from "./input";
import DateTime from "./date";
import Option from "./option";
import ObjectH from "./objecth";
import Checkbox from "./checkbox";
import Select from "./select";
import Show from "./show";
import Semana from "./semana";
import Time from "./time";
import File, { FileAction } from "./file";
import ObjectHImg from "./objecthimg";
import Chat from "./chat/chat";
interface Adapter {
    getFields(): Promise<{ [index: string]: any }>
}
//export type List = Array<{ value: string; name: string } | Adapter>
export type NameValue = { value: string; name: string }
export type NameValueList = Array<NameValue>
//Action se retornar true faz acao normal, se false retorna um. Só esta funcionando no ObjectV
export type returns = "object" | "none" | "back" | "refresh" | "begin"
export type ActionFunction = (o?: any) => void
export type ActionFunctionType<T> = (o: T) => void
export type Action2 = (o?: any) => Promise<returns> | returns

export interface FieldsTypes {
    "text": [label: string, placeholder: string];
    "number": [label: string, placeholder: string];
    "password": [label: string, placeholder: string];
    "show": [label: string];
    "select": [label: string, placeholder: string, list: NameValueList];
    "selectrepete": [label: string, placeholder: string, list: NameValueList];
    "selectfile": [label: string, placeholder: string];
    "selectrange": [label: string];
    "objecth": [label: string, list: Adapter[], action?: ActionFunction];
    "objectC": [label: string];
    "objectV": [label: string, list: Adapter[], action?: ActionFunction];
    "objectVL": [label: string, list: Adapter[], extra: {order?: ActionFunction, action?: Action2}];
    "objectTable": [label: string];
    "objectm": [label: string];
    "objectVIMG": [label: string];
    "disabled": [label: string, placeholder: string];
    "toogle": [label: string, placeholder: string];
    "add": [label: string, placeholder: string];
    "skip": [label: string, placeholder: string];
    "time": [label: string, placeholder: string];
    "times": [label: string, placeholder: string];
    "duracao": [label: string, placeholder: string];
    "button": [label: string, placeholder: string];
    "date": [label: string, placeholder: string];
    "textarea": [label: string, placeholder: string];
    "opcoes": [label: string];
    "snack": [label: string];
    "error": [label: string];
    "semana": [list: any[], botao: { action: ActionFunction, text: string }, action?: ActionFunction, label?: string]
}
export const FieldsTypesMap: {[key: string]: string[]} = {
    "text": ["label", "placeholder"],
    "number": ["label", "placeholder"],
    "password": ["label", "placeholder"],
    "show": ["label"],
    "select": ["label", "placeholder", "list"],
    "selectrepete": ["label", "placeholder", "list"],
    "selectfile": ["label", "placeholder"],
    "selectrange": ["label"],
    "objecth": ["label", "list", "action"],
    "objectC": ["label"],
    "objectV": ["label", "list", "action"],
    "objectVL": ["label", "list", "extra"],
    "objectTable": ["label"],
    "objectm": ["label"],
    "objectVIMG": ["label"],
    "disabled": ["label", "placeholder"],
    "toogle": ["label", "placeholder"],
    "add": ["label", "placeholder"],
    "skip": ["label", "placeholder"],
    "time": ["label", "placeholder"],
    "times": ["label", "placeholder"],
    "duracao": ["label", "placeholder"],
    "button": ["label", "placeholder"],
    "date": ["label", "placeholder"],
    "textarea": ["label", "placeholder"],
    "opcoes": ["label"],
    "snack": ["label"],
    "error": ["label"],
}
export interface List {
    "text": Input
    "show": Show
    "chat": Chat
    "date": Input
    "datetime-local": DateTime
    "password": Password
    "esqueci": Esqueci
    "objectv": ObjectV
    "objecth": ObjectH
    "objecthimg": ObjectHImg
    "select": Select,
    "button": Button
    "option": Option
    "checkbox": Checkbox,
    "semana": Semana,
    "time": Time
    "file": File
}
interface TObjects {
    valueName: {value: string; name: string}
    adapter: Adapter
}
type TObjectV<T extends keyof TObjects> = [list: TObjects[T][], action?: ActionFunctionType<TObjects[T]>, label?: string]
export interface ListMatriz {
    "text": [label: string, placeholder: string];
    "show": [label: string];
    "chat": [label: string, data: {placeholder: string, app: any}];
    "date": [label: string, placeholder: string]
    "file": [label: string, placeholder: string, action: FileAction]
    "time": [label: string];
    "datetime-local": [label: string, placeholder: string]
    "password": [label: string, placeholder: string]
    "esqueci": [label: string, placeholder: string]
    "objectv": [list: any[], action?: ActionFunction, label?: string]
    "objectva": TObjectV<"adapter">
    "objecth": [label: string, list: Adapter[], action?: ActionFunction]
    "objecthimg": [label: string, list: Adapter[], action?: ActionFunction]
    "select": [label: string, list: {value: string, name: string}[]]
    "button": [label: string, action?: ActionFunction]
    "option": [label: string, placeholder: string]
    "checkbox": [label: string, placeholder: string, list: any[]]
    "semana": [list: any[], botao: { action: ActionFunction, text: string }, action?: ActionFunction, label?: string]
}

export class FieldList {
    static list: { [key: string]: any } = {
        "text": Input,
        "show": Show,
        "chat": Chat,
        "date": Input,
        "datetime-local": DateTime,
        "password": Password,
        "esqueci": Esqueci,
        "objectv": ObjectV,
        "objecth": ObjectH,
        "objecthimg": ObjectHImg,
        "select": Select,
        "button": Button,
        "option": Option,
        "checkbox": Checkbox,
        "semana": Semana,
        "time": Time,
        "file": File,
    }
}