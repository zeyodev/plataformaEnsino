import { Aside, Div, img, ZeyoAs } from "zeyo";
import styles from "./styles.module.css";
import verticalicons from "../../molecules/verticalicons";
import sideBarButton from "../../molecules/sideBarButton";
import iconGrid from "lucideIcons/iconGrid";
import iconCalendar from "lucideIcons/iconCalendar";
import iconLoader from "lucideIcons/iconLoader";
import iconSettings from "lucideIcons/iconSettings";
import kambam from "../kanban";
import App from "../../../app";
import iconInbox from "lucideIcons/iconInbox";
import iconCheckSquare from "lucideIcons/iconCheckSquare";
import iconBell from "lucideIcons/iconBell";
import configuracoes from "../configuracoes";
import widgets from "../widgets";

export default (app: App) => (new class extends Aside { }).class(styles.sidebar)
    .children(
        verticalicons(
            //img().set("src", chrome.runtime.getURL("/logo.png")),
            sideBarButton(app, iconInbox(), kambam),
            sideBarButton(app, iconCalendar(), () => (new class extends Div {name = "calendar"})),
            sideBarButton(app, iconCheckSquare(), () => (new class extends Div {name = "lembrete"})),
            sideBarButton(app, iconBell(), () => (new class extends Div {name = "lembrete"})),
            sideBarButton(app, iconLoader(), () => (new class extends Div {name = "aiagent"})),
        ),
        verticalicons(
            sideBarButton(app, iconGrid(), widgets),
            sideBarButton(app, iconSettings(), configuracoes)
        )
    )