var mongoose = require('../../../app').mongoose;

var UserPermissionModel = new mongoose.Schema({
    firmCode : String,                                           
    roleId : String,
    permission : [String]
});

module.exports = mongoose.model('userPermission', UserPermissionModel);
