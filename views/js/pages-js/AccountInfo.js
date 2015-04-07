function clickHandlers(){
    
}


function formHandlers(){
     $('#formAccountB2b').ajaxForm(function(data){
         if(data.state==true){
            $('#slctCustomerId').val('');
            checkBoxUnSign('cbWebAccess');
            checkBoxUnSign('cbWebOrder');
            $('input').val('');
            alertify.success("İşleminiz başarı ile gerçekleştirilmiştir.");
         }else{
            alertify.error("Hata!! işlem başarısız");
         }
     });
}
function otherScripts(){
   jQuery.fn.filterByText = function(textbox, selectSingleMatch) {
        return this.each(function() {
            var select = this;
            var options = [];
            $(select).find('option').each(function() {
                options.push({value: $(this).val(), text: $(this).text()});
            });
            $(select).data('options', options);
            $(textbox).bind('change keyup', function() {
                var options = $(select).empty().data('options');
                var search = $(this).val().trim();
                var regex = new RegExp(search,"gi");
              
                $.each(options, function(i) {
                    var option = options[i];
                    if(option.text.match(regex) !== null) {
                        $(select).append(
                           $('<option>').text(option.text).val(option.value)
                        );
                    }
                });
                if (selectSingleMatch === true && $(select).children().length === 1) {
                    $(select).children().get(0).selected = true;
                }
            });            
        });
    };

    $(function() {
        $('.select').filterByText($('#textbox'), false);
		  $(".select option").click(function(){
			alert(1);
		  });
    });
    
    $('#slctCustomerId').change(function(){
         checkBoxUnSign('cbWebAccess');
         checkBoxUnSign('cbWebOrder');
         wsPost('/wscustomerdefinition/getcustomerdefinition', {_id : $(this).val()}, function(err, data){
             if(err){
                 alertify.error(err);
                 return;
             }
             var customer = data.response;
             $('#inpCustUsername').val(customer.userName);
             $('#inpCustPassword').val(customer.password);
             
             if(customer.webAccess){
                checkBoxSign('cbWebAccess');
             }
             if(customer.webOrder){
                checkBoxSign('cbWebOrder');
             }
         });
    });
}

function checkBoxSign(id){
    $('#' + id).prop('checked', true);
    $('#' + id).closest('div').prop('aria-checked', true);
    $('#' + id).closest('div').prop('class', 'icheckbox_minimal checked');     
}
function checkBoxUnSign(id){
    $('#' + id).prop('checked', false);
    $('#' + id).closest('div').prop('aria-checked', false);
    $('#' + id).closest('div').prop('class', 'icheckbox_minimal');     
}