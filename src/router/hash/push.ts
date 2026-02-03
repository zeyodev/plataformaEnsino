export default class Push {
    static async push(hash: string){
        window.location.hash = hash
    }
}