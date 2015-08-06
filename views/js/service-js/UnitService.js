var UnitModel=require('../Model-js/UnitModel');

function UnitService()
{
    
}
UnitService.prototype.addNew = function(unit, callback){
    var newUnit = new UnitModel(unit);
    newUnit.save(function(err, addedUnit){
        if(err){
            callback(false,err);
            return;
        }
        callback(true,addedUnit);
    });
}
UnitService.prototype.removeAll = function(callback){
    UnitModel.remove(function(error){
        if(error){
            callback(false, error);
            return;
        }
        callback(true, "Tüm birimler silindi.");
    });
}
UnitService.prototype.remove = function(unitId,callback){
    UnitModel.remove({_id:unitId},function(error){
        if(error){
            callback(false, error);
            return;
        }
        callback(true,"Birim silindi.");
    });
}
UnitService.prototype.listAll = function(firmaCode, callback){
    UnitModel.find({ firmCode : firmaCode }, function(error, units){
        if(error){
            callback(false, error);
            return;
        }
        callback(true, units);
    });
}
UnitService.prototype.update = function(unit, callback){
    UnitModel.update({ _id : unit._id }, unit, function(error, numOfAffect){
        if(error){
            callback(false, error);
            return;
        }
        callback(true, "Birim guncellendi.");
    });
}
module.exports = UnitService;