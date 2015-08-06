var FirmModel = require('../Model-js/FirmModel');

function FirmService()
{
    
}

function createFirm(firmSpec){
    var firm = {
        firmCode : firmSpec.firmCode,
        name : firmSpec.name,
        logoUrl : firmSpec.logoUrl,
        email : firmSpec.email,
        password : firmSpec.password,
        competentInformation : {
            name : firmSpec.competentInformationName,
            task : firmSpec.competentInformationTask,
            gsm : firmSpec.competentInformationGsm,
            email : firmSpec.competentInformationEmail
        },
        contactInformation : {
            address : firmSpec.contactInformationAddress,
            city : firmSpec.contactInformationCity,
            state : firmSpec.contactInformationState,
            businessTel : firmSpec.contactInformationBusinessTel,
            fax : firmSpec.contactInformationFax,
            web : firmSpec.contactInformationWeb
        }
    }
    return firm;
}

FirmService.prototype.addNew = function(firm, callback){
    var tempFirm = createFirm(firm);
    var newFirm = new FirmModel(tempFirm);
    newFirm.save(function(error, addedFirm){
        if(error){
            //console.error('FirmService > addNew > firmSave > error :' + error);
            callback(false,error);
            return;
        }
        //console.log('FirmService > addNew > firmSave > firm :' + addedFirm);
        callback(true,addedFirm);
    });
}

FirmService.prototype.updatePart1 = function(firm, callback){
    var tempFirm = createFirm(firm);
    var newFirm = new FirmModel(tempFirm);
    FirmModel.findOne({name : newFirm.name}, function(errorFind, foundFirm){
        if(errorFind){
            return;   
        }
        foundFirm.email = newFirm.email;
        foundFirm.password = newFirm.password;
        foundFirm.logoUrl = newFirm.logoUrl;
        //foundFirm.competentInformation = newFirm.competentInformation;
        //foundFirm.contactInformation = newFirm.contactInformation;
        foundFirm.save(function(errorUpdate, numOfAffectedRow, updatedFirm){
            if(errorUpdate){
                callback(false, errorUpdate);
                return;
            }
            callback(true, updatedFirm);
        });
    });
}

FirmService.prototype.updatePart2 = function(firm, callback){
    var tempFirm = createFirm(firm);
    console.log('tempFirm : ' + JSON.stringify(tempFirm))
    var newFirm = new FirmModel(tempFirm);
    FirmModel.findOne({name : newFirm.name}, function(errorFind, foundFirm){
        if(errorFind){
            return;   
        }
        console.log('found : ' + JSON.stringify(foundFirm));
        foundFirm.competentInformation = newFirm.competentInformation;
        foundFirm.contactInformation = newFirm.contactInformation;
        foundFirm.save(function(errorUpdate, numOfAffectedRow, updatedFirm){
            if(errorUpdate){
                callback(false, errorUpdate);
                return;
            }
            callback(true, updatedFirm);
        });
    });
}

FirmService.prototype.removeAll = function(callback){
    FirmModel.remove(function(error){
        if(error){
            //conso
            callback(false, error);
            return;
        }
        callback(true, "Tüm firmalar silindi.");
    });
}

FirmService.prototype.listAll = function(callback){
    FirmModel.find({}, function(error, firms){
        if(error){
            callback(false, error);
            return;
        }
        callback(true, firms);
    });
}

FirmService.prototype.getInformation = function(name, callback){
    FirmModel.findOne({ name : name }, function(error, firmInfo){
        if(error){
            callback(false, error);
            return;
        }
        callback(true, firmInfo);
    });
}
FirmService.prototype.getInformationFirmCode = function(firmCode, callback){
    console.log('firmCode-Service : ' + firmCode);
    FirmModel.findOne({ firmCode : firmCode }, function(error, firmInfo){
        if(error){
            callback(false, error);
            return;
        }
        callback(true, firmInfo);
    });
}
module.exports = FirmService;