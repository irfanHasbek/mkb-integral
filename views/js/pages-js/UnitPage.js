function clickHandlers(){
    removeFromTable("units","/wsunit/remove", function(id){});
}
function formHandlers(){
    $("#frmUnit").ajaxForm(function(resp){
        if(resp.state==true){
            alertify.success("İşlem başarı ile gerçekleştirildi.");
            var count= $(".units tbody tr").size();
            var tr=$("<tr id="+resp.data._id+"></>");
            var td1=$("<td class='text-center'>"+count+".</td>");
            var td2=$("<td>"+resp.data.unit+"</td>");
            var td5=$("<td>"+resp.data.setBy+"</td>");
            var btnSil='<button class="btn btn-danger btn-sm sil"><i class="fa fa-trash-o"></i></button>';
            var td6=$("<td st id="+resp.data._id+">"+btnSil+"</td>");
            tr.append(td1);tr.append(td2);tr.append(td5);tr.append(td6);
            $(".units tbody").last().append(tr);
            $("input[type='text']").val("");
        }else{
            alertify.error("İşlem başarısız.");
        }
    });
}
function otherScripts(){
    
}