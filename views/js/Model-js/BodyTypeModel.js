var mongoose = require('../../../app').mongoose;

var BodyTypeScheme = new mongoose.Schema({
    bodyType : String,
    setBy  : String,
    cost : String,
    firmCode:String
});

module.exports = mongoose.model('bodyTypes', BodyTypeScheme);
