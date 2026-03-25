import FieldInput from "../../form/fields/input"
import FieldInputMask from "../../form/fields/inputMask"
import TypeformWizard, { WizardStep } from "../../components/organisms/TypeformWizard"

export default function criarRegistroTypeform(onComplete: (data: any) => void): TypeformWizard {
    const nomeField = new FieldInput("nome", true)
    const emailField = new FieldInput("email", true).setType("email")
    const telefoneField = new FieldInputMask("telefone", true).mask("telefone")
    const cnpjField = new FieldInputMask("cnpj", false).mask("cnpj")
    const cepField = new FieldInputMask("cep", true).mask("cep")
    const logradouroField = new FieldInput("logradouro", true)
    const cidadeField = new FieldInput("cidade", true)
    const estadoField = new FieldInput("estado", true)
    const paisField = new FieldInput("pais", true)
    paisField.setValue("Brasil")

    // Auto-fill endereço via ViaCEP quando CEP é preenchido
    const cepInput = cepField.__input.element
    cepInput.addEventListener("blur", async () => {
        const cep = cepField.getValue().replace(/\D/g, "")
        if (cep.length === 8) {
            try {
                const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
                const data = await res.json()
                if (!data.erro) {
                    logradouroField.setValue(data.logradouro || "")
                    cidadeField.setValue(data.localidade || "")
                    estadoField.setValue(data.uf || "")
                    paisField.setValue("Brasil")
                }
            } catch (err) {
                console.log("Erro ao buscar CEP:", err)
            }
        }
    })

    const steps: WizardStep[] = [
        {
            label: "Qual é o seu nome completo?",
            hint: "Como você gostaria de ser chamado(a)",
            field: nomeField,
            validate: (v) => v && v.trim().length >= 2 ? null : "Por favor, insira seu nome completo",
        },
        {
            label: "Qual é o seu email?",
            hint: "Usaremos para enviar seus dados de acesso",
            field: emailField,
            validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? null : "Insira um email válido",
        },
        {
            label: "Seu telefone de contato",
            hint: "Com DDD",
            field: telefoneField,
            validate: (v) => v && v.replace(/\D/g, "").length >= 10 ? null : "Insira um telefone válido",
        },
        {
            label: "CNPJ da empresa",
            hint: "Opcional — preencha se possui empresa",
            field: cnpjField,
        },
        {
            label: "Qual o CEP do seu endereço?",
            hint: "Vamos preencher o restante automaticamente",
            field: cepField,
            validate: (v) => v && v.replace(/\D/g, "").length === 8 ? null : "Insira um CEP válido",
        },
        {
            label: "Logradouro e número",
            hint: "Rua, avenida, etc.",
            field: logradouroField,
            validate: (v) => v && v.trim().length > 0 ? null : "Insira o logradouro",
        },
        {
            label: "Cidade",
            field: cidadeField,
            validate: (v) => v && v.trim().length > 0 ? null : "Insira a cidade",
        },
        {
            label: "Estado",
            hint: "Sigla do estado (ex: SP, RJ)",
            field: estadoField,
            validate: (v) => v && v.trim().length > 0 ? null : "Insira o estado",
        },
        {
            label: "País",
            field: paisField,
            validate: (v) => v && v.trim().length > 0 ? null : "Insira o país",
        },
    ]

    const wizard = new TypeformWizard(steps)
    wizard.onComplete(onComplete)
    return wizard
}
