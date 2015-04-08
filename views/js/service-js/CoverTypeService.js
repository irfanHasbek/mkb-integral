var CoverTypeModel=require('../Model-js/CoverTypeModel');

function CoverTypeService()
{
    
}
CoverTypeService.prototype.addNew = function(CoverType, callback){
    var newCoverType = new CoverTypeModel(CoverType);
    newCoverType.save(function(err, addedCoverType){
        if(err){
            callback(false,error);
            return;
        }
        callback(true,addedCoverType);
    });
}
CoverTypeService.prototype.removeAll = function(callback){
    CoverTypeModel.remove(function(error){
        if(error){
            callback(false, error);
            return;
        }
        callback(true, "Tüm montaj türleri silindi.");
    });
}
 CoverTypeService.prototype.remove = function(coverTypeId,callback){
    CoverTypeModel.remove({_id:coverTypeId._id},function(error){
        if(error){
            callback(false, error);
            return;
        }
        callback(true,"montaj türü silindi.");
    });
}
CoverTypeService.prototype.listAll = function(firmCode,callback){
    CoverTypeModel.find({firmCode:firmCode}).sort({ orderCover : -1 }).exec(function(error, CoverTypes){
        if(error){
            callback(false, error);
            return;
        }
        callback(true, CoverTypes);
    });
}
module.exports = CoverTypeService;