import { i, Zeyo } from "zeyo"
import button from "../../atoms/button";
import styles from "./styles.module.css";
import App from "../../../app";

export default (app: App, icon: ReturnType<typeof i>, component: (app: App) => Zeyo) => button()
.icon(icon)
.style("no-bg")
.style("p-g")
.class(styles.button)
.click(() => {
    //app.showModal(component(app))
})