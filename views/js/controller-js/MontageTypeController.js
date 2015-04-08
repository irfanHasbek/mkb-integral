var MontageTypeService = require("../service-js/MontageTypeService");

var mts = new MontageTypeService();

function createResponse(state, data, message){
    return response = {
        state : state,
        data : data,
        message : message
    }
}

module.exports = {
    addMontageType : function(req,res,next){
        var montageTypeObj={
                montageType:req.body.montageType,
                productGroupName : req.body.productGroupName,
                setBy:req.session.user.name+" "+req.session.user.surname,
                cost : req.body.cost,
                firmCode:req.session.user.firmCode
         };
        mts.addNew(montageTypeObj,function(state,response){
            if(!state){
                res.send(createResponse(state,"",response));
                return;
            }
            res.send(createResponse(state,response,""));
        });
    },
    removeAll : function(req, res, next){
        mts.removeAll(function(state, response){
            if(!state){
                res.send(createResponse(state,response, "hata oluştu "));   
                return;
            }
            res.send(createResponse(state,response, "başarı ile silindi"));
        });
    },
    remove : function(req, res, next){
        mts.remove(req.body,function(state, response){
            if(!state){
                res.send(createResponse(state,response, "hata oluştu "));   
                return;
            }
            res.send(createResponse(state,response, "başarı ile silindi"));
        });
    },
    listAll : function(req, res, next){
        mts.listAll(req.session.user.firmCode,function(state, response){
            if(!state){
                res.send(createResponse(false, null, "montaj türleri listelenemedi."));
                return;
            }
            res.send(createResponse(true, response, "montaj türleri başarıyla listelendi"));
        });   
    },
    getByGroupName : function(req, res, next){
        mts.getByGroupName(req.session.user.firmCode, req.body.productGroupName, function(state, response){
            if(!state){
                res.send(createResponse(false, null, "montaj türleri listelenemedi."));
                return;
            }
            res.send(createResponse(true, response, "montaj türleri başarıyla listelendi"));
        });   
    }
};