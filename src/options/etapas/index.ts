import Z, { ZeyoAs } from "zeyo";
import Option from "..";
import App from "../../app";
import Organizacao from "../../features/organizacao";
import Button from "../../component1.1/atoms/buttons";
import CardTitleDescription from "../../component1.1/molecules/cardTitleDescription";
import Ambiente from "../../features/ambiente";
import Nicho from "../../features/nicho";
import HeaderBetween from "../../component1.1/molecules/headerBetween";
import Icon from "../../component1.1/icons";
import StateModal from "../../states/modal";
import Modal from "../../component1.1/molecules/modal";
import FormCreateSecao from "../../features/secao/form/create";
import FlexColumnsOverflow from "../../component1.1/layout/flexcolumnsOverflow";
import Etapa from "../../component1.1/molecules/etapa";
import Secao from "../../features/secao";

export default class OptionNichoEtapas extends Option {
    constructor(private app: App, private ambiente: Ambiente, private option: Nicho) {
        super("etapas", option.nome, option.icon, option.path)
        this.component.children(
            this.secoes = new FlexColumnsOverflow()
        )
    }
    gotError = false;

    component = Z("div").class("gap-g");
    secoes = Z("div").class("d-flex", "gap-g");
    setHeader(header: HeaderBetween): void {
        super.setHeader(header);
        header.children(
            new Button().icon(new Icon("plus")).style("no-bg").set("title", "Adicionar Seção")
                .click(() => {
                    this.app.context.setState(new StateModal("criaretapa", Modal(this.app, new FormCreateSecao(this.app, this.option)).style("botton")))
                    this.app.context.handle()
                })
        )

        this.app.repository.createTriggerTo("Secoes", (value, type, id) => {
            this.secoes.children(this.makeSecao(value))
        }, "create")
        
        this.secoes.HTML("").object(async o => {
            const [secoes, err] = await this.app.repository.findMany("Secoes", { "nicho": this.option._id })
            if (err ||!secoes.length) 
                return  console.log("error", err, secoes);

            o.children(
                ...secoes.map((value, index) => this.makeSecao(value))
            )
        })
    }

    makeSecao(secao: Secao): ZeyoAs<"div"> {        
        return new Etapa(this.app, secao, this.option)
    }
}