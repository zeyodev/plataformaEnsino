import Z from "zeyo";
import App from "../../../../../app";
import Caracteristica from "../../..";
import Form from "../../../../../form";
import FieldSubForm from "../../../../../form/fields/subForm";
//import Card from "../../../../../component1.1/atoms/card";


export default class FormCriaConversa extends Form {
    alvos: any[] = []
    constructor(private app: App, private caracteristica: Caracteristica, private item: any) {
        super();
        this.title.text(`Criando Conversa`);
        this.body.children(
            new FieldSubForm("alvos").label("Selecione um Contato").object(async o => {
                /* const [conexoes] = await this.app.repository.findMany("ItemAlvo", { caracteristica: caracteristica.relacionamento, item: item._id });
                o.children(
                    ...conexoes.map(conexao => {
                        return new Card().object(async o => {
                            const [alvo] = await this.app.repository.findOne("Itens", { _id: conexao.alvo });
                            this.alvos.push(alvo)
                            o.children(
                                ...Object.keys(alvo)
                                    .filter((k) => k !== "_id" && k !== "secao")
                                    .reverse()
                                    .map((k) => Z(k !== "nome" ? "span" : "b").class("fw-bold").text(`${alvo[k]}`)),
                            ).click(async () => {
                                console.log("aqui vai chamar a api para criar chat!")
                                console.log("Usuario: ", alvo);
                                window.history.back();

                            })
                        })
                    })
                ) */
            }),   
        )
    }

    onSubmit(): void {
        window.history.back();
    }
}