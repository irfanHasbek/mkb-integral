var CityService = require("../service-js/CityService");

var cts = new CityService();

function createResponse(state, data, message){
    return response = {
        state : state,
        data : data,
        message : message
    }
}
module.exports = {
    addCity : function(req,res,next){
        
        cts.addNew(req.body,function(state,response){
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
        cts.listAll(function(state, response){
            if(!state){
                res.send(createResponse(false, null, "iller listelenemedi."));
                return;
            }
            res.send(createResponse(true, response, "iller başarıyla listelendi"));
        });   
    },
    addTown : function(req,res,next){
        cts.addTown(req.body,function(state,response){
            if(!state){
                res.send(createResponse(false,null,"ilçe eklenemdi"));
                return;
            }
            res.send(createResponse(true,response,"ilçe başarı ile eklendi"));
        });
    },
    removeTown : function(req,res,next){
        cts.removeTown(req.body,function(state,response){
            if(!state){
                res.send(createResponse(false,null,"ilçe silinemedi"));
                return;
            }
            res.send(createResponse(true,response,"ilçe başarı silindi"));
        });
    },
    getTowns : function(req,res,next){
        cts.getTowns(req.body,function(state,response){
            if(!state){
                res.send(createResponse(false,null,"arama başarısız"));
                return;
            }
            res.send(createResponse(true,response,"arama başarıyla sonuçlandı"));
        });
    }
};