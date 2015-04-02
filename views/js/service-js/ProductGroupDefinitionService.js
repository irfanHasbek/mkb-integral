var ProductGroupDefinitionModel=require('../Model-js/ProductGroupDefinitionModel');

function ProductGroupDefinitionService()
{
    
}
ProductGroupDefinitionService.prototype.addNew = function(ProductGroupDefinition, callback){
    var newProductGroup = new ProductGroupDefinitionModel(ProductGroupDefinition);
    newProductGroup.save(function(err, addedProductGroup){
        if(err){
            callback(false,error);
            return;
        }
        callback(true,addedProductGroup);
    });
}
ProductGroupDefinitionService.prototype.removeAll = function(callback){
    ProductGroupDefinitionModel.remove(function(error){
        if(error){
            callback(false, error);
            return;
        }
        callback(true, "Tüm rol tanımları silindi.");
    });
}
 ProductGroupDefinitionService.prototype.remove = function(productGroupId,callback){
    ProductGroupDefinitionModel.remove({_id:productGroupId._id},function(error){
        if(error){
            callback(false, error);
            return;
        }
        callback(true,"rol tanımı silindi.");
    });
}
ProductGroupDefinitionService.prototype.listAll = function(criteria, callback){
    ProductGroupDefinitionModel.find({ firmCode : criteria }, function(error, ProductGroupDefinitions){
        if(error){
            callback(false, error);
            return;
        }
        callback(true, ProductGroupDefinitions);
    });
}
module.exports = ProductGroupDefinitionService;