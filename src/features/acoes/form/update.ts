import App from "../../../app";
import button from "../../../components/atoms/button";
import Form from "../../../form";
import FieldInput from "../../../form/fields/input";
import FieldSelect from "../../../form/fields/select";

export default class FormUpdateAcao extends Form {
    collection = "Acoes"
    constructor(private app: App, private acao: any) {
        super();
        this.title.text("Criar Ação");

        this.body.children(
            new FieldInput("nome", true).label("Nome da Ação").setValue(acao.nome),
            new FieldSelect("tipo", true).label("Selecione tipo").options(
                { value: "create", name: "Adicionar" },
                { value: "update", name: "Atualizar" },
            ).setValue(acao.tipo),
            new FieldSelect("formulario", true).label("Selecione a Coleção").object(async o => {
                            const [colecoes] = await app.repository.findMany("Formularios", {})
                            colecoes.forEach(c => o.options({ value: c._id, name: c.nome }))
                        }).setValue(acao.formulario),
        )
        this.footer.children(
            button("Criar").set("type", "submit")
        )
    }

    async onSubmit() {
        const data = this.getDataFromFields();
        console.log(data)
        await this.app.repository.update(this.collection, this.acao._id, data)
        window.history.back();
    }
}