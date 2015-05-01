require('iced-coffee-script/register');
LineReaderSync = require("line-reader-sync")
CityService = require('./CityService');

function convert2Json(filename, productId, productType,callback)  {
    lrs = new LineReaderSync(filename)
    var heights = lrs.readline().split(';');
    var price_tag = {
        productId : productId,
        dimensionType : productType,
        dimension : []
    }
    if(productType == "Dikdörtgen"){
        while(true) {
            var line = lrs.readline();
            if(line === null){
                break;
            }
            var prices = line.split(';');
            // first element is width
            var width = prices[0];
            for(var i=1; i<heights.length; ++i) {
                price_tag.dimension.push({    
                    W : parseFloat(width.trim()),
                    H : parseFloat(heights[i].trim()),
                    L : 0,
                    price : prices[i].trim() 
                }); 
            }
        }   
    }
    else if(productType == "Dairesel"){
        while(true) {
            var line = lrs.readline();
            if(line === null){
                break;
            }
            var prices = line.split(';');
            // first element is width
            var width = prices[0];
            for(var i=1; i<heights.length; ++i) {
                price_tag.dimension.push({    
                    W : parseFloat(width.trim()),
                    L : heights[1],
                    H : 0,
                    price : prices[i].trim() 
                }); 
                //console.log(price_tag);
            }
        }   
    }
    else if(productType == "Diger"){
        while(true) {
            var line = lrs.readline();
            if(line === null){
                break;
            }
            var prices = line.split(';');
            // first element is width
            var width = prices[0];
            for(var i=1; i<heights.length; ++i) {
                price_tag.dimension.push({    
                    W : parseFloat(width.trim()),
                    H : 0,
                    L : 0,
                    price : prices[i].trim() 
                }); 
            }
        }   
    }
    
    callback(true, price_tag);
}

function conver2JsonCityState(filename, callback){
    cts = new CityService();
    lrs = new LineReaderSync(filename);
    /*
        city:String,
        towns:[{townName : String}]
    */
    var CityArray = [];
    while(true){
        var line = lrs.readline();
        if(line === null){
            break;
        }
        var temp = line.split(';');
        var cityName = temp[0].trim(), stateName = temp[1].trim();
        if(CityArray.length <= 0 || CityArray[CityArray.length - 1].city != cityName){
            CityArray.push({city : cityName, towns : [{ townName : stateName }]});
        }else if(CityArray[CityArray.length - 1].city == cityName){
            CityArray[CityArray.length - 1].towns.push({ townName : stateName });
        }
        
    }
    
    for(var i = 0; i < CityArray.length; i++){
        cts.bulkInsert(CityArray[i], function(state, response){
            if(!state){
                console.error(response);
                return;
            }
        });    
    }
    callback({ state : true, message : 'Success'});
}

module.exports = {
    convertToJson : convert2Json,
    C2JCityState : conver2JsonCityState
}

