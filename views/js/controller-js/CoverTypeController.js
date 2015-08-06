var CoverTypeService = require("../service-js/CoverTypeService");

var cts = new CoverTypeService();

function createResponse(state, data, message){
    return response = {
        state : state,
        data : data,
        message : message
    }
}

module.exports = {
    addCoverType : function(req,res,next){
        var coverTypeObj={
                coverType:req.body.coverType,
                setBy:req.session.user.name+" "+req.session.user.surname,
                cost : req.body.cost,
                firmCode:req.session.user.firmCode,
                orderCover : 1
        };
        console.log(JSON.stringify(req.body));
        if(req.body.orderCover == 'on'){
            coverTypeObj.orderCover = 2;
        }
        
        cts.addNew(coverTypeObj,function(state,response){
            if(!state){
                res.send(createResponse(state,"",response));
                return;
            }
            res.send(createResponse(state,response,""));
        });
    },
    removeAll : function(req, res, next){
        cts.removeAll(function(state, response){
            if(!state){
                res.send(createResponse(state,response, "hata oluştu "));   
                return;
            }
            res.send(createResponse(state,response, "başarı ile silindi"));
        });
    },
    remove : function(req, res, next){
        cts.remove(req.body,function(state, response){
            if(!state){
                res.send(createResponse(state,response, "hata oluştu "));   
                return;
            }
            res.send(createResponse(state,response, "başarı ile silindi"));
        });
    },
    listAll : function(req, res, next){
        cts.listAll(req.session.user.firmCode,function(state, response){
            if(!state){
                res.send(createResponse(false, null, "kaplama türleri listelenemedi."));
                return;
            }
            res.send(createResponse(true, response, "kaplama türleri başarıyla listelendi"));
        });   
    }
};