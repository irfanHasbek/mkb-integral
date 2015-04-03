function otherScripts(){
   
}
function clickHandlers(){
    removeFromTable("offerStatuses","/wsofferstatus/remove",function(id){});
}
function formHandlers(){
      $("#frmOfferStatus").ajaxForm(function(resp){
          if(resp.state==true){
            alertify.success("İşlem başarı ile gerçekleştirildi.");
            var count= $(".offerStatuses tbody tr").size();
            var tr=$("<tr id="+resp.data._id+"></>");
            var td1=$("<td class='text-center'>"+count+".</td>");
            var td2=$("<td>"+resp.data.offerStatus+"</td>");
            var td5=$("<td class='text-center'>"+resp.data.order+"</td>");
            var td3=$("<td>"+resp.data.setBy+"</td>");
            var btnSil='<button class="btn btn-danger btn-sm sil"><i class="fa fa-trash-o"></i></button>';
            var td4=$("<td st id="+resp.data._id+">"+btnSil+"</td>");
            tr.append(td1);tr.append(td2);tr.append(td5);tr.append(td3);tr.append(td4);
            $(".offerStatuses tbody").last().append(tr);
            $("input[type='text']").val("");
        }else{
            alertify.error("İşlem başarısız.");
        }
    });
}