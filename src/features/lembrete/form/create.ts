import App from "../../../app";
import ButtonAccent from "../../../component1.1/atoms/buttons/accent";
import Form from "../../../form";
import FieldDateTime from "../../../form/fields/datetime";
import FieldInput from "../../../form/fields/input";
import FieldInputMask from "../../../form/fields/inputMask";
import FieldSelect from "../../../form/fields/select";
import FieldTextarea from "../../../form/fields/textarea";
import Modal from "../../../modal";

/* 
reminder_type VARCHAR(10) NOT NULL,
  reminder_date DATETIME NOT NULL,
  phone VARCHAR(20) NOT NULL,
    message TEXT NOT NULL, */
export default class FormCreateLembrete extends Form {
    reminder_type_map: { [key: string]: { value: number, name: string } } = {
        "10min": { value: (10 * 60 * 1000), name: "10 Minutos" },
        "30min": { value: (30 * 60 * 1000), name: "30 Minutos" },
        "1h": { value: (1 * 60 * 60 * 1000), name: "1 Hora" },
        "1d": { value: (1 * 24 * 60 * 60 * 1000), name: "1 Dia" },
        "1w": { value: (7 * 24 * 60 * 60 * 1000), name: "1 Semana" },
    }
    constructor(private app: App, private evento: any) {
        super();
        this.title.text("Novo Lembrete")
        
        this.body.children(
            new FieldSelect("reminder_type", true).label("Lembrar").object(o => {
                // aqui verifica se a data da opção é maior que a data atual.
                for (const key in this.reminder_type_map) {
                    const date = new Date(this.evento.date_time);
                    date.setTime(date.getTime() - this.reminder_type_map[key].value);
                    if (new Date(date) > new Date())
                        o.options({ value: key, name: this.reminder_type_map[key].name })
                }

                o.element.onchange = this.onChangeType.bind(this);
            }),
            new FieldDateTime("reminder_date", true).label("Data do lembrete").setValue(evento.date_time),
            new FieldInputMask("phone", true).label("Número Whatsapp").mask("whatsapp").setValue(evento.phone),
            new FieldTextarea("message", true).label("Mensagem").setValue(evento.message),
        )
        this.footer.children(
            new ButtonAccent("Criar")
        )
        this.onChangeType();
    }

    onChangeType() { 
        const key = this.getFieldByKey("reminder_type")?.getValue() || "10min"
        const date = new Date(this.evento.date_time);
        date.setTime(date.getTime() - this.reminder_type_map[key].value);
        this.getFieldByKey("reminder_date")?.setValue(date);
    }
    
    async onSubmit() {
        const data = this.getDataFromFields();
        data["event_id"] = this.evento.id;
        data["phone"] = `55${data["phone"]}`
        console.log(data);
        const result = await this.app.repository.create("Reminders", data)
        console.log(result);
        Modal.back();
    }
}