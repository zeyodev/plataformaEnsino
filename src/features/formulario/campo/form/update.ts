import Z from "zeyo";
import Form from "../../../../form";
import App from "../../../../app";
import FieldInput from "../../../../form/fields/input";
//import Button from "../../../../component1.1/atoms/buttons";
import FieldSelect from "../../../../form/fields/select";
import button from "../../../../components/atoms/button";

export default class FormUpdateCampo extends Form {
    constructor(private app: App, private campo: any) {
        super();
        this.title.text(campo.label);
        this.body.children(
            new FieldInput("key", true).label("Propriedade Objeto").setValue(campo.key),
            new FieldInput("label", true).label("Label").setValue(campo.label),
            new FieldInput("placeholder", true).label("Placeholder").setValue(campo.placeholder),
            new FieldSelect("tipo", true).options(
                {value: "input", "name": "Input"},
                {value: "datetime-local", "name": "Data & Hora"},
                {value: "relacionamento", "name": "Relacionamento"}, // declara qual sera a chava de relacionamento
                {value: "colecao", "name": "Coleção"},
                {value: "select", "name": "Select"},
                {value: "selectPertence", name: "Selecionar Pertencimento"}, // seleciona qual documento pai o documento vai pertencer, util para quando o componente pai nao é o mesmo da estrutura # TODO
                {value: "file", "name": "Arquivo"},
                {value: "geolocation", "name": "Geolocalização"},
                {value: "friendly_id", "name": "Id Amigável"},
                {value: "image", "name": "Imagem"},
                {value: "clip", "name": "Clip"},
                {value: "semana", "name": "Dias da Semana"},

            ).setValue(campo.tipo),
        )
        this.footer.children(
            button("Atualizar").set("type", "submit")
        )
    }
    async onSubmit() {
        const data = this.getDataFromFields();
        await this.app.repository.update("Campos", this.campo._id, data)
        window.history.back();
    }
}