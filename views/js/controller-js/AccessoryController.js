var AccessoryService = require("../service-js/AccessoryService");

var as = new AccessoryService();

function createResponse(state, data, message){
    return response = {
        state : state,
        data : data,
        message : message
    }
}

module.exports = {
    addAccessory : function(req,res,next){
        var accessoryObj={
                accessory:req.body.accessory,
                productGroupName : req.body.productGroupName,
                setBy:req.session.user.name+" "+req.session.user.surname,
                cost : req.body.cost,
                firmCode:req.session.user.firmCode
         };
        as.addNew(accessoryObj,function(state,response){
            if(!state){
                res.send(createResponse(state,"",response));
                return;
            }
            res.send(createResponse(state,response,""));
        });
    },
    removeAll : function(req, res, next){
        as.removeAll(function(state, response){
            if(!state){
                res.send(createResponse(state,response, "hata oluştu "));   
                return;
            }
            res.send(createResponse(state,response, "başarı ile silindi"));
        });
    },
    remove : function(req, res, next){
        as.remove(req.body,function(state, response){
            if(!state){
                res.send(createResponse(state,response, "hata oluştu "));   
                return;
            }
            res.send(createResponse(state,response, "başarı ile silindi"));
        });
    },
    listAll : function(req, res, next){
        as.listAll(req.session.user.firmCode, function(state, response){
            if(!state){
                res.send(createResponse(false, null, "aksesuarlar listelenemedi."));
                return;
            }
            res.send(createResponse(true, response, "aksesuarlar başarıyla listelendi"));
        });   
    },
    getByGroupName : function(req, res, next){
        as.getByGroupName(req.session.user.firmCode, req.body.productGroupName,function(state, response){
            if(!state){
                res.send(createResponse(false, null, "aksesuarlar listelenemedi."));
                return;
            }
            res.send(createResponse(true, response, "aksesuarlar başarıyla listelendi"));
        });   
    }
};