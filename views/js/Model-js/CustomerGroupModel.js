var mongoose = require('../../../app').mongoose;

var CustomerGroup = new mongoose.Schema({
    groupName : String,
    credit : String,
    discount : String,
    setBy     : String,
    firmCode:String
});

module.exports = mongoose.model('CustomerGroups', CustomerGroup);
