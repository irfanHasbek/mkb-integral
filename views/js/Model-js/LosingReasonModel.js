var mongoose =require("../../../app").mongoose;

var LosingReasonScheme=new mongoose.Schema({
    
    losingReason :String,
    setBy : String,
    firmCode:String
});

module.exports = mongoose.model("losingReasons",LosingReasonScheme);