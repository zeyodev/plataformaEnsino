import Z, { ZeyoAs } from "zeyo";
import Field from "../field";
import App from "../../../app";
import { ulid } from "ulid";
import Form from "../..";

export default class FieldFileClip extends Field {
    file: ZeyoAs<"input"> = Z("input").set("type", "file")
    input: ZeyoAs<"input"> = Z("input").set("type", "text")
    video: ZeyoAs<"video">;
    constructor(key: string, toData: boolean, public app: App, public form: Form) {
        super(key, toData)
        this.class("d-grid", "gap-p").children(
            Z("div").class("d-flex", "gap-m").children(
                this.video = Z("video").set("width", 200).set("autoplay", true).set("muted", true).set("controls", true),
                Z("div").class("d-grid", "gap-p", "w-100", "ac-start").children(
                    Z("div").class("d-grid", "gap-p").children(
                        this.file.set("id", key).on("change", () => {
                            if(!this.file.element.files ||!this.file.element.files[0]) return;
                            const reader = new FileReader();
                            reader.onload = (e) => {
                                const url = e.target?.result;
                                this.video.set("src", url as string)
                            }
                            reader.readAsDataURL(this.file.element.files[0])
                        }),
                        Z("button").set("type", "button").text("Enviar").click(() => {
                            console.log("enviando imagem para o servidor")
                            this.action()
                        })
                    ),
                    this.input
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
        //Snackbar(this.app, Z("p").text("Enviando Clip ⏳"));
        const organizacao = this.app.repository.idb.name;

        const file = input.files[0]
        console.log(file)
        this.app.socket.emit(`upload/${organizacao}/${ulid()}`, {
            file: input.files[0],
            params: [{ original: true }, { size: "480x853", duration: 10 }, { thumbnail: true }],
            info: {
                name: file.name,
                type: file.type
            }
        });

        const result: any = await new Promise((resolve) => {
            this.app.socket.onAny((event, args) => {
                console.log(event, args);
                if (!event.startsWith("upload")) return;

                const command = event.split("/")[1];
                if (args.msg)
                    //Snackbar(this.app, Z("p").text(args.msg))

                console.log(command, args);
                if (command === "end")
                    if (args.folder === "original")
                        resolve(args)
                    else if (args.folder === "preview") {
                        const preview = this.form.getFieldByKey("preview")
                        console.log(args);
                        preview?.setValue(`https://image.zeyo.org/${args.response.src.replace("../", "")}`)
                    }else if(args.folder === "thumbnail") {
                        const thumbnail = this.form.getFieldByKey("thumbnail")
                        console.log(args, thumbnail);
                        thumbnail?.setValue(`https://image.zeyo.org/${args.response.src.replace("../", "")}`)
                    }

            })
        })

        this.setValue(`https://image.zeyo.org/${result.response.src.replace("../", "")}`)
        /* const request = new XMLHttpRequest();
        request.onreadystatechange = async () => {
            if (request.readyState === 4 && request.status === 200) {
                console.log(request.responseText)
                const [result, err] = JSON.parse(request.responseText)
                if (err) return console.error(result)
                console.log(result)
                Snackbar(this.app, Z("p").text("Clip Enviada 👍, salvando..."))
                //https://image.zeyo.org/img/01JJQ9NP31RVS1KXCTQJ2FBYJ2/original/01JJYARBV9BANQX5K66R980Q91-d421.mp4
                element.value = `https://image.zeyo.org/img/${organizacao}/original/${result}`
                Snackbar(this.app, Z("p").text("Clip Salvo 😎"))
            } else if (request.status > 300) return
        };
        //request.open("POST", `${server.url}/uploadfile`)
        request.open("POST", `${process.env.SERVER_URL || "https://backend.alasmenu.com"}/uploadfile`)
        /* request.setRequestHeader("accessToken", (await getStorage("accessToken")).value)
        request.setRequestHeader("refreshToken", (await getStorage("refreshToken")).value) 
        request.send(data) */
    }

    getValue(): string {
        return this.input.element.value;
    }
    setValue(value: string): this {
        this.input.element.value = value;
        this.video.set("src", value);
        return this;
    }
}