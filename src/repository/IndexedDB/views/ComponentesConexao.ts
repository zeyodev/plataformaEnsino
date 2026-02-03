const ComponentesConexao = {
    name: "ComponentesConexao",
    base: "Componentes",
    storeNames: ["ComponentesConexao", "Componentes", "Conexoes"],
    stages: [
        {
            type: "lookup",
            params: {
                foreignField: '_id',
                from: 'Conexoes',
                localField: 'conexao',
                as: 'conexao',
            }
        },
    ]
}
export default ComponentesConexao