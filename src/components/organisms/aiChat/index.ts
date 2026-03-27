import Z, { Div, div, h3, p, button as btn } from "zeyo";
import style from "./style.module.css";
import iconSend from "lucideIcons/iconSend";
import iconMessageCircle from "lucideIcons/iconMessageCircle";
import App from "../../../app";
import { renderMarkdown } from "./markdown";

const AI_CHAT_URL =  "http://localhost:8000" // process.env.AI_CHAT_URL ||

const acoesPredefinidas = [
    { label: "Precificar servico", prompt: "Me ajude a precificar um servico para meu cliente" },
    { label: "Plano de negocios", prompt: "Me ajude a montar um plano de negocios" },
    { label: "Estrategia de vendas", prompt: "Quero criar uma estrategia de vendas eficiente" },
    { label: "Analise de mercado", prompt: "Faca uma analise de mercado para meu nicho" },
    { label: "Gestao financeira", prompt: "Me ajude com a gestao financeira da minha empresa" },
    { label: "Marketing digital", prompt: "Crie uma estrategia de marketing digital para meu negocio" },
]

function generateThreadId(): string {
    return crypto.randomUUID()
}

export default (app: App) => (new class AIChat extends Div {
    messages = div().class(style.messages)
    input = Z("input")
    threadId = generateThreadId()
    sending = false

    addMessage(text: string, sender: "user" | "ai") {
        const msg = div().class(style.message, style[sender])
        if (sender === "ai") {
            msg.HTML(renderMarkdown(text))
        } else {
            msg.text(text)
        }
        this.messages.children(msg)
        this.scrollToBottom()
        return msg
    }

    addStreamingMessage(): { element: HTMLElement, update: (text: string) => void } {
        const msg = div().class(style.message, style.ai)
        this.messages.children(msg)
        let fullText = ""
        return {
            element: msg.element,
            update: (chunk: string) => {
                fullText += chunk
                msg.HTML(renderMarkdown(fullText))
                this.scrollToBottom()
            }
        }
    }

    scrollToBottom() {
        this.messages.element.scrollTop = this.messages.element.scrollHeight
    }

    async sendToServer(text: string) {
        if (this.sending) return
        this.sending = true

        const stream = this.addStreamingMessage()

        try {
            const response = await fetch(`${AI_CHAT_URL}/api/chat`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: text,
                    thread_id: this.threadId,
                    stream: true,
                    model: "qwen/qwen3.5-flash-02-23",
                    temperature: 0.7,
                }),
            })

            if (!response.ok) {
                stream.update("Desculpe, ocorreu um erro ao processar sua solicitacao.")
                this.sending = false
                return
            }

            const reader = response.body?.getReader()
            if (!reader) {
                stream.update("Desculpe, ocorreu um erro ao processar sua solicitacao.")
                this.sending = false
                return
            }

            const decoder = new TextDecoder()
            let buffer = ""

            while (true) {
                const { done, value } = await reader.read()
                if (done) break

                buffer += decoder.decode(value, { stream: true })

                const lines = buffer.split("\n")
                buffer = lines.pop() || ""

                for (const line of lines) {
                    const trimmed = line.trim()
                    if (!trimmed) continue

                    if (trimmed.startsWith("data: ")) {
                        const data = trimmed.slice(6)
                        if (data === "[DONE]") continue
                        try {
                            const parsed = JSON.parse(data)
                            const content = parsed.choices?.[0]?.delta?.content
                                || parsed.content
                                || parsed.text
                                || parsed.delta
                                || ""
                            if (content) stream.update(content)
                        } catch {
                            stream.update(data)
                        }
                    } else {
                        try {
                            const parsed = JSON.parse(trimmed)
                            const content = parsed.choices?.[0]?.delta?.content
                                || parsed.content
                                || parsed.text
                                || parsed.delta
                                || ""
                            if (content) stream.update(content)
                        } catch {
                            // ignore unparseable lines
                        }
                    }
                }
            }

            // process remaining buffer
            if (buffer.trim()) {
                const trimmed = buffer.trim()
                if (trimmed.startsWith("data: ")) {
                    const data = trimmed.slice(6)
                    if (data !== "[DONE]") {
                        try {
                            const parsed = JSON.parse(data)
                            const content = parsed.choices?.[0]?.delta?.content || parsed.content || parsed.text || parsed.delta || ""
                            if (content) stream.update(content)
                        } catch {
                            stream.update(data)
                        }
                    }
                }
            }

            // if nothing was streamed, show fallback
            if (!stream.element.textContent?.trim()) {
                stream.update("Nao foi possivel obter uma resposta.")
            }
        } catch (err) {
            stream.update("Erro de conexao. Verifique se o servidor esta disponivel.")
        }

        this.sending = false
    }

    send(text: string) {
        if (!text.trim()) return
        this.addMessage(text, "user");
        (this.input.element as HTMLInputElement).value = ""
        this.sendToServer(text)
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
        o.messages.children(
            div().class(style.welcome).children(
                iconMessageCircle(),
                h3().text("Como posso ajudar?"),
                p().text("Escolha uma acao acima ou escreva sua duvida"),
            ),
        ),
        div().class(style.actions).children(
            ...acoesPredefinidas.map(acao =>
                (new class extends Div { }).class(style["action-btn"]).text(acao.label)
                    .click(() => o.send(acao.prompt))
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
