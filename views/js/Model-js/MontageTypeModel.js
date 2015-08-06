var mongoose = require('../../../app').mongoose;

var MontageTypeScheme = new mongoose.Schema({
    montageType : String,
    productGroupName : String,
    setBy  : String,
    cost : String,
    firmCode:String
});

module.exports = mongoose.model('montageTypes', MontageTypeScheme);
