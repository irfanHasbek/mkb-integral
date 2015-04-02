var CustomerDefinitionService = require("../service-js/CustomerDefinitionService");

var cds = new CustomerDefinitionService();

function createCustomerDefinition(type,req){
    var custDefObj = {
        firmCode :req.session.user.firmCode,
        customerTitle : req.body.customerTitle,
        customerName : req.body.customerName,
        customerGroup : req.body.customerGroup,
        customerAgent :req.body.customerAgent,
        userName : "",
        password : "",
        webAccess : false,
        webOrder :false,
        discountInfo:req.body.discountInfo,
        competentInfo : [],
        contactInfo : {
            address : req.body.custDefContactAddress,
            city : req.body.custDefContactCity,
            state : req.body.custDefContactState,
            businessPhone : req.body.custDefContactBusinessPhone,
            fax : req.body.custDefContactFax,
            webAddress : req.body.custDefContactWebAdress
        },
        billInfo : {
            address : req.body.custDefBillAddress, 
            city:req.body.custDefBillCity, 
            state : req.body.custDefBillState, 
            taxOffice : req.body.custDefBillTaxOffice, 
            taxNum:req.body.custDefBillTaxNum
        },
        forwardingInfo :[]
    }
    if(type == 'update'){
        custDefObj._id = req.body._id;
    }
    custDefObj.competentInfo=JSON.parse(req.body.competent);
    custDefObj.forwardingInfo=JSON.parse(req.body.forwarding);
    return custDefObj;
}
module.exports = {
    addNew : function(req, res){
        var tempCustDef=createCustomerDefinition("add",req);
        cds.addNew(tempCustDef, function(state, response){
            if(!state){
                res.send({state : state, response : response});   
                return;
            }
            res.send({state : state, response : response});   
        });   
    },
    update : function(req, res){
        var tempCustDef=createCustomerDefinition("update",req);
        cds.update(tempCustDef, function(state, response){
            if(!state){
                res.send({state : state, response : response});   
                return;
            }
            res.send({state : state, response : response});   
        });   
    },
    updateB2BInformation : function(req, res){
        cds.updateB2BInformation(req.body, function(state, response){
            if(!state){
                res.send({state : state, response : response});   
                return;
            }
            res.send({state : state, response : response});   
        });   
    },
    remove : function(req, res){
        cds.remove(req.body,function(state, response){
            if(!state){
                res.send({state : state ,response : response});   
                return;
            }
            res.send({state : state ,response : response});  
        });
    },
    removeAll : function(req, res){
        cds.removeAll(function(state, response){
            if(!state){
                res.send({state : state, response : response});    
                return;
            }
            res.send({state : state, response : response});   
        });
    },
    listAll : function(req, res){
        cds.listAll(req.session.user.firmCode,function(state, response){
            if(!state){
                res.send({state : state, response : response});   
                return;
            }
            res.send({state : state, response : response});   
        });   
    },
    getCount : function(req, res){
        cds.getCount(req.session.user.firmCode,function(state, response){
            if(!state){
                res.send({state : state, response : response});   
                return;
            }
            res.send({state : state, response : response});   
        });   
    },
    getCustomerDefinition : function(req, res){
        cds.getCustomerDefinition({_id : req.body}, function(state, response){
            if(!state){
                res.send({state : state, response : response});   
                return;
            }
            res.send({state : state, response : response});   
        });   
    },
    searchCustomerDefinition : function(req, res){
        var criteria = req.body.search;
        criteria.firmCode = req.session.user.firmCode;
        cds.search(criteria, function(state, response){
            if(!state){
                res.send({state : state, response : response});
                return;
            }
            res.send({state : state, response : response});
        });   
    }
}
    