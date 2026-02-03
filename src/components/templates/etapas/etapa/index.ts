import { div, Div, h3, header } from "zeyo";
import style from "./style.module.css";
import App from "../../../../app";
import button from "../../../atoms/button";
import iconPlus from "icons/src/business_and_online_icons/iconPlus";
import cardTitleDescription from "../../../molecules/cardTitleDescription";
import Modal from "../../../../states/Modal";
import modal from "../../../molecules/modal";
import FormFactoryCreateForm from "../../../../features/formulario/form/factory/create";

export default (app: App, etapa: any, componente: any) => (new class extends Div {
    colecao = ""
    relacionamento = ""
    make(obj: any) {
        return cardTitleDescription().setInfo(obj.nome, obj.descricao).object(async o => {

            app.repository.createTriggerTo((this.colecao as string), (value, type) => {
                const id = type === "update" ? value.id : value._id;
                if (id != obj._id) return
                const object = type === "update" ? value.value : value;
                if (object[this.relacionamento] != etapa._id || type === "delete") o.element.remove()
            }, "update", "delete")
        }).click(async () => {
            /* const [form, err] = await app.repository.findOne("Formularios", {nicho: this.secao.nicho, tipo: "update"})
            if(err ||!form) return
            app.context.setState(new StateModal("criando", new Modal(app, new TwoColumnsConfig(app, 
                new Abas(app).object(async o => {
                    const [abas, err] = await app.repository.findMany("Caracteristicas", {nicho: this.nicho._id});
                    if(err ||!abas) return;
                    abas.forEach((aba, i) => o.push(new Aba(aba._id, aba.titulo, aba.icon, 
                        FactoryComponentesCaracteristicas.make(app, aba, obj), i === 0
                    )))
                }),
                new FormFactoryUpdateForm(app, form, obj, this.nicho)
            ))))
            app.context.handle() */
        })
    }
}).class("d-grid", "gap-g", style.etapa).object(async e => {
    const [colecao] = await app.repository.findOne("Colecoes", { _id: componente.colecao })
    const [formulario] = await app.repository.findOne("Formularios", { colecao: componente.colecao })
    const [relacionamento] = await app.repository.findOne("Campos", { formulario: formulario._id, tipo: "relacionamento" })
    e.colecao = colecao.nome
    e.relacionamento = relacionamento.key
    e.children(
        header().class("d-flex", "jc-between").children(
            h3().text(etapa["nome"]),
            button().icon(iconPlus()).style("no-bg").style("no-p").click(async () => {
                // TODO: aqui tem que pegar a acao de criacao do documento da etapa
                console.log("criando compomente")
                const [acao] = await app.repository.findOne("Acoes", {pertence: etapa._id, tipo: "create"})
                console.log(acao)
                const [form, err] = await app.repository.findOne("Formularios", {_id: acao.formulario})
                console.log(form, err)
                if (err ||!form) return
                app.context.setState(Modal("criando", modal(app, new FormFactoryCreateForm(app, form, etapa, colecao))))
                app.context.handle()
            })
        ),
        div().class("d-grid", "gap-g", style.lista).object(async o => {
            app.repository.createTriggerTo(e.colecao, (value) => {
                if (value[e.relacionamento] != etapa._id) return
                o.children(e.make(value))
            }, "create")
            app.repository.createTriggerTo(e.colecao, async (value) => {
                if (value.value[e.relacionamento] != etapa._id) return
                const [object, err] = await app.repository.findOne(e.colecao, { _id: value.id })
                if (err || !object) return
                o.children(e.make(object))
            }, "update")
            const [objs, err] = await app.repository.findMany(e.colecao, { [e.relacionamento]: etapa._id })
            if (err || !objs) return

            objs.forEach((obj) => o.children(e.make(obj)))
        })
    )
})