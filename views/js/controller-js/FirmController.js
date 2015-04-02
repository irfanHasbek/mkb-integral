var FirmService = require("../service-js/FirmService");

var fs = new FirmService();

module.exports = {
    addNew : function(req, res){
        fs.addNew(req.body, function(state, response){
            if(!state){
                res.send({state : state, response : response});   
                return;
            }
            res.send({state : state, response : response});   
        });   
    },
    update1 : function(req, res){
        fs.updatePart1(req.body, function(state, response){
            if(!state){
                res.send({state : state, response : response});   
                return;
            }
            res.send({state : state, response : response});   
        });   
    },
    update2 : function(req, res){
        fs.updatePart2(req.body, function(state, response){
            if(!state){
                res.send({state : state, response : response});   
                return;
            }
            res.send({state : state, response : response});   
        });   
    },
    removeAll : function(req, res){
        fs.removeAll(function(state, response){
            if(!state){
                res.send({state : state, response : response});    
                return;
            }
            res.send({state : state, response : response});   
        });
    },
    listAll : function(req, res){
        fs.listAll(function(state, response){
            if(!state){
                res.send({state : state, response : response});   
                return;
            }
            res.send({state : state, response : response});   
        });   
    },
    getInformation : function(req, res){
        fs.getInformation(req.body.name, function(state, response){
            if(!state){
                res.send({state : state, response : response});   
                return;
            }
            res.send({state : state, response : response});   
        });   
    }   
}
    