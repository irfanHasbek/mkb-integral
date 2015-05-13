var MontageTypeModel=require('../Model-js/MontageTypeModel');

function MontageTypeService()
{
    
}
MontageTypeService.prototype.addNew = function(MontageType, callback){
    var newMontageType = new MontageTypeModel(MontageType);
    newMontageType.save(function(err, addedMontageType){
        if(err){
            callback(false,error);
            return;
        }
        callback(true,addedMontageType);
    });
}
MontageTypeService.prototype.removeAll = function(callback){
    MontageTypeModel.remove(function(error){
        if(error){
            callback(false, error);
            return;
        }
        callback(true, "Tüm montaj türleri silindi.");
    });
}
 MontageTypeService.prototype.remove = function(montageTypeId,callback){
    MontageTypeModel.remove({_id:montageTypeId._id},function(error){
        if(error){
            callback(false, error);
            return;
        }
        callback(true,"montaj türü silindi.");
    });
}
MontageTypeService.prototype.listAll = function(criteria,callback){
    MontageTypeModel.find({firmCode :criteria}, function(error, MontageTypes){
        if(error){
            callback(false, error);
            return;
        }
        callback(true, MontageTypes);
    });
}
MontageTypeService.prototype.search = function(criteria,callback){
    MontageTypeModel.find(criteria, function(error, MontageTypes){
        if(error){
            callback(false, error);
            return;
        }
        callback(true, MontageTypes);
    });
}
MontageTypeService.prototype.getByGroupName = function(firmCode, productGroupName, callback){
    MontageTypeModel.find({firmCode :firmCode, productGroupName : productGroupName}, function(error, MontageTypes){
        if(error){
            callback(false, error);
            return;
        }
        callback(true, MontageTypes);
    });
}
module.exports = MontageTypeService;