/* import App from "../../../../app";
import Participante from "../participante";

export default class CreatePedido {
    app: App
    constructor(app: App){
        this.app = app
    }

    async execute(forward: (s: any) => void) {
        /**
         * TODO: aqui cria pedido chat e inicia conversa com atendente  
         * tem que fazer forma de trocar para aba chat
         /
        const pedido = {
            _id: crypto.randomUUID(),
            status: "started"
        }
        await this.app.repository.create("Pedidos", pedido)
        const chat = {
            _id: crypto.randomUUID(),
            pedido: pedido._id,
            title: "TESTE"
        }
        await this.app.repository.create("Chats", chat)
        const atendente = new Participante(this.app, "atendente")
        atendente.setChat(chat)
        const cliente = new Participante(this.app, "cliente", true)
        cliente.setChat(chat)
        await this.sleep(600)
        forward(chat)
        await this.sleep(500)
        atendente.createMsg("text", "Olá")
        await this.sleep(1500)
        atendente.createMsg("text", "Selecione os itens do nosso cardápio na Home")
        await this.sleep(1500)
        atendente.createMsg("text", "Eles aparecerão aqui na lista 👇")
        await this.sleep(1500)
        cliente.createMsg("orderlist", pedido._id)
        await this.sleep(1500)
        atendente.createMsg("text", `Depois de selecionados, clique em "Confirmar Pedido" 👆`)
        await this.sleep(1500)
    }

    async sleep(time: number): Promise<any> {
        return new Promise(res => {
            setTimeout(() => {
                res(true)
            }, time);
        })
    }
} */