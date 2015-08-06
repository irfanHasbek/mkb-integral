var ChildCustomerModel = require('../Model-js/ChildCustomerModel');

function ChildCustomerService()
{
    
}

ChildCustomerService.prototype.addNew = function(ChildCustomer, callback){
    var newChildCustomer = new ChildCustomerModel(ChildCustomer);
    newChildCustomer.save(function(error, addedChildCustomer){
        if(error){
            callback(false,error);
            return;
        }
        callback(true,addedChildCustomer);
    });
}
ChildCustomerService.prototype.update = function(ChildCustomer, callback){
    ChildCustomerModel.update({_id :ChildCustomer._id},ChildCustomer, function(error,respChildCustomer){
     if(error){
            callback(false, error);
            return;
        }
        callback(true, 'success');  
    });
}
ChildCustomerService.prototype.remove = function(ChildCustomer,callback){
    ChildCustomerModel.remove({_id:ChildCustomer._id},function(error){
        if(error){
            callback(false, error);
            return;
        }
        callback(true,"müşteri tanımı silindi.");
    });
}
ChildCustomerService.prototype.removeAll = function(callback){
    ChildCustomerModel.remove(function(error){
        if(error){
            //conso
            callback(false, error);
            return;
        }
        callback(true, "Tüm müşteriler silindi.");
    });
}

ChildCustomerService.prototype.listAll = function(criteria,callback){
    ChildCustomerModel.find({ ekleyenFirma : criteria }, function(error, ChildCustomers){
        if(error){
            callback(false, error);
            return;
        }
        callback(true, ChildCustomers);
    });
}
ChildCustomerService.prototype.getChildCustomer = function(ChildCustomerId, callback){
    ChildCustomerModel.findOne({ _id : ChildCustomerId }, function(error, ChildCustomer){
        if(error){
            callback(false, error);
            return;
        }
        callback(true, ChildCustomer);
    });
}
module.exports = ChildCustomerService;