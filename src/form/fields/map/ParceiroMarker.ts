import L, { BaseIconOptions, IconOptions } from "leaflet";

export default class ParceiroMarker<T extends BaseIconOptions = IconOptions> extends L.Icon{
    constructor(options: T){
        super(Object.assign({
            iconUrl: '',
            shadowUrl: 'https://image.zeyo.org/img/geo/marker.svg',
            iconSize: [40, 40], // size of the icon
            shadowSize: [50, 64], // size of the shadow
            iconAnchor: [20, 55], // point of the icon which will correspond to marker's location
            shadowAnchor: [25, 62],  // the same for the shadow
            popupAnchor: [0, -60] // point from which the popup should open relative to the iconAnchor
        }, options))
    }
}