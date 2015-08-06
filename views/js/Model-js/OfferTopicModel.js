var mongoose =require("../../../app").mongoose;

var OfferTopicScheme=new mongoose.Schema({
    
    offerTopic :String,
    setBy : String,
    firmCode:String
});

module.exports = mongoose.model("offerTopics",OfferTopicScheme);