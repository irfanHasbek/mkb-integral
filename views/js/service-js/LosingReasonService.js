var LosingReasonModel=require('../Model-js/LosingReasonModel');

function LosingReasonService(){}
LosingReasonService.prototype.addNew = function(LosingReason, callback){
    var newLosingReason = new LosingReasonModel(LosingReason);
    newLosingReason.save(function(err, addedLosingReason){
        if(err){
            callback(false,error);
            return;
        }
        callback(true,addedLosingReason);
    });
}
LosingReasonService.prototype.removeAll = function(callback){
    LosingReasonModel.remove(function(error){
        if(error){
            callback(false, error);
            return;
        }
        callback(true, "Tüm kaybetme nedenleri silindi.");
    });
}
 LosingReasonService.prototype.remove = function(losingReasonId,callback){
    LosingReasonModel.remove({_id:losingReasonId._id},function(error){
        if(error){
            callback(false, error);
            return;
        }
        callback(true,"kaybetme nedeni silindi.");
    });
}
LosingReasonService.prototype.listAll = function(criteria,callback){
    LosingReasonModel.find({firmCode :criteria}, function(error, LosingReasons){
        if(error){
            callback(false, error);
            return;
        }
        callback(true, LosingReasons);
    });
}
module.exports = LosingReasonService;