var OfferTopicModel=require('../Model-js/OfferTopicModel');

function OfferTopicService(){}
OfferTopicService.prototype.addNew = function(OfferTopic, callback){
    var newOfferTopic = new OfferTopicModel(OfferTopic);
    newOfferTopic.save(function(err, addedOfferTopic){
        if(err){
            callback(false,error);
            return;
        }
        callback(true,addedOfferTopic);
    });
}
OfferTopicService.prototype.removeAll = function(callback){
    OfferTopicModel.remove(function(error){
        if(error){
            callback(false, error);
            return;
        }
        callback(true, "Tüm teklif konuları silindi.");
    });
}
 OfferTopicService.prototype.remove = function(offerTopicId,callback){
    OfferTopicModel.remove({_id:offerTopicId._id},function(error){
        if(error){
            callback(false, error);
            return;
        }
        callback(true,"teklif konusu silindi.");
    });
}
OfferTopicService.prototype.listAll = function(criteria,callback){
    OfferTopicModel.find({firmCode : criteria}, function(error, OfferTopics){
        if(error){
            callback(false, error);
            return;
        }
        callback(true, OfferTopics);
    });
}
module.exports = OfferTopicService;