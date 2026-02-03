import Z from "zeyo";
import App from "../../../../../app";
import Caracteristica from "../../..";
import Form from "../../../../../form";
import FieldCheckboxSpan from "../../../../../form/fields/checkbox";
import Nicho from "../../../../nicho";
//import Button from "../../../../../component1.1/atoms/buttons";


export default class FormCriaGrupo extends Form {
    alvos: any[] = []
    constructor(private app: App, private caracteristica: Caracteristica, private item: any) {
        super();
        this.title.text(`Criando Grupo`);
        this.body.children(
            new FieldCheckboxSpan("alvos", true).label("Selecione Contatos").object(async (o) => {
                /* const [conexoes] = await this.app.repository.findMany("ItemAlvo", { caracteristica: caracteristica.relacionamento, item: item._id });
                o.push(
                    ...conexoes.map((conexao) => {
                        return {
                            value: conexao.alvo,
                            span: Z("span").class("d-flex", "jc-between").object(async o => {
                                const [alvo] = await this.app.repository.findOne("Itens", { _id: conexao.alvo });
                                this.alvos.push(alvo)
                                o.children(
                                    ...Object.keys(alvo)
                                        .filter((k) => k !== "_id" && k !== "secao")
                                        .reverse()
                                        .map((k) => Z(k !== "nome" ? "span" : "b").class("fw-bold").text(`${alvo[k]}`)),
                                )
                            })
                        }
                    })
                ) */
            })
        )
        this.footer.children(
            //new Button("Criar Grupo").set("type", "submit")
        )
    }

    onSubmit(): void {
        const data = this.getDataFromFields()
        console.log("aqui vai chamar a api para criar o grupo!")
        console.log(data.alvos);
        const membros = this.alvos.filter((alvo) => data.alvos.includes(alvo._id))
        console.log("Membros: ", membros);
        window.history.back();
    }
}