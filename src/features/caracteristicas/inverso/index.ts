import Z, { Div, ZeyoAs } from "zeyo";
import App from "../../../app";
import Caracteristica from "..";
import Nicho from "../../nicho";
import style from "./style.module.css";
/* import Button from "../../../component1.1/atoms/buttons";
import Icon from "../../../component1.1/icons";
import StateModal from "../../../states/modal";
import Modal from "../../../component1.1/molecules/modal";
import CardInfo from "../../../component1.1/molecules/cardInfo"; */
import FormVincular from "./form/vincular";
import FormFactoryCreateForm from "../../formulario/form/factory/create";
export default class ComponenteCaracteristicaInverso extends Div {
    constructor(private app: App, private caracteristica: Caracteristica, private item: any) {
        super(/* "div" */);
        console.log(item)
        this.class("d-grid", "gap-g").children(
            Z("header").class("d-flex", "jc-between").children(
                Z("h2").text(caracteristica.titulo),
                /* Z("div").class("d-flex", "gap-m").children(
                    new Button("Vincular").icon(new Icon("link")).style("no-bg").style("p-s").click(() => {
                        app.context.setState(new StateModal("vincular", new Modal(app, new FormVincular(app, caracteristica, item))))
                        app.context.handle();
                    }),
                 ) */
            ),
            Z("div").class("d-grid", "gap-m", style.itens).object(async (o) => {
                /* this.app.repository.createTriggerTo(caracteristica.alvo, (value) => {
                    this.putobject(o, value);
                }, "create")
                const [alvos] = await this.app.repository.findMany(caracteristica.alvo, { caracteristica: caracteristica.alvo, alvo: item._id })
                alvos.forEach(relacionamento => {
                    this.putobject(o, relacionamento);
                }) */
            }),
        )
    }

    async putobject(o: any, relacionamento: any) {
        console.log(relacionamento)
        /* const [alvocaracteristica] = await this.app.repository.findOne("Caracteristicas", { _id: this.caracteristica.alvo });
        const [nicho]: [Nicho, boolean] = await this.app.repository.findOne("Nichos", { _id: alvocaracteristica.nicho });
        console.log(nicho)
        const [value] = await this.app.repository.findOne(nicho.colecao, {_id: relacionamento.item})
        o.children(
            Z("div").class(style.item).object(o => {
                o.children(
                    new CardInfo().setInfos(value).style("inverted"),
                    new Icon("trash").click(async () => {
                        await this.app.repository.delete(alvocaracteristica._id, relacionamento._id);
                        o.element.remove();
                    }),
                )
            })
            /* new Card().style("inverted").class("gap-m").children(
                ...Object.keys(value)
                    .filter((k) => k !== "_id" && k !== "secao")
                    .reverse()
                    .map((k) => Z(k !== "nome" ? "span" : "b").class("fw-bold").text(`${value[k]}`)),
                
            ) 
        ) */
    }
}