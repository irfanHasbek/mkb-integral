var OfferStatusService = require("../service-js/OfferStatusService");

var oss = new OfferStatusService();

function createResponse(state, data, message){
    return response = {
        state : state,
        data : data,
        message : message
    }
}

module.exports = {
    addOfferStatus : function(req,res,next){
         var OfferStatusObj={
                offerStatus:req.body.offerStatus,
                order :req.body.orderOfferStatus,
                setBy:req.session.user.name+" "+req.session.user.surname,
                firmCode:req.session.user.firmCode
         };
        oss.addNew(OfferStatusObj,function(state,response){
            if(!state){
                res.send(createResponse(state,"",response));
                return;
            }
            res.send(createResponse(state,response,""));
        });
    },
    removeAll : function(req, res, next){
        oss.removeAll(function(state, response){
            if(!state){
                res.send(createResponse(state,response, "hata oluştu "));   
                return;
            }
            res.send(createResponse(state,response, "başarı ile silindi"));
        });
    },
    remove : function(req, res, next){
        oss.remove(req.body,function(state, response){
            if(!state){
                res.send(createResponse(state,response, "hata oluştu "));   
                return;
            }
            res.send(createResponse(state,response, "başarı ile silindi"));
        });
    },
    update : function(req, res){
        oss.update(req.body, function(state, response){
            if(!state){
                res.send(createResponse(state,response, "hata oluştu "));   
                return;
            }
            res.send(createResponse(state,response, "başarı ile guncellendi"));
        });
    },
    listAll : function(req, res, next){
        oss.listAll(req.session.user.firmCode,function(state, response){
            if(!state){
                res.send(createResponse(false, null, "teklif durumları listelenemedi."));
                return;
            }
            res.send(createResponse(true, response, "teklif durumları başarıyla listelendi"));
        });   
    }
};