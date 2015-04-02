var CustomerGroupModel=require('../Model-js/CustomerGroupModel');

function CustomerGroupService()
{
    
}
CustomerGroupService.prototype.addNew = function(CustomerGroup, callback){
    var newGroup = new CustomerGroupModel(CustomerGroup);
    newGroup.save(function(err, addedCustomerGroup){
        if(err){
            callback(false,error);
            return;
        }
        callback(true,addedCustomerGroup);
    });
}
CustomerGroupService.prototype.removeAll = function(callback){
    CustomerGroupModel.remove(function(error){
        if(error){
            callback(false, error);
            return;
        }
        callback(true, "Tüm firmalar silindi.");
    });
}
 CustomerGroupService.prototype.remove = function(customerId,callback){
    CustomerGroupModel.remove({_id:customerId._id},function(error){
        if(error){
            callback(false, error);
            return;
        }
        callback(true,"firma silindi.");
    });
}
CustomerGroupService.prototype.listAll = function(criteria,callback){
    CustomerGroupModel.find({ firmCode : criteria }, function(error, CustomerGroups){
        if(error){
            callback(false, error);
            return;
        }
        callback(true, CustomerGroups);
    });
}
module.exports = CustomerGroupService;