var mongoose = require('../../../app').mongoose;

var AccessoryScheme = new mongoose.Schema({
    firmCode :String,
    accessory : String,
    cost : String,
    setBy  : String
});

module.exports = mongoose.model('accessories', AccessoryScheme);
