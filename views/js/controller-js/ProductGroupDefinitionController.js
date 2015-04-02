var ProductGroupDefinitionService = require("../service-js/ProductGroupDefinitionService");

var pds = new ProductGroupDefinitionService();

function createResponse(state, data, message){
    return response = {
        state : state,
        data : data,
        message : message
    }
}

module.exports = {
    addProductGroupDefinition : function(req,res,next){
        var productGroupDefinitionObj={
                productGroupName:req.body.productGroupName,
                setBy:req.session.user.name+" "+req.session.user.surname,
                firmCode:req.session.user.firmCode
         };
        pds.addNew(productGroupDefinitionObj,function(state,response){
            if(!state){
                res.send(createResponse(state,"",response));
                return;
            }
            res.send(createResponse(state,response,""));
        });
    },
    removeAll : function(req, res, next){
        pds.removeAll(function(state, response){
            if(!state){
                res.send(createResponse(state,response, "hata oluştu "));   
                return;
            }
            res.send(createResponse(state,response, "başarı ile silindi"));
        });
    },
    remove : function(req, res, next){
        pds.remove(req.body,function(state, response){
            if(!state){
                res.send(createResponse(state,response, "hata oluştu "));   
                return;
            }
            res.send(createResponse(state,response, "başarı ile silindi"));
        });
    },
    listAll : function(req, res, next){
        pds.listAll(req.session.user.firmCode, function(state, response){
            if(!state){
                res.send(createResponse(false, null, "ürün grup  tanımları listelenemedi."));
                return;
            }
            res.send(createResponse(true, response, "ürün grup  tanımları başarıyla listelendi"));
        });   
    }
};