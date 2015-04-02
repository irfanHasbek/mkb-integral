var UserService = require("../service-js/UserService");

var us = new UserService();

module.exports = {
    login : function(req, res, next){
        us.getUser(req.body, function(state, response){
            if(!state){
                console.error("error : " + response);
                req.session.login = false;
                req.session.message = "Hatalı giriş yaptınız lütfen bilgilerinizi kontrol ediniz.";
                res.redirect("/"); 
            }else{
                console.log("success : " + response);
                req.session.login = true;
                req.session.user  = response;
                res.redirect("/index");
            }
        });
    },
    
    logout : function(req, res, next){
        // session store based destroy
            req.session.destroy();
            // cookie based session destroy
            req.session = null;
            res.redirect("/");
    },
    
    sessionCheck : function(req, res, next){
        if(req.session && req.session.user && req.session.login == true){
            console.log("SessionCheck is true");
            next();
        }
        else{
            console.log("SessionCheck is false");
            res.redirect("/");   
        }
    }
}