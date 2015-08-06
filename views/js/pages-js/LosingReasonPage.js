function otherScripts(){
   
}
function clickHandlers(){
    removeFromTable("losingReasons","/wslosingreason/remove",function(id){});
    $(".losingReasons").on("click",".guncelle", function(){
        var id = $(this).closest('td').attr('id');
        if(id){
            $('#inpId').val(id);
            $('#inpId').removeAttr("disabled");
            $('#inpLosingReason').val($(this).closest('tr').find('td').eq(1).text());
            $('#frmLosingReason').attr('action', "/wslosingreason/update");
        }
    });
}
function formHandlers(){
      $("#frmLosingReason").ajaxForm(function(resp){
           if($('#frmLosingReason').attr('action') == "/wslosingreason/addnew"){
                if(resp.state==true){
                    alertify.success("İşlem başarı ile gerçekleştirildi.");
                    var count= $(".losingReasons tbody tr").size();
                    var tr=$("<tr id="+resp.data._id+"></>");
                    var td1=$("<td class='text-center'>"+count+".</td>");
                    var td2=$("<td>"+resp.data.losingReason+"</td>");
                    var td3=$("<td>"+resp.data.setBy+"</td>");
                    var btnSil='<button class="btn btn-danger btn-sm sil"><i class="fa fa-trash-o"></i></button>';
                    var td4=$("<td st id="+resp.data._id+">"+btnSil+"</td>");
                    tr.append(td1);tr.append(td2);tr.append(td3);tr.append(td4);
                    $(".losingReasons tbody").last().append(tr);
                    $("input[type='text']").val("");
                }else{
                    alertify.error("İşlem başarısız.");
                }
            }else{
                if(resp.state==true){
                    alertify.success("İşlem başarı ile gerçekleştirildi.");
                    $("input[type='text']").val("");
                    $('#frmLosingReason').attr('action', "/wslosingreason/addnew");
                    $('#inpId').attr("disabled","disabled");
                    location.reload();
                }else{
                    alertify.error("İşlem başarısız.");
                }
            }
    });
}