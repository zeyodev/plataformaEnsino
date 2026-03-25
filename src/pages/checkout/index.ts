declare const process: { env: { [key: string]: string } }
import Z, { div, h1, h2, h3, p, span } from "zeyo"
import App from "../../app"
import button from "../../components/atoms/button"
import FieldInput from "../../form/fields/input"
import FieldInputMask from "../../form/fields/inputMask"
import criarRegistroTypeform from "./registroTypeform"
import style from "./style.module.css"

export default class CheckoutPage {
    element: HTMLElement
    private app: App
    private serverUrl: string

    constructor(app: App) {
        this.app = app
        this.serverUrl = (process.env.SERVER_URL as string) || window.location.origin

        const container = div().class(style.container)
        this.element = container.element

        container.children(
            div().class(style.loading).text("Carregando checkout...")
        )

        this.init(container)
    }

    private async init(container: any) {
        // Extrai slug do checkout da URL: /checkout/{slug}
        const pathParts = window.location.pathname.split("/")
        const slug = pathParts[pathParts.length - 1] || pathParts[pathParts.length - 2]

        if (!slug || slug === "checkout") {
            container.HTML("").children(
                div().class(style.error).text("Link de checkout inválido.")
            )
            return
        }

        try {
            const res = await fetch(`${this.serverUrl}/api/public/checkout/${slug}`)
            if (!res.ok) {
                const err = await res.json()
                container.HTML("").children(
                    div().class(style.error).text(err.error || "Checkout não encontrado.")
                )
                return
            }

            const { checkoutLink, produto } = await res.json()
            this.renderCheckout(container, checkoutLink, produto)
        } catch (err) {
            container.HTML("").children(
                div().class(style.error).text("Erro ao carregar checkout. Tente novamente.")
            )
        }
    }

    private renderCheckout(container: any, checkoutLink: any, produto: any) {
        container.HTML("")

        const headerEl = div().class(style.header)
        headerEl.children(
            h1(produto?.titulo || "Checkout"),
            p(produto?.descricao || ""),
        )

        const valorTotal = div().class(style.valorTotal)
            .text(`R$ ${Number(checkoutLink.valor_total).toFixed(2).replace(".", ",")}`)

        // Lista de splits
        const splitsList = div().class(style.splitsList)
        for (const split of checkoutLink.splits) {
            const metodoLabel = split.metodo === "cartao" ? "Cartão de Crédito" :
                                split.metodo === "boleto" ? "Boleto" : "PIX"
            const parcelasLabel = split.metodo === "cartao" && split.parcelas > 1
                ? ` (${split.parcelas}x)`
                : ""
            splitsList.children(
                div().class(style.splitItem).children(
                    span(metodoLabel + parcelasLabel),
                    span(`R$ ${Number(split.valor).toFixed(2).replace(".", ",")}`),
                )
            )
        }

        const card = div().class(style.card)
        card.children(valorTotal, splitsList)

        // Cupom
        const cupomInput = new FieldInput("cupom_code", false).label("Cupom de desconto")
        const cupomBtn = button("Aplicar").set("type", "button").style("secondary")
        const cupomMsg = span("")
        cupomMsg.element.style.fontSize = "0.85em"

        cupomBtn.click(async () => {
            const codigo = cupomInput.getValue()
            if (!codigo) return
            try {
                const res = await fetch(`${this.serverUrl}/api/public/cupom/${codigo}`)
                if (!res.ok) {
                    const err = await res.json()
                    cupomMsg.text(err.error || "Cupom inválido")
                    cupomMsg.element.style.color = "var(--danger-500)"
                    return
                }
                const cupom = await res.json()
                const desconto = cupom.desconto_percentual
                    ? `${cupom.desconto_percentual}% de desconto`
                    : `R$ ${Number(cupom.desconto_valor).toFixed(2).replace(".", ",")} de desconto`
                cupomMsg.text(`Cupom aplicado: ${desconto}`)
                cupomMsg.element.style.color = "var(--success-500)"
            } catch {
                cupomMsg.text("Erro ao validar cupom")
                cupomMsg.element.style.color = "var(--danger-500)"
            }
        })

        const cupomRow = div().class(style.cupomRow).children(cupomInput, cupomBtn)
        card.children(cupomRow, cupomMsg)

        // Verifica se precisa de dados de cartão
        const temCartao = checkoutLink.splits.some((s: any) => s.metodo === "cartao")
        let cardNumberField: FieldInput | null = null
        let cardNameField: FieldInput | null = null
        let cardExpField: FieldInput | null = null
        let cardCvvField: FieldInput | null = null

        if (temCartao) {
            card.children(h3("Dados do Cartão").object(o => { o.element.style.marginTop = "1.5rem" }))
            cardNumberField = new FieldInput("card_number", true).label("Número do Cartão")
            cardNameField = new FieldInput("card_name", true).label("Nome no Cartão")
            cardExpField = new FieldInput("card_exp", true).label("Validade (MM/AA)")
            cardCvvField = new FieldInput("card_cvv", true).label("CVV")

            const cardForm = div().class(style.paymentForm)
            cardForm.children(cardNumberField, cardNameField, cardExpField, cardCvvField)
            card.children(cardForm)
        }

        // Botão de prosseguir — abre formulário typeform
        const btnProsseguir = button("Prosseguir para Cadastro →").style("primary")
        btnProsseguir.element.style.width = "100%"
        btnProsseguir.element.style.marginTop = "1.5rem"

        btnProsseguir.click(() => {
            const wizard = criarRegistroTypeform(async (clienteData) => {
                wizard.remove()
                await this.processarPagamento(container, checkoutLink, clienteData, {
                    number: cardNumberField?.getValue(),
                    holder_name: cardNameField?.getValue(),
                    exp_month: cardExpField?.getValue()?.split("/")[0],
                    exp_year: cardExpField?.getValue()?.split("/")[1],
                    cvv: cardCvvField?.getValue(),
                })
            })
            document.body.appendChild(wizard.element)
        })

        card.children(btnProsseguir)
        container.children(headerEl, card)
    }

