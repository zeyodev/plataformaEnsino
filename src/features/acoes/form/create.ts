import App from "../../../app";
import button from "../../../components/atoms/button";
import Form from "../../../form";
import FieldInput from "../../../form/fields/input";
import FieldSelect from "../../../form/fields/select";

export default class FormCreateAcao extends Form {
    collection = "Acoes"
    constructor(private app: App, private obj: any) {
        super();
        this.title.text("Criar Ação");

        this.body.children(
            new FieldInput("nome", true).label("Nome da Ação"),
            new FieldSelect("tipo", true).label("Selecione tipo").options(
                // TODO: esses tipos tem que ser dinamicos a depender do componente basicamente sera uma chave de ligação do componente interno do 
                { value: "create", name: "Adicionar" },
                { value: "update", name: "Atualizar" },
            ),
            new FieldSelect("formulario", true).label("Selecione o Fomulário").object(async o => {
                const [colecoes] = await app.repository.findMany("Formularios", {})
                colecoes.forEach(c => o.options({ value: c._id, name: c.titulo }))
            }),
        )
        this.footer.children(
            button("Criar").set("type", "submit")
        )
    }

    async onSubmit() {
        const data = this.getDataFromFields();
        //data.pertence = this.obj._id
        console.log(data)
        await this.app.repository.create(this.collection, data)
        window.history.back();
    }
}