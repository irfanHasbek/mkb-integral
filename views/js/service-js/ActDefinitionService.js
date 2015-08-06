var ActDefinitionModel=require('../Model-js/ActDefinitionModel');
var UserPermissionModel=require('../Model-js/UserPermissionModel');

function ActDefinitionService()
{
    
}
ActDefinitionService.prototype.addNew = function(ActDefinition, callback){
    var newAct = new ActDefinitionModel(ActDefinition);
    newAct.save(function(err, addedAct){
        if(err){
            callback(false,error);
            return;
        }
        var permission = new UserPermissionModel({
            firmCode : ActDefinition.firmCode,                                      
            roleId : addedAct._id,
            permission : []
        });
        permission.save(function(errorPermission, addedPermission){
            if(errorPermission){
                callback(true, 'Rol eklendi fakat izinlerde hata olustu. Hata : ' + errorPermission);
                return;
            }
            callback(true,addedAct);
        });
    });
}
ActDefinitionService.prototype.removeAll = function(callback){
    ActDefinitionModel.remove(function(error){
        if(error){
            callback(false, error);
            return;
        }
        callback(true, "Tüm rol tanımları silindi.");
    });
}
 ActDefinitionService.prototype.remove = function(actId,callback){
    ActDefinitionModel.remove({_id:actId._id},function(error){
        if(error){
            callback(false, error);
            return;
        }
        callback(true,"rol tanımı silindi.");
    });
}
ActDefinitionService.prototype.listAll = function(criteria,callback){
    ActDefinitionModel.find({firmCode : criteria}, function(error, ActDefinitions){
        if(error){
            callback(false, error);
            return;
        }
        callback(true, ActDefinitions);
    });
}
module.exports = ActDefinitionService;