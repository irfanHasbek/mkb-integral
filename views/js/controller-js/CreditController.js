var CreditService = require("../service-js/CreditService");

var crs = new CreditService();

function createResponse(state, data, message){
    return response = {
        state : state,
        data : data,
        message : message
    }
}

module.exports = {
    addCredit : function(req,res,next){
        var creditObj={
                credit:req.body.credit,
                percent:req.body.percent,
                setBy:req.session.user.name+" "+req.session.user.surname,
                firmCode:req.session.user.firmCode
         };
        crs.addNew(creditObj,function(state,response){
            if(!state){
                res.send(createResponse(state,"",response));
                return;
            }
            res.send(createResponse(state,response,""));
        });
    },
    removeAll : function(req, res, next){
        crs.removeAll(function(state, response){
            if(!state){
                res.send(createResponse(state,response, "hata oluştu "));   
                return;
            }
            res.send(createResponse(state,response, "başarı ile silindi"));
        });
    },
    remove : function(req, res, next){
        crs.remove(req.body,function(state, response){
            if(!state){
                res.send(createResponse(state,response, "hata oluştu "));   
                return;
            }
            res.send(createResponse(state,response, "başarı ile silindi"));
        });
    },
    update : function(req, res){
        crs.update(req.body, function(state, response){
            if(!state){
                res.send(createResponse(state,response, "hata oluştu "));   
                return;
                }
                res.send(createResponse(state,response, "başarı ile guncellendi"));
        });
    },
    listAll : function(req, res, next){
        crs.listAll(req.session.user.firmCode, function(state, response){
            if(!state){
                res.send(createResponse(false, null, "Vadeler listelenemedi."));
                return;
            }
            res.send(createResponse(true, response, "Vadeler başarıyla listelendi"));
        });   
    }
};