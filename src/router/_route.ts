import Hash from "./hash/_hash"
import Push from "./push"

export default class Route extends Push {
    hash = Hash
    init() {
        this.build(window.location.pathname)
        /* window.onpopstate = e => {
            e.preventDefault()
            console.log("aqui no route")
            if (this.hash.on){
                this.hash.on = false
            } else if(window.location.hash.length <=1)
                this.build(window.location.pathname)
        } */
        window.onhashchange = e => {
            if (e.newURL.split("#").length > 1)
                this.hash.on = true
            else this.hash.remove()
        }
    }
}