import Z, { ZeyoAs } from "zeyo";
import App from "../../../app";
import Form from "../../../form"
import FieldKeyValue from "../../../form/fields/keyValue";
import Nicho from "../../nicho";
import button from "../../../components/atoms/button";
import iconPlus from "icons/src/business_and_online_icons/iconPlus";

export default class FormCreateInterface extends Form {
    properties: ZeyoAs<"div">;
    counter = -1;
    constructor(private app: App, private nicho: Nicho) {
        super();
        this.title.text("Criar Nicho");
        this.body.children(
            this.properties = Z("div"),
            button("Propriedade").set("type", "button").style("no-bg").icon(iconPlus()).click(() => {
                this.counter++;
                this.properties.children(
                    new FieldKeyValue(`propriedade${this.counter}`, true)
                )
            }),
        )
        this.footer.children(
            button("Criar").set("type", "submit")
        )
    }
    async onSubmit() {
        const data = this.getDataFromFields();
        const update: { [key: string]: string } = {}
        for (const key in data) {
            const [chave, valor] = data[key].split(":");
            update[chave] = valor;
        }
        update.nicho = this.nicho._id
        await this.app.repository.create("Interfaces", update)
        window.history.back();
    }
}