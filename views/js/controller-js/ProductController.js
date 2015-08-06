var ProductService = require("../service-js/ProductService");

var ps = new ProductService();

function createProduct(type, req){
    var product={
        firmCode : req.session.user.firmCode,
        group : req.body.group,
        code : req.body.code,
        name : req.body.name,
        pictureUrl : req.body.pictureUrl,
        description : req.body.description,
        order : req.body.order
     };
    if(type == 'update'){
        product._id = req.body._id;
    }
    return product;
}

module.exports = {
    add : function(req, res){
        var product = createProduct('add', req);
        //console.log(product);
        ps.addNew(product,function(state,response){
            if(!state){
                res.send({state : state, response : response});
                return;
            }
            res.send({state : state, response : response});
        });
    },
    update : function(req, res){
        var product = createProduct('update', req);
        ps.update(product, function(state, response){
            if(!state){
                res.send({state : state, response : response});   
                return;
            }
            res.send({state : state, response : response});
        });
    },
    removeAll : function(req, res){
        ps.removeAll(function(state, response){
            if(!state){
                res.send({state : state, response : response});   
                return;
            }
            res.send({state : state, response : response});
        });
    },
    remove : function(req, res){
        ps.remove(req.body._id,function(state, response){
            if(!state){
                res.send({state : state, response : response});   
                return;
            }
            res.send({state : state, response : response});
        });
    },
    listAll : function(req, res){
        ps.listAll(req.session.user.firmCode, function(state, response){
            if(!state){
                res.send({state : state, response : response});
                return;
            }
            res.send({state : state, response : response});
        });   
    },
    getProduct : function(req, res){
        ps.getProduct(id, function(state, response){
            if(!state){
                res.send({state : state, response : response});
                return;
            }
            res.send({state : state, response : response});
        });   
    },
    searchProduct : function(req, res){
        var criteria = req.body.search;
        if(req.session.accountType=="customer"){
            criteria.firmCode = req.session.customer.firmCode;
        }else{
            criteria.firmCode = req.session.user.firmCode;
        }
        ps.search(criteria, function(state, response){
            if(!state){
                res.send({state : state, response : response});
                return;
            }
            res.send({state : state, response : response});
        });   
    },
    textSearch : function(req, res){
        ps.textSearch(req.body, function(state, response){
            if(!state){
                res.send({state : state, response : response});
                return;
            }
            res.send({state : state, response : response});
        });   
    }
};