var mongoose =require("../../../app").mongoose;

var OfferStatusScheme=new mongoose.Schema({
    
    offerStatus :String,
    order : Number,
    setBy : String,
    firmCode:String
});

module.exports = mongoose.model("offerStatuses",OfferStatusScheme);