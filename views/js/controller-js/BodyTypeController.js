var BodyTypeService = require("../service-js/BodyTypeService");

var bts = new BodyTypeService();

function createResponse(state, data, message){
    return response = {
        state : state,
        data : data,
        message : message
    }
}

module.exports = {
    addBodyType : function(req,res,next){
        var bodyTypeObj={
                bodyType:req.body.bodyType,
                productGroupName : req.body.productGroupName,
                setBy:req.session.user.name+" "+req.session.user.surname,
                cost : req.body.cost,
                firmCode:req.session.user.firmCode
         };
        bts.addNew(bodyTypeObj,function(state,response){
            if(!state){
                res.send(createResponse(state,"",response));
                return;
            }
            res.send(createResponse(state,response,""));
        });
    },
    removeAll : function(req, res, next){
        bts.removeAll(function(state, response){
            if(!state){
                res.send(createResponse(state,response, "hata oluştu "));   
                return;
            }
            res.send(createResponse(state,response, "başarı ile silindi"));
        });
    },
    remove : function(req, res, next){
        bts.remove(req.body,function(state, response){
            if(!state){
                res.send(createResponse(state,response, "hata oluştu "));   
                return;
            }
            res.send(createResponse(state,response, "başarı ile silindi"));
        });
    },
    listAll : function(req, res, next){
        bts.listAll(req.session.user.firmCode,function(state, response){
            if(!state){
                res.send(createResponse(false, null, "kasa tipleri listelenemedi."));
                return;
            }
            res.send(createResponse(true, response, "kasa tipleri başarıyla listelendi"));
        });   
    },
    search : function(req, res, next){
        bts.search(req.body,function(state, response){
            if(!state){
                res.send(createResponse(false, null, "kasa tipleri listelenemedi."));
                return;
            }
            res.send(createResponse(true, response, "kasa tipleri başarıyla listelendi"));
        });   
    },
    getByGroupName : function(req, res, next){
        bts.getByGroupName(req.session.user.firmCode, req.body.productGroupName,function(state, response){
            if(!state){
                res.send(createResponse(false, null, "kasa tipleri listelenemedi."));
                return;
            }
            res.send(createResponse(true, response, "kasa tipleri başarıyla listelendi"));
        });   
    }
};