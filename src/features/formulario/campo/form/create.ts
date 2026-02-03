import Z from "zeyo";
import Form from "../../../../form";
import App from "../../../../app";
import FieldInput from "../../../../form/fields/input";
//import Button from "../../../../component1.1/atoms/buttons";
import FieldSelect from "../../../../form/fields/select";
import button from "../../../../components/atoms/button";

export default class FormCreateCampo extends Form {
    constructor(private app: App, private key: string, private formulario: any, private propriedade: any) {
        super();
        this.title.text("Novo Campo");
        this.body.children(
            new FieldInput("key", true).label("Chave").setValue(propriedade.chave),
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
            ),
        )
        this.footer.children(
            button("Atualizar").set("type", "submit")
        )
    }
    async onSubmit() {
        const data = this.getDataFromFields();
        data.formulario = this.formulario._id;
        data.colecao = this.formulario.colecao
        data.propriedade = this.propriedade._id
        const [campo] = await this.app.repository.create("Campos", data)
        window.history.back();
        //this.triggerSubmit(campo, data)
    }
}