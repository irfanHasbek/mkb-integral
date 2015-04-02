var OfferTopicService = require("../service-js/OfferTopicService");

var ots = new OfferTopicService();

function createResponse(state, data, message){
    return response = {
        state : state,
        data : data,
        message : message
    }
}

module.exports = {
    addOfferTopic : function(req,res,next){
         var OfferTopicObj={
                offerTopic:req.body.offerTopic,
                setBy:req.session.user.name+" "+req.session.user.surname,
                firmCode:req.session.user.firmCode
         };
        ots.addNew(OfferTopicObj,function(state,response){
            if(!state){
                res.send(createResponse(state,"",response));
                return;
            }
            res.send(createResponse(state,response,""));
        });
    },
    removeAll : function(req, res, next){
        ots.removeAll(function(state, response){
            if(!state){
                res.send(createResponse(state,response, "hata oluştu "));   
                return;
            }
            res.send(createResponse(state,response, "başarı ile silindi"));
        });
    },
    remove : function(req, res, next){
        ots.remove(req.body,function(state, response){
            if(!state){
                res.send(createResponse(state,response, "hata oluştu "));   
                return;
            }
            res.send(createResponse(state,response, "başarı ile silindi"));
        });
    },
    listAll : function(req, res, next){
        ots.listAll(req.session.user.firmCode,function(state, response){
            if(!state){
                res.send(createResponse(false, null, "teklif konuları listelenemedi."));
                return;
            }
            res.send(createResponse(true, response, "teklif konuları başarıyla listelendi"));
        });   
    }
};