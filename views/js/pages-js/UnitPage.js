function clickHandlers(){
    removeFromTable("units","/wsunit/remove", function(id){});
    
    $(".units").on("click",".guncelle", function(){
        var id = $(this).closest('td').attr('id');
        if(id){
            $('#inpId').val(id);
            $('#inpId').removeAttr("disabled");
            $('#inpUnit').val($(this).closest('tr').find('td').eq(1).text());
            $('#frmUnit').attr('action', "/wsunit/update");
        }
    });
}
function formHandlers(){
    $("#frmUnit").ajaxForm(function(resp){
            if(resp.state==true){
                alertify.success("İşlem başarı ile gerçekleştirildi.");
                location.reload();
            }else{
                alertify.error("İşlem başarısız.");
            }
    });
}
function otherScripts(){
    
}