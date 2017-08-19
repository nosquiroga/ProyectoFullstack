const { nodeDefinitions} = require('graphql-relay');
const model = require('../model');

const { nodeInterface, nodeField } = nodeDefinitions(id => {
    const type = id.substr(0, 2);

    switch(type){
        case "MA":
            return model.marca.getById(id);
        
        case "CE":
            return model.celular.getById(id);

        default:
            return;
    }
});

exports.nodeInterface = nodeInterface;
exports.nodeField = nodeField;