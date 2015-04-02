var CreditModel=require('../Model-js/CreditModel');

function CreditService(){}
CreditService.prototype.addNew = function(Credit, callback){
    var newCredit = new CreditModel(Credit);
    newCredit.save(function(err, addedCredit){
        if(err){
            callback(false,error);
            return;
        }
        callback(true,addedCredit);
    });
}
CreditService.prototype.removeAll = function(callback){
    CreditModel.remove(function(error){
        if(error){
            callback(false, error);
            return;
        }
        callback(true, "Tüm vadeler silindi.");
    });
}
 CreditService.prototype.remove = function(creditId,callback){
    CreditModel.remove({_id:creditId._id},function(error){
        if(error){
            callback(false, error);
            return;
        }
        callback(true,"vade silindi.");
    });
}
CreditService.prototype.listAll = function(criteria, callback){
    CreditModel.find({ firmCode : criteria }, function(error, Credits){
        if(error){
            callback(false, error);
            return;
        }
        callback(true, Credits);
    });
}
module.exports = CreditService;