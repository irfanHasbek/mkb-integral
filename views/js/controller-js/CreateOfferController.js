var CreateOfferService = require("../service-js/CreateOfferService");

var cos = new CreateOfferService();

function createOffer(type,req){
    
   var offerObj = {
       firmCode:req.session.user.firmCode,
        offerNo: "",
        offerDate:req.body.offerDate,
        offerStatus:req.body.offerStatus,
        offerTopic:req.body.offerTopic,
        customerInfo:{
            customerId :req.body.customerId,
            customerName : req.body.customerName
        },
        competentInfo:{
            competentId : req.body.competentId
        },
        personPrepareOfferInfo :{
            personId : req.body.personId,
            personName : req.body.personName
        },
        personAcceptOfferInfo :{
            personId : '',
            personName : ''
        },
       personPrepareJobInfo :{
            personId : "",
            personName : ""
        },
        personAcceptJobInfo :{
            personId : '',
            personName : ''
        },
       basket : [],
       cost : {
            generalDiscount : req.body.generalDiscount,
            roundingDiscount:req.body.productRoundingDiscount,
            sum :req.body.sum,
            kdv : req.body.productKDV,
            total :req.body.total
       },
        payMethod :{
            payMethod :req.body.payMethod,
            note :req.body.note
        },
       status : {
           job : '',
           offerCase : "acik_teklifler",
           losingReason :"",
           winFirm:""
        },
        activities : [],
        forwardingInfo : {
            forwardId : '',
            forwardLabel : ''
        },
        dates : {
            deliveryDate : '',
            startJobDate : '',
            acceptOfferDate : ''
        }
    };
    if(type == 'update'){
        offerObj._id = req.body._id;
    }
    offerObj.basket = JSON.parse(req.body.basket);
    return offerObj;
}
module.exports = {
    addNew : function(req, res){
        
        var tempOffer=createOffer("add",req);
        cos.addNew(tempOffer, function(state, response){
            if(!state){
                res.send({state : state, response : response});   
                return;
            }
            res.send({state : state, response : response});   
        });   
    },
    update : function(req, res){
        var tempOffer=createOffer("update",req);
        //console.log(JSON.stringify(tempOffer));
        cos.update(tempOffer, function(state, response){
            if(!state){
                res.send({state : state, response : response});   
                return;
            }
            res.send({state : state, response : response});   
        });   
    },
    updateDates : function(req, res){
        cos.updateDates(req.body._id,req.body.dates,req.body.basket,function(state, response){
            if(!state){
                res.send({state : state, response : response});   
                return;
            }
            res.send({state : state, response : response});   
        });   
    },
    updateProductNote : function(req, res){
        cos.updateProductNote(req.body._id,req.body.basket,req.body.dates,function(state, response){
            if(!state){
                res.send({state : state, response : response});   
                return;
            }
            res.send({state : state, response : response});   
        });   
    },
    updateStatus : function(req, res){
        var offerId = req.body._id;
        var offerStatus = req.body.offerStatus;
        cos.updateStatus(offerId,offerStatus, function(state, response){
            if(!state){
                res.send({state : state, response : response});   
                return;
            }
            res.send({state : state, response : response});   
        });   
    },
    updateJobStatus : function(req, res){
        var offerId = req.body._id;
        var jobStatus = req.body.status.job;
        var personConfirmJob={
                    personId:req.session.user._id,
                    personName:req.session.user.name+" "+req.session.user.surname
        };
        cos.updateJobStatus(offerId,jobStatus,personConfirmJob, function(state, response){
            if(!state){
                res.send({state : state, response : response});   
                return;
            }
            res.send({state : state, response : response});   
        });   
    },
    updateOfferCase : function(req, res){
        //console.log(JSON.stringify(tempOffer));
        var offerId = req.body._id;
        var status = req.body.status;
        var acceptPerson = req.body.acceptPerson;
        var forwardingInfo = req.body.forwardingInfo;
        var acceptOfferDate = req.body.acceptOfferDate;
        
        cos.updateOfferCase(offerId, status, acceptPerson, forwardingInfo, acceptOfferDate, function(state, response){
            if(!state){
                res.send({state : state, response : response});   
                return;
            }
            res.send({state : state, response : response});   
        });   
    },
    addActivity : function(req, res){
        //console.log(JSON.stringify(tempOffer));
        var offerId = req.body.offerId;
        var activity = req.body.activity;
        cos.addActivity(offerId, activity, function(state, response){
            if(!state){
                res.send({state : state, response : response});   
                return;
            }
            res.send({state : state, response : response});   
        });   
    },
    removeActivity : function(req,res){
        var offerId = req.body.offerId;
        var activityId = req.body.activies.activityId;
        cos.removeActivity(offerId,activityId,function(state,response){
            if(!state){
                res.send({state: state,response : response});
                return;
            }
            res.send({state:state,response:response});
        });
    },
    remove : function(req, res){
        cos.remove(req.body,function(state, response){
            if(!state){
                res.send({state : state ,response : response});   
                return;
            }
            res.send({state : state ,response : response});  
        });
    },
    removeAll : function(req, res){
        cos.removeAll(function(state, response){
            if(!state){
                res.send({state : state, response : response});    
                return;
            }
            res.send({state : state, response : response});   
        });
    },
    listAll : function(req, res){
        cos.listAll(req.session.user.firmCode,function(state, response){
            if(!state){
                res.send({state : state, response : response});   
                return;
            }
            res.send({state : state, response : response});   
        });   
    },
    getOffer : function(req, res){
        cos.getCreateOffer(req.body, function(state, response){
            if(!state){
                res.send({state : state, response : response});   
                return;
            }
            res.send({state : state, response : response});   
        });   
    },
    searchOffer : function(req, res){
        var criteria = req.body.search;
        criteria.firmCode = req.session.user.firmCode;
        cos.search(criteria, function(state, response){
            if(!state){
                res.send({state : state, response : response});
                return;
            }
            res.send({state : state, response : response});
        });   
    },
    searchandGetCount : function(req, res){
        var criteria = req.body;
        criteria.firmCode = req.session.user.firmCode;
        cos.searchandGetCount(criteria, function(state, response){
            if(!state){
                res.send({state : state, response : response});
                return;
            }
            res.send({state : state, response : response});
        });   
    }
}
    