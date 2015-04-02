var ProductModel=require('../Model-js/ProductModel');

var ProductPriceService = require("../service-js/ProductPriceService");
var ps = new ProductPriceService();

function ProductService()
{
    
}
ProductService.prototype.addNew = function(product, callback){
    var newProduct = new ProductModel(product);
    newProduct.save(function(err, addedProduct){
        if(err){
            callback(false,error);
            return;
        }
        var price={
            productId : addedProduct._id,
            dimensionType : '',
            dimension : []
         };
        ps.addNew(price, function(state,response){
            if(!state){
                callback(false,error);
                return;
            }
            callback(true,addedProduct);
        });
        
    });
}

ProductService.prototype.update = function(product, callback){
    ProductModel.update({ _id : product._id }, product, function(error, numOfAffect){
        if(error){
            callback(false, error);
            return;
        }
        callback(true, "urun guncellendi.");
    });
}

ProductService.prototype.removeAll = function(callback){
    ProductModel.remove(function(error){
        if(error){
            callback(false, error);
            return;
        }
        callback(true, "Tüm urunler silindi.");
    });
}

 ProductService.prototype.remove = function(productId,callback){
    ProductModel.remove({ _id : productId },function(error){
        if(error){
            callback(false, error);
            return;
        }
        callback(true,"urun silindi.");
    });
}
 
ProductService.prototype.listAll = function(_firmCode, callback){
    ProductModel.find({ firmCode : _firmCode }, function(error, products){
        if(error){
            callback(false, error);
            return;
        }
        callback(true, products);
    });
}

ProductService.prototype.getProduct = function(id, callback){
    ProductModel.findOne({ _id : id }, function(error, product){
        if(error){
            callback(false, error);
            return;
        }
        callback(true, product);
    });
}

ProductService.prototype.search = function(criteria, callback){
    console.log('criteria : ' + JSON.stringify(criteria));
    ProductModel.find().or([criteria]).exec(function(error, products){
        if(error){
            callback(false, error);
            return;
        }
        callback(true, products);
    });
}

module.exports = ProductService;