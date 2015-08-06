var SetMechanismService = require("../service-js/SetMechanismService");

var sts = new SetMechanismService();

function createResponse(state, data, message){
    return response = {
        state : state,
        data : data,
        message : message
    }
}

module.exports = {
    addSetMechanism : function(req,res,next){
        var setMechanismObj={
                setMechanism:req.body.setMechanism,
                productGroupName : req.body.productGroupName,
                setBy:req.session.user.name+" "+req.session.user.surname,
                cost : req.body.cost,
                firmCode:req.session.user.firmCode
         };
        sts.addNew(setMechanismObj,function(state,response){
            if(!state){
                res.send(createResponse(state,"",response));
                return;
            }
            res.send(createResponse(state,response,""));
        });
    },
    removeAll : function(req, res, next){
        sts.removeAll(function(state, response){
            if(!state){
                res.send(createResponse(state,response, "hata oluştu "));   
                return;
            }
            res.send(createResponse(state,response, "başarı ile silindi"));
        });
    },
    remove : function(req, res, next){
        sts.remove(req.body,function(state, response){
            if(!state){
                res.send(createResponse(state,response, "hata oluştu "));   
                return;
            }
            res.send(createResponse(state,response, "başarı ile silindi"));
        });
    },
    listAll : function(req, res, next){
        sts.listAll(req.session.user.firmCode,function(state, response){
            if(!state){
                res.send(createResponse(false, null, "ayar mekanizması listelenemedi."));
                return;
            }
            res.send(createResponse(true, response, "ayar mekanizması başarıyla listelendi"));
        });   
    },
    search : function(req, res, next){
        sts.search(req.body,function(state, response){
            if(!state){
                res.send(createResponse(false, null, "ayar mekanizması listelenemedi."));
                return;
            }
            res.send(createResponse(true, response, "ayar mekanizması başarıyla listelendi"));
        });   
    },
    getByGroupName : function(req, res, next){
        sts.getByGroupName(req.session.user.firmCode, req.body.productGroupName,function(state, response){
            if(!state){
                res.send(createResponse(false, null, "ayar mekanizması listelenemedi."));
                return;
            }
            res.send(createResponse(true, response, "ayar mekanizması başarıyla listelendi"));
        });   
    }
};