function clickHandlers(){
    removeFromTable("firmalar","/wschildcustomer/remove",function(id){
    });
}
function formHandlers(){
    $("#frmFirmaEkle").ajaxForm(function(resp){
        if(resp.state==true){
            alertify.success("İşlem başarı ile gerçekleştirildi.");
            var count= $(".firmalar tbody tr").size();
            var tr=$("<tr id="+resp.response._id+"></>");
            var td1=$("<td class='text-center'>"+count+".</td>");
            var td2=$("<td>"+resp.response.firmaAdi+"</td>");
            var td3=$("<td>"+resp.response.yetkiliAdi+"</td>");
            var td4=$("<td>"+resp.response.tel+"</td>");
            var td5=$("<td>"+resp.response.email+"</td>");
            var td6=$("<td>"+resp.response.vergiDairesi+"</td>");
            var td7=$("<td>"+resp.response.vergiNo+"</td>");
            var td8=$("<td>"+resp.response.firmaAdresi.substring(0,50)+"..</td>");
            var td9=$("<td>"+resp.response.sevkiyat.substring(0,50)+"..</td>");
            var td10=$("<td>"+resp.response.not.substring(0,50)+"..</td>");
            var btnSil='<button class="btn btn-danger btn-sm sil"><i class="fa fa-trash-o"></i></button>';
            var btnEdit='<button class="btn btn-info btn-sm edit"><i class="fa fa-pencil"></i></button>';
            var td11=$("<td st id="+resp.response._id+"></td>");
            td11.append(btnSil);td11.append(btnEdit);
            tr.append(td1);tr.append(td2);tr.append(td3);tr.append(td4);tr.append(td5);tr.append(td6);
            tr.append(td7);tr.append(td8);tr.append(td9);tr.append(td10);tr.append(td11);
            $(".firmalar tbody").last().append(tr);
            $("input[type='text']").val("");
            $("input[type='number']").val("");
            $("textarea").val();
        }else{
            alertify.error("İşlem başarısız.");
        }
    });
}
function otherScripts(){
}
