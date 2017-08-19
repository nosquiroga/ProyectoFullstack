const mongodb = require('mongodb'), client = mongodb.MongoClient;
const user = process.env.DBUSER;
const psw = process.env.DBPSW;

const USER = process.env.MONGO_USER || "admin";
const PSWD = process.env.MONGO_PASSWORD || "admin";
const DOMAIN = process.env.MONGO_DOMAIN || "localhost";
const PORT = process.env.MONGO_PORT || "27017";
const DB = process.env.MONGO_DB || "proy_db"

const connectionString = `mongodb://localhost:27017/proy_db`;
//const connectionString = `mongodb://${user}:${psw}@ds131312.mlab.com:31312/fullstack-course`

console.log(connectionString);

let promise;
let db;

const dbConnector = connectionString => {
    if(promise){
        return promise;
    }
    console.log(`Mongo connect: ${connectionString}`);
    promise = client.connect(connectionString).then(function(database) {
        db = database;
        return db;
    });

    return promise;
};

const collection = name => {
    return dbConnector(connectionString).then(db => db.collection(name));
};

exports.dbConnector = dbConnector;
exports.collection = collection;