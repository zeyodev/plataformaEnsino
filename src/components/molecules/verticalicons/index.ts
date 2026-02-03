import { Div, ZeyoAs } from "zeyo";
import styles from "./styles.module.css"
import button from "../../atoms/button";

export default (...child: Array<ZeyoAs<"img"> | ReturnType<typeof button>>) => new class extends Div {
    constructor() {
        super()
        this.class(styles["vertical-icons"])
            .children(...child)
    }
}