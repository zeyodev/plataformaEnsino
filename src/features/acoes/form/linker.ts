import iconPlus from "icons/src/business_and_online_icons/iconPlus";
import App from "../../../app";
import button from "../../../components/atoms/button";
import Form from "../../../form";
import FieldInput from "../../../form/fields/input";
import FieldSelect from "../../../form/fields/select";
import Modal from "../../../states/Modal";
import modal from "../../../components/molecules/modal";
import FormCreateAcao from "./create";

export default class FormLinkerAcao extends Form {
    collection = "ComponentesAcoes"
    selectAcao = new FieldSelect("acao", true).label("Selecione a Ação").object(async o => this.setActions(o))
    constructor(private app: App, private obj: any) {
        super();
        this.title.text("Vincular Ação");
        this.body.children(
            this.selectAcao,
            button("Nova Ação").icon(iconPlus()).style("no-bg").set("type", "button").click(() => {
                //aqui tem que abrir o formulario
                app.context.setState(Modal("create", modal(app, new FormCreateAcao(app, {}).setSubmitTrigger(() => {
                    this.setActions(this.body.childList[0])
                })))).handle()
            })
        )
        this.footer.children(
            button("Vincular").set("type", "submit")
        )
    }

    async setActions(field: any) {
        const [colecoes] = await this.app.repository.findMany("Acoes", {})
        colecoes.forEach(c => field.clear().options({ value: c._id, name: c.nome }))
    }

    async onSubmit() {
        const data = this.getDataFromFields();
        data.pertence = this.obj._id
        data.nome = this.selectAcao.getName() ? this.selectAcao.getName() : ""
        await this.app.repository.create(this.collection, data)
        window.history.back();
    }
}