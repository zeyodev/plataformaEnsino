const instrucoes: any[] = [
    {
        topico: "whatsapp/getchatbyid",
        parametros: ["notification.chatId"],
        retorno: "chat",
    },
    {
        topico: "whatsapp/sendMessage",
        params: ["notification.id.participant", "Olá! você entrou no grupo\n\n *${chat.name}* \n\nAgora já pode receber super promoções!"],
    },
    {
        topico: "sleep",
        params: [7000]
    },
    {
        topico: "db/update",
        params: ["Objetos", "objeto._id", {state: "iddostage"}],
    },
]


function rotina(escopo: any, instrucoes: any[]) {
    for (const instrucao of instrucoes) {
        
    }
}

function getchatbyid(chatId: string) {
    return {name: "Grupo Teste"}
}