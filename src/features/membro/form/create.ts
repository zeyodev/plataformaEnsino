import App from "../../../app";
import button from "../../../components/atoms/button";
import Form from "../../../form";
import FieldSelect from "../../../form/fields/select";

export default class FormCreateMembro extends Form {
    constructor(private app: App, private produtoId: string) {
        super();
        this.title.text("Adicionar Membro")
        const selectUsuario = new FieldSelect("usuario", true).label("Usuário");
        (async () => {
            const [usuarios] = await app.repository.findMany("Usuarios", { role: "user" })
            selectUsuario.options(
                ...usuarios.map((u: any) => ({ value: u._id, name: u.nome || u.email }))
            )
        })()
        this.body.children(selectUsuario)
        this.footer.children(
            button("Adicionar").set("type", "submit").style("primary"),
        )
    }

    async onSubmit() {
        const data = this.getDataFromFields();
        data.produto = this.produtoId
        await this.app.repository.create("Membros", data)
        this.triggerSubmit(data)
    }
}
