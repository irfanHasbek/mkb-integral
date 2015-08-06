var discount = {};
function clickHandlers(){
    removeFromTable("discountTable","/wsdiscount/remove",function(id){
    });
    
    $('.discountTable').on('click', '.guncelle', function(){
        var id = $(this).closest('td').attr('id');
        var custName = $(this).closest('tr').find('td').eq(1).text().trim();
        var productGroup = $(this).closest('tr').find('td').eq(2).text().trim();
        var percent = $(this).closest('tr').find('td').eq(3).text();
        var order = $(this).closest('tr').find('td').eq(4).text();
        
        $('#inpDiscountId').val(id);
        
        $('#slctCustomer option:contains(' + custName + ')').attr('selected', 'selected');
        $('#slctProductGroup option:contains(' + productGroup + ')').attr('selected', 'selected')
        
        $('#inpCustomerName').val($('#slctCustomer option:selected').text().trim());
        $('#inpproductGroupName').val($('#slctProductGroup option:selected').text().trim());
        
        discount = {
            _id : id,
            percent : percent,
            order : order
        };  
        $("#frmDiscount").attr('action', '/wsdiscount/update');
        $("#inpOrder").val(order);
        $("#inpDiscount").val(percent);
    });
}
function formHandlers(){
    $("#frmDiscount").ajaxForm(function(resp){
        if(resp.state==true){
            alertify.success("İşlem başarı ile gerçekleştirildi.");
            location.reload();
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