function clickHandlers(){
    $('#btnSavePicture').on('click', function(e){
        if($("#inpPictureUpload").val()==""){
            e.preventDefault();
        }else{
        $.blockUI({ css: { backgroundColor: '#2c94c0', color: '#fff'}, message: '<h1>Yükleniyor...</h1>' }); 
        }
    });
}

function formHandlers(){
    $('#formPicture').ajaxForm(function(response){
        var data =JSON.parse(response);
        if(data.code==200){
            alertify.success("İşlem başarı ile gerçekleştirildi.");
            var data = JSON.parse(response);
            $('#imgProduct').attr('src', '/' + data.url);
            $('#inpPictureUrl').val(data.url);
            $.unblockUI();
            
        }else{
            alertify.error("İşlem başarısız.");
        }
    });

    $('#formProductAdd').ajaxForm(function(data){
        console.log(data);
        if(data.state==true){
            alertify.success("İşlem başarı ile gerçekleştirildi.");
            if($('#formProductAdd').attr('action') == '/wsproduct/add'){
                clearUI();
            }
        }else{
            alertify.error("İşlem başarısız.");
        }
    });
}

function otherScripts(){
    
}

function clearUI(){
    $('input[type="text"]').val('');
    $('#inpDescription').text('');
    $('#slGroup').find('option:contains("Seçiniz")').attr('selected', true);
    $('#slTime').find('option:contains("Seçiniz")').attr('selected', true);
    $('#imgProduct').attr('src', '/uploads/empty.png');   
}