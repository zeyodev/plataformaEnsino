import Z, { Div, ZeyoAs } from "zeyo";
import App from "../../../app";
import Caracteristica from "..";
import Nicho from "../../nicho";
import style from "./style.module.css"
/* import Button from "../../../component1.1/atoms/buttons";
import Icon from "../../../component1.1/icons";
import StateModal from "../../../states/modal";
import Modal from "../../../component1.1/molecules/modal";
import CardInfo from "../../../component1.1/molecules/cardInfo"; */
export default class ComponenteCaracteristicaItem extends Div {
    constructor(private app: App, private caracteristica: Caracteristica, private item: any) {
        super();
        console.log(item)
        this.class("d-grid", "gap-g").children(
            Z("header").class("d-flex", "jc-between").children(
                Z("h2").text(caracteristica.titulo),
                Z("div").class("d-flex", "gap-m").children(
                    /* new Button("Criar").icon(new Icon("plus")).style("no-bg").style("p-s").click(async () => {
                        const [nicho]: [Nicho, boolean] = await this.app.repository.findOne("Nichos", { _id: caracteristica.alvo });
                        const [secao] = await this.app.repository.findOne("Secoes", { nicho: nicho._id })
                        const [form, err] = await this.app.repository.findOne("Formularios", {nicho: nicho._id, tipo: "create"})
                        if (err ||!form) return
                        app.context.setState(new StateModal("criar", new Modal(app, new FormFactoryCreateForm(this.app, form, secao, nicho))));
                        app.context.handle();
                    }),
                    new Button("Vincular").icon(new Icon("link")).style("no-bg").style("p-s").click(() => {
                        app.context.setState(new StateModal("vincular", new Modal(app, new FormVincular(app, caracteristica, item))))
                        app.context.handle();
                    }), */
                 )
            ),
            Z("div").class("d-grid", "gap-m", style.itens).object(async (o) => {
                /* this.app.repository.createTriggerTo(this.caracteristica._id, (value) => {
                    this.putobject(o, value);
                }, "create")
                const [alvos] = await this.app.repository.findMany(this.caracteristica._id, { caracteristica: caracteristica._id, item: item._id })
                alvos.forEach(relacionamento => {
                    this.putobject(o, relacionamento);
                }) */
            }),
        )
    }

    async putobject(o: any, relacionamento: any) {
        console.log(relacionamento)
        /* const [nicho]: [Nicho, boolean] = await this.app.repository.findOne("Nichos", { _id: this.caracteristica.alvo });
        console.log(nicho)
        const [value] = await this.app.repository.findOne(nicho.colecao, {_id: relacionamento.alvo}) */
        o.children(
            //new CardInfo().setInfos(value).style("inverted"),
            /* new Card().style("inverted").class("gap-m").children(
                ...Object.keys(value)
                    .filter((k) => k !== "_id" && k !== "secao")
                    .reverse()
                    .map((k) => Z(k !== "nome" ? "span" : "b").class("fw-bold").text(`${value[k]}`)),
            ) */
        )
    }
}