var CustomerDefinitionModel = require('../Model-js/CustomerDefinitionModel');

function CustomerDefinitionService()
{
    
}

CustomerDefinitionService.prototype.addNew = function(custDef, callback){
    var newCustDef = new CustomerDefinitionModel(custDef);
    newCustDef.save(function(error, addedCustDef){
        if(error){
            callback(false,error);
            return;
        }
        callback(true,addedCustDef);
    });
}
CustomerDefinitionService.prototype.update = function(custDef, callback){
    CustomerDefinitionModel.update({_id :custDef._id},custDef, function(error,respCustDef){
     if(error){
            callback(false, error);
            return;
        }
        callback(true, 'success');  
    });
}
CustomerDefinitionService.prototype.updateB2BInformation = function(custDef, callback){
    var webAccess = false;
    var webOrder = false;
    if(custDef.webAccess == 'on'){
        webAccess = true;   
    }
    if(custDef.webOrder == 'on'){
        webOrder = true;   
    }
    CustomerDefinitionModel.findOne({_id : custDef._id}, function(error, customer){
        if(error){
            callback(false, error);
            return;
        }
        customer.userName = custDef.userName;
        customer.password = custDef.password;
        customer.webAccess = webAccess;
        customer.webOrder = webOrder;
        
        customer.save(function(errorSave, updatedCustomer){
             if(errorSave){
                callback(false, errorSave);
                return;
            }  
            callback(true, updatedCustomer); 
        });
    });
}
CustomerDefinitionService.prototype.remove = function(customerId,callback){
    CustomerDefinitionModel.remove({_id:customerId._id},function(error){
        if(error){
            callback(false, error);
            return;
        }
        callback(true,"müşteri tanımı silindi.");
    });
}
CustomerDefinitionService.prototype.removeAll = function(callback){
    CustomerDefinitionModel.remove(function(error){
        if(error){
            //conso
            callback(false, error);
            return;
        }
        callback(true, "Tüm müşteriler silindi.");
    });
}

CustomerDefinitionService.prototype.listAll = function(criteria,callback){
    CustomerDefinitionModel.find({ firmCode : criteria }, function(error, custDefs){
        if(error){
            callback(false, error);
            return;
        }
        callback(true, custDefs);
    });
}

CustomerDefinitionService.prototype.getCustomerDefinition = function(customerId, callback){
    CustomerDefinitionModel.findOne({ _id : customerId }, function(error, custDef){
        if(error){
            callback(false, error);
            return;
        }
        callback(true, custDef);
    });
}

CustomerDefinitionService.prototype.search = function(criteria, callback){
    CustomerDefinitionModel.find(criteria,function(error, custDefs){
        if(error){
            callback(false, error);
            return;
        }
        callback(true, custDefs);
    });
}


module.exports = CustomerDefinitionService;