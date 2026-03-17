import App from "../../../app";
import button from "../../../components/atoms/button";
import Form from "../../../form";
import FieldInput from "../../../form/fields/input";

export default class FormCreateAulaModulo extends Form {
    constructor(private app: App, private moduloId: string) {
        super();
        this.title.text("Criar Aula")
        this.body.children(
            new FieldInput("title", true).label("Título"),
            new FieldInput("description", true).label("Descrição"),
            new FieldInput("video_player", true).label("URL do Player"),
            new FieldInput("video_hls", true).label("URL HLS"),
            new FieldInput("thumbnail", true).label("URL Thumbnail"),
        )
        this.footer.children(
            button("Criar").set("type", "submit").style("primary"),
        )
    }

    async onSubmit() {
        const data = this.getDataFromFields();
        data.status = "CONVERTED"
        data.playable = true
        await this.app.repository.create("Aulas", { ...data, modulo: this.moduloId })
        this.triggerSubmit(data)
    }
}
