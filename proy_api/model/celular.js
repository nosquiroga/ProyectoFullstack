const mongo = require('./mongo');
const shortid = require('shortid');

const newCelularId = () => 'CE-' + shortid.generate();

exports.add = celular =>
    mongo.collection('celular').then(col => {
        celular._id = newCelularId();
        return col.insert(celular).then(r => celular);
    });

exports.update = celular =>
    mongo.collection('celular').then(col => {
        const celularData = Object.assign(celular, { _id: celular.id }, { id: undefined });
        return col.findOneAndUpdate({ _id: celularData._id }, celularData).then(r => celular);
    });

exports.remove = id =>
    mongo.collection('celular').then(col => {
        return col.findOneAndDelete({ _id: id }).then(r => {
            if (r.lastErrorObject && r.lastErrorObject.n === 0) {
                return Promise.reject(new Error('No se encontro el celular'));
            }
            return r.value;
        });
    });

exports.getAll = () =>
    mongo.collection('celular').then(col => {
        return col.find().sort({ $natural: -1 });
    });

exports.getById = id =>
    mongo.collection('celular').then(col => {
        return col.findOne({ _id: id });
    });

exports.getByMarcaId = id =>
    mongo.collection('celular').then(col => {
        return col.find({ marca: id });
    });