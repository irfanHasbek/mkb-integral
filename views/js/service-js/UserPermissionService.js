var UserPermissionModel=require('../Model-js/UserPermissionModel');

function createUserPermissionsModel(userId, userPermissions){
    var userPermissionObj = {
        roleId : userId,
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
        userPermissionObj.permission.push('/wsfirm/update1');   
    }
    if(userPermissions.r73 == 'on'){
        userPermissionObj.permission.push('/wsfirm/update2');   
    }
    return userPermissionObj;
}

module.exports = {
    update : function(req, res){
        var userPermissionsObj = createUserPermissionsModel(req.body.roleId, req.body);
        res.send(userPermissionsObj);
    }
};