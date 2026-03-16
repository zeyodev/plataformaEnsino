import App from "../../../app";
import button from "../../../components/atoms/button";
import Form from "../../../form";
import FieldInput from "../../../form/fields/input";

export default class FormUpdateAula extends Form {
    constructor(private app: App, private obj: any) {
        super();
        this.title.text("Editar Aula")
        this.body.children(
            new FieldInput("title", true).label("Título").setValue(obj.title || ""),
            new FieldInput("description", true).label("Descrição").setValue(obj.description || ""),
            new FieldInput("video_player", true).label("URL do Player").setValue(obj.video_player || ""),
            new FieldInput("video_hls", true).label("URL HLS").setValue(obj.video_hls || ""),
            new FieldInput("thumbnail", true).label("URL Thumbnail").setValue(obj.thumbnail || ""),
        )
        this.footer.children(
            button("Salvar").set("type", "submit").style("primary"),
            button("Excluir").style("danger").click(async () => {
                await this.app.repository.delete("Aulas", obj._id)
                this.triggerSubmit()
            }),
        )
    }

    async onSubmit() {
        const data = this.getDataFromFields();
        await this.app.repository.update("Aulas", this.obj._id, data)
        this.triggerSubmit(data)
    }
}
