function otherScripts(){
   
}
function clickHandlers(){
    removeFromTable("credits","/wscredit/remove", function(id){});
}
function formHandlers(){
    $("#frmCredit").ajaxForm(function(resp){
        console.log(resp);
        if(resp.state==true){
            alertify.success("İşlem başarı ile gerçekleştirildi.");
            var count= $(".credits tbody tr").size();
            var tr=$("<tr id="+resp.data._id+"></>");
            var td1=$("<td class='text-center'>"+count+".</td>");
            var td2=$("<td>"+resp.data.credit+" gün</td>");
            var td5=$("<td>%"+resp.data.percent+"</td>");
            var td3=$("<td>"+resp.data.setBy+"</td>");
            var btnSil='<button class="btn btn-danger sil"><i class="fa fa-trash-o"></i></button>';
            var td4=$("<td class='text-center' id="+resp.data._id+">"+btnSil+"</td>");
            tr.append(td1);tr.append(td2);tr.append(td5);tr.append(td3);tr.append(td4);
            $(".credits").append(tr);
            $("input[type='text']").val("");
            $("input[type='number']").val("");
        }else{
            alertify.error("İşlem başarısız.");
        }
    });
}