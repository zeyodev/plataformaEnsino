import App from "../../../app";
import button from "../../../components/atoms/button";
import Form from "../../../form";
import FieldInput from "../../../form/fields/input";
import FieldSelect from "../../../form/fields/select";

export default class FormCreateModulo extends Form {
    constructor(private app: App) {
        super();
        this.title.text("Criar Módulo")
        const selectPilar = new FieldSelect("pilar", true).label("Pilar");
        (async () => {
            const [pilares] = await app.repository.findMany("Pilares", {})
            selectPilar.options(
                { value: "", name: "-- Nenhum --" },
                ...pilares.map((p: any) => ({ value: p._id, name: p.titulo }))
            )
        })()
        this.body.children(
            new FieldInput("titulo", true).label("Título"),
            selectPilar,
        )
        this.footer.children(
            button("Criar").set("type", "submit").style("primary"),
        )
    }

    async onSubmit() {
        const data = this.getDataFromFields();
        await this.app.repository.create("Modulos", data)
        this.triggerSubmit(data)
    }
}
