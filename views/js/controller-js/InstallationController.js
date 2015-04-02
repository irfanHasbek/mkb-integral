var UserService = require("../service-js/UserService");
var FirmService = require("../service-js/FirmService");
var RoleService = require("../service-js/ActDefinitionService");


var us = new UserService();
var fs = new FirmService();
var rs = new RoleService();

var firmCode = ['administrator','mkbAlize','mkbEntalpi','mkbIntegral','mkbDamla'];
var adminEmail = ['admin@administrator.com','admin@alize.com','admin@entalpi.com','admin@integral.com','admin@damla.com'];

function createFirm(firmName, firmCode){
    var firm = {
        firmCode : firmCode,
        name : firmName,
        logoUrl : '',
        email : '',
        competentInformationName : '',
        competentInformationTask : '',
        competentInformationGsm : '',
        competentInformationEmail : '',
        contactInformationAddress : '',
        contactInformationCity : '',
        contactInformationState : '',
        contactInformationBusinessTel : '',
        contactInformationFax : '',
        contactInformationWeb : ''
    }   
    return firm;
}
function createAdmin(firmCode, email){
    var adminSpec = {
        firmCode : firmCode,
        name : 'isim',
        surname : 'soyisim',
        email : email,
        password : 'admin',
        role : 'Administrator',
        task : '',
        gsm1 : '',
        gsm2 : '',
        isActive : 'yes'
    };
    return adminSpec;
}
module.exports = {
    addAdminUser : function(req, res){
        for(var i = 0;i < firmCode.length; i++){
            us.addNew(createAdmin(firmCode[i], adminEmail[i]), function(state, response){
                if(!state){
                    res.send({state : state, response : response});   
                    return;
                }
            });   
        }
        res.send({state : 'true', response : 'success'});
    },
    addFirms : function(req, res){
        var firms = ['Integral Havalandirma','Alize','Entalpi','Integral','Damla'];
        for(var i = 0; i < firms.length; i++){
            fs.addNew(createFirm(firms[i], firmCode[i]), function(state, response){
                if(!state){
                    console.log('state : ' + state + ' response : ' + response);
                    res.send({ state : 'false'});
                    return;
                }
            });  
        }
        res.send({ state : 'success'});
    },
    addRole : function(req, res){
        for(var i = 0; i < firmCode.length; i++){
            rs.addNew({act : 'Administrator', setBy : 'SYSTEM', firmCode : firmCode[i]}, function(state, response){
                if(!state){
                    res.send({ state : 'false'});
                    return;
                }
            });     
        }
        for(var i = 0; i < firmCode.length; i++){
            rs.addNew({act : 'Müşteri Temsilcisi', setBy : 'SYSTEM', firmCode : firmCode[i]}, function(state, response){
                if(!state){
                    res.send({ state : 'false'});
                    return;
                }
            });     
        }
        res.send({ state : 'success'});
    }
}