var SetMechanismModel=require('../Model-js/SetMechanismModel');

function SetMechanismService()
{
    
}
SetMechanismService.prototype.addNew = function(SetMechanism, callback){
    var newSetMechanism = new SetMechanismModel(SetMechanism);
    newSetMechanism.save(function(err, addedSetMechanism){
        if(err){
            callback(false,error);
            return;
        }
        callback(true,addedSetMechanism);
    });
}
SetMechanismService.prototype.removeAll = function(callback){
    SetMechanismModel.remove(function(error){
        if(error){
            callback(false, error);
            return;
        }
        callback(true, "Tüm ayar mekanizması silindi.");
    });
}
 SetMechanismService.prototype.remove = function(setMechanismId,callback){
    SetMechanismModel.remove({_id:setMechanismId._id},function(error){
        if(error){
            callback(false, error);
            return;
        }
        callback(true,"ayar mekanizması silindi.");
    });
}
SetMechanismService.prototype.listAll = function(criteria,callback){
    SetMechanismModel.find({firmCode : criteria}, function(error, SetMechanisms){
        if(error){
            callback(false, error);
            return;
        }
        callback(true, SetMechanisms);
    });
}
module.exports = SetMechanismService;