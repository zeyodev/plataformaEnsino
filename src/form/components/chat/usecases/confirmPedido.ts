/* import App from "../../../../app";
import Participante from "../participante";

export default class ConfirmPedido {
    app: App
    constructor(app: App) {
        this.app = app
    }

    async execute(pedido: string) {
        const [chat, cerr] = await this.app.repository.findOne("Chats", { pedido })
        if (cerr) return console.error(chat);

        const cliente = new Participante(this.app, "cliente", true)
        cliente.setChat(chat)
        const atendente = new Participante(this.app, "atendente")
        atendente.setChat(chat)
        await this.sleep(300)
        cliente.createMsg("text", "Confirme o Pedido")
        await this.sleep(1300)
        atendente.createMsg("text", "Confirmado 👍")
        await this.sleep(1300)
        const { nome } = await atendente.createMsg("input", "text", "nome", "Qual nome coloco no pedido?", "Alcides", cliente.id)
        
        console.log(nome)
        await this.sleep(1300)
        atendente.createMsg("text", `Legal ${nome}!`)

        const [itens, ierr] = await this.app.repository.findMany("ItensCarrinho", {})
        let total = 0
        console.log(itens)
        for (const item of itens) {
            const [i, ie] = await this.app.repository.findOne("Itens", { _id: item.item })
            total += Number(i.preco.replace(",", "."))
        }
        console.log(total)
        await this.sleep(1300)
        atendente.createMsg("text", `Sua compra ficou R$ ${total.toFixed(2).toString().replace(".", ",")}`)
        await this.sleep(700)

        const { opcao } = await atendente.createMsg("select", "opcao",
            `${nome}, você vai retirar no local ou prefere Entrega?`,
            [
                { value: "local", name: "Retirar no Local" },
                { value: "delivery", name: "Entrega" }
            ],
            cliente.id
        )

        await this.sleep(700)
        if (opcao === "delivery") {
            atendente.createMsg("text", `Tranquilo!`)
            await this.sleep(1700)
            const {endereco} = await atendente.createMsg("input", "text", "endereco", "Qual o seu endereço", "Av. Brasil 7310, apt. 702", cliente.id)
            console.log(endereco)
        } else
            atendente.createMsg("text", `Show o seu pedido ficará pronto em 30 min!`)

        await this.sleep(1500);
        const { local } = await atendente.createMsg("select", "opcaopagamento",
            `${nome}, você vai pagar no aplicativo ou ${opcao === "local" ? " no local" : "na entrega"}?`,
            [
                { value: "app", name: "Aplicativo" },
                { value: "entrega", name: opcao === "local" ? " no Local" : "na Entrega" }
            ],
            cliente.id
        )

        console.log(local)

        //OPCAO DE retirada
        //  Entrega
        //  Retirar no local
        //TIPO DE PAGAMENTO
        //  pagar pelo aplicativo
        //  pagar na entrega
    }

    async sleep(time: number): Promise<any> {
        return new Promise(res => {
            setTimeout(() => {
                res(true)
            }, time);
        })
    }
} */