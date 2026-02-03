export default {
    name: "ProjetosModulos",
    base: "Projetos",
    storeNames: ["ProjetosModulos", "Projetos", "Modulos"],
    stages: [
        {
            type: "lookup",
            params: {
                from: 'Modulos',
                localField: '_id',
                foreignField: 'projeto',
                as: 'modulos'
            }
        },
    ]
}