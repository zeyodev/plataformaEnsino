import L, { map } from "leaflet";
import Z from "zeyo";
import style from "./style.module.css"
import App from "../../../app";
import FieldInput from "../input";
import ParceiroMarker from "../map/ParceiroMarker";
import Icon from "../../../component1.1/icons";
import Button from "../../../component1.1/atoms/buttons";
import Form from "../..";
import FieldMap from "../map";
import Snackbar from "../../../component/snackbar";

export default class FormUpdateCoodinates extends Form {
    app: App
    lat: FieldInput
    lng: FieldInput
    marker: L.Marker
    parceiro: any
    constructor(app: App, parceiro: any, private model: any) {
        super()
        this.app = app
        this.title.text(`GeoLocalização do ${parceiro.titulo}`)
        const icon = new ParceiroMarker({ iconUrl: parceiro.img ? parceiro.img : "https://image.zeyo.org/img/emojis/heart_eyes.png", className: style.round })
        this.marker = L.marker([0, 0], { icon: icon })
        this.parceiro = parceiro
        console.log(this.parceiro)
        this.body.children(
            Z("div").class("d-flex", "a-center", "gap-m", style.back).children(
                new Icon("arrow-left"),
                Z("b").text("Voltar")
            ).click(() => window.history.back()),
            Z("div").class("d-flex", "gap-g", "a-end").children(
                new FieldInput("endereco").class("w-100").label("Endereço").setValue(parceiro.endereco),
                new Button().text("Pesquisar").set("type", "button").click(async () => {
                    const endereco = this.getValueByKey("endereco")
                    console.log(endereco)
                    app.socket.emit("uc/geocoding", { endereco })
                    const [results, err] = await app.socket.wait("uc/geocoding")
                    console.log(results, err)
                    if (err || !results[0]) return
                    const { lat, lng } = results[0].geometry
                    this.getFieldByKey("lat")?.setValue(lat)
                    this.getFieldByKey("lng")?.setValue(lng)

                    this.setMarker(lat, lng)
                })
            ),
            Z("div").class("d-flex", "gap-g", "a-end").children(
                this.lat = new FieldInput("lat", true).class("w-100").label("Latitude").setValue(parceiro.coordinates && parceiro.coordinates.lat ? parceiro.coordinates.lat : "nao tem"),
                this.lng = new FieldInput("lng", true).class("w-100").label("Longitude").setValue(parceiro.coordinates && parceiro.coordinates.lng ? parceiro.coordinates.lng : "nao tem"),
                new Button().text("Atualizar").set("type", "button").click(() => {
                    this.setMarker(Number(this.lat.getValue()), Number(this.lng.getValue()))
                })
            ),
            new FieldMap([0, 0], 5).object(o => {
                //aqui tem que mostrar o marker do restaurante
                console.log("====>", style.round)
                //const icon = new ParceiroMarker({ iconUrl: parceiro.img ? parceiro.img : "", className: style.round })
                if (parceiro.coordinates && parceiro.coordinates.lat && parceiro.coordinates.lng) {
                    this.marker.addTo(o.container).setLatLng([parceiro.coordinates.lat, parceiro.coordinates.lng])
                    o.container.setView([parceiro.coordinates.lat, parceiro.coordinates.lng], 17)
                }
                o.container.on("click", (e) => {
                    console.log(e.latlng)
                    this.lat.setValue(e.latlng.lat.toString())
                    this.lng.setValue(e.latlng.lng.toString())
                    this.setMarker(e.latlng.lat, e.latlng.lng)
                })
            })
        )
        this.footer.children(
            new Button("Salvar").set("type", "submit")
        )
    }

    async onSubmit() {
        const { lat, lng } = this.getFieldsInObject()
        const coordinates = { lat: Number(lat.getValue()), lng: Number(lng.getValue()) }
        if(!this.model) this.model = coordinates
        else Object.assign(this.model, coordinates)
        /* 
        console.log(coordinates)
        console.log(this.parceiro)
        this.parceiro.coordinates = coordinates
        const [result, err] = await this.app.repository.update("Itens", this.parceiro._id, this.parceiro)
        console.log(result, err)
        */
       Snackbar(this.app, Z("p").text("Salvo com sucesso!!"))
       window.history.back()
       console.log("aqui vai chamar o controller") 
    }

    setMarker(lat: number, lng: number) {
        const map = (this.getFieldByKey("map") as FieldMap | undefined)
        if (!map) return;
        this.marker.addTo(map.container).setLatLng([lat, lng])
        map.container.setView([lat, lng], 16)
    }
}