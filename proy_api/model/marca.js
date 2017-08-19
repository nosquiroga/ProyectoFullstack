const mongo = require('./mongo');
const shortid = require('shortid');

const newMarcaId = () => 'MA-'+ shortid.generate();

exports.add = marca => 
    mongo.collection('marca').then(col => {
        marca._id = newMarcaId();
        return col.insert(marca);
    });

exports.update = marca =>
    mongo.collection('marca').then(col => {
        return col.findOneAndUpdate({_id: marca._id}, marca);
    });

exports.remove = id =>
    mongo.collection('marca').then(col => {
        return col.findOneAndDelete({_id: id});
    });

exports.getAll = () =>
    mongo.collection('marca').then(col => {
        return col.find().toArray();
    });

exports.getById = id =>
    mongo.collection('marca').then(col => {
        return col.findOne({_id: id});
    });

exports.getByIds = ids =>
    mongo.collection('marca').then(col => {
        return col.find({_id: { $in: ids } }).toArray;
    });
