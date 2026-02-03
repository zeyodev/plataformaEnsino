import Z, { div, Div, p, P, ZeyoAs } from "zeyo";
import App from "../../../app";
import flexColumnsOverflow from "../../molecules/flexColumnsOverflow";
import button from "../../atoms/button";
import iconPlus from "icons/src/business_and_online_icons/iconPlus";
import modal from "../../molecules/modal";
import Modal from "../../../states/Modal";

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
}).object(o => o.children(
    p("aqui terar um chat para chamar a ia")
))