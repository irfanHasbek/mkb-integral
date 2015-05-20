var CoverPageService = require("../service-js/CoverPageService");

var cts = new CoverPageService();

function createResponse(state, data, message){
    return response = {
        state : state,
        data : data,
        message : message
    }
}

module.exports = {
    addCoverPage : function(req,res,next){
        var coverPageObj={
                label:req.body.label,
                content:req.body.content,
                firmCode:req.session.user.firmCode
        };
        if(req.body.active == 'on'){
            coverPageObj.active = true;   
        }else{
            coverPageObj.active = false;   
        }
        //console.log(JSON.stringify(req.body));
        
        cts.addNew(coverPageObj,function(state,response){
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
                res.send(createResponse(false, null, "Kapak sayfalari listelenemedi."));
                return;
            }
            res.send(createResponse(true, response, "Kapak sayfalari başarıyla listelendi"));
        });   
    }
};