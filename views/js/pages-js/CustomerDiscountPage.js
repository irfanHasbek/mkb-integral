function clickHandlers(){
    removeFromTable("discountTable","/wsdiscount/remove",function(id){
    });
    
}
function formHandlers(){
    $("#frmDiscount").ajaxForm(function(resp){
          console.log(JSON.stringify(resp));
        if(resp.state==true){
            alertify.success("İşlem başarı ile gerçekleştirildi.");
            var count= $(".discountTable tbody tr").size();
            var tr=$("<tr id="+resp.response._id+"></>");
            var td1=$("<td class='text-center'>"+count+"</td>");
            var td2=$("<td>"+resp.response.customerName+"</td>");
            var td3=$("<td>"+resp.response.productGroupName+"</td>");
            var td5=$("<td><span>% </span>"+resp.response.percent+"</td>");
            var td6=$("<td>"+resp.response.owner+"</td>");
            var btnSil='<button class="btn btn-danger btn-sm sil"><i class="fa fa-trash-o"></i></button>';
            var td4=$("<td st id="+resp.response._id+">"+btnSil+"</td>");
            tr.append(td1);tr.append(td2);tr.append(td3);tr.append(td5);tr.append(td6);tr.append(td4);
            $(".discountTable tbody").last().append(tr);
            $("input[type='text']").val("");
            $("input[type='number']").val("");
        }else{
            alertify.error("İşlem başarısız.");
        }
    });
}

function otherScripts(){
    $('#slctCustomer').change(function(){
        $('#inpCustomerName').val($('#slctCustomer option:selected').text().trim());
    });
    $('#slctProductGroup').change(function(){
        $('#inpproductGroupName').val($('#slctProductGroup option:selected').text().trim());
    });
}