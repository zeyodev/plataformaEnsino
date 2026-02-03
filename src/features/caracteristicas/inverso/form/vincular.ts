import Z from "zeyo";
import Caracteristica from "../..";
import App from "../../../../app";
import Form from "../../../../form";
import FieldCheckboxSpan from "../../../../form/fields/checkbox";
import Nicho from "../../../nicho";
import style from "../style.module.css";
/* import Button from "../../../../component1.1/atoms/buttons";
import CardInfo from "../../../../component1.1/molecules/cardInfo"; */


export default class FormVincular extends Form {
    constructor(private app: App, private caracteristica: Caracteristica, private item: any) {
        super();
        this.title.text(`Vincular ${caracteristica.titulo}`);
        this.body.children(
            new FieldCheckboxSpan("alvos", true).label(caracteristica.titulo).object(async (o) => {
                /* const [alvocaracteristica] = await this.app.repository.findOne("Caracteristicas", { _id: caracteristica.alvo })
                const [nicho]: [Nicho, boolean] = await this.app.repository.findOne("Nichos", { _id: alvocaracteristica.nicho });
                const [secoes] = await this.app.repository.findMany("Secoes", { nicho: nicho._id })
                secoes.forEach(async (secao) => {
                    const [alvos, e] = await app.repository.findMany(nicho.colecao, { secao: secao._id })
                    const [vinculados] = await app.repository.findMany("ItemAlvo", {caracteristica: caracteristica._id, item: item._id})
                    o.push(
                        ...alvos.filter(alvo => !vinculados.find(v => v.alvo === alvo._id)).map((alvo) => ({
                            value: alvo._id, span: Z("span").class("d-flex", "jc-between").children(
                                new CardInfo().setInfos(alvo)
                                /* ...Object.keys(alvo)
                                    .filter((k) => k !== "_id" && k !== "secao")
                                    .reverse()
                                    .map((k) => Z(k !== "nome" ? "span" : "b").class("fw-bold").text(`${alvo[k]}`)),
                            )
                        }))
                    )
                }) */
            })
        )
        this.footer.children(
            //new Button("Vincular").set("type", "submit")
        )
    }

    onSubmit(): void {
        const data = this.getDataFromFields()
        console.log(data);
        (data.alvos as string[]).forEach(async (alvo) => {
            console.log(alvo)
            const relacionamento = {
                caracteristica: this.caracteristica.alvo,
                item: alvo,
                alvo: this.item._id
            }
            //const [result, err] = await this.app.repository.create(this.caracteristica.alvo, relacionamento);
        })
        window.history.back();
    }
}