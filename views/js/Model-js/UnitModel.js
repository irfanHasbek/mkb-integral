var mongoose = require('../../../app').mongoose;

var UnitScheme = new mongoose.Schema({
    firmCode :String,
    unit : String,
    setBy  : String
});

module.exports = mongoose.model('unit', UnitScheme);
