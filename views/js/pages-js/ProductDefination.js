function clickHandlers(){
    
}

function formHandlers(){
    $('#formPicture').ajaxForm(function(response){
        var data = JSON.parse(response);
        $('#imgProduct').attr('src', '/' + data.url);
        $('#inpPictureUrl').val(data.url);
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