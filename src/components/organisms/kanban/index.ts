import { div, Div, h3, header, p, P } from "zeyo";
import App from "../../../app";
import styles from "./styles.module.css"
import column from "./column";

export default (app: App) => (new class extends Div { }).class(styles.kanban)
    .children(
        header(
            h3("Funil de Vendas")
        ),
    )
    .object(async o => {
        const columns = div().class(styles.columns)
        o.children(columns)
        //const { result } = await app.getModelsArray("Label")
        columns.children(
            //...result.map(label => column(app, label))
        )
    })