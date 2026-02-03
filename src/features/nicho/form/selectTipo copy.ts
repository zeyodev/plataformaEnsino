import { b, div, form } from "zeyo";
import App from "../../../app";
import Form from "../../../form"
import FieldSubForm from "../../../form/fields/subForm";
import Card from "../../../components/atoms/card";
import FormCreateNicho from "./create";
import Modal from "../../../states/Modal";
import modal from "../../../components/molecules/modal";

export default class FormSelectTipoPainel extends Form {
    constructor(private app: App, private obj: any) {
        super();
        this.title.text("Criar Opção");
        this.body.children(
            new FieldSubForm("secoes").label("Seções").object(async o => {
                const options = [
                    { tipo: "etapas", nome: "Etapas / Kambam", form: FormCreateNicho},
                    { tipo: "lista", nome: "Lista", form: FormCreateNicho},
                    { tipo: "painel", nome: "Painel", form: FormCreateNicho},
                    { tipo: "agenda", nome: "Agenda", form: FormCreateNicho},
                    { tipo: "ai", nome: "Ai", form: FormCreateNicho},
                ]
                o.children(
                    ...options.map(option => {
                        return new Card().children(
                            b(option.nome),
                        ).click(async () => {
                            app.context.setState(Modal("create", modal(app, new option.form(app, Object.assign(obj, {painel: option.tipo}))))).handle();
                        })
                    })
                )
            })
        )
        this.footer.children(
            //button("Criar").set("type", "submit")
        )
    }
    async onSubmit() {
        const data = this.getDataFromFields();
        //data.ambiente = this.ambiente._id
        await this.app.repository.create("Opcoes", data)
        window.history.back();
    }
}