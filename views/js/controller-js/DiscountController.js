var DiscountService = require("../service-js/DiscountService");

var ds = new DiscountService();

function createDiscount(firmCode, req){
    return {
        firmCode : firmCode,
        customerId : req.customerId,
        customerName : req.customerName,
        productGroupId : req.productGroupId,
        productGroupName : req.productGroupName,
        percent : req.percent,
        owner : req.owner
    }
}

module.exports = {
    addNew : function(req, res){
        ds.addNew(createDiscount(req.session.user.firmCode, req.body), function(state, response){
            if(!state){
                res.send({state : state, response : response});
                return;
            }
            res.send({state : state, response : response});
        });   
    },
    listAll : function(req, res){
        ds.listAll(req.session.user.firmCode, function(state, response){
            if(!state){
                res.send({state : state, response : response});
                return;
            }
            res.send({state : state, response : response});
        })   
    },
    remove : function(req, res){
        ds.remove(req.body._id, function(state, response){
            if(!state){
                res.send({state : state, response : response});
                return;
            }
            res.send({state : state, response : response});
        })   
    },
    removeAll : function(req, res){
        ds.removeAll(function(state, response){
            if(!state){
                res.send({state : state, response : response});
                return;
            }
            res.send({state : state, response : response});
        })   
    },
    getDiscount : function(req, res){
        ds.getDiscount(req.body.customerId, req.body.productGroupId, function(state, response){
            if(!state){
                res.send({state : state, response : response});
                return;
            }
            res.send({state : state, response : response});
        })   
    },
    getDiscountOnlyCustomerId : function(req, res){
        ds.getDiscount(req.body.customerId, function(state, response){
            if(!state){
                res.send({state : state, response : response});
                return;
            }
            res.send({state : state, response : response});
        })   
    }
}