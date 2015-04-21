var productPriceModel = require('../Model-js/ProductPriceModel');

function OfferPriceCalculatorService(){
    
}

OfferPriceCalculatorService.prototype.calculatePrice = function(info, callback){
    if(info.productType == 'Dikdörtgen'){
        if(!isNumber(parseFloat(info.W)) || !isNumber(parseFloat(info.H)) || !isNumber(parseFloat(info.L)) || !isNumber(parseFloat(info.amount))){
            callback(false, -1, "Olculer rakam olmalidir.");
            return;
        }
        productPriceModel.findOne({ productId : info.productId ,dimensionType : info.productType }, function(error, response){
            if(error){
                callback(false, response, 'Veritabani hatasi.');
                return;
            }
            if(response == null){
                callback(false, -1, 'Lutfen urun tipini dogru seciniz.');
                return;   
            }
            //console.log('data : ' + JSON.stringify(response));
            var priceArr = [];
            var data = response.dimension;
            var length = data.length;
            for(var i = 0; i < length; i++){
                if(data[i].W >= parseFloat(info.W) && data[i].H >= parseFloat(info.H) && data[i].L >= parseFloat(info.L)){
                    priceArr.push(data[i]);
                    //console.log('data['+i+']=' + data[i]);
                }
            }
            
            var sorto = {
              W:"asc",H:"asc", L:"asc"
            };
            //console.log('priceArr : ' + JSON.stringify(priceArr));
            if(priceArr.length > 0 ){
                priceArr.keySort(sorto);
                //console.log('priceArr : ' + priceArr);
                var choosenPrice = parseFloat(priceArr[0].price);
                var productListPrice = choosenPrice;
                var productPriceWithDiscount = choosenPrice - (choosenPrice * (parseFloat(info.lineDiscount) / 100));
                //console.log('price : ' + priceArr[0].price);
                choosenPrice = productPriceWithDiscount;

                var montageCost = choosenPrice * (parseFloat(info.montageCost) / 100);
                var coverCost = choosenPrice * (parseFloat(info.coverCost) / 100);
                var setMechCost = choosenPrice * (parseFloat(info.setMechCost) / 100);
                var accessoryCost = choosenPrice * (parseFloat(info.accessory) / 100);
                var bodyTypeCost = choosenPrice * (parseFloat(info.bodyType) / 100);
                
                choosenPrice = choosenPrice + (montageCost + coverCost + setMechCost + accessoryCost + bodyTypeCost);
                choosenPrice = choosenPrice * parseFloat(info.amount);
                callback(true, {listPrice : productListPrice , discountPrice : productPriceWithDiscount, total : choosenPrice}, 'Basarili');        
            }
            else{
                callback(false, -1, 'Kriterlere uygun urun bulunamadi.');
            }
        });
    }
    else if(info.productType == 'Dairesel'){
        if(!isNumber(parseFloat(info.W)) || !isNumber(parseFloat(info.L)) || !isNumber(parseFloat(info.amount))){
            callback(false, -1, "Olculer rakam olmalidir.");
            return;
        }
        productPriceModel.findOne({ productId : info.productId ,dimensionType : info.productType }, function(error, response){
            if(error){
                callback(false, response, 'Veritabani hatasi.');
                return;
            }
            if(response == null){
                callback(false, -1, 'Lutfen urun tipini dogru seciniz.');
                return;   
            }
            //console.log('data : ' + JSON.stringify(response));
            var priceArr = [];
            var data = response.dimension;
            var length = data.length;
            for(var i = 0; i < length; i++){
                if(data[i].W >= parseFloat(info.W) && data[i].L >= parseFloat(info.L)){
                    priceArr.push(data[i]);
                }
            }

            var sorto = {
              W:"asc", L:"asc"
            };
            //console.log('priceArr 2 : ' + priceArr.length);
            if(priceArr.length > 0){
                priceArr.keySort(sorto);
                var choosenPrice = parseFloat(priceArr[0].price);
                var productListPrice = choosenPrice;
                var productPriceWithDiscount = choosenPrice - (choosenPrice * (parseFloat(info.lineDiscount) / 100));
                //console.log('price : ' + priceArr[0].price);
                choosenPrice = productPriceWithDiscount;

                var montageCost = choosenPrice * (parseFloat(info.montageCost) / 100);
                var coverCost = choosenPrice * (parseFloat(info.coverCost) / 100);
                var setMechCost = choosenPrice * (parseFloat(info.setMechCost) / 100);
                var accessoryCost = choosenPrice * (parseFloat(info.accessory) / 100);
                var bodyTypeCost = choosenPrice * (parseFloat(info.bodyType) / 100);
                
                choosenPrice = choosenPrice + (montageCost + coverCost + setMechCost + accessoryCost + bodyTypeCost);
                choosenPrice = choosenPrice * parseFloat(info.amount);
                callback(true, {listPrice : productListPrice , discountPrice : productPriceWithDiscount, total : choosenPrice}, 'Basarili');   
            }
            else{
                callback(false, -1, 'Kriterlere uygun urun bulunamadi.');   
            }  
        });
    }
    else if(info.productType == 'Diger'){
        if(!isNumber(parseFloat(info.W)) || !isNumber(parseFloat(info.amount))){
            callback(false, -1, "Olculer rakam olmalidir.");
            return;
        }
    }
    else{
        callback(false, -1, 'Lutfen bir kategori seciniz.')   
    }
}

function isNumber(o) {
  return ! isNaN (o-0) && o !== null && o !== "" && o !== false;
}

Array.prototype.keySort = function(keys) {

keys = keys || {};

// via
// http://stackoverflow.com/questions/5223/length-of-javascript-object-ie-associative-array
var obLen = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key))
            size++;
    }
    return size;
};

// avoiding using Object.keys because I guess did it have IE8 issues?
// else var obIx = function(obj, ix){ return Object.keys(obj)[ix]; } or
// whatever
var obIx = function(obj, ix) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (size == ix)
                return key;
            size++;
        }
    }
    return false;
};

var keySort = function(a, b, d) {
    d = d !== null ? d : 1;
    // a = a.toLowerCase(); // this breaks numbers
    // b = b.toLowerCase();
    if (a == b)
        return 0;
    return a > b ? 1 * d : -1 * d;
};

var KL = obLen(keys);

if (!KL)
    return this.sort(keySort);

for ( var k in keys) {
    // asc unless desc or skip
    keys[k] = 
            keys[k] == 'desc' || keys[k] == -1  ? -1 
          : (keys[k] == 'skip' || keys[k] === 0 ? 0 
          : 1);
}

this.sort(function(a, b) {
    var sorted = 0, ix = 0;

    while (sorted === 0 && ix < KL) {
        var k = obIx(keys, ix);
        if (k) {
            var dir = keys[k];
            sorted = keySort(a[k], b[k], dir);
            ix++;
        }
    }
    return sorted;
});
return this;
};

module.exports = OfferPriceCalculatorService;

