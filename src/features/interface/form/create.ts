import Z, { ZeyoAs } from "zeyo";
import App from "../../../app";
import Button from "../../../component1.1/atoms/buttons";
import Form from "../../../form"
import Icon from "../../../component1.1/icons";
import FieldKeyValue from "../../../form/fields/keyValue";
import Nicho from "../../nicho";

export default class FormCreateInterface extends Form {
    properties: ZeyoAs<"div">;
    counter = -1;
    constructor(private app: App, private nicho: Nicho) {
        super();
        this.title.text("Criar Nicho");
        this.body.children(
            this.properties = Z("div"),
            new Button("Propriedade").set("type", "button").style("no-bg").icon(new Icon("plus")).click(() => {
                this.counter++;
                this.properties.children(
                    new FieldKeyValue(`propriedade${this.counter}`, true)
                )
            }),
        )
        this.footer.children(
            new Button("Criar").set("type", "submit")
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