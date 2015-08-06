function otherScripts(){
   
}
function clickHandlers(){
    removeFromTable("customers","/wscustomergroup/remove", function(id){});
    
    $(".customers").on("click",".guncelle", function(){
        var id = $(this).closest('td').attr('id');
        if(id){
            $('#inpId').val(id);
            $('#inpId').removeAttr("disabled");
            $('#inpGroupName').val($(this).closest('tr').find('td').eq(1).text());
            $('#frmCustomerGroup').attr('action', "/wscustomergroup/update");
        }
    });
}
function formHandlers(){
    if($('#frmCustomerGroup').attr('action',"/wscustomergroup/addnew")){
        $("#frmCustomerGroup").ajaxForm(function(resp){
            if(resp.state==true){
                alertify.success("İşlem başarı ile gerçekleştirildi.");
                var count= $(".customers tbody tr").size();
                var tr=$("<tr id="+resp.data._id+"></>");
                var td1=$("<td class='text-center'>"+count+".</td>");
                var td2=$("<td>"+resp.data.groupName+"</td>");
                var td5=$("<td>"+resp.data.setBy+"</td>");
                var btnSil='<button class="btn btn-danger btn-sm sil"><i class="fa fa-trash-o"></i></button>';
                var td6=$("<td st id="+resp.data._id+">"+btnSil+"</td>");
                tr.append(td1);tr.append(td2);tr.append(td5);tr.append(td6);
                $(".customers tbody").last().append(tr);
                $("input[type='text']").val("");
                $("input[type='number']").val("");
                $("#slctCredit").find('option:contains("Vade Seçiniz")').attr('selected', true);
                location.reload();
            }else{
                alertify.error("İşlem başarısız.");
            }
        });
    }else{
        if(resp.state==true){
            alertify.success("İşlem başarı ile gerçekleştirildi.");
            $("input[type='text']").val("");
            $('#frmUnit').attr('action', "/wscustomergroup/addnew");
            $('#inpId').attr("disabled","disabled");
            location.reload();
        }else{
            alertify.error("İşlem başarısız.");
        }   
    }
    
}