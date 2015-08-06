function clickHandlers(){
    
}
function formHandlers(){
    $("#frmCustomerRegister").ajaxForm(function(response){
        if(!response.state){
            alertify.error("hata!! lütfen tekrar deneyiniz.");
            return;
        }
        $("input[type='text']").val("");
        $("textarea[type='text']").text("");
        alertify.success("Başarıyla eklendi.Bilgileriniz Firmamıza ulaştı.");
    });
}
function otherScripts(){
    
}
$(document).ready(function(){
    clickHandlers();
    formHandlers();
    otherScripts();
}); 