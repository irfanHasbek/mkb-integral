var mongoose = require('../../../app').mongoose;

var Discount = new mongoose.Schema({
    firmCode : String,
    customerId :String,
    customerName : String,
    productGroupId : String,
    productGroupName : String,
    percent : String,
    owner : String,
    order : Number
});

module.exports = mongoose.model('discounts', Discount);
