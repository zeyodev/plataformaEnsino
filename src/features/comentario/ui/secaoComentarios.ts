import { div, span, h3, button, Div, textarea } from "zeyo"
import { ulid } from "ulid"
import App from "../../../app"
import AulaComentario from "../featureInterface"
import iconThumbsUp from "lucideIcons/iconThumbsUp"
import iconEdit from "lucideIcons/iconEdit"
import iconTrash from "lucideIcons/iconTrash"
import style from "./secaoComentarios.module.css"

// ── Utilitário: tempo relativo em português ────────────────────────────────
function tempoRelativo(isoString: string): string {
    const diff = Math.floor((Date.now() - new Date(isoString).getTime()) / 1000)
    if (diff < 60)      return "agora há pouco"
    if (diff < 3600)  { const m = Math.floor(diff / 60);    return `há ${m} ${m === 1 ? "minuto" : "minutos"}` }
    if (diff < 86400) { const h = Math.floor(diff / 3600);  return `há ${h} ${h === 1 ? "hora" : "horas"}` }
    if (diff < 604800){ const d = Math.floor(diff / 86400); return `há ${d} ${d === 1 ? "dia" : "dias"}` }
    if (diff < 2592000){ const w = Math.floor(diff / 604800); return `há ${w} ${w === 1 ? "semana" : "semanas"}` }
    const mes = Math.floor(diff / 2592000)
    return `há ${mes} ${mes === 1 ? "mês" : "meses"}`
}

function primeiraLetra(nome: string): string {
    return (nome || "?").charAt(0).toUpperCase()
}

// ── Card de comentário individual ─────────────────────────────────────────
function makeCommentCard(app: App, comentario: AulaComentario) {
    const isOwn = comentario.autorId === app.session.usuarioId
    const currentUserId: string = app.session.usuarioId

    const avatarEl = div().class(style.avatar).text(primeiraLetra(comentario.autorNome))
    const nomeEl   = span().class(style.autorNome).text(comentario.autorNome)
    const tempoEl  = span().class(style.tempo).text(tempoRelativo(comentario.criadoEm))
    const metaRow  = div().class(style.itemMeta).children(nomeEl, tempoEl)
    const textoEl  = span().class(style.texto).text(comentario.texto)

    // Textarea de edição inline (oculto por padrão)
    const editTa = textarea().class(style.editTextarea).set("rows", 3)
    ;(editTa.element as HTMLElement).style.display = "none"

    const btnSalvarEdit  = button().class(style.btnComentar).class(style.enabled).text("Salvar")
    const btnCancelarEdit = button().class(style.btnCancelar).text("Cancelar")
    const editActions = div().class(style.editActions).children(btnCancelarEdit, btnSalvarEdit)
    ;(editActions.element as HTMLElement).style.display = "none"

    // Like button
    const likedByMe  = (comentario.likes || []).includes(currentUserId)
    const likeCount  = span().text(String((comentario.likes || []).length))
    const likeBtn    = button().class(style.actionBtn).children(iconThumbsUp(), likeCount)
    if (likedByMe) likeBtn.class(style.liked)

    likeBtn.on("click", async () => {
        const [current] = await app.repository.findOne("AulaComentarios", { _id: comentario._id })
        if (!current) return
        const likes: string[] = Array.isArray(current.likes) ? [...current.likes] : []
        const idx = likes.indexOf(currentUserId)
        if (idx === -1) {
            likes.push(currentUserId)
            ;(likeBtn.element as HTMLElement).classList.add(style.liked)
        } else {
            likes.splice(idx, 1)
            ;(likeBtn.element as HTMLElement).classList.remove(style.liked)
        }
        await app.repository.update("AulaComentarios", comentario._id, { likes })
        likeCount.text(String(likes.length))
    })

    const actionsRow = div().class(style.itemActions).children(likeBtn)

    if (isOwn) {
        const editBtn = button().class(style.actionBtn).children(iconEdit())
        editBtn.on("click", () => {
            ;(textoEl.element as HTMLElement).style.display   = "none"
            ;(editTa.element as HTMLTextAreaElement).value    = comentario.texto
            ;(editTa.element as HTMLElement).style.display    = "block"
            ;(editActions.element as HTMLElement).style.display = "flex"
            ;(editTa.element as HTMLTextAreaElement).focus()
        })

        btnCancelarEdit.on("click", () => {
            ;(textoEl.element as HTMLElement).style.display    = "inline"
            ;(editTa.element as HTMLElement).style.display     = "none"
            ;(editActions.element as HTMLElement).style.display = "none"
        })

        btnSalvarEdit.on("click", async () => {
            const novoTexto = (editTa.element as HTMLTextAreaElement).value.trim()
            if (!novoTexto) return
            await app.repository.update("AulaComentarios", comentario._id, {
                texto: novoTexto,
                editadoEm: new Date().toISOString(),
            })
            comentario.texto = novoTexto
            textoEl.text(novoTexto)
            ;(textoEl.element as HTMLElement).style.display    = "inline"
            ;(editTa.element as HTMLElement).style.display     = "none"
            ;(editActions.element as HTMLElement).style.display = "none"
        })

        const deleteBtn = button().class(style.actionBtn).children(iconTrash())
        deleteBtn.on("click", async () => {
            await app.repository.delete("AulaComentarios", comentario._id)
        })

        actionsRow.children(editBtn, deleteBtn)
    }

    const contentCol = div()
        .class(style.itemContent)
        .children(metaRow, textoEl, editTa, editActions, actionsRow)

    return div()
        .class(style.item)
        .attribute("data-comment-id", comentario._id)
        .children(avatarEl, contentCol)
}

