import App from "../../../app";
import Form from "../../../form";
import FieldDateTime from "../../../form/fields/datetime";
import Field from "../../../form/fields/field";
import FieldFile from "../../../form/fields/file";
/* import FieldFileClip from "../../../form/fields/file/clip";
import FieldFileImage from "../../../form/fields/file/image"; */
import FieldFriendlyId from "../../../form/fields/friendlyid";
//import FieldGeolocation from "../../../form/fields/geolocalizacao/field";
import FieldInput from "../../../form/fields/input";
import FieldSelect from "../../../form/fields/select";
import FieldSelectPertencimento from "../../../form/fields/selectPertecimento";
import FieldSelectSemana from "../../../form/fields/selectSemana";

export default class FactoryFormulario extends Form {
    static camposMap: { [key: string]: new (key: string, to: boolean, app: App, form: Form, campo: any) => Field } = {
        "input": FieldInput,
        "select": FieldSelect,
        "selectPertence": FieldSelectPertencimento,
        "file": FieldFile,
        "friendly_id": FieldFriendlyId,
        "datetime-local": FieldDateTime,
        /* "geolocation": FieldGeolocation,
        "image": FieldFileImage,
        "clip": FieldFileClip, */
        "semana": FieldSelectSemana,

        /* "number": Field,
        "email": Field,
        "password": Field,
        "checkbox": Field,
        "radio": Field,
        "textarea": Field */
    }
    relacionamento: any
    constructor(public app: App, public formulario: any) {
        super();
        this.title.text(formulario.titulo);
        this.object(async () => {
            const [vinculos, verr] = await this.app.repository.findMany("CamposFormulario", { formulario: formulario._id })
            for (const vinculo of vinculos) {
                const [campo, err] = await this.app.repository.findOne("Campos", { _id: vinculo.campo });
                if (err) continue;
                if (campo.tipo === "relacionamento") {
                    this.relacionamento = campo
                    continue
                }
                const Field = new FactoryFormulario.camposMap[campo.tipo](campo.key, true, app, this, campo);
                this.body.children(
                    Field.label(campo.label)
                )
            }
            this.done();
        });
    }
    onSubmit(): void {
        console.log("aqui vai executar uma tarefa")
    }
}