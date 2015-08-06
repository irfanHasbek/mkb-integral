var BodyTypeModel=require('../Model-js/BodyTypeModel');

function BodyTypeService()
{
    
}
BodyTypeService.prototype.addNew = function(bodyType, callback){
    var newBodyType = new BodyTypeModel(bodyType);
    newBodyType.save(function(err, addedBodyType){
        if(err){
            callback(false,error);
            return;
        }
        callback(true,addedBodyType);
    });
}
BodyTypeService.prototype.removeAll = function(callback){
    BodyTypeModel.remove(function(error){
        if(error){
            callback(false, error);
            return;
        }
        callback(true, "Tüm kasa tipleri silindi.");
    });
}
 BodyTypeService.prototype.remove = function(bodyTypeId,callback){
    BodyTypeModel.remove({_id:bodyTypeId._id},function(error){
        if(error){
            callback(false, error);
            return;
        }
        callback(true,"kasa tipi silindi.");
    });
}
BodyTypeService.prototype.listAll = function(criteria,callback){
    BodyTypeModel.find({firmCode : criteria}, function(error, BodyTypes){
        if(error){
            callback(false, error);
            return;
        }
        callback(true, BodyTypes);
    });
}
BodyTypeService.prototype.search = function(criteria,callback){
    BodyTypeModel.find(criteria, function(error, BodyTypes){
        if(error){
            callback(false, error);
            return;
        }
        callback(true, BodyTypes);
    });
}
BodyTypeService.prototype.getByGroupName = function(firmCode, productGroupName, callback){
    BodyTypeModel.find({firmCode : firmCode, productGroupName : productGroupName}, function(error, BodyTypes){
        if(error){
            callback(false, error);
            return;
        }
        callback(true, BodyTypes);
    });
}
module.exports = BodyTypeService;