var mongoose = require('../../../app').mongoose;

var CoverPage = new mongoose.Schema({
    label : String,
    content: String,
    active : Boolean,
    firmCode:String
});

module.exports = mongoose.model('CoverPage', CoverPage);
