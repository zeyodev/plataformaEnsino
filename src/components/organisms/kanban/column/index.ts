import { div, Div, h5, header, i } from "zeyo"
import styles from "./styles.module.css"
import color from "./color"
import App from "../../../../app"
import chat from "./chat"

interface Label {
    chatCount: number
    color: string
    colorIndex: number
    count: number
    hexColor: string
    id: string
    isActive: boolean
    isImmutable: boolean
    messageCount: number
    name: string
    orderIndex: number
    predefinedId: number
    type: number
}

export default (app: App, label: Label) => (new class extends Div {
    update(newlabel: Label) {
        if(newlabel.id !== label.id) return;
        const zcolor = this.childList[0].childList[0]
        const zname = this.childList[0].childList[1]
        const zcount = this.childList[0].childList[2];
        (zcolor as any).update(newlabel.colorIndex);
        zname.text(newlabel.name);
        zcount.text(newlabel.chatCount.toString());

        const chats = this.childList[1]
        chats.thread(async o => {
            /* const { result } = await app.WWebJS("getLabelChats", label.id)
            o.HTML("").children(
                ...result.map((c: any) => chat(app, c))
            ) */
        })
    }
 }).class(styles.column)
    .children(
        header(
            color(label.colorIndex),
            h5(label.name),
            i(label.chatCount.toString())
        ),
        div().class(styles.chats).thread(async o => {
            /* const { result } = await app.WWebJS("getLabelChats", label.id)
            o.children(
                ...result.map((c: any) => chat(app, c))
            ) */
        }).on("drop", async (o, e) => {
            e.preventDefault();
            const data: string = e.dataTransfer?.getData("text") || "";
            (e.target as any).appendChild(document.getElementById(data))
            //await app.WWebJS("switchChatLabel", {chatId: data, newLabelId: label.id});
        })
    ).object(o => {
        //app.addWWebJSListener("label/change", (event) => o.update(event))
    })