// ── SecaoComentarios ──────────────────────────────────────────────────────
export default (app: App) => (new class extends Div {
    private aulaId = ""
    private commentCount = 0

    countHeader  = h3().class(style.header).text("Comentários")
    composeAvatar = div().class(style.avatar).text(primeiraLetra(app.session.nome || ""))
    composeTa    = textarea().class(style.textarea).set("placeholder", "Adicione um comentário...").set("rows", 1)
    composeActions = div().class(style.composeActions)
    btnCancelar  = button().class(style.btnCancelar).text("Cancelar")
    btnComentar  = button().class(style.btnComentar).text("Comentar")
    composeField = div().class(style.composeField)
    composeRow   = div().class(style.composeRow)
    lista        = div().class(style.lista)
    emptyState   = span().class(style.emptyState).text("Seja o primeiro a comentar")

    activateCompose() {
        ;(this.composeTa.element as HTMLElement).classList.add(style.active)
        ;(this.composeActions.element as HTMLElement).style.display = "flex"
    }

    deactivateCompose() {
        ;(this.composeTa.element as HTMLElement).classList.remove(style.active)
        ;(this.composeTa.element as HTMLTextAreaElement).value = ""
        ;(this.composeActions.element as HTMLElement).style.display = "none"
        ;(this.btnComentar.element as HTMLElement).classList.remove(style.enabled)
    }

    updateSubmitBtn() {
        const val = (this.composeTa.element as HTMLTextAreaElement).value.trim()
        if (val.length > 0) {
            ;(this.btnComentar.element as HTMLElement).classList.add(style.enabled)
        } else {
            ;(this.btnComentar.element as HTMLElement).classList.remove(style.enabled)
        }
    }

    private updateCount(delta: number, absolute = false) {
        this.commentCount = absolute ? delta : this.commentCount + delta
        const label = this.commentCount === 1 ? "comentário" : "comentários"
        this.countHeader.text(`${this.commentCount} ${label}`)
    }

    async loadComentarios(aulaId: string) {
        this.aulaId = aulaId

        const [docs, err] = await app.repository.findMany("AulaComentarios", { aulaId })
        if (err) return

        const sorted = (docs as AulaComentario[]).sort(
            (a, b) => new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime()
        )
        this.renderList(sorted)

        app.repository.createTriggerTo("AulaComentarios", (value: any, type: string) => {
            if (type === "create") {
                const c = value as AulaComentario
                if (c.aulaId !== this.aulaId) return
                const card = makeCommentCard(app, c)
                ;(this.lista.element as HTMLElement).prepend(card.element)
                ;(this.emptyState.element as HTMLElement).style.display = "none"
                this.updateCount(1)
                return
            }

            if (type === "delete") {
                // HTTP repo retorna o doc completo; socket retorna id como string
                const deletedId: string =
                    typeof value === "string" ? value
                    : value?._id ?? value?.id ?? null
                if (!deletedId) return
                const node = (this.lista.element as HTMLElement)
                    .querySelector(`[data-comment-id="${deletedId}"]`)
                if (node) {
                    node.remove()
                    this.updateCount(-1)
                    if ((this.lista.element as HTMLElement).children.length === 0) {
                        ;(this.emptyState.element as HTMLElement).style.display = "block"
                    }
                }
            }
        }, "create", "delete")
    }

    private renderList(sorted: AulaComentario[]) {
        ;(this.lista.element as HTMLElement).innerHTML = ""
        this.updateCount(sorted.length, true)

        if (sorted.length === 0) {
            ;(this.emptyState.element as HTMLElement).style.display = "block"
            return
        }
        ;(this.emptyState.element as HTMLElement).style.display = "none"
        sorted.forEach(c => this.lista.children(makeCommentCard(app, c)))
    }

    async submitComentario() {
        const texto = (this.composeTa.element as HTMLTextAreaElement).value.trim()
        if (!texto || !this.aulaId) return

        await app.repository.create("AulaComentarios", {
            _id: ulid(),
            aulaId: this.aulaId,
            autorId: app.session.usuarioId,
            autorNome: app.session.nome || "Usuário",
            texto,
            likes: [],
            criadoEm: new Date().toISOString(),
        })

        this.deactivateCompose()
    }
}).class(style.secao).object(o => {
    o.composeTa.on("focus", () => o.activateCompose())
    o.composeTa.on("input", () => o.updateSubmitBtn())
    o.btnCancelar.on("click", () => o.deactivateCompose())
    o.btnComentar.on("click", () => o.submitComentario())

    ;(o.composeActions.element as HTMLElement).style.display = "none"
    ;(o.emptyState.element as HTMLElement).style.display = "none"

    o.composeActions.children(o.btnCancelar, o.btnComentar)
    o.composeField.children(o.composeTa, o.composeActions)
    o.composeRow.children(o.composeAvatar, o.composeField)

    o.children(
        o.countHeader,
        o.composeRow,
        o.lista,
        o.emptyState,
    )
})
