var mongoose = require('../../../app').mongoose;

var OfferScheme = new mongoose.Schema({
    firmCode:String,
    offerNo: String,
    offerDate:String,
    offerStatus:String,
    offerTopic:String,
    customerInfo:{
        customerId :String,
        customerName :String
    },
    competentInfo:{
        competentId : String
    },
    personPrepareOfferInfo :{
        personId:String,
        personName : String
    },
    personPrepareJobInfo :{
        personId:String,
        personName : String
    },
    personAcceptOfferInfo :{
        personId:String,
        personName : String
    },
    personAcceptJobInfo :{
        personId:String,
        personName : String
    },
    basket : [{
        productId :String,
        productGroup : String,
        productName :String,
        productSizeType:String,
        productSizeWidthOrDiameter :String,
        productSizeLength :String,
        productSizeHeight :String,
        montageType :String,
        coverType :String,
        setMechanism :String,
        accessory : String,
        bodyType : String,
        amount :String,
        note :String,
        lineDiscount :String,
        productPrice : String
    }],
    cost :{
        generalDiscount :String,
        roundingDiscount : String,
        sum :String,
        kdv :String,
        total :String
    },
    payMethod :{
        payMethod :String,
        note : String
    },
    status : {
       job : String,
       offerCase : String,
       losingReason :String,
       winFirm:String
    },
    activities : [{
        activityType : String,
        content : String,
        activityDate : String,
        owner : {
            ownerId : String,
            ownerName : String
        },
        activityStatus : String
    }],
    forwardingInfo : {
        forwardId : String,
        forwardLabel : String
    },
    dates :{
        deliveryDate : String,
        startJobDate : String,
        acceptOfferDate :String
    }
});

module.exports = mongoose.model('offers', OfferScheme);
