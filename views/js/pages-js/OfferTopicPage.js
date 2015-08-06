function otherScripts(){
   
}
function clickHandlers(){
    removeFromTable("offerTopics","/wsoffertopic/remove",function(id){});
    $(".offerTopics").on("click",".guncelle", function(){
        var id = $(this).closest('td').attr('id');
        if(id){
            $('#inpId').val(id);
            $('#inpId').removeAttr("disabled");
            $('#inpOfferTopic').val($(this).closest('tr').find('td').eq(1).text());
            $('#frmOfferTopic').attr('action', "/wsoffertopic/update");
        }
    });
}
function formHandlers(){
       $("#frmOfferTopic").ajaxForm(function(resp){
           if($('#frmOfferTopic').attr('action') == "/wsoffertopic/addnew"){
               if(resp.state==true){
                    alertify.success("İşlem başarı ile gerçekleştirildi.");
                    var count= $(".offerTopics tbody tr").size();
                    var tr=$("<tr id="+resp.data._id+"></>");
                    var td1=$("<td class='text-center'>"+count+".</td>");
                    var td2=$("<td>"+resp.data.offerTopic+"</td>");
                    var td3=$("<td>"+resp.data.setBy+"</td>");
                    var btnSil='<button class="btn btn-danger btn-sm sil"><i class="fa fa-trash-o"></i></button>';
                    var td4=$("<td st id="+resp.data._id+">"+btnSil+"</td>");
                    tr.append(td1);tr.append(td2);tr.append(td3);tr.append(td4);
                    $(".offerTopics tbody").last().append(tr);
                    $("input[type='text']").val("");
                }else{
                    alertify.error("İşlem başarısız.");
                }
            }else{
               if(resp.state==true){
                    alertify.success("İşlem başarı ile gerçekleştirildi.");
                    $("input[type='text']").val("");
                    $('#frmOfferTopic').attr('action', "/wsoffertopic/addnew");
                    $('#inpId').attr("disabled","disabled");
                    location.reload();
                }else{
                    alertify.error("İşlem başarısız.");
                }                  
            }
    });
}