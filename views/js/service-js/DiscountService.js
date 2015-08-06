var DiscountModel=require('../Model-js/DiscountModel');

function DiscountService()
{
    
}

function DiscountService(){}

DiscountService.prototype.addNew = function(discount, callback){
    console.log(discount)
    if(discount){
        new DiscountModel(discount).save(function(error, addedDiscount){
            if(error){
                console.log(error);
                callback(false, error);
                return;
            }
            callback(true, addedDiscount);
        })
    }
}

DiscountService.prototype.listAll = function(firmCode, callback){
    if(firmCode && firmCode != null){
        DiscountModel.find({firmCode : firmCode},"", {sort : {order : -1}}, function(error, foundedDiscounts){
            if(error){
                console.log(error);
                callback(false, error);
                return;  
            }
            callback(true, foundedDiscounts);
        });   
    }
}

DiscountService.prototype.remove = function(_id, callback){
    if(_id && _id != null){
        DiscountModel.remove({_id : _id}, function(error){
            if(error){
                console.log(error);
                callback(false, error);
                return;  
            }
            callback(true, "Iskonto bilgisi basariyla silindi.");
        });
    }
}

DiscountService.prototype.removeAll = function(callback){
    DiscountModel.remove({}, function(error){
        if(error){
            console.log(error);
            callback(false, error);
            return;  
        }
        callback(true, "Tum iskonto bilgileri basariyla silindi.");
    });
}

DiscountService.prototype.getDiscount = function(customerId, productGroupId, callback){
    if(customerId && customerId != null && productGroupId && productGroupId != null){
        DiscountModel.findOne({customerId : customerId , productGroupId : productGroupId}, function(error, foundedDiscount){
            if(error){
                console.log(error);
                callback(false, error);
                return;  
            }
            callback(true, foundedDiscount);
        });   
    }   
}
DiscountService.prototype.getDiscountOnlyCustomerId = function(customerId, callback){
    if(customerId && customerId != null){
        DiscountModel.find({customerId : customerId}, function(error, foundedDiscount){
            if(error){
                console.log(error);
                callback(false, error);
                return;  
            }
            callback(true, foundedDiscount);
        });   
    }   
}
DiscountService.prototype.update = function(discount, callback){
    console.log(discount)
    DiscountModel.update({ _id : discount._id }, discount, function(error, numOfAffect){
        if(error){
            callback(false, error);
            return;
        }
        callback(true, "Iskonto guncellendi.");
    });
}

module.exports = DiscountService;