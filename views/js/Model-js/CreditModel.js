var mongoose = require('../../../app').mongoose;

var CreditScheme = new mongoose.Schema({
    credit : Number,
    percent: Number,
    setBy  : String,
    firmCode:String
});

module.exports = mongoose.model('credits', CreditScheme);
