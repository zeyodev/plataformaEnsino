export default {
    name: "ComponentesRoot",
    base: "ComponenteRoot",
    storeNames: ["ComponenteRoot", "ComponentesRoot", "ComponentesConexao"],
    stages: [
        {
            type: "lookup",
            params: {
                foreignField: '_id',
                from: 'ComponentesConexao',
                localField: 'componente',
                as: 'componente',
            }
        },
        {
            type: "unwind",
            params: {
                path: 'componente',
            }
        },
        {
            type: "project",
            params: {
                _id: 'componente._id',
                projId: 'componente.projId',
                tipo: 'componente.tipo',
                nshow: 'componente.nshow',
                func: 'componente.func',
                titulo: 'componente.titulo',
                options: 'componente.options',
                conexao: 'componente.conexao',
                index: 'index',
                root: 'root'
            }
        },
    ]
}