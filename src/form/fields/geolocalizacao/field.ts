import Z, { ZeyoAs } from "zeyo";
import Field from "../field";
import Input from "../../../component1.1/atoms/inputs";
import Button from "../../../component1.1/atoms/buttons";
import Icon from "../../../component1.1/icons";
import App from "../../../app";
import StateModal from "../../../states/modal";
import FormUpdateCoodinates from ".";
import Modal from "../../../component1.1/molecules/modal";
import Form from "../..";

export default class FieldGeolocation extends Field {
    model = {}
    constructor(key: string, toData: boolean, app: App, form: Form) {
        super(key, toData === true)
        this.class("d-grid", "gap-p").children(
            new Button().style("no-bg").style("icon").set("type", "button").children(new Icon("map-marker"), "Geolocalização").click(() => {
                
                const data = form.getDataFromFields()
                console.log(data)
                console.log(this.model)
                app.context.setState(new StateModal("Geolocalização", Modal(app, new FormUpdateCoodinates(app, data, this.model))))
                app.context.handle()
            }),
        )
    }

    getValue(): any {
        return this.model
    }

    setValue(value: any) {
        this.model = value || {};
        return this
    }
}