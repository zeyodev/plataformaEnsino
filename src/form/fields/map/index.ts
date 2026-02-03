import { ZeyoAs } from "zeyo";
import L, { LatLngExpression } from "leaflet";
import 'leaflet/dist/leaflet.css';
import Field from "../field";

export default class FieldMap extends Field {
    container: L.Map
    constructor(...args: [latlng: LatLngExpression, zoom: number, options?: L.ZoomPanOptions]) {
        super("map")
        this.element.style.height = "55vh"
        this.container = L.map(this.element)
        /* this.map.on("click", (e) => {
            console.log(e.latlng)
        }) */
        this.container.on("load", () => {
            setTimeout(() => {
                this.container.invalidateSize();
            }, 1);
        });
        this.container.setView(...args)
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            //attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.container);
    }

    getValue(): string {
        return ""
    }
    setValue() {
        return
    }
}