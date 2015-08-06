var mongoose = require('../../../app').mongoose;

var ActDefinition = new mongoose.Schema({
    act : String,
    setBy: String,
    firmCode:String
});

module.exports = mongoose.model('actDefinitions', ActDefinition);
