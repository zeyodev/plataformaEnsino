import Secao from "..";
import App from "../../../app";
import Button from "../../../component1.1/atoms/buttons";
import Form from "../../../form";
import FieldInput from "../../../form/fields/input";
import FieldSelect from "../../../form/fields/select";

export default class FormUpdateSecao extends Form {
    constructor(private app: App, private secao: Secao) {
        super();
        this.title.text("Atualizar " + secao.nome);
        this.body.children(
            new FieldInput("nome", true).label("Nome").setValue(secao.nome),
            new FieldSelect("fase", true).label("Fase").options(
                {name: "Padrão", value:"padrao"},
                {name: "Inicial", value:"inicial"},
                {name: "Meio", value:"meio"},
                {name: "Final", value:"final"}
            ).setValue(secao.fase),
            new FieldSelect("componente", true).label("Componente").options(
                {name: "Título - Descrição", value:"titledescricption"},
                {name:  "Imagem - Título", value:"imagetitle"}
            ).setValue(secao.componente),
        )
        this.footer.children(
            new Button("Atualizar").set("type", "submit")
        )
    }
    async onSubmit() {
        const data = this.getDataFromFields();
        await this.app.repository.update("Secoes", this.secao._id, data)
        window.history.back();
    }
}