export default {
    name: "AgregadorSubs",
    base: "Componentes",
    storeNames: ["Componentes", "AgregadorSubs", "ComponentesConexao"],
    stages: [
        {
            type: "lookup",
            params: {
                foreignField: "painel",
                from: "Componentes",
                localField: "_id",
                as: "painel"
            }
        },
        {
            type: "lookup",
            params: {
                foreignField: 'control',
                from: 'Componentes',
                localField: '_id',
                as: 'control'
            }
        },
        {
            type: "lookup",
            params: {
                foreignField: '_id',
                from: 'ComponentesConexao',
                localField: '_id',
                as: 'conexao'
            }
        },
        {
            type: "unwind",
            params: {
                path: 'conexao',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            type: "project",
            params: {
                projId: 'projId',
                tipo: 'tipo',
                titulo: 'titulo',
                painel: 'painel',
                control: 'control',
                conexao: 'conexao.conexao',
                _id: '_id'
            }
        },
    ]
}