const mongodb = require("mongodb"), client = mongodb.MongoClient;

const path = require("path");

const readJSON = require("read-json");

const celularesFile = path.resolve(__dirname, "../../data/celulares.json");
const marcasFile = path.resolve(__dirname, "../../data/marcas.json");

const USER = process.env.MONGO_USER || "admin";
const PSWD = process.env.MONGO_PASSWORD || "admin";
const DOMAIN = process.env.MONGO_DOMAIN || "localhost";
const PORT = process.env.MONGO_PORT || "27017";
const DB = process.env.MONGO_DB || "proy_db"

const connectionString = `mongodb://${DOMAIN}:${PORT}/${DB}`;

let promise;
let db;

const dbConnector = connectionString => {
    if (promise) {
        return promise;
    }
    console.log(`Conexion Mongo: ${connectionString}`);
    promise = client.connect(connectionString).then(function (database) {
        db = database;
        return db;
    });

    return promise;
};

const collection = name => {
    return dbConnector(connectionString).then(db => db.collection(name));
};

const fetch = filename => {
    return new Promise((resolve, reject) =>
        readJSON(filename, (error, elements) => {
            if (error) {
                return reject(error);
            }
            resolve(elements);
        })
    );
};

const init = (type, file) => {
    let col = {};
    return collection(type)
        .then(coll => {
            col = coll;
            return col.find().toArray;
        })
        .then(elementsDB => {
            console.log(elementsDB.length);
            //if (!elementsDB.length) {
                console.log(`No se encuentra coleccion MongoDB (${type}), importando...`);
                return fetch(file).then(elements => {
                    return col.insertMany(elements);
                });
            //}
            console.log(`Coleccion MongoDB (${type}) encontrada...`);
            return Promise.resolve();
        });
};

const initCelulares = () => init("celulares", celularesFile);

const initMarcas = () => init("marcas", marcasFile);

exports.dbConnector = dbConnector;

exports.collection = collection;

