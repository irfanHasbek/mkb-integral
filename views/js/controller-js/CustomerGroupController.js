var CustomerGroupService = require("../service-js/CustomerGroupService");

var cs = new CustomerGroupService();

function createResponse(state, data, message){
    return response = {
        state : state,
        data : data,
        message : message
    }
}

module.exports = {
    addCustomerGroup : function(req,res,next){
        var custGroupObj={
                groupName:req.body.groupName,
                setBy:req.session.user.name+" "+req.session.user.surname,
                firmCode:req.session.user.firmCode
         };
        cs.addNew(custGroupObj,function(state,response){
            if(!state){
                res.send(createResponse(state,"",response));
                return;
            }
            res.send(createResponse(state,response,""));
        });
    },
    removeAll : function(req, res, next){
        cs.removeAll(function(state, response){
            if(!state){
                res.send(createResponse(state,response, "hata oluştu "));   
                return;
            }
            res.send(createResponse(state,response, "başarı ile silindi"));
        });
    },
    remove : function(req, res, next){
        cs.remove(req.body,function(state, response){
            if(!state){
                res.send(createResponse(state,response, "hata oluştu "));   
                return;
            }
            res.send(createResponse(state,response, "başarı ile silindi"));
        });
    },
    listAll : function(req, res, next){
        cs.listAll(req.session.user.firmCode,function(state, response){
            if(!state){
                res.send(createResponse(false, null, "Müşteri Grupları listelenemedi."));
                return;
            }
            res.send(createResponse(true, response, "Müşteri Grupları başarıyla listelendi"));
        });   
    }
};