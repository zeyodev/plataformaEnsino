import App from "../../../app";
import button from "../../../components/atoms/button";
import snackbar from "../../../components/atoms/snackbar";
import Form from "../../../form";
import FieldInput from "../../../form/fields/input";
import FieldSelect from "../../../form/fields/select";

export default class FormCreateEncontro extends Form {
    constructor(private app: App, private categoriaEncontroId?: string) {
        super();
        this.title.text("Criar Encontro")

        const selectCategoria = new FieldSelect("categoriaEncontro", true).label("Categoria")
        if (categoriaEncontroId) {
            selectCategoria.options({ value: categoriaEncontroId, name: categoriaEncontroId })
        }
        ;(async () => {
            const [categorias] = await app.repository.findMany("CategoriasEncontros", {})
            selectCategoria.options(
                ...categorias.map((c: any) => ({ value: c._id, name: c.titulo }))
            )
        })()

        const selectStatus = new FieldSelect("status", true).label("Status")
        selectStatus.options(
            { value: "agendado", name: "Agendado" },
            { value: "em_andamento", name: "Em andamento" },
            { value: "encerrado", name: "Encerrado" },
        )

        this.body.children(
            new FieldInput("titulo", true).label("Título"),
            new FieldInput("descricao", false).label("Descrição"),
            new FieldInput("data", true).label("Data (ex: 2026-04-01 19:00)"),
            new FieldInput("meet_link", false).label("Link do Google Meet"),
            selectCategoria,
            selectStatus,
        )
        this.footer.children(
            button("Criar").set("type", "submit").style("primary"),
        )
    }

    async onSubmit() {
        const data = this.getDataFromFields();
        if (this.categoriaEncontroId && !data.categoriaEncontro) {
            data.categoriaEncontro = this.categoriaEncontroId
        }
        await this.app.repository.create("Encontros", data)
        snackbar.show("Encontro criado com sucesso!", "success")
        this.triggerSubmit(data)
    }
}
