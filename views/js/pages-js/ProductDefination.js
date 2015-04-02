function clickHandlers(){
    $('#btnSavePicture').on('click', function(){
        $.blockUI({ css: { backgroundColor: '#f00', color: '#fff'}, message: '<h1>Yükleniyor...</h1>' }); 
    });
}

function formHandlers(){
    $('#formPicture').ajaxForm(function(response){
        var data = JSON.parse(response);
        $('#imgProduct').attr('src', '/' + data.url);
        $('#inpPictureUrl').val(data.url);
        $.unblockUI();
    });
    
    $('#formProductAdd').ajaxForm(function(data){
        //console.log('basarili');
        if($('#formProductAdd').attr('action') == '/wsproduct/add'){
            clearUI();
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