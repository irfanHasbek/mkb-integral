function clickHandlers(){
    
}
function formHandlers(){
    $('#formPermissions').ajaxForm(function(data){
         console.log(data);
    });
}
function otherScripts(){
    $('#slctRole').change(function(){
        var per = "/rol_tanimi";
        var id = per.slice(1);
        checkToCheckBox(id);
        
    });
}
function checkToCheckBox(id){
    $('#' + id).closest('div').prop('aria-checked', true);
    $('#' + id).closest('div').prop('class', 'icheckbox_minimal checked');
}