import Z, { ZeyoAs } from "zeyo";
import App from "../../../../app";
import MsgLayout from "./msgLayout";

export default class ComponentMsgAnswer extends MsgLayout{
    constructor(app: App, msg: any) {
        super(msg)
        this.body.children(
            Z("p").text(msg.text),
        )
    }
}