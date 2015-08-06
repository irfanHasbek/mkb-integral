function otherScripts(){
   
}
function clickHandlers(){
    removeFromTable("credits","/wscredit/remove", function(id){});
    $(".credits").on("click",".edit",function(){
            var id = $(this).closest('tr').attr('id');
        if(id){
            $('#inpId').val(id);
            $('#inpId').removeAttr("disabled");
            var day=$(this).closest('tr').find('td').eq(1).text().split(" ");
            var percent=$(this).closest('tr').find('td').eq(2).text().split("%");
            console.log(percent[1]);
            $('#inpDay').val(day[0]);
            $('#inpCredit').val(percent[1]);
            $('#frmCredit').attr('action', "/wscredit/update");
          }
    });
}
function formHandlers(){
    $("#frmCredit").ajaxForm(function(resp){
        if(resp.state==true){
            alertify.success("İşlem başarı ile gerçekleştirildi.");
            location.reload();
        }else{
            alertify.error("İşlem başarısız.");
        }
    });
}