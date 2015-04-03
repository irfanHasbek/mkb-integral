require('iced-coffee-script/register');
LineReaderSync = require("line-reader-sync")

function convert2Json(filename, productId, productType,callback)  {
    lrs = new LineReaderSync(filename)
    var heights = lrs.readline().split(';');
    var price_tag = {
        productId : productId,
        dimensionType : productType,
        dimension : []
    }
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
    callback(true, price_tag);
}

module.exports = {
    convertToJson : convert2Json
}

