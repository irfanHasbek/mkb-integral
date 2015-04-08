var UnitService = require("../service-js/UnitService");

var unitService = new UnitService();

function createResponse(state, data, message){
    return response = {
        state : state,
        data : data,
        message : message
    }
}

module.exports = {
    addNew : function(req,res){
        var unitObj={
                unit:req.body.unit,
                setBy:req.session.user.name+" "+req.session.user.surname,
                firmCode:req.session.user.firmCode
         };
        unitService.addNew(unitObj, function(state,response){
            if(!state){
                res.send(createResponse(state,"",response));
                return;
            }
            res.send(createResponse(state,response,""));
        });
    },
    removeAll : function(req, res){
        unitService.removeAll(function(state, response){
            if(!state){
                res.send(createResponse(state,response, "hata oluştu "));   
                return;
            }
            res.send(createResponse(state,response, "başarı ile silindi"));
        });
    },
    remove : function(req, res){
        unitService.remove(req.body._id, function(state, response){
            if(!state){
                res.send(createResponse(state,response, "hata oluştu "));   
                return;
            }
            res.send(createResponse(state,response, "başarı ile silindi"));
        });
    },
    listAll : function(req, res, next){
        unitService.listAll(req.session.user.firmCode, function(state, response){
            if(!state){
                res.send(createResponse(false, null, "Müşteri Grupları listelenemedi."));
                return;
            }
            res.send(createResponse(true, response, "Müşteri Grupları başarıyla listelendi"));
        });   
    }
};