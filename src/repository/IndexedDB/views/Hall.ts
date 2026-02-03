export default {
    name: "Hall",
    base: "UsuariosProjeto",
    storeNames: ["Hall", "UsuariosProjeto", "Projetos", "Usuarios"],
    stages: [
        {
            type: "lookup",
            params: {
                as: 'projeto',
                from: 'Projetos',
                localField: 'projeto',
                foreignField: '_id'
            }
        },
        {
            type: "unwind",
            params: {
                path: 'projeto',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            type: "group",
            params: {
                _id: 'username',
                projetos: {
                    $push: '$$ROOT'
                }
            }
        },
        {
            type: "lookup",
            params: {
                foreignField: 'username',
                from: 'Usuarios',
                localField: '_id',
                as: 'usuario',
            }
        },
        {
            type: "unwind",
            params: {
                path: 'usuario',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            type: "project",
            params: {
                _id: 'usuario._id',
                username: 'usuario.username',
                nome: 'usuario.nome',
                email: 'usuario.email',
                projetos: 'projetos',
                favorite: 'usuario.favorite',
            }
        },
    ]
}