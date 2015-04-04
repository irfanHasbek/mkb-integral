var UserService = require("../service-js/UserService");
var CustomerService=require("../service-js/CustomerDefinitionService");
var us = new UserService();
var custService=new CustomerService();
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
                req.session.accountType = "user";
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
    customerLogin : function(req,res,next){
        var firmCode = req.body.firmCode;
        console.log("firmCode : " + firmCode);
        custService.getCustomerWithEmail(req.body.username,req.body.password,firmCode,function(state,response){
            if(!state){
                console.error("error : " + response);
                req.session.login = false;
                req.session.message = "Hatalı giriş yaptınız lütfen bilgilerinizi kontrol ediniz.";
                res.redirect("back"); 
            }else{
                console.log("success : " + response);
                req.session.accountType = "customer";
                req.session.login = true;
                req.session.customer  = response;
                res.redirect("/musteri_anasayfa");
            }
        });
    },
    sessionCheck : function(req, res, next){
        if(req.session && req.session.user && req.session.login == true){
            console.log("SessionCheck is true for user");
            next();
        }
        else{
            console.log("SessionCheck is false for user");
            res.send("hata 500 kullanıcı");   
        }
    },
    sessionCheckCustomer : function(req, res, next){
        if(req.session && req.session.customer && req.session.login == true){
            console.log("SessionCheck is true for customer");
            next();
        }
        else{
            console.log("SessionCheck is false for customer");
            res.send("hata 500 müşteri");   
        }
    }
}