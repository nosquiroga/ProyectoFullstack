const { GraphQLObjectType, GraphQLList, GraphQLSchema, GraphQLString, GraphQLNonNull } = require('graphql');
const { connectionArgs } = require('graphql-relay');
const { tipoMarca } = require('./types/marca');
const { tipoCelular, celularConnection } = require('./types/celular');
const { nodeField } = require('./node');

const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        marca: {
            type: tipoMarca,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            }
        },
        marcas: {
            type: new GraphQLList(tipoMarca)
        },
        celular: {
            type: tipoCelular,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            }
        },
        celulares: {
            type: celularConnection,
            args: Object.assign(
                {
                    marcaId: {
                        type: GraphQLString
                    }
                },
                connectionArgs
            )
        },
        node: nodeField
    })
});

const schema = new GraphQLSchema({
    query: queryType,
});

module.exports = schema;