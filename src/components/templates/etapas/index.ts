import Z, { div, Div, ZeyoAs } from "zeyo";
import App from "../../../app";
import flexColumnsOverflow from "../../molecules/flexColumnsOverflow";
import button from "../../atoms/button";
import iconPlus from "icons/src/business_and_online_icons/iconPlus";
import modal from "../../molecules/modal";
import Modal from "../../../states/Modal";
import etapa from "./etapa";

export default (app: App, componente: any) => (new class extends Div {
    gotError = false;
    secoes = flexColumnsOverflow();
    async setHeader(header: any/* HeaderBetween */) {
        //super.setHeader(header);
        header.text(componente.nome)
        header.children(
            button().icon(iconPlus()).style("no-bg").set("title", "Adicionar Etapa")
                .click(() => {
                    //aqui vou ter que pegar a colecao do componente e 
                    /* app.context.setState(Modal("criaretapa", modal(app, new FormCreateSecao(app, componente)).style("botton")))
                    app.context.handle() */
                })
        )
        const [colecao] = await app.repository.findOne("Colecoes", {_id: componente.colecao})
        const [formulario] = await app.repository.findOne("Formularios", { colecao: componente.colecao })
        const [relacionamento] = await app.repository.findOne("Campos", {formulario: formulario._id, tipo: "relacionamento"})
        app.repository.createTriggerTo((colecao.nome as string), (value, type, id) => {
            this.secoes.children(this.makeSecao(value))
        }, "create")
        
        this.secoes.HTML("").object(async o => {
            const [secoes, err] = await app.repository.findMany(colecao.nome, { [relacionamento.key]: componente._id })
            if (err ||!secoes.length) 
                return  console.log("error", err, secoes);

            console.log(secoes)
            o.children(
                ...secoes.map((value, index) => this.makeSecao(value))
            )
        })
    }

    makeSecao(e: any/* Secao */): ZeyoAs<"div"> {        
        return etapa(app, e, componente)
    }
}).object(o => o.children(
    o.secoes
))