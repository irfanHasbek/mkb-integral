var mongoose = require('../../../app').mongoose;

var ProductPriceSchema = new mongoose.Schema({
    productId : String,
    dimensionType  : String,
    dimension : [{
        W : Number,
        H : Number,
        L : Number,
        price : String
    }]
});

module.exports = mongoose.model('productPrice', ProductPriceSchema);
