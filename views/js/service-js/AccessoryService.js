var AccessoryModel=require('../Model-js/AccessoryModel');

function AccessoryService()
{
    
}
AccessoryService.prototype.addNew = function(Accessory, callback){
    var newAccessory = new AccessoryModel(Accessory);
    newAccessory.save(function(err, addedAccessory){
        if(err){
            callback(false,error);
            return;
        }
        callback(true,addedAccessory);
    });
}
AccessoryService.prototype.removeAll = function(callback){
    AccessoryModel.remove(function(error){
        if(error){
            callback(false, error);
            return;
        }
        callback(true, "Tüm aksesuarlar silindi.");
    });
}
 AccessoryService.prototype.remove = function(accessoryId,callback){
    AccessoryModel.remove({_id:accessoryId._id},function(error){
        if(error){
            callback(false, error);
            return;
        }
        callback(true,"aksesuar silindi.");
    });
}
AccessoryService.prototype.listAll = function(criteria,callback){
    AccessoryModel.find({firmCode : criteria}, function(error, Accessorys){
        if(error){
            callback(false, error);
            return;
        }
        callback(true, Accessorys);
    });
}
AccessoryService.prototype.getByGroupName = function(firmCode, productGroupName,callback){
    AccessoryModel.find({firmCode : firmCode, productGroupName : productGroupName}, function(error, Accessorys){
        if(error){
            callback(false, error);
            return;
        }
        callback(true, Accessorys);
    });
}
module.exports = AccessoryService;