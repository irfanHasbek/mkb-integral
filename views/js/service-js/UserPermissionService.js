var UserPermissionModel=require('../Model-js/UserPermissionModel');
var ActDefinitionModel=require('../Model-js/ActDefinitionModel');

function createUserPermissionsModel(userPermissions){
    var userPermissionObj = {
        permission : []
    }
    //Il ilce tanimlamalari
    if(userPermissions.r11 == 'on'){
        userPermissionObj.permission.push('/il_ilce_tanimlari');   
    }
    if(userPermissions.r12 == 'on'){
        userPermissionObj.permission.push('/wscity/addnew');   
    }
    if(userPermissions.r13 == 'on'){
        userPermissionObj.permission.push('/wscity/addtown');   
    }
    if(userPermissions.r14 == 'on'){
        userPermissionObj.permission.push('/wscity/remove');   
    }
    
    //firma tanimlari
    if(userPermissions.r21 == 'on'){
        userPermissionObj.permission.push('/firma_tanimlari');   
    }
    if(userPermissions.r22 == 'on'){
        userPermissionObj.permission.push('/wsfirm/update1');   
    }
    if(userPermissions.r23 == 'on'){
        userPermissionObj.permission.push('/wsfirm/update2');   
    }
    
    //Musteri Grup tanimi
    if(userPermissions.r31 == 'on'){
        userPermissionObj.permission.push('/musteri_grup_tanimlari');   
    }
    if(userPermissions.r32 == 'on'){
        userPermissionObj.permission.push('/wscustomergroup/addnew');   
    }
    if(userPermissions.r33 == 'on'){
        userPermissionObj.permission.push('/wscustomergroup/remove');   
    }
    
    //Vade tanimlari
    if(userPermissions.r41 == 'on'){
        userPermissionObj.permission.push('/vade_tanimlari');   
    }
    if(userPermissions.r42 == 'on'){
        userPermissionObj.permission.push('/wscredit/addnew');   
    }
    if(userPermissions.r43 == 'on'){
        userPermissionObj.permission.push('/wscredit/remove');   
    }
    
    //Teklif Konu tanimlari
    if(userPermissions.r51 == 'on'){
        userPermissionObj.permission.push('/teklif_konu_tanimlari');   
    }
    if(userPermissions.r52 == 'on'){
        userPermissionObj.permission.push('/wsoffertopic/addnew');   
    }
    if(userPermissions.r53 == 'on'){
        userPermissionObj.permission.push('/wsoffertopic/remove');   
    }
    
    //Teklif Durum tanimlari
    if(userPermissions.r61 == 'on'){
        userPermissionObj.permission.push('/teklif_durum_tanimlari');   
    }
    if(userPermissions.r62 == 'on'){
        userPermissionObj.permission.push('/wsofferstatus/addnew');   
    }
    if(userPermissions.r63 == 'on'){
        userPermissionObj.permission.push('/wsofferstatus/remove');   
    }
    
    //Kaybetme nedenleri tanimlari
    if(userPermissions.r71 == 'on'){
        userPermissionObj.permission.push('/kaybetme_nedenleri');   
    }
    if(userPermissions.r72 == 'on'){
        userPermissionObj.permission.push('/wslosingreason/addnew');   
    }
    if(userPermissions.r73 == 'on'){
        userPermissionObj.permission.push('/wslosingreason/remove');   
    }
    
    //Rol tanimlari
    if(userPermissions.r81 == 'on'){
        userPermissionObj.permission.push('/rol_tanimi');   
    }
    if(userPermissions.r82 == 'on'){
        userPermissionObj.permission.push('/wsactdefinition/addnew');   
    }
    if(userPermissions.r83 == 'on'){
        userPermissionObj.permission.push('/wsactdefinition/remove');   
    }
    
    //Gorev tanimlari
    if(userPermissions.r91 == 'on'){
        userPermissionObj.permission.push('/gorev_tanimi');   
    }
    if(userPermissions.r92 == 'on'){
        userPermissionObj.permission.push('/wstaskdefinition/addnew');   
    }
    if(userPermissions.r93 == 'on'){
        userPermissionObj.permission.push('/wstaskdefinition/remove');   
    }
    
    //Kullanici tanimlari
    if(userPermissions.r101 == 'on'){
        userPermissionObj.permission.push('/kullanici_tanimi');   
    }
    if(userPermissions.r102 == 'on'){
        userPermissionObj.permission.push('/wsuser/addnew');   
    }
    if(userPermissions.r103 == 'on'){
        userPermissionObj.permission.push('/wsuser/remove');   
    }
    if(userPermissions.r104 == 'on'){
        userPermissionObj.permission.push('/wsuser/getwithid');   
    }
    
    //Kullanici izinleri olusturna
    if(userPermissions.r111 == 'on'){
        userPermissionObj.permission.push('/kullanici_izinleri');   
    }
    if(userPermissions.r112 == 'on'){
        userPermissionObj.permission.push('/wspermission/update');   
    }
    
    //Urun grup tanimlari
    if(userPermissions.r121 == 'on'){
        userPermissionObj.permission.push('/urun_grup_tanimi');   
    }
    if(userPermissions.r122 == 'on'){
        userPermissionObj.permission.push('/wsproductgroupdefinition/addnew');   
    }
    if(userPermissions.r123 == 'on'){
        userPermissionObj.permission.push('/wsproductgroupdefinition/remove');   
    }
    
    //Montaj tanimi
    if(userPermissions.r131 == 'on'){
        userPermissionObj.permission.push('/montaj_sekli');   
    }
    if(userPermissions.r132 == 'on'){
        userPermissionObj.permission.push('/wsmontagetype/addnew');   
    }
    if(userPermissions.r133 == 'on'){
        userPermissionObj.permission.push('/wsmontagetype/remove');   
    }
    
    //Kaplama Sekli tanimi
    if(userPermissions.r141 == 'on'){
        userPermissionObj.permission.push('/kaplama_sekli');   
    }
    if(userPermissions.r142 == 'on'){
        userPermissionObj.permission.push('/wscovertype/addnew');   
    }
    if(userPermissions.r143 == 'on'){
        userPermissionObj.permission.push('/wscovertype/remove');   
    }
    
    //Ayar mekanizmasi tanimi
    if(userPermissions.r151 == 'on'){
        userPermissionObj.permission.push('/ayar_mekanizmasi');   
    }
    if(userPermissions.r152 == 'on'){
        userPermissionObj.permission.push('/wssetmechanism/addnew');   
    }
    if(userPermissions.r153 == 'on'){
        userPermissionObj.permission.push('/wssetmechanism/remove');   
    }
    
    //Aksesuar tanimi
    if(userPermissions.r161 == 'on'){
        userPermissionObj.permission.push('/aksesuar');   
    }
    if(userPermissions.r162 == 'on'){
        userPermissionObj.permission.push('/wsaccessory/addnew');   
    }
    if(userPermissions.r163 == 'on'){
        userPermissionObj.permission.push('/wsaccessory/remove');   
    }
    
    //Kasa tipi tanimi
    if(userPermissions.r171 == 'on'){
        userPermissionObj.permission.push('/kasa_tipi');   
    }
    if(userPermissions.r172 == 'on'){
        userPermissionObj.permission.push('/wsbodytype/addnew');   
    }
    if(userPermissions.r173 == 'on'){
        userPermissionObj.permission.push('/wsbodytype/remove');   
    }
    
    //Urun tanimi
    if(userPermissions.r181 == 'on'){
        userPermissionObj.permission.push('/urun_tanimlari');   
    }
    if(userPermissions.r182 == 'on'){
        userPermissionObj.permission.push('/wsproduct/addnew');   
    }
    
    //Urun fiyat tanimi
    if(userPermissions.r191 == 'on'){
        userPermissionObj.permission.push('/urun_fiyat_tanimi');   
    }
    if(userPermissions.r192 == 'on'){
        userPermissionObj.permission.push('/wsproductprice/add');   
    }
    if(userPermissions.r193 == 'on'){
        userPermissionObj.permission.push('/wsproductprice/remove');   
    }
    
    //Urun listeleme
    if(userPermissions.r201 == 'on'){
        userPermissionObj.permission.push('/urun_listeleme');   
    }
    if(userPermissions.r202 == 'on'){
        userPermissionObj.permission.push('/wsproduct/remove');   
    }
    
    //Musteri yonetimi
    if(userPermissions.r211 == 'on'){
        userPermissionObj.permission.push('/musteri_tanimi?id=0');   
    }
    if(userPermissions.r212 == 'on'){
        userPermissionObj.permission.push('/wscustomerdefinition/addnew');   
    }
    if(userPermissions.r213 == 'on'){
        userPermissionObj.permission.push('/wscustomerdefinition/remove');   
    }
    if(userPermissions.r214 == 'on'){
        userPermissionObj.permission.push('/wscustomerdefinition/update');   
    }
    
    //Musteri listeleme
    if(userPermissions.r221 == 'on'){
        userPermissionObj.permission.push('/musteri_listesi');   
    }
    if(userPermissions.r222 == 'on'){
        userPermissionObj.permission.push('/wscustomerdefinition/addnew');   
    }
    if(userPermissions.r223 == 'on'){
        userPermissionObj.permission.push('/wscustomerdefinition/remove');   
    }
    
    //Musteri iskonto
    if(userPermissions.r231 == 'on'){
        userPermissionObj.permission.push('/musteri_iskonto');   
    }
    if(userPermissions.r232 == 'on'){
        userPermissionObj.permission.push('/wsdiscount/addnew');   
    }
    if(userPermissions.r233 == 'on'){
        userPermissionObj.permission.push('/wsdiscount/remove');   
    }
    
    //Hesap bilgileri
    if(userPermissions.r241 == 'on'){
        userPermissionObj.permission.push('/hesap_bilgileri');   
    }
    if(userPermissions.r242 == 'on'){
        userPermissionObj.permission.push('/wscustomerdefinition/getcustomerdefinition');   
    }
    if(userPermissions.r243 == 'on'){
        userPermissionObj.permission.push('/wscustomerdefinition/updateb2binformation');   
    }
    
    //Tekif olusturma
    if(userPermissions.r251 == 'on'){
        userPermissionObj.permission.push('/teklif_olusturma?id=0');   
    }
    if(userPermissions.r252 == 'on'){
        userPermissionObj.permission.push('/wsoffer/addnew');   
    }
    
    //Acik teklifler
    if(userPermissions.r261 == 'on'){
        userPermissionObj.permission.push('/acik_teklifler');   
    }
    if(userPermissions.r262 == 'on'){
        userPermissionObj.permission.push('/wsoffer/updateoffercase');   
    }
    
    //Kapali Kazanilmis
    if(userPermissions.r271 == 'on'){
        userPermissionObj.permission.push('/kazanilmis');   
    }
    if(userPermissions.r272 == 'on'){
        userPermissionObj.permission.push('/wsoffer/teklif_olusturma');   
    }
    if(userPermissions.r273 == 'on'){
        userPermissionObj.permission.push('/wsoffer/updateoffercase');   
    }
    
    //Kapali Kaybedilmis
    if(userPermissions.r281 == 'on'){
        userPermissionObj.permission.push('/kaybedilmis');   
    }
    if(userPermissions.r282 == 'on'){
        userPermissionObj.permission.push('/wsoffer/teklif_olusturma');   
    }
    if(userPermissions.r283 == 'on'){
        userPermissionObj.permission.push('/wsoffer/updateoffercase');   
    }
    
    //Is emri onay bekleyen
    if(userPermissions.r291 == 'on'){
        userPermissionObj.permission.push('/is_emri/onay_bekleyen');   
    }
    if(userPermissions.r292 == 'on'){
        userPermissionObj.permission.push('/wsoffer/updatejobstatus');   
    }
    if(userPermissions.r293 == 'on'){
        userPermissionObj.permission.push('/wsoffer/updatedates');   
    }
    
    //Is emri devam eden
    if(userPermissions.r301 == 'on'){
        userPermissionObj.permission.push('/is_emri/devam_eden');   
    }
    if(userPermissions.r302 == 'on'){
        userPermissionObj.permission.push('/wsoffer/updatejobstatus');   
    }
    if(userPermissions.r303 == 'on'){
        userPermissionObj.permission.push('/wsoffer/updatedates');   
    }
    
    //Is emri tamamlanmi9
    if(userPermissions.r311 == 'on'){
        userPermissionObj.permission.push('/is_emri/tamamlanmis');   
    }
    if(userPermissions.r312 == 'on'){
        userPermissionObj.permission.push('/teklif_olusturma');   
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