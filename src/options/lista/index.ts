import Z, { ZeyoAs } from "zeyo";
import Option from "..";
import App from "../../app";
import Button from "../../component1.1/atoms/buttons";
import Ambiente from "../../features/ambiente";
import Nicho from "../../features/nicho";
import HeaderBetween from "../../component1.1/molecules/headerBetween";
import Icon from "../../component1.1/icons";
import StateModal from "../../states/modal";
import Modal from "../../component1.1/molecules/modal";
import FormCreateSecao from "../../features/secao/form/create";
import Secao from "../../features/secao";
import Lista from "../../component1.1/molecules/lista";

export default class OptionNichoLista extends Option {
    constructor(private app: App, private ambiente: Ambiente, private option: Nicho) {
        super("lista", option.nome, option.icon, option.path)
        this.component.children(
            this.secoes
        )
    }
    gotError = false;

    component = Z("div").class("gap-g");
    secoes = Z("div").class("d-grid", "gap-g");
    setHeader(header: HeaderBetween): void {
        super.setHeader(header);

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
        return new Lista(this.app, secao, this.option)
    }
}