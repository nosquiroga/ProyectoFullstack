const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLID, GraphQLList } = require('graphql');
const { connectionDefinitions, mutationWithClientMutationId } = require('graphql-relay');
const { tipoMarca } = require('./marca');
const { nodeInterface } = require('../node');
const model = require('../../model');

const tipoCelular = new GraphQLObjectType({
    name: 'Celular',
    description: 'Representa un celular del catalogo',
    interfaces: [nodeInterface],
    isTypeOf: obj => obj._id.substr(0, 2) === 'CE',
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLID),
            description: 'Identificacion unica del celular',
            resolve: celular => celular._id
        },
        marca: {
            //type: new GraphQLObjectType(tipoMarca),
            type: GraphQLString,
            description: 'Marca del celular',
            resolve: celular => model.marca.getById(celular.marca)
        },
        modelo: {
            type: GraphQLString,
            description: 'Modelo del Celular'
        },
        pantalla: {
            type: GraphQLString,
            description: 'Tamaño de pantalla del celular'
        },
        procesador: {
            type: GraphQLString,
            description: 'Modelo del procesador del celular'
        },
        almacenamiento: {
            type: GraphQLString,
            description: 'Capacidad de almacenamiento del celular'
        },
        camara: {
            type: GraphQLString,
            description: 'Camara del celular'
        },
        bateria: {
            type: GraphQLString,
            description: 'bateria del celular'
        },
        so: {
            type: GraphQLString,
            description: 'Sistema operativo del celular'
        },
        imagen: {
            type: GraphQLString,
            description: 'Direccion url de la imagen del celular'
        }
    })
});

const { connectionType } = connectionDefinitions({ nodeType: tipoCelular });

exports.tipoCelular = tipoCelular;

exports.celularConnection = connectionType;