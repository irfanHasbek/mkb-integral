var mongoose = require('../../../app').mongoose;

var ProductGroupDefinitionScheme = new mongoose.Schema({
    productGroupName : String,
    setBy  : String,
    firmCode:String
});

module.exports = mongoose.model('productGroups', ProductGroupDefinitionScheme);
