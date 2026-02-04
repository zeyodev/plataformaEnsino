import Z, { ZeyoAs } from "zeyo";
import App from "../../../app";
import Form from "../../../form"
import Ambiente from "../../ambiente";
import FieldKeyValue from "../../../form/fields/keyValue";
import button from "../../../components/atoms/button";
import iconPlus from "icons/src/business_and_online_icons/iconPlus";

export default class FormUpdateInterface extends Form {
    properties: ZeyoAs<"div">;
    counter = -1;
    constructor(private app: App, private objeto: any) {
        super();
        this.title.text("Criar Objetos");
        const propriedades: string[] = []
        for (const key in objeto)
            propriedades.push(`${key}:${objeto[key]}`);

        this.body.children(
            Z("b").text("Propriedades"),
            this.properties = Z("div").children(
                ...propriedades.map(p => new FieldKeyValue(p).setValue(p))
            ),
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
        await this.app.repository.update("Interfaces", this.objeto._id, update)
        window.history.back();
    }
}