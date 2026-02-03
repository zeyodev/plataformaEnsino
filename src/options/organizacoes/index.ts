import Z from "zeyo";
import Option from "..";
import Button from "../../component1.1/atoms/buttons";
import VerticalList from "../../component1.1/atoms/verticalList";
import App from "../../app";
import CardTitleDescription from "../../component1.1/molecules/cardTitleDescription";
import Organizacao from "../../core/entity/Organizacao";
import Modal from "../../component1.1/molecules/modal";
import FormCreateOrganizacao from "../../features/organizacao/form/create";
import StateModal from "../../states/modal";
import { ulid } from "ulid";

export default class OptionOrganizacoes extends Option {
    constructor(private app: App) {
        super("organizacao", "Organizações", "list", "organizacoes")
    }

    gotError = false;

    component = Z("div").class("gap-g", "ac-start").children(
        new Button().text("Criar Organização").style("accent").click(async () => {
            this.app.context.setState(new StateModal("criarorganizacao", Modal(this.app, new FormCreateOrganizacao(this.app)).style("botton")))
            this.app.context.handle()
        }),
        new VerticalList().object(async (o) => {
            this.app.repository.createTriggerTo("Organizacoes", (value, type, id) => {
                if (this.gotError) {
                    o.HTML("")
                    this.gotError = false;
                }
                o.push(this.makeOrganizacao(value))
            }, "create")

            //aqui ele pega do servidor as organizacoes que estao conectadas com o usuario
            //const [orgs, err] = await this.app.repository.findMany("Organizacoes", {})
            const [orgs, err] = await this.pegaListaOrganizacoes(this.app)
            this.gotError = err;
            if (err) return o.children(Z("p").text(`Error ao pegar Organizações: '${orgs[0]}' - ${new Date().toISOString()}`))
            o.children(
                ...orgs.map((org) => {
                    return this.makeOrganizacao(org)
                })
            )
        })
    );

    async pegaListaOrganizacoes(app: App): Promise<[any[], boolean]> {
        await app.socket.waitSocket()
        const event = `uc/pegaListaOrganizacoes/${ulid()}`
        app.socket.emit(event, {})
        const [sOrgs, sErr] = await app.socket.wait(event, 2000)
        if (sErr) return app.repository.findMany("Organizacoes", {});
        // TODO: precisa salvar as organizacoes no banco Local e comparar caso usuario ainda tem acesso a uma organização
        return [sOrgs.map((o: any) => o.organizacao), sErr]
    }

    makeOrganizacao(org: Organizacao) {
        return new CardTitleDescription()
            .setInfo(org.nome, org._id)
            .click(() => this.app.context.action("organizacao", org))
            .object(o => {
                this.app.repository.createTriggerTo("Organizacoes", (value, type, id) => {
                    const { _id, organizacao } = value;
                    if (_id === org._id)
                        o.setInfo(organizacao.nome, value._id);
                }, "update")
            })
    }
}