var UserService = require("../service-js/UserService");

var us = new UserService();

function createResponse(state, data, message){
    return response = {
        state : state,
        data : data,
        message : message
    }
}

module.exports = {
    addNew : function(req, res){
        var user = {
            firmCode : req.session.user.firmCode,
            name : req.body.name,
            surname : req.body.surname,
            email : req.body.email,
            password : req.body.password,
            role : req.body.role,
            task : req.body.task,
            pictureUrl : req.body.pictureUrl,
            gsm1 : req.body.gsm1,
            gsm2 : '',
            isActive : req.body.isActive
        };
        us.addNew(user, function(state, response){
            if(!state){
                res.send(createResponse(false, null, "Kullanici eklenemedi."));
                return;
            }
            res.send(createResponse(true, response, "Kullanici başarıyla eklendi."));
        });   
    },
    update : function(req, res){
        us.update(req.body, function(state, response){
            if(!state){
                res.send(createResponse(state, "", response));   
                return;
            }
            res.send(createResponse(state, "", response));
        });
    },
    removeAll : function(req, res){
        us.removeAll(function(state, response){
            if(!state){
                res.send(createResponse(state, "", response));   
                return;
            }
            res.send(createResponse(state, "", response));
        });
    },
    listAll : function(req, res){
        us.listAll(function(state, response){
            if(!state){
                res.send(createResponse(false, null, "Kişiler listelenemedi."));
                return;
            }
            res.send(createResponse(true, response, "Kişiler başarıyla listelendi"));
        });   
    },
    remove : function(req, res){
        us.remove(req.body._id, function(state, response){
             if(!state){
                res.send(createResponse(false, null, "Kullanici silinemedi."));
                return;
            }
            res.send(createResponse(true, response, "Kullanici başarıyla silindi."));
        });   
    },
    getWithId : function(req, res){
        us.getWithId(req.body._id, function(state, response){
             if(!state){
                res.send(createResponse(false, null, "Kullanici bulunamadi."));
                return;
            }
            res.send(createResponse(true, response, "Kullanici bulundu."));
        });   
    }
    
    /*,
    updateProfilePicture : function(req, res){
        us.updateProfilePicture(req.session.user._id, req.body, function(state, response){
            if(!state){
                res.send(createResponse(false,JSON.stringify(response), "Kişi resmi güncellenemedi."));
                return;
            }
            res.redirect("/myaccount");
        });   
    },
    updatePassword : function(req, res){
        us.updatePassword(req.session.user._id, req.body, function(state, response){
            if(!state){
                res.send(createResponse(false,JSON.stringify(response), "Kişi şifresi güncellenemedi."));
                return;
            }
            //console.log("req body : " + JSON.stringify(req.body));
            req.session.user.password = req.body.newPassword;
            res.redirect("/myaccount");
        });   
    },
    updateContactInformation : function(req, res, next){
        us.updateContactInformation(req.body, function(state, response){
            if(!state){
                res.send(createResponse(false,JSON.stringify(response), "Kişi güncellenemedi."));
                return;
            }
            req.session.user = response;
            res.redirect("/myaccount");
        });
    }*/
};