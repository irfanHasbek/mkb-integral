var UserService = require("../service-js/UserService");
var CustomerService=require("../service-js/CustomerDefinitionService");
var us = new UserService();
var custService=new CustomerService();

var UserPermissionModel=require('../Model-js/UserPermissionModel');
var ActDefinitionModel=require('../Model-js/ActDefinitionModel');

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
                req.session.onLogoutPage = '/';
                req.session.accountType = "user";
                req.session.login = true;
                req.session.user  = response;
                res.redirect("/index");
            }
        });
    },
    
    logout : function(req, res, next){
        var onLogoutPage = req.session.onLogoutPage;
        // session store based destroy
        req.session.destroy();
        // cookie based session destroy
        req.session = null;
        res.redirect(onLogoutPage);
    },
    customerLogin : function(req,res,next){
        var firmCode = req.param('id');
        console.log("firmCode : " + firmCode);
        custService.getCustomerWithEmail(req.body.username,req.body.password,firmCode,function(state,response){
            if(!state){
                console.error("error : " + response);
                req.session.loginCustomer = false;
                req.session.message = "Hatalı giriş yaptınız lütfen bilgilerinizi kontrol ediniz.";
                res.redirect("back"); 
            }else{
                console.log("success : " + response);
                req.session.onLogoutPage = '/musteri_kayit?id=' + firmCode;
                req.session.accountType = "customer";
                req.session.loginCustomer = true;
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
            res.redirect('/');   
        }
    },
    sessionCheckCustomer : function(req, res, next){
        if(req.session && req.session.customer && req.session.loginCustomer == true){
            console.log("SessionCheck is true for customer");
            next();
        }
        else{
            if(req.session.onLogoutPage){
                console.log("SessionCheck is false for customer");
                res.redirect(req.session.onLogoutPage);  
            }
            else{
                console.log("SessionCheck is false for customer");
                res.send('Lutfen firmaniza vermis oldugumuz baglanti linkini kullaniniz !');  
            }
        }
    },
    permissionCheck : function(req, res, next){
        console.log('kullanicinin rolu : ' + JSON.stringify(req.session.user.role));
        if(req.session.user.role == 'Administrator'){
            next();
        }else{
            ActDefinitionModel.findOne({ act : req.session.user.role }, function(errorRole, foundedRole){
                if(errorRole){
                    res.send("Bu servisi kullanmaya izniniz yoktur.");
                    return;
                }
                UserPermissionModel.findOne({ roleId : foundedRole._id }, function(errorPermission, foundedPermission){
                    if(errorPermission){
                        res.send("Bu servisi kullanmaya izniniz yoktur.");
                        return;
                    } 
                    var permissionStatus = false;
                    for(var i = 0; i < foundedPermission.permission.length; i++){
                        if(req.originalUrl == foundedPermission.permission[i]){
                            permissionStatus = true;   
                        }
                    }
                    if(permissionStatus){
                        next();   
                    }else{
                        res.send("Bu servisi kullanmaya izniniz yoktur.");
                    }
                });
            });    
        }
    }
}