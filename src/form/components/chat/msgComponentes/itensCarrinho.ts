import Z, { Div, Zeyo, ZeyoAs } from "zeyo";
import App from "../../../../app";
import style from "./itensCarrinho.module.css"
//import ConfirmPedido from "../usecases/confirmPedido";
export default class ComponentMsgItensCarrinho extends Div {
    app: App
    zList: Zeyo
    constructor(app: App, msg: any) {
        super()
        this.app = app
        this.class(style.component).children(
            Z("div").class(style.ballon).children(
                this.zList = Z("div").class(style.list).object(async o => {
                    let [carrinho, err] = await app.repositoryMemory.findOne("Carrinhos", {})
                    if (err || typeof carrinho !== "object" || !Object.keys(carrinho)) {
                        carrinho = {
                            _id: crypto.randomUUID(),
                            client: crypto.randomUUID() // TODO: criar usuario temporario para sessao
                        }
                        await app.repositoryMemory.create("Carrinhos", carrinho)
                    }
                    const [itens, ierr] = await app.repositoryMemory.findMany("ItensCarrinho", {})
                    itens.forEach(value => this.putItem(value))
                    app.repositoryMemory.createTriggerTo("ItensCarrinho", async (value: any) => {
                        this.putItem(value)
                    }, "create")
                }), Z("div").children(
                    Z("div").class("d-flex", "jc-between").children(
                        Z("h3").text("Total"),
                        Z("h3").text("R$ 00,00")
                            .object(o => this.calcCheckoutEventListener.push({ o, type: "total" })),
                    ),
                )
            ),
            Z("button").class("cta").text("Confirmar Pedido").click(() => {
                //new ConfirmPedido(app).execute(msg.order)
            })
        )
    }
    checkout = { subtotal: 0, frete: 0, total: 0 }
    calcCheckoutEventListener: { o: any, type: "subtotal" | "total" }[] = []
    putItem(value: any) {
        this.zList.children(
            Z("div").class(style.itemCarrinho).object(async ro => {
                const [item, err] = await this.app.repository.findOne("Itens", { _id: value.item, estabelecimento: "65d78d44df7f05c032258b24" })
                this.calcCheckout(item.preco)
                ro.children(
                    Z("img").set("src", item.img),
                    Z("div").children(
                        Z("b").text(item.titulo),
                        Z("p").text(item.preco)
                    ),
                    Z("i").HTML("delete").click(() => {
                        //new Snackbar(this.app, Z("p").text("Produto deletado"))
                        this.app.repositoryMemory.delete("ItensCarrinho", value._id)
                    })
                )
                this.app.repositoryMemory.createTriggerTo("ItensCarrinho", (dvalue) => {
                    if (dvalue === value._id) {
                        this.calcCheckout(`-${item.preco}`)
                        ro.element.remove()
                    }
                }, "delete")
            })
        )
    }
    calcCheckout(preco: string) {
        const p = Number(preco.replace(",", "."))
        this.checkout.subtotal += p
        this.checkout.total = this.checkout.subtotal + this.checkout.frete
        this.calcCheckoutEventListener.forEach(ce => {
            ce.o.text(`R$ ${this.checkout[ce.type].toFixed(2)}`.replace(".", ","))
        })
    }
}