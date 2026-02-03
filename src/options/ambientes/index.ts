import Z, { ZeyoAs } from "zeyo";
import Option from "..";
import App from "../../app";
import Organizacao from "../../features/organizacao";
import Button from "../../component1.1/atoms/buttons";
import StateModal from "../../states/modal";
import Modal from "../../component1.1/molecules/modal";
import VerticalList from "../../component1.1/atoms/verticalList";
import CardTitleDescription from "../../component1.1/molecules/cardTitleDescription";
import FormCreateAmbiente from "../../features/ambiente/form/create";

export default class OptionAmbientes extends Option {
    constructor(private app: App, private organizacao: Organizacao) {
        super("ambiente", "Ambientes", "list", "ambientes")
    }
    gotError = false;

    component = Z("div").class("gap-g", "ac-start").children(
        new Button().text("Criar Ambiente").style("accent").click(async () => {
            this.app.context.setState(new StateModal("criarambiente", Modal(this.app, new FormCreateAmbiente(this.app, this.organizacao)).style("botton")))
            this.app.context.handle()
        }),
        new VerticalList().object(async (o) => {
            this.app.repository.createTriggerTo("Ambientes", (value, type, id) => {
                if (this.gotError) {
                    o.HTML("")
                    this.gotError = false;
                }
                o.push(this.makeOrganizacao(value))
            }, "create")
            const [orgs, err] = await this.app.repository.findMany("Ambientes", {organizacao: this.organizacao._id})
            this.gotError = err;
            if (err) return o.children(Z("p").text(`Error ao pegar Ambientes: '${orgs[0]}' - ${new Date().toISOString()}`))
            o.children(
                ...orgs.map((org) => {
                    return this.makeOrganizacao(org)
                })
            )
        })
    );

    makeOrganizacao(org: Organizacao) {
        return new CardTitleDescription()
            .setInfo(org.nome, org._id)
            .click(() => this.app.context.action("ambiente", org))
            .object(o => {
                this.app.repository.createTriggerTo("Organizacoes", (value, type, id) => {
                    const { _id, organizacao } = value;
                    if (_id === org._id)
                        o.setInfo(organizacao.nome, value._id);
                }, "update")
            })
    }
}