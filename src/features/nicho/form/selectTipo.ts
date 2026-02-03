import { b, div, form } from "zeyo";
import App from "../../../app";
import button from "../../../components/atoms/button";
//import Button from "../../../component1.1/atoms/buttons";
import Form from "../../../form"
import extra from "../../../form/fields/extra";
import FieldInput from "../../../form/fields/input";
import FieldSelect from "../../../form/fields/select";
import FieldSubForm from "../../../form/fields/subForm";
import Card from "../../../components/atoms/card";
import FormCreateNicho from "./create";
import Modal from "../../../states/Modal";
import modal from "../../../components/molecules/modal";
import FormSelectTipoPainel from "./selectTipo copy";

export default class FormSelectTipos extends Form {
    constructor(private app: App, private obj: any) {
        super();
        this.title.text("Criar Opção");
        this.body.children(
            new FieldSubForm("secoes").label("Seções").object(async o => {
                const options = [
                    {tipo: "pasta", nome: "Pasta", form: FormCreateNicho },
                    {tipo: "painel", nome: "Painel", form: FormSelectTipoPainel },
                    //{nome: "Pagina", form: FormCreateNicho },
                ]
                o.children(
                    ...options.map(option => {
                        return new Card().children(
                            b(option.nome),
                        ).click(async () => {
                            app.context.setState(Modal("create", modal(app, new option.form(app, Object.assign(obj, {tipo: option.tipo}))))).handle();
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