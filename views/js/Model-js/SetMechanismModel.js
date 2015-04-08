var mongoose = require('../../../app').mongoose;

var SetMechanismScheme = new mongoose.Schema({
    setMechanism : String,
    productGroupName : String,
    setBy  : String,
    cost : String,
    firmCode:String
});

module.exports = mongoose.model('setMechanisms', SetMechanismScheme);
