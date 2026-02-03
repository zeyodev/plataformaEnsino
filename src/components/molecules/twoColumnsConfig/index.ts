import LayoutColumnsToTabs from "../../atoms/columnsToTab";
import style from "./style.module.css";

export default (...child: any[]) => (new class TwoColumnsConfig extends LayoutColumnsToTabs { })
    .class(style.container)
    .setSlides(() => child)