    private async processarPagamento(container: any, checkoutLink: any, clienteData: any, cardData: any) {
        container.HTML("").children(
            div().class(style.loading).text("Processando pagamento...")
        )

        try {
            // 1. Criar cliente
            const resCliente = await fetch(`${this.serverUrl}/api/public/clientes`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(clienteData),
            })
            if (!resCliente.ok) throw new Error("Erro ao criar cliente")
            const cliente = await resCliente.json()

            // 2. Processar pagamento
            const resPagamento = await fetch(`${this.serverUrl}/api/public/checkout/process`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    checkoutLinkId: checkoutLink._id,
                    clienteId: cliente._id,
                    cardData: cardData?.number ? cardData : undefined,
                }),
            })
            if (!resPagamento.ok) {
                const err = await resPagamento.json()
                throw new Error(err.error || "Erro no pagamento")
            }
            const resultado = await resPagamento.json()

            // 3. Mostrar resultado (PIX, boleto ou confirmação)
            this.mostrarResultadoPagamento(container, resultado, checkoutLink, cliente)
        } catch (err: any) {
            container.HTML("").children(
                div().class(style.error).children(
                    h2("Erro no pagamento"),
                    p(err.message || "Ocorreu um erro. Tente novamente."),
                    button("Tentar novamente").style("primary").click(() => window.location.reload()),
                )
            )
        }
    }

    private mostrarResultadoPagamento(container: any, resultado: any, checkoutLink: any, cliente: any) {
        container.HTML("")

        const pagamentos = resultado.pagamentos || []
        const temPendente = pagamentos.some((pg: any) => pg.status === "pendente")

        if (temPendente) {
            // Mostrar dados de PIX ou boleto
            for (const pg of pagamentos) {
                if (pg.pix_qr_code_url) {
                    const pixDiv = div().class(style.pixContainer)
                    pixDiv.children(
                        h2("Pagamento via PIX"),
                        p("Escaneie o QR Code abaixo para efetuar o pagamento:"),
                    )
                    const img = document.createElement("img")
                    img.src = pg.pix_qr_code_url
                    img.alt = "QR Code PIX"
                    pixDiv.element.appendChild(img)

                    if (pg.pix_qr_code) {
                        const copyBtn = button("Copiar código PIX").style("secondary")
                        copyBtn.click(() => {
                            navigator.clipboard.writeText(pg.pix_qr_code)
                            copyBtn.text("Copiado!")
                        })
                        pixDiv.children(copyBtn)
                    }
                    container.children(pixDiv)
                }

                if (pg.boleto_url) {
                    const boletoDiv = div().class(style.boletoContainer)
                    boletoDiv.children(
                        h2("Boleto Bancário"),
                        p("Clique no botão abaixo para visualizar o boleto:"),
                    )
                    const linkBoleto = document.createElement("a")
                    linkBoleto.href = pg.boleto_url
                    linkBoleto.target = "_blank"
                    linkBoleto.textContent = "Abrir Boleto"
                    linkBoleto.style.cssText = "display:inline-block;padding:0.75rem 1.5rem;background:var(--primary-500);color:#fff;border-radius:0.375rem;text-decoration:none;font-weight:600;"
                    boletoDiv.element.appendChild(linkBoleto)

                    if (pg.boleto_barcode) {
                        boletoDiv.children(
                            p(`Código de barras: ${pg.boleto_barcode}`).object(o => {
                                o.element.style.fontSize = "0.8em"
                                o.element.style.wordBreak = "break-all"
                                o.element.style.marginTop = "1rem"
                            })
                        )
                    }
                    container.children(boletoDiv)
                }
            }
        } else {
            // Pagamento confirmado — ir para contrato
            this.mostrarContrato(container, checkoutLink, cliente)
        }
    }

    private async mostrarContrato(container: any, checkoutLink: any, cliente: any) {
        container.HTML("").children(
            div().class(style.loading).text("Carregando contrato...")
        )

        try {
            const res = await fetch(`${this.serverUrl}/api/public/contrato-texto/${checkoutLink.produto}`)
            const { texto, produto: produtoNome } = await res.json()

            container.HTML("")

            const card = div().class(style.card)
            card.element.style.maxWidth = "640px"

            const textoEl = div()
            textoEl.element.style.cssText = "max-height:400px;overflow-y:auto;white-space:pre-wrap;font-size:0.9rem;line-height:1.6;padding:1rem;background:var(--neutral-50);border-radius:0.5rem;margin-bottom:1rem;"
            textoEl.element.textContent = texto

            const cpfField = new FieldInputMask("cpf", true).mask("cpf").label("CPF (assinatura digital)")

            const checkboxDiv = div().class("d-flex", "gap-m", "ai-center")
            const checkbox = document.createElement("input")
            checkbox.type = "checkbox"
            checkbox.id = "aceite"
            const labelCb = document.createElement("label")
            labelCb.htmlFor = "aceite"
            labelCb.textContent = "Li e aceito os termos acima"
            labelCb.style.fontSize = "0.9rem"
            checkboxDiv.element.appendChild(checkbox)
            checkboxDiv.element.appendChild(labelCb)

            const errorMsg = span("")
            errorMsg.element.style.color = "var(--danger-500)"
            errorMsg.element.style.fontSize = "0.85em"

            const btnAssinar = button("Assinar e Acessar").style("primary")
            btnAssinar.element.style.width = "100%"
            btnAssinar.element.style.marginTop = "1rem"

            btnAssinar.click(async () => {
                const cpf = cpfField.getValue()
                if (!cpf || cpf.replace(/\D/g, "").length !== 11) {
                    errorMsg.text("Insira um CPF válido")
                    return
                }
                if (!checkbox.checked) {
                    errorMsg.text("Você precisa aceitar os termos")
                    return
                }

                try {
                    await fetch(`${this.serverUrl}/api/public/contratos`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            usuario: cliente._id,
                            cpf,
                            texto_contrato: texto,
                            checkoutLink: checkoutLink._id,
                        }),
                    })
                    this.mostrarSucesso(container, produtoNome)
                } catch {
                    errorMsg.text("Erro ao salvar contrato. Tente novamente.")
                }
            })

            card.children(
                h2("Termo de Adesão"),
                textoEl,
                cpfField,
                checkboxDiv,
                errorMsg,
                btnAssinar,
            )

            const headerEl = div().class(style.header)
            headerEl.children(h1(produtoNome || "Contrato"))
            container.children(headerEl, card)
        } catch {
            container.HTML("").children(
                div().class(style.error).text("Erro ao carregar contrato.")
            )
        }
    }

    private mostrarSucesso(container: any, produtoNome: string) {
        container.HTML("")
        const card = div().class(style.card)
        card.element.style.textAlign = "center"
        card.element.style.maxWidth = "480px"

        card.children(
            h1("Bem-vindo(a)!"),
            p(`Sua inscrição no ${produtoNome} foi concluída com sucesso.`),
            p("Você receberá um email com seus dados de acesso em breve.").object(o => {
                o.element.style.color = "var(--neutral-500)"
                o.element.style.marginTop = "0.5rem"
            }),
            button("Ir para Login").style("primary").click(() => {
                window.location.href = "/"
            }).object(o => {
                o.element.style.marginTop = "1.5rem"
            }),
        )

        container.children(card)
    }
}
