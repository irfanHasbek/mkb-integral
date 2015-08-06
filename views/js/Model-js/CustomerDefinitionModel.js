var mongoose=require("../../../app").mongoose;

var CustomerDefinitionSchema = new mongoose.Schema({
    firmCode :String,
    customerTitle : String,
    customerName : String,
    customerGroup :String,
    customerAgent :String,
    userName :String,
    password :String,
    webAccess :Boolean,
    webOrder :Boolean,
    competentInfo:[{
        name:String, 
        task : String, 
        gsm : String,
        tel1 : String,
        tel2 : String,
        email : String,
        email2 : String,
        email3 : String,
        note : String
      }],
    contactInfo:{
        address : String, 
        city : String, 
        state : String, 
        businessPhone : String, 
        fax : String, 
        webAddress : String
    },
    billInfo : {
        address : String, 
        city:String, 
        state : String, 
        taxOffice : String, 
        taxNum:String
    },
    forwardingInfo :[{
        label:String,
        deliveryType : String, 
        address :String, 
        city : String, 
        state : String
     }]
});
module.exports = mongoose.model("custDef",CustomerDefinitionSchema);