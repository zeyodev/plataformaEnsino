import Z, { Div, ZeyoAs } from "zeyo";

export default class MsgLayout extends Div {
    body: ZeyoAs<"div">
    info: ZeyoAs<"b">
    constructor(msg: any) {
        super()
        this.children(
            this.body = Z("div"),
            this.info = Z("b").text(msg.owner)
        )
    }
}