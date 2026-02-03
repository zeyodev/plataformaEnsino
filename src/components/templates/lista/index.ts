import Z, { div, Div, p, P, ZeyoAs } from "zeyo";
import App from "../../../app";
import flexColumnsOverflow from "../../molecules/flexColumnsOverflow";
import button from "../../atoms/button";
import iconPlus from "icons/src/business_and_online_icons/iconPlus";
import modal from "../../molecules/modal";
import Modal from "../../../states/Modal";
import CRUD from "../../organisms/CRUD";
import FormFactoryCreateForm from "../../../features/formulario/form/factory/create";
import update from "../../../features/formulario/form/update";

export default (app: App, componente: any) => (new class extends Div {
    gotError = false;
    async setHeader(header: any/* HeaderBetween */) {
        console.log(componente, header, this)
        header.text(componente.nome)
        header.children(
            button().icon(iconPlus()).style("no-bg").set("title", "Adicionar Etapa")
                .click(() => {
                    //aqui vou ter que pegar a colecao do componente e 
                    /* app.context.setState(Modal("criaretapa", modal(app, new FormCreateSecao(app, componente)).style("botton")))
                    app.context.handle() */
                })
        )

        /* app.repository.createTriggerTo("mensagem", (value, type, id) => {
            this.secoes.children(this.makeSecao(value))
        }, "create") */


    }
}).object(async o => {
    const [colecao, err] = await app.repository.findOne("Colecoes", { _id: componente.colecao })
    const [formulario] = await app.repository.findOne("Formularios", { colecao: colecao._id })
    // TODO: precisa ter um buscador de documentos na lista 
    o.children(CRUD(app, colecao.nome, { create: formulario.titulo }, {
        create: new FormFactoryCreateForm(app, formulario, colecao, colecao),
        update: (app, obj) => update(app, obj)
    }, { nome: "string" }))
})