import { b } from "zeyo";
import Form from "../../../../form";
import App from "../../../../app";
import button from "../../../../components/atoms/button";
import FieldSubForm from "../../../../form/fields/subForm";
import Card from "../../../../components/atoms/card";
import Modal from "../../../../states/Modal";
import modal from "../../../../components/molecules/modal";
import FormCreateCampo from "./create";

export default class FormSelectPropriedade extends Form {
    constructor(private app: App, private key: string, private formulario: any) {
        super();
        this.title.text("Novo Campo");
        this.body.children(
            new FieldSubForm("key").label("Propriedade").object(async (o) => {
                const [propriedades] = await app.repository.findMany("Propriedades", { colecao: formulario.colecao || formulario.nicho })
                o.children(
                    ...propriedades.map(p => {
                        return new Card().children(
                            b(p.nome),
                        ).click(async () => {
                            app.context.setState(Modal("create", modal(app, new FormCreateCampo(app, key, formulario, p)
                                .setSubmitTrigger((args) => {
                                    window.history.back();
                                    console.log(args)
                                    this.triggerSubmit(args)
                                })
                            ))).handle();
                        })
                    })
                )
            }),
        )
        this.footer.children(
            button("Atualizar").set("type", "submit")
        )
    }
    async onSubmit() {
        window.history.back();
    }
}