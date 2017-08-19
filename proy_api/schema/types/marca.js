const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLID
} = require('graphql');

const { nodeInterface } = require('../node');

const tipoMarca = new GraphQLObjectType({
    name: 'Marca',
    description: 'Representa una marca de celulares',
    interfaces: [nodeInterface],
    isTypeOf: obj => obj._id.substr(0, 2) === 'MA',
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLID),
            description: 'identificador unico de la marca',
            resolve: obj => obj._id
        },
        nombre: {
            type: GraphQLString,
            description: 'nombre de la marca'
        },
        imagen_logo: {
            type: GraphQLString,
            description: 'direccion url de la imagen del logo de la marca'
        }
    })
});

exports.tipoMarca = tipoMarca;