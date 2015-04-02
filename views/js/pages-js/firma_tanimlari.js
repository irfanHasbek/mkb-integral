function clickHandlers(){
    $("#btnGetFirmInfo").on('click', function(){
        var firmName = $('#slFirms').val();
        if(firmName == 'Firma Seçiniz'){
            return;
        }
        
        wsPost('/wsfirm/getInfo',{ name : firmName },function(error, data){
            if(error){
                return;   
            }
            var response = data.response;
            console.log(response);
            $('#inpUpdate2Name').val(response.name);  
            $('#inpFirmEmail').val(response.email); 
            $('#inpFirmPass').val(response.password); 
            $('#imgFirmLogo').attr('src', response.logoUrl);
            $('#inpCompetentName').val(response.competentInformation.name);
            $('#inpCompetentTask').val(response.competentInformation.task);
            $('#inpCompetentGsm').val(response.competentInformation.gsm);   
            $('#inpCompetentEmail').val(response.competentInformation.email);

            $('#inpContactAddress').val(response.contactInformation.address);
            $('#inpContactCity').val(response.contactInformation.city);
            $('#inpContactState').val(response.contactInformation.state);
            $('#inpContactBusinessTel').val(response.contactInformation.businessTel);
            $('#inpContactFax').val(response.contactInformation.fax);
            $('#inpContactWeb').val(response.contactInformation.web);
        });
    });   
    
    $("#btnSubmitPicture").on('click',function(e){
        //console.log("onClickPicture");
        if(!$('#inpPictureUpload').val())
        {
            e.preventDefault();
            return;   
        }
        //$('#formSubmitAddPicture').submit();
        //$.blockUI();
    });
    
    $('#aRemovePic').on('click', function(){
        console.log('asdasd');
         $('#imgFirmLogo').attr('src', '');
         $('#inpFirmaLogo').val('');
    });
    
    $('#btnFirmPart1Save').on('click', function(){
        $('#formFirm').submit(); 
    });
}

function formHandlers(){
    $('#formSubmitAddPicture').ajaxForm(function(data) {
        var parsedData = JSON.parse(data);
        console.log(data);
        $('#inpFirmaLogo').val(parsedData.url);
        addMediaToTable('#divPicture', parsedData);
        //$.unblockUI();
    });  
    
    $('#formFirm').ajaxForm(function(data) {
        var parsedData = JSON.parse(data);
        console.log(parsedData);
    });  
    $('#formFirm2').ajaxForm(function(data) {
        var parsedData = JSON.parse(data);
        console.log(parsedData);
    });  
}
function otherScripts(){
    
}
function addMediaToTable(table, media){
    $(table).html('');
    console.log(media);
    var mediaDiv = $('<div class=""><img id="imgFirmLogo" src="' + media.url + '" class="img-responsive img-thumbnail" alt="" style="height:200px;"><a id="aRemovePic" style="border-radius:0px;position:absolute;bottom:5%;right:10%;" class="btn btn-danger" href="Javascript:void(0)"><span class="glyphicon glyphicon-trash"></span></a></div>');
    $(table).append(mediaDiv);     
}