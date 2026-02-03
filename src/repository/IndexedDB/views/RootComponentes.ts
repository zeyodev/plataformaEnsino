export default {
    name: "RootComponentes",
    base: "ComponentesConexao",
    storeNames: ["ComponentesConexao", "RootComponentes", "ComponentesRoot"],
    stages: [
        {
            type: "lookup",
            params: {
                foreignField: 'root',
                from: 'ComponentesRoot',
                localField: '_id',
                as: 'componentes',
            }
        },
    ]
}