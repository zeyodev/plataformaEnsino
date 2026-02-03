import Z, { Zeyo, ZeyoAs } from "zeyo"
import FormElement from "../_element"
import style from "./chat.module.css";
import chatstyle from "./style.module.css"
import ComponentMsgText from "./msgComponentes/text"
import ComponentMsgItensCarrinho from "./msgComponentes/itensCarrinho"
import ComponentMsgInput from "./msgComponentes/input";
import ComponentMsgAnswer from "./msgComponentes/answer"
import ComponentMsgSelect from "./msgComponentes/select"
import App from "../../../app";


export default class Chat extends FormElement<"div"> {
    list: { name: string, day: number, horarios: { inicio: string, fim: string }[] }[] = []
    zBody: Zeyo
    app: App
    constructor(label: string, data: {placeholder: string, app: App}) {
        super("div", label, data.placeholder)
        this.app = data.app
        this.zBody = Z("div").class(chatstyle.chat__body).object(o => {
            data.app.repositoryMemory.createTriggerTo("Chatmensagens", (m) => {
                this.setMsg(o, m)
            }, "create")

            /* Responsavel por fazer o scroll automatico no chat */
            const config = { childList: true };

            const callback: MutationCallback = function (mutationsList: MutationRecord[], observer: MutationObserver) {
                console.log(o.element)
                for (let mutation of mutationsList) {
                    console.log(mutation.type)
                    if (mutation.type === "childList") {
                        o.element.scrollTo(0, o.element.scrollHeight);
                    }
                }
            };

            const observer = new MutationObserver(callback);
            observer.observe(o.element, config);
        })
    }
    create(): Zeyo {
        return this.zElement = Z("div").class(style.pagina).children(
            Z("header").children(
                Z("h2").text("Nome do Pedido")
            ),
            this.zBody
        )
    }

    componentslist: { [key: string]: new (app: App, msg: any) => Zeyo } = {
        "text": ComponentMsgText,
        "orderlist": ComponentMsgItensCarrinho,
        "input": ComponentMsgInput,
        "answer": ComponentMsgAnswer,
        "select": ComponentMsgSelect,
    }
    setMsg(o: Zeyo, msg: any) {
        console.log("===>", msg)
        o.children(
            new this.componentslist[msg.type](this.app, msg).class(msg.type != "orderlist" ?(msg.owner === "atendente" ? chatstyle.bot : chatstyle.user): "freeballon").object(o => {
                if(msg.text && msg.text === "Olá") o.class(chatstyle["margin-change"])
            })
        )
    }

    getValue() {
        return ""
    }

    setValue(value: Date) {

    }
}