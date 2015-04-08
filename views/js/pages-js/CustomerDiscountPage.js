function clickHandlers(){
    
}

function formHandlers(){
    $('#frmDiscount').ajaxForm(function(data){
        if(!data.state){
            console.error(data.response);
            return;
        }
        console.log(data.response);
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