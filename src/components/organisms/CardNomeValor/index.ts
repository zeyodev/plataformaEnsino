import { h3, label } from "zeyo";
import Card from "../../atoms/card";

export default () => (new class extends Card {
    nome = label()
    valor = h3()
    setNome(valor: string) {this.nome.text(valor)}
    setValor(valor: any) {this.valor.text(valor.toString())}
}).class("d-grid", "gap-m").object(o => o.children(
    o.nome,
    o.valor
))