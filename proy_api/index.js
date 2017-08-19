const express = require('express');
const graphqlHTTP = require('express-graphql');
const model = require('./model');
const schema = require('./schema');
const cors = require('cors');
const app = express();

const connectionFromMongoCursor = require('relay-mongodb-connection');

const queryResolver = {
    marca: ({ id }) => model.marca.getById(id),
    marcas: () => model.marca.getAll(),
    celulares: args =>
        args.marcaId
            ? model.celular.getByMarcaId(args.marcaId).then(c => connectionFromMongoCursor(c, args))
            : model.celular.getAll().then(c => connectionFromMongoCursor(c, args)),
    celular: ({ id }) => model.celular.getById(id)
};

app.use(cors());

app.use(
    '/graphql',
    graphqlHTTP({
        schema: schema,
        rootValue: queryResolver,
        graphiql: true
    })
);

app.listen(4000, function () {
    console.log('Servidor API GraphQL corriendo en localhost:4000/graphql');
});