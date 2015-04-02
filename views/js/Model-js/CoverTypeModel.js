var mongoose = require('../../../app').mongoose;

var CoverTypeScheme = new mongoose.Schema({
    coverType : String,
    setBy  : String,
    cost : String,
    firmCode:String
});

module.exports = mongoose.model('coverTypes', CoverTypeScheme);
