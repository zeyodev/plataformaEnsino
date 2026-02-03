import iconTrash from "icons/src/business_and_online_icons/iconTrash";
import Nicho from "..";
import App from "../../../app";
import button from "../../../components/atoms/button";
//import Button from "../../../component1.1/atoms/buttons";
import Form from "../../../form"
import FieldInput from "../../../form/fields/input";
import FieldSelect from "../../../form/fields/select";

/* {
                            "_id": "string",
                            "nome": "string",
                            "descricao": "string",
                        } */

export default class FormUpdateNicho extends Form {
    constructor(private app: App, private nicho: Nicho) {
        super();
        this.title.text(`Configuração do ${this.nicho.nome}`);
        this.header.children(
            button().style("no-bg").style("no-p").set("type", "button").icon(iconTrash()).click(() => this.app.repository.delete("Opcoes", nicho._id).then(() => {
                window.history.back()
            }))
        )
        this.body.children(
            new FieldInput("nome", true).label("Nome do Nicho").setValue(this.nicho.nome),
            /* new FieldSelect("tipo", true).label("Tipo").options(
                { value: "etapas", name: "Etapas / Kambam" },
                { value: "lista", name: "Lista" },
                { value: "painel", name: "Painel" },
                { value: "agenda", name: "Agenda" },
            ).setValue(this.nicho.tipo), */
            new FieldInput("icon", true).label("Icone").setValue(this.nicho.icon),
            new FieldInput("path", true).label("Caminho").setValue(this.nicho.path),
            new FieldInput("colecao", true).label("Coleção").setValue(this.nicho.colecao),
        )
        this.footer.children(
            button("Atualizar").set("type", "submit")
        )
    }
    async onSubmit() {
        const data = this.getDataFromFields();
        await this.app.repository.update("Opcoes", this.nicho._id, data)
        window.history.back();
    }
}