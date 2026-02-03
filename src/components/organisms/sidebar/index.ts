import { Aside, Div, img, ZeyoAs } from "zeyo";
import styles from "./styles.module.css";
import verticalicons from "../../molecules/verticalicons";
import sideBarButton from "../../molecules/sideBarButton";
import iconGrid from "icons/src/business_and_online_icons/iconGrid";
import iconCalendar from "icons/src/business_and_online_icons/iconCalendar";
import iconLoader from "icons/src/business_and_online_icons/iconLoader";
import iconSettings from "icons/src/business_and_online_icons/iconSettings";
import kambam from "../kanban";
import App from "../../../app";
import iconInbox from "icons/src/business_and_online_icons/iconInbox";
import iconCheckSquare from "icons/src/business_and_online_icons/iconCheckSquare";
import iconBell from "icons/src/business_and_online_icons/iconBell";
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