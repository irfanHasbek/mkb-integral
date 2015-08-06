var ProductPriceModel=require('../Model-js/ProductPriceModel');

function ProductPriceService()
{
    
}
ProductPriceService.prototype.addNew = function(price, callback){
    var newPrice = new ProductPriceModel(price);
    newPrice.save(function(err, addedPrice){
        if(err){
            callback(false,error);
            return;
        }
        callback(true,addedPrice);
    });
}

ProductPriceService.prototype.bulkInsert = function(prices, callback){
    if(prices.dimension.length <= 0){
        callback(false, null);
        return;
    }
    ProductPriceModel.update({ productId : prices.productId }, { dimension : prices.dimension, dimensionType : prices.dimensionType}, function(err, affectedRow){
        if(err){
            callback(false,error);
            return;
        }
        callback(true,affectedRow);
    });
}

ProductPriceService.prototype.removeAll = function(callback){
    ProductPriceModel.remove(function(error){
        if(error){
            callback(false, error);
            return;
        }
        callback(true, "Tüm fiyatlar silindi.");
    });
}

ProductPriceService.prototype.addPrice = function(priceSpec, callback) {
    //console.log(JSON.stringify(priceSpec));
    var newPrice={"dimension":[{
        W:priceSpec.W,
        H:priceSpec.H,
        L : priceSpec.L,
        price:priceSpec.price
    }]};
    ProductPriceModel.update({ productId : priceSpec.productId },{dimensionType : priceSpec.dimensionType, $pushAll : newPrice },function(err, price){
        if(err){
               callback(false,err);
           return;
        }
        callback(true,"fiyat eklendi.");
    });
 }

 ProductPriceService.prototype.remove = function(priceId,callback){
     var complexId = priceId._id.split(',');
     var productId = complexId[0];
     var priceId = complexId[1];
     
    ProductPriceModel.update({ _id : productId }, { $pull : { dimension : { _id : priceId } } },function(error){
        if(error){
            callback(false, error);
            return;
        }
        callback(true,"urun fiyati silindi.");
    });
}
 
ProductPriceService.prototype.listProductPrice = function(_productId, callback){
    //console.log('productId : ' + _productId);
    ProductPriceModel.findOne({ productId : _productId }, function(error, productPriceList){
        if(error){
            callback(false, error);
            return;
        }
        callback(true, productPriceList);
    });
}

ProductPriceService.prototype.listAll = function(callback){
    ProductPriceModel.find({}, function(error, priceList){
        if(error){
            callback(false, error);
            return;
        }
        callback(true, priceList);
    });
}

ProductPriceService.prototype.removeProduct = function(productId, callback){
    ProductPriceModel.remove({ productId : productId }, function(error){
        if(error){
            callback(false, error);
            return;
        }
        callback(true, 'Basari ile silindi.');
    });
}
module.exports = ProductPriceService;