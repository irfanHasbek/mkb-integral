var mongoose = require('../../../app').mongoose;

var ChildCustomerScheme = new mongoose.Schema({
    yetkiliAdi : String,
    firmaAdi : String,
    ekleyenFirma  : String,
    tel : String,
    email:String,
    vergiDairesi:String,
    vergiNo:String,
    firmaAdresi:String,
    sevkiyat:String,
    not:String
});

module.exports = mongoose.model('childCustomer', ChildCustomerScheme);
