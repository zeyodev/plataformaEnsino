import { div, Div, h6, img } from "zeyo";
import App from "../../../../../app";
import styles from "./styles.module.css";
import Modal from "../../../../../states/Modal";
import modal from "../../../../molecules/modal";
import button from "../../../../atoms/button";
import iconPhone from "icons/src/business_and_online_icons/iconPhone";
import Abas from "../../../abas";
import Aba from "../../../abas/aba";
import iconMessageCircle from "icons/src/business_and_online_icons/iconMessageCircle";
import twoColumnsConfig from "../../../../molecules/twoColumnsConfig";
import FormFactoryCreateForm from "../../../../../features/formulario/form/factory/create";
import FormFactoryUpdateForm from "../../../../../features/formulario/form/factory/update";
import CRUD from "../../../CRUD";

// TODO: mostra no card as informacoes do contato se o contato nao tiver a info entao mostra do chat
export default (app: App, chat: any) => (new class extends Div {
    title = h6(chat.formattedTitle)
}).class(styles.chat)
    .set("id", chat.id._serialized)
    .set("draggable", true)
    .set("ondragstart", (e) => {
        e.dataTransfer?.setData("text", (e.target as any).id)
    }).object(ochat => {
        let contato: any = {};
        (async () => {
            [contato] = await app.repository.findOne("Contatos", { serializado: chat.id._serialized })
            ochat.title.text(contato.nome ? contato.nome : chat.formattedTitle)
        })();
        ochat.children(
            img().class(styles.image).thread(async (o) => {
                /* const { result } = await app.WWebJS("getChatPicture", chat.id._serialized)
                o.set("src", result.eurl) */
            }),
            div(h6(chat.formattedTitle))
        ).click(() => {
            app.context.setState(Modal("client", modal(app, twoColumnsConfig(
                new Abas(app).class("bg-dimmer", "br-5")
                    //.push(new Aba("atividades", "Atividades", "iconStar", div("Atividades"), true))
                    .push(new Aba("atendimentos", "Atendimentos", "iconScissors", div(), true).object(async a => {
                        const [colecao] = await app.repository.findOne("Colecoes", { nome: "Atendimentos" })
                        const [formularioCreate] = await app.repository.findOne("Formularios", { colecao: colecao._id, tipo: "create", titulo: "Novo Atendimento Cliente" })
                        const [formularioUpdate] = await app.repository.findOne("Formularios", { colecao: colecao._id, tipo: "update" })

                        a.componente.children(CRUD(app, "Atendimentos", { create: "Novo Agendamento" }, {
                            create: new FormFactoryCreateForm(app, formularioCreate, contato, colecao),
                            read: {cliente: contato._id},
                            update: (app, obj) => {
                                console.log(obj)
                                return new FormFactoryUpdateForm(app, formularioUpdate, obj, colecao)
                            }
                        }, {"servico/Servicos.nome": "string", data: "date", "profissional/Profissionais.nome": "string"}))
                    }))
                    .push(new Aba("comandas", "Comandas", "iconFileText", div("lista de comandas")))
                    .push(new Aba("lembretes", "Lembretes", "iconBell", div("lista de Lembretes a serem enviados"))),
                div(
                    div(
                        img().class(styles.image).thread(async (o) => {
                            /* const { result } = await app.WWebJS("getChatPicture", chat.id._serialized)
                            o.set("src", result.eurl) */
                        }),
                        div(
                            ochat.title,
                            button("Abrir Conversa").icon(iconMessageCircle()).style("no-bg").style("no-p").click(() => {
                                /* app.modal.hide()
                                app.WWebJS("openChatWindow", chat.id._serialized) */
                            })
                        ).class("d-grid", "jc-between")
                    ).class("d-flex", "gap-g"),
                ).class("d-grid", "gap-g", "ai-start", "grid-min-row").object(async (o) => {
                    const [colecao] = await app.repository.findOne("Colecoes", { nome: "Contatos" })
                    const [formulario] = await app.repository.findOne("Formularios", { colecao: colecao._id, })
                    contato.nome = contato.nome && !(contato.nome as string).startsWith("+") ? contato.nome : chat.formattedTitle.startsWith("+") ? "" : chat.formattedTitle
                    o.children(
                        new FormFactoryUpdateForm(app, formulario, contato, colecao)
                    )
                })
            )
            ))).handle()
        })
    })
