function clickHandlers(){
    
}
function formHandlers(){
    $('#formPermissions').ajaxForm(function(data){
         if(!data.state){
             alertify.error('Islem gerceklestirilemedi.');
         }else{
             alertify.success('Islem basariyla gerceklestirildi.');
         }
    });
}
function otherScripts(){
    $('#slctRole').change(function(){
        $('input[type=checkbox]').prop('checked', false);
        $('input[type=checkbox]').prop('aria-checked', false);
        $('input[type=checkbox]').closest('div').prop('class', 'icheckbox_minimal');
        wsPost('/wspermission/getpermissionrole', {roleId : $('#slctRole').val()}, function(error, data){
            if(error){
                alertify.error('Islem gerceklestirilemedi.');   
                return;
            }
            var resp = data.response;
            for(var i = 0; i < resp.permission.length; i++){
                checkToCheckBox(resp.permission[i].slice(1));
            }
            alertify.success("Izinler listelendi.");
        });
    });
}
function checkToCheckBox(id){
    if(id.indexOf('/') > 0){
        var idList = id.split('/');
        $('#' + idList[0]).find('.' + idList[1]).prop('checked', true);
        $('#' + idList[0]).find('.' + idList[1]).prop('aria-checked', true);
        $('#' + idList[0]).find('.' + idList[1]).closest('div').prop('class', 'icheckbox_minimal checked'); 
    }else if(id.indexOf('?') > 0){
        var idList = id.split('?');
        $('.' + idList[0]).prop('checked', true);
        $('.' + idList[0]).closest('div').prop('aria-checked', true);
        $('.' + idList[0]).closest('div').prop('class', 'icheckbox_minimal checked');  
    }
    else{
        $('.' + id).prop('checked', true);
        $('.' + id).closest('div').prop('aria-checked', true);
        $('.' + id).closest('div').prop('class', 'icheckbox_minimal checked');   
    }
}