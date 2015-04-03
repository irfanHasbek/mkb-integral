var ProductPriceService = require("../service-js/ProductPriceService");

var ps = new ProductPriceService();

function createResponse(state, data, message){
    return response = {
        state : state,
        data : data,
        message : message
    }
}

module.exports = {
    addPrice : function(req,res,next){
        var price={
            productId : req.body.productId,
            dimensionType : '',
            dimension : []
         };
        ps.addNew(price, function(state,response){
            if(!state){
                res.send(createResponse(state,"",response));
                return;
            }
            res.send(createResponse(state,response,""));
        });
    },
    update : function(req, res){
        ps.addPrice(req.body, function(state, response){
            if(!state){
                res.send(createResponse(state,response, "hata oluştu "));   
                return;
            }
            res.send(createResponse(state,response, "başarı ile guncellendi"));
        });
    },
    removeAll : function(req, res, next){
        ps.removeAll(function(state, response){
            if(!state){
                res.send(createResponse(state,response, "hata oluştu "));   
                return;
            }
            res.send(createResponse(state,response, "başarı ile silindi"));
        });
    },
    remove : function(req, res, next){
        ps.remove(req.body, function(state, response){
            if(!state){
                res.send(createResponse(state,response, "hata oluştu "));   
                return;
            }
            res.send(createResponse(state,response, "başarı ile silindi"));
        });
    },
    listAll : function(req, res, next){
        ps.listAll(function(state, response){
            if(!state){
                res.send(createResponse(false, null, "fiyatlar listelenemedi."));
                return;
            }
            res.send(createResponse(true, response, "fiyatlar başarıyla listelendi"));
        });   
    },
    listProductPrice : function(req, res){
        //console.log('req body : ' + JSON.stringify(req.body));
        ps.listProductPrice(req.body.productId, function(state, response){
            if(!state){
                res.send(createResponse(false, null, "urun fiyatlari listelenemedi."));
                return;
            }
            res.send(createResponse(true, response, "urun fiyatlari başarıyla listelendi"));
        });   
    },
    removeProduct : function(req, res, next){
        ps.removeProduct(req.body.productId, function(state, response){
            if(!state){
                res.send(createResponse(state,response, "hata oluştu "));   
                return;
            }
            res.send(createResponse(state,response, ''));
        });
    }
};