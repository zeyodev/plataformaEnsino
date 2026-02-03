import App from "../../../app";
import button from "../../../components/atoms/button";
import Form from "../../../form";
import extra from "../../../form/fields/extra";
import FieldInput from "../../../form/fields/input";
import FieldSelect from "../../../form/fields/select";
import Componentes from "../list";

export default class FormCreateComponente extends Form {
    collection = "Componentes"
    constructor(private app: App, private obj: any) {
        super();
        this.title.text("Criar Componente");

        this.body.children(
            new FieldSelect("tipo", true).label("Selecione tipo").options(
                ...Object.values(Componentes.list).map(c =>
                    ({ value: c.key, name: c.name })
                )
            ).on("change", (o) => {
                const nome = this.getFieldByKey("nome")
                nome?.setValue(Componentes.list[o.getValue()].name)
            }),
            new FieldInput("nome", true).label("Nome do Componente"),
            new FieldSelect("colecao", true).label("Selecione a Coleção").object(async o => {
                const [colecoes] = await app.repository.findMany("Colecoes", {})
                colecoes.forEach(c => o.options({ value: c._id, name: c.nome }))
            }),
        )
        this.footer.children(
            button("Criar").set("type", "submit")
        )
    }

    async onSubmit() {
        const data = this.getDataFromFields();
        data.pertence = this.obj._id
        console.log(data)
        await this.app.repository.create(this.collection, data)
        window.history.back();
    }
}