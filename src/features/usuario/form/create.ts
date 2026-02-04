import App from "../../../app";
import button from "../../../components/atoms/button";
import Form from "../../../form";
import FieldInput from "../../../form/fields/input";
import FieldInputMask from "../../../form/fields/inputMask";
import FieldSelect from "../../../form/fields/select";

export default class FormCreateUsuario extends Form {
    constructor(private app: App) {
        super();
        this.title.text("Criando Conta")
        const identificacao = new FieldInputMask("identificacao", true).label("CPF").mask("cpf")
        this.body.children(
            new FieldInput("nome", true).label("Nome"),
            new FieldInput("sobrenome", true).label("Sobrenome"),
            new FieldInput("email", true).label("Email"),
            new FieldInputMask("telefone", true).label("Telefone").mask("sms"),
            new FieldSelect("tipoIdentificacao", true).label("Tipo da conta").options(
                { value: "cpf", name: "Pessoal" },
                { value: "cnpj", name: "Empresarial" }
            ).on("change", (o) => {
                if(o.getValue() == "cpf"){
                    identificacao.label("CPF").mask("cpf").setValue("");
                }else{
                    identificacao.label("CNPJ").mask("cnpj").setValue("");
                }
            }),
            identificacao,
            new FieldInput("senha", true).label("Senha").setType("password"),
        )

        this.footer.children(
            button("Criar").set("type", "submit").style("primary"),
        )
    }

    async onSubmit() {
        const data = this.getDataFromFields();
        await this.app.repository.create("Usuarios", data)
        fetch("http://localhost:5000/registrar", {
            method: 'POST',
            headers:{
                'Content-Type':  'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json()).then(res => {
            console.log(res);
         })
       .catch(err => console.log(err))
       
        //window.history.back();
    }
}