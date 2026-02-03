import Z from "zeyo";
import App from "../../../../app";
import Form from "../../../../form";
import Nicho from "../../../nicho";
import FieldSubForm from "../../../../form/fields/subForm";
/* import Card from "../../../../component1.1/atoms/card";
import StateModal from "../../../../states/modal";
import Modal from "../../../../component1.1/molecules/modal"; */
import FormFactoryCreateForm from "../../../formulario/form/factory/create";


export default class FormSelectSecao extends Form {
    constructor(private app: App, private nicho: Nicho) {
        super();
        this.title.text(`Selecione uma Seção para criar Item em ${nicho.nome}`);
        this.body.children(
            new FieldSubForm("secoes").label("Seções").object(async o => {
                /* const [secoes] = await this.app.repository.findMany("Secoes", { nicho: nicho._id });
                if (secoes.length === 1) {
                    const [form, err] = await this.app.repository.findOne("Formularios", { nicho: nicho._id, tipo: "create" })
                    if (err || !form) return;
                    app.context.setState(new StateModal("criar", new Modal(app, new FormFactoryCreateForm(this.app, form, secoes[0], nicho).setSubmitTrigger(this.submitTrigger))));
                    app.context.handle();
                } */
                /* o.children(
                    ...secoes.map(secao => {
                        return new Card().children(
                            Z("b").text(secao.nome),
                        ).click(async () => {
                            const [form, err] = await this.app.repository.findOne("Formularios", { nicho: nicho._id, tipo: "create" })
                            if (err || !form) return;
                            app.context.setState(new StateModal("criar", new Modal(app, new FormFactoryCreateForm(this.app, form, secao, nicho).setSubmitTrigger(this.submitTrigger))));
                            app.context.handle();

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