import Z, { ZeyoAs } from "zeyo";
import Field from "../field";
import App from "../../../app";
import { ulid } from "ulid";

export default class FieldFileImage extends Field {
    image: ZeyoAs<"img"> = Z("img").set("width", 200).set("height", 300).object(o => o.element.style.objectFit = "contain")
    file: ZeyoAs<"input"> = Z("input").set("type", "file")
    input: ZeyoAs<"input"> = Z("input").set("type", "text")
    constructor(key: string, toData: boolean, public app: App) {
        super(key, true)
        this.class("d-grid", "gap-p").children(
            Z("div").class("d-flex", "gap-m").children(
                this.image,
                Z("div").class("d-flex", "gap-m").children(
                    Z("div").class("d-grid", "gap-p").children(
                        this.file.set("id", key).on("change", () => {
                            if (!this.file.element.files || !this.file.element.files[0]) return;
                            const reader = new FileReader();
                            reader.onload = (e) => {
                                const url = e.target?.result;
                                this.image.set("src", url as string)
                            }
                            reader.readAsDataURL(this.file.element.files[0])
                        }),
                        Z("button").set("type", "button").text("Enviar").click(() => {
                            console.log("enviando imagem para o servidor")
                            this.action()
                        })
                    ),
                    this.input.on("change", () => {
                        this.image.set("src", this.input.element.value)
                    })
                )
            )

        )
    }
    action() {
        this.uploadFile(this.file.element, this.input.element)
    }

    async uploadFile(input: HTMLInputElement, element: HTMLInputElement) {
        if (!input.files) return console.log("sem arquivo")
        if (input.files && input.files[0].size > 104857600) {
            return console.error("tamanho invalido");
        }
        //Snackbar(this.app, Z("p").text("Enviando imagem ⏳"))
        const organizacao = ""/* this.app.repository.idb.name */;

        const file = input.files[0]
        console.log(file)
        const evento = `upload/${organizacao}/${ulid()}`;
        this.app.socket.emit(evento, {
            file: input.files[0],
            params: [{ width: 200, quality: 60 }, { width: 800, quality: 80 }],
            info: {
                name: file.name,
                type: file.type
            }
        });
        const result = (await this.app.socket.wait("upload/end") as any)
        //Snackbar(this.app, Z("p").text(`Imagem enviada ✅`))
        this.setValue(`https://image.zeyo.org/${result.response.src.replace("../", "")}`)
        /* const data = new FormData()
        const organizacao = this.app.repository.idb.name
        data.append("estabelecimento", organizacao)
        data.append("params", JSON.stringify([{ width: 200, quality: 60 }]))
        data.append("element", ulid())
        data.append("file", input.files[0])
        console.log(data);
        const request = new XMLHttpRequest();
        request.onreadystatechange = async () => {
            if (request.readyState === 4 && request.status === 200) {
                console.log(request.responseText)
                const [result, err] = JSON.parse(request.responseText)
                if (err) return console.error(result)
                console.log(result)
                Snackbar(this.app, Z("p").text("Imagem Enviada 👍, salvando..."))
                element.value = `https://image.zeyo.org/img/${organizacao}/q60_w200/${result}`
                Snackbar(this.app, Z("p").text("Imagem Salva 😎"))
            } else if (request.status > 300) return
        }
        //request.open("POST", `${server.url}/uploadfile`)
        request.open("POST", `${process.env.SERVER_URL || "https://backend.alasmenu.com"}/uploadfile`)
        /* request.setRequestHeader("accessToken", (await getStorage("accessToken")).value)
        request.setRequestHeader("refreshToken", (await getStorage("refreshToken")).value) *
        request.send(data) */
    }

    getValue(): string {
        return this.input.element.value;
    }
    setValue(value: string): this {
        this.input.element.value = value;
        this.image.set("src", value)
        return this;
    }
}