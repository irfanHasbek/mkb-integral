var userModel = require('../Model-js/UserModel');

function UserService()
{
    
}

function createUser(userSpec){
    var user = {
        firmCode : userSpec.firmCode,
        name : userSpec.name,
        surname : userSpec.surname,
        email : userSpec.email,
        password : userSpec.password,
        role : userSpec.role,
        task : userSpec.task,
        gsm1 : userSpec.gsm1,
        gsm2 : userSpec.gsm2,
        pictureUrl : userSpec.pictureUrl,
        isActive : userSpec.isActive
    }
    return user;
}

UserService.prototype.addNew = function(user, callback){
    var tempUser = createUser(user)
    //console.log("tempUser: " + JSON.stringify(tempUser));
    var newUser = new userModel(tempUser);
    newUser.save(function(error, addedUser){
        if(error){
            //console.error('UserService > addNewUser > userSave > error :' + error);
            callback(false,error);
            return;
        }
        //console.log('UserService > addNewUser > userSave > user :' + n_user);
        callback(true,addedUser);
    });
}

UserService.prototype.removeAll = function(callback){
    userModel.remove(function(error){
        if(error){
            //console.error('UserService > remoevAllUser > error :' + error);
            callback(false, error);
            return;
        }
        callback(true, "Tüm kişiler silindi.");
    });
}

UserService.prototype.listAll = function(callback){
    userModel.find({}, function(error, users){
        if(error){
            //console.error('UserService > listAllUser > error :' + error);
            callback(false, error);
            return;
        }
        //console.log('UserService > listAllUser > users :' + users);
        callback(true, users);
    });
}

UserService.prototype.getUser = function(userSpec, callback){
    userModel.findOne({firmCode : userSpec.firmCode, email : userSpec.email, password : userSpec.password, isActive : 'yes'}, function(error, user){
        if(error || !user){
            //console.error("UserService > getUser >error");
            callback(false, error);  
            return;
        }
        else{
            //console.error("user : " + user);
            callback(true, user);   
        }
    });
}

UserService.prototype.getWithId = function(userId, callback){
    userModel.findOne({_id : userId}, function(error, user){
        if(error || !user){
            //console.error("UserService > getUser >error");
            callback(false, error);  
            return;
        }
        else{
            //console.error("user : " + user);
            callback(true, user);   
        }
    });
}

UserService.prototype.listFirmUser = function(_firmCode, callback){
    userModel.find({ firmCode : _firmCode }, function(error, users){
        if(error){
            //console.error('UserService > listAllUser > error :' + error);
            callback(false, error);
            return;
        }
        //console.log('UserService > listAllUser > users :' + users);
        callback(true, users);
    });
}

UserService.prototype.listCustomerAgent = function(_firmCode, callback){
    userModel.find({ firmCode : _firmCode , role : 'Müşteri Temsilcisi'}, function(error, users){
        if(error){
            //console.error('UserService > listAllUser > error :' + error);
            callback(false, error);
            return;
        }
        //console.log('UserService > listAllUser > users :' + users);
        callback(true, users);
    });
}

UserService.prototype.remove = function(_userId, callback){
    userModel.remove({_id : _userId}, function(error){
        if(error){
            callback(false, error);
            return;
        }
        callback(true, 'success');
    });   
}

UserService.prototype.update = function(user, callback){
    userModel.update({ _id : user._id }, user, function(error){
        if(error){
            callback(false, error);
            return;
        }
        callback(true, 'success');
    });   
}
/*
UserService.prototype.getUserByEmail = function(email, callback){
    userModel.findOne({email : email}, function(error, user){
        if(error || !user){
            //console.error("UserService > getUser >error");
            callback(false, error);  
            return;
        }
        else{
            //console.error("user : " + user);
            callback(true, user);   
        }
    });
}

UserService.prototype.getUserById = function(id, callback){
    userModel.findOne({_id : id}, function(error, user){
        if(error || !user){
            //console.error("UserService > getUser >error");
            callback(false, error);  
            return;
        }
        else{
            //console.error("user : " + user);
            callback(true, user);   
        }
    });
}

UserService.prototype.updateContactInformation = function(userProperty, callback){
    userModel.findOne({email : userProperty.email}, function(errorFind, foundUser){
        if(errorFind){
            callback(false, errorFind);
            return;   
        }
        foundUser.name = userProperty.name;
        foundUser.surname = userProperty.surname;
        foundUser.phone = userProperty.phone;
        foundUser.gsm1 = userProperty.gsm1;
        foundUser.gsm2 = userProperty.gsm2;
        foundUser.skype = userProperty.skype;
        foundUser.aboutMe = userProperty.aboutMe;
        
        foundUser.save(function(errorUpdate, updatedUser){
            if(errorUpdate){
                callback(false, errorUpdate);
                return;   
            }
            callback(true, updatedUser);
        });
    });
}

UserService.prototype.updateProfilePicture = function(id, userProperty, callback){
    userModel.findOne({_id : id}, function(errorFind, foundedUser){
        if(errorFind){
            callback(false, errorFind);
            return;
        }
        foundedUser.pictureUrl = userProperty.profilePictureUrl;
        
        foundedUser.save(function(errorUpdate, updatedUser){
            if(errorUpdate){
                callback(false, errorUpdate);
                return;   
            }
            callback(true, updatedUser);
        });
    });
}   

UserService.prototype.updatePassword = function(_id, userProperty, callback){
    userModel.findOne({_id : _id}, function(errorFind, foundedUser){
        if(errorFind){
            callback(false, errorFind);
            return;
        }
        foundedUser.password = userProperty.newPassword;
        
        foundedUser.save(function(errorUpdate, updatedUser){
            if(errorUpdate){
                callback(false, errorUpdate);
                return;
            }
            callback(true, updatedUser);
        })
    });   
}
*/
module.exports = UserService;