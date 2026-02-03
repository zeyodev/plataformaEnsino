import Z, { Zeyo, ZeyoAs } from "zeyo";
import App from "../../../../app";
import style from "./itensCarrinho.module.css"
import MsgLayout from "./msgLayout";

export default class ComponentMsgOrderStatus extends MsgLayout {
    app: App
    constructor(app: App, msg: any) {
        super(msg)
        this.app = app
        this.body.class(style.component).children(
            Z("div").class(style.ballon).children(
                Z("b").object(async (o) => {
                    const [pedido, err] = await this.app.repositoryMemory.findOne("Pedidos", {_id: msg.order})
                    o.text(pedido.status)
                    this.app.repositoryMemory.createTriggerTo("Pedidos", (update) => {
                        console.log(update)
                        if(update.id === pedido._id && Object.prototype.hasOwnProperty.call(update.value, "status")){
                            o.text(update.value.status)
                        }
                    }, "update")
                })
            ),
        )
    }
}