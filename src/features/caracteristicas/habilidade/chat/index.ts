import Z, { Div, ZeyoAs } from "zeyo";
import Caracteristica from "../..";
import App from "../../../../app";
/* import Icon from "../../../../component1.1/icons";
import Button from "../../../../component1.1/atoms/buttons";
import Modal from "../../../../component1.1/molecules/modal";
import StateModal from "../../../../states/modal"; */
import FormCriaConversa from "./form/criachat";
import FormCriaGrupo from "./form/criagrupo";

export default class HabilidadeChat extends Div {
  constructor(private app: App, caracteristica: Caracteristica, private item: any) {
    super();
    this.children(
        Z("div").class("d-flex", "jc-center").children(
            /* new Button("Criar Grupo").icon(new Icon("users")).style("no-bg").style("p-s").click(async () => {
                app.context.setState(new StateModal("criar", new Modal(app, new FormCriaGrupo(this.app, caracteristica, item))));
                app.context.handle(); 
              }),
              new Button("Criar Conversa").icon(new Icon("plus")).style("no-bg").style("p-s").click(() => {
                app.context.setState(new StateModal("criar", new Modal(app, new FormCriaConversa(this.app, caracteristica, item))));
                app.context.handle(); 
            }), */
        ),
    )
  }

}