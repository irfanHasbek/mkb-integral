var ActDefinitionService = require("../service-js/ActDefinitionService");

var ads = new ActDefinitionService();

function createResponse(state, data, message){
    return response = {
        state : state,
        data : data,
        message : message
    }
}

module.exports = {
    addActDefinition : function(req,res,next){
         var actDefObj={
                act:req.body.act,
                setBy:req.session.user.name+" "+req.session.user.surname,
                firmCode:req.session.user.firmCode
         };
        ads.addNew(actDefObj,function(state,response){
            if(!state){
                res.send(createResponse(state,"",response));
                return;
            }
            res.send(createResponse(state,response,""));
        });
    },
    removeAll : function(req, res, next){
        ads.removeAll(function(state, response){
            if(!state){
                res.send(createResponse(state,response, "hata oluştu "));   
                return;
            }
            res.send(createResponse(state,response, "başarı ile silindi"));
        });
    },
    remove : function(req, res, next){
        ads.remove(req.body,function(state, response){
            if(!state){
                res.send(createResponse(state,response, "hata oluştu "));   
                return;
            }
            res.send(createResponse(state,response, "başarı ile silindi"));
        });
    },
    listAll : function(req, res, next){
        ads.listAll(req.session.user.firmCode,function(state, response){
            if(!state){
                res.send(createResponse(false, null, "Rol tanımları listelenemedi."));
                return;
            }
            res.send(createResponse(true, response, "Rol tanımları başarıyla listelendi"));
        });   
    }
};