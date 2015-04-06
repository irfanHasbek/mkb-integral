var UserPermissionModel=require('../Model-js/UserPermissionModel');
var ActDefinitionModel=require('../Model-js/ActDefinitionModel');

function createUserPermissionsModel(userPermissions){
    var userPermissionObj = {
        permission : []
    }
    //rol tanimi
    if(userPermissions.r11 == 'on'){
        userPermissionObj.permission.push('/rol_tanimi');   
    }
    if(userPermissions.r12 == 'on'){
        userPermissionObj.permission.push('/wsactdefinition/addnew');   
    }
    if(userPermissions.r13 == 'on'){
        userPermissionObj.permission.push('/wsactdefinition/remove');   
    }
    
    //Gorev tanimi
    if(userPermissions.r21 == 'on'){
        userPermissionObj.permission.push('/gorev_tanimi');   
    }
    if(userPermissions.r22 == 'on'){
        userPermissionObj.permission.push('/wstaskdefinition/addnew');   
    }
    if(userPermissions.r23 == 'on'){
        userPermissionObj.permission.push('/wstaskdefinition/remove');   
    }
    
    //Kullanici tanimi
    if(userPermissions.r31 == 'on'){
        userPermissionObj.permission.push('/kullanici_tanimi');   
    }
    if(userPermissions.r32 == 'on'){
        userPermissionObj.permission.push('/wsuser/addnew');   
    }
    if(userPermissions.r33 == 'on'){
        userPermissionObj.permission.push('/wsuser/remove');   
    }
    
    //Kullanici izinileri
    if(userPermissions.r41 == 'on'){
        userPermissionObj.permission.push('/kullanici_izinleri');   
    }
    
    //il ilce tanimlari
    if(userPermissions.r51 == 'on'){
        userPermissionObj.permission.push('/il_ilce_tanimlari');   
    }
    if(userPermissions.r52 == 'on'){
        userPermissionObj.permission.push('/wscity/addnew');   
    }
    if(userPermissions.r53 == 'on'){
        userPermissionObj.permission.push('/wscity/remove');   
    }
    
    //firma tanimlari
    if(userPermissions.r61 == 'on'){
        userPermissionObj.permission.push('/firma_tanimlari');   
    }
    if(userPermissions.r62 == 'on'){
        userPermissionObj.permission.push('/wsfirm/update1');   
    }
    if(userPermissions.r63 == 'on'){
        userPermissionObj.permission.push('/wsfirm/update2');   
    }
    
    //Musteri Grup tanimlari
    if(userPermissions.r71 == 'on'){
        userPermissionObj.permission.push('/musteri_grup_tanimlari');   
    }
    if(userPermissions.r72 == 'on'){
        userPermissionObj.permission.push('/wscustomergroup/addnew');   
    }
    if(userPermissions.r73 == 'on'){
        userPermissionObj.permission.push('/wscustomergroup/remove');   
    }
    
    //Vade tanimlari
    if(userPermissions.r81 == 'on'){
        userPermissionObj.permission.push('/vade_tanimlari');   
    }
    if(userPermissions.r82 == 'on'){
        userPermissionObj.permission.push('/wscredit/addnew');   
    }
    if(userPermissions.r83 == 'on'){
        userPermissionObj.permission.push('/wscredit/remove');   
    }
    
    //musteri tanimlari
    if(userPermissions.r91 == 'on'){
        userPermissionObj.permission.push('/musteri_tanimi?id=0');   
    }
    if(userPermissions.r92 == 'on'){
        userPermissionObj.permission.push('/wscustomerdefinition/addnew');   
    }
    if(userPermissions.r93 == 'on'){
        userPermissionObj.permission.push('/wscustomerdefinition/remove');   
    }
    
    //musteri listeleme
    if(userPermissions.r101 == 'on'){
        userPermissionObj.permission.push('/musteri_listesi');   
    }
    
    //Teklif olusturna
    if(userPermissions.r111 == 'on'){
        userPermissionObj.permission.push('/teklif_olusturma?id=0');   
    }
    if(userPermissions.r112 == 'on'){
        userPermissionObj.permission.push('/wsoffer/addnew');   
    }
    if(userPermissions.r113 == 'on'){
        userPermissionObj.permission.push('/wsoffer/remove');   
    }
    
    //Acik teklifler
    if(userPermissions.r121 == 'on'){
        userPermissionObj.permission.push('/acik_teklifler');   
    }
    
    //Urun Grup tanimi
    if(userPermissions.r141 == 'on'){
        userPermissionObj.permission.push('/urun_grup_tanimi');   
    }
    if(userPermissions.r142 == 'on'){
        userPermissionObj.permission.push('/wsproductgroupdefinition/addnew');   
    }
    if(userPermissions.r143 == 'on'){
        userPermissionObj.permission.push('/wsproductgroupdefinition/remove');   
    }
    
    //Urun tanimi
    if(userPermissions.r151 == 'on'){
        userPermissionObj.permission.push('/urun_tanimlari?id=0');   
    }
    if(userPermissions.r152 == 'on'){
        userPermissionObj.permission.push('/wsproduct/add');   
    }
    if(userPermissions.r153 == 'on'){
        userPermissionObj.permission.push('/wsproduct/remove');   
    }
    
    //urun listeleme
    if(userPermissions.r171 == 'on'){
        userPermissionObj.permission.push('/urun_listeleme');   
    }
    return userPermissionObj;
}

module.exports = {
    update : function(req, res){
        var userPermissionsObj = createUserPermissionsModel(req.body);
        /*UserPermissionModel.findOne({ roleId : req.body.roleId } ,function(errorFind, foundPermission){
            if(errorFind){
                res.send({state : false, response : errorFind});
                return;
            }
            foundPermission.permission = userPermissionsObj.permission;
            foundPermission.save(function(errorSave, savedPermission){
                if(errorSave){
                    res.send({state : false, response : errorSave});
                    return;
                }
                res.send({state : true, response : savedPermission});
            });
        });*/
        UserPermissionModel.update({ roleId : req.body.roleId }, {permission : userPermissionsObj.permission}, function(error, affectedRow){
            if(error){
                res.send({state : false, response : error});
                return;
            }
            res.send({state : true, response : affectedRow});
        }); 
    },
    listAll : function(req, res){
        UserPermissionModel.find({ firmCode : req.session.user.firmCode }, function(error, permissions){
            if(error){
                res.send({state : false, response : error});
                return;
            }
            res.send({state : true, response : permissions});
        });   
    },
    reset : function(req, res){
        UserPermissionModel.update({}, {permission : []} ,function(error, affectedRow){
            if(error){
                res.send({state : false, response : error});
                return;
            }
            if(affectedRow > 0){
                res.send({state : true, response : 'Tum Izinler Sifirlandi.'});   
            }else{
                res.send({state : true, response : 'Hata olustu. Izinler sifirlanamadi.'});   
            }
        });    
    },
    removeAll : function(req, res){
        UserPermissionModel.remove({} ,function(error){
            if(error){
                res.send({state : false, response : error});
                return;
            }
            res.send({state : true, response : 'Tum Izinler silindi.'});   
        });    
    },
    getPermissionForRole : function(req, res){
        console.log('roleid : ' + req.body.roleId);
        UserPermissionModel.findOne({ roleId : req.body.roleId }, function(errorPermission, foundedPermission){
            if(errorPermission){
                res.send({state : false, response : foundedPermission});
                return;
            } 
            res.send({state : true, response : foundedPermission});
        });      
    }
};