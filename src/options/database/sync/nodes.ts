import { div, span } from "zeyo";
import App from "../../../app";
import Card from "../../../components/atoms/card";
import Modal from "../../../states/Modal";
import modal from "../../../components/molecules/modal";
import button from "../../../components/atoms/button";

export default (app: App, nodeId: string) => (new class extends Card {
    
}).children(
    span(nodeId)
).click(o => {
    app.context.setState(Modal("node", modal(app, div(
        button("Iniciar Sync")
    )))).handle()
})