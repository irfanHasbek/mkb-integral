function clickHandlers(){
    removeFromTable("firmalar","/wschildcustomer/remove",function(id){
    });
    $(".firmalar").on("click",".edit",function(){
        $("#frmFirmaEkle").attr("action","/wschildcustomer/update");
        var data={_id:$(this).closest("tr").attr("id")};
        wsPost("/wschildcustomer/getchildcustomer",data,function(err,resp){
            if(err){
                console.error(err);
                return;
            }
            var inpId=$("<input name='_id' value="+resp.response._id+" style='display:none;'>");
            $(".id").append(inpId);
            $("input[name='firmaAdi']").val(resp.response.firmaAdi);
            $("input[name='yetkiliAdi']").val(resp.response.yetkiliAdi);
            $("input[name='tel']").val(resp.response.tel);
            $("input[name='email']").val(resp.response.email);
            $("input[name='vergiDairesi']").val(resp.response.vergiDairesi);
            $("input[name='vergiNo']").val(resp.response.vergiNo);
            $("textarea[name='firmaAdresi']").val(resp.response.firmaAdresi);
            $("textarea[name='sevkiyat']").val(resp.response.sevkiyat);
            $("textarea[name='not']").val(resp.response.not);
        });
    });
}
function formHandlers(){
    $("#frmFirmaEkle").ajaxForm(function(resp){
        var action=$("#frmFirmaEkle").attr("action");
       if(action=="/wschildcustomer/addnew"){
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
            var td8=$("<td>"+resp.response.firmaAdresi.substring(0,50)+"</td>");
            var td9=$("<td>"+resp.response.sevkiyat.substring(0,50)+"</td>");
            var td10=$("<td>"+resp.response.not.substring(0,50)+"</td>");
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
       }else{
            $("#frmFirmaEkle").attr("action","/wschildcustomer/addnew");
            var tr=$(".firmalar tbody").find("tr[id="+$("input[name='_id']").val()+"]");
           tr.find("td").eq(1).text($("input[name='firmaAdi']").val());
           tr.find("td").eq(2).text($("input[name='yetkiliAdi']").val());
           tr.find("td").eq(3).text($("input[name='tel']").val());
           tr.find("td").eq(4).text($("input[name='email']").val());
           tr.find("td").eq(5).text($("input[name='vergiDairesi']").val());
           tr.find("td").eq(6).text($("input[name='vergiNo']").val());
           tr.find("td").eq(7).text($("textarea[name='firmaAdresi']").val());
           tr.find("td").eq(8).text($("textarea[name='sevkiyat']").val());
           tr.find("td").eq(9).text($("textarea[name='not']").val());
           $("input[type='text']").val("");
           $("input[type='number']").val("");
           $("textarea").val();
       }
    });
}
function otherScripts(){
}
