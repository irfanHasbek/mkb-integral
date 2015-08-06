var OfferStatusModel=require('../Model-js/OfferStatusModel');

function OfferStatusService(){}
OfferStatusService.prototype.addNew = function(OfferStatus, callback){
    var newOfferStatus = new OfferStatusModel(OfferStatus);
    newOfferStatus.save(function(err, addedOfferStatus){
        if(err){
            callback(false,error);
            return;
        }
        callback(true,addedOfferStatus);
    });
}
OfferStatusService.prototype.removeAll = function(callback){
    OfferStatusModel.remove(function(error){
        if(error){
            callback(false, error);
            return;
        }
        callback(true, "Tüm teklif konuları silindi.");
    });
}
 OfferStatusService.prototype.remove = function(offerStatusId,callback){
    OfferStatusModel.remove({_id:offerStatusId._id},function(error){
        if(error){
            callback(false, error);
            return;
        }
        callback(true,"teklif konusu silindi.");
    });
}
OfferStatusService.prototype.listAll = function(criteria,callback){
    OfferStatusModel.find({firmCode : criteria}, function(error, OfferStatuss){
        if(error){
            callback(false, error);
            return;
        }
        callback(true, OfferStatuss);
    });
}
OfferStatusService.prototype.listOrder = function(criteria,callback){
    OfferStatusModel.find({firmCode : criteria},{sort : {order : 1}}, function(error, OfferStatuss){
        if(error){
            callback(false, error);
            return;
        }
        callback(true, OfferStatuss);
    });
}
OfferStatusService.prototype.update = function(offerStatus, callback){
    OfferStatusModel.update({ _id : offerStatus._id }, offerStatus, function(error, numOfAffect){
        if(error){
            callback(false, error);
            return;
        }
        callback(true, "teklif durumu guncellendi.");
    });
}
module.exports = OfferStatusService;