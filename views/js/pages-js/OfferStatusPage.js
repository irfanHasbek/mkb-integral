function otherScripts(){
   
}
function clickHandlers(){
    removeFromTable("offerStatuses","/wsofferstatus/remove",function(id){});
     $(".offerStatuses").on("click",".guncelle", function(){
        var id = $(this).closest('td').attr('id');
        if(id){
            $('#inpId').val(id);
            $('#inpId').removeAttr("disabled");
            $('#inpOfferStatus').val($(this).closest('tr').find('td').eq(1).text());
            $('#inpOfferStatusOrder').val($(this).closest('tr').find('td').eq(2).text());
            $('#frmOfferStatus').attr('action', "/wsofferstatus/update");
        }
    });
}
function formHandlers(){
      $("#frmOfferStatus").ajaxForm(function(resp){
            if(resp.state==true){
                alertify.success("İşlem başarı ile gerçekleştirildi.");
                location.reload();
            }else{
                alertify.error("İşlem başarısız.");
            }
        });
}