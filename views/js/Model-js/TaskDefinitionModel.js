var mongoose = require('../../../app').mongoose;

var TaskDefinition = new mongoose.Schema({
    task : String,
    setBy : String,
    firmCode:String
});

module.exports = mongoose.model('taskDefinitions', TaskDefinition);
