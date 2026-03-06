import Z, { Div, div, h3, p, button as btn } from "zeyo";
import style from "./style.module.css";
import iconSend from "icons/src/business_and_online_icons/iconSend";
import iconMessageCircle from "icons/src/business_and_online_icons/iconMessageCircle";
import App from "../../../app";

const acoesPredefinidas = [
    { label: "Precificar servico", prompt: "Me ajude a precificar um servico para meu cliente" },
    { label: "Plano de negocios", prompt: "Me ajude a montar um plano de negocios" },
    { label: "Estrategia de vendas", prompt: "Quero criar uma estrategia de vendas eficiente" },
    { label: "Analise de mercado", prompt: "Faca uma analise de mercado para meu nicho" },
    { label: "Gestao financeira", prompt: "Me ajude com a gestao financeira da minha empresa" },
    { label: "Marketing digital", prompt: "Crie uma estrategia de marketing digital para meu negocio" },
]

export default (app: App) => (new class AIChat extends Div {
    messages = div().class(style.messages)
    input = Z("input")

    addMessage(text: string, sender: "user" | "ai") {
        this.messages.children(
            div().class(style.message, style[sender]).text(text)
        )
        this.messages.element.scrollTop = this.messages.element.scrollHeight
    }

    send(text: string) {
        if (!text.trim()) return
        this.addMessage(text, "user");
        (this.input.element as HTMLInputElement).value = ""
        this.addMessage("Estou processando sua solicitacao...", "ai")
    }

    setInitialQuery(query: string) {
        if (query.trim()) this.send(query)
        return this
    }
}).class(style.chat).object(o => {
    o.children(
        div().class(style.header).children(
            h3().text("Assistente AI"),
        ),
        div().class(style.actions).children(
            ...acoesPredefinidas.map(acao =>
                (new class extends Div {}).class(style["action-btn"]).text(acao.label)
                    .click(() => o.send(acao.prompt))
            ),
        ),
        o.messages.children(
            div().class(style.welcome).children(
                iconMessageCircle(),
                h3().text("Como posso ajudar?"),
                p().text("Escolha uma acao acima ou escreva sua duvida"),
            ),
        ),
        div().class(style["input-area"]).children(
            o.input.set("type", "text").set("placeholder", "Escreva sua duvida...")
                .on("keydown", (_, ev) => {
                    if (ev.key === "Enter") o.send((o.input.element as HTMLInputElement).value)
                }),
            div().class(style["send-btn"]).children(iconSend())
                .click(() => o.send((o.input.element as HTMLInputElement).value)),
        ),
    )
})
