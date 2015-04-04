var isUpdate = false;
var requiredField = true;
function clickHandlers(){
    $('#btnSavePicture').on('click',function(e){
        if($("#inpPictureUpload").val()==""){
            e.preventDefault();
        }else{
        $.blockUI({ css: { backgroundColor: '#f00', color: '#fff'}, message: '<h1>Yükleniyor...</h1>' });
        }
    });
    $('#btnSave').on('click', function(){
        var userPass = $('#userPass').val();
        var userRePass = $('#userRePass').val();
        
        checkRequiredField();
        if(!requiredField){
            alert('Gerekli alanlar doldurulmali');
            return;   
        }
        if(!checkPassword(userPass, userRePass)){
            alert('parola eslesmeli');
            return;
        }
        if(!checkRoleAndTask()){
            alert('Gorev veya Role seciniz');
            return;
        }
        
        if(isUpdate){
            wsPost('/wsuser/update', createUserObject(), function(error, response){
                if(error){
                    console.error(error);   
                    return;
                }
                isUpdate = false;
                updateTableRow();
                clearUI();
            });
        }else{
            //console.log('user : ' + JSON.stringify(createUserObject()));
            wsPost('/wsuser/addnew', createUserObject(), function(error, response){
                if(error){
                    console.log('error var');
                    return;
                }
                //console.log('response : ' + JSON.stringify(response));
                addTable(response.data);
                clearUI();
            });   
        }
    });
    
    $('#userTable').on('click','.edit', function(){
        var tr = $(this).closest('tr');
        var id = tr.attr('id');
        fillUI(id);
        isUpdate = true;
    });
    
    $('#userTable').on('click','.remove', function(){
        $.blockUI({ message: "" });
        var tr = $(this).closest('tr');
        var id = tr.attr('id');
        alertify.confirm("Silmek istediğinizden emin misiniz?",
            function(){
                removeUser(id, tr);
                orderTable("#userTable");
                alertify.success('Başarı ile silindi.');
                $.unblockUI();
            },
            function() {
               alertify.error('İşlem iptal edildi.');
               $.unblockUI();
        });  
    });
}
function removeUser(id, tr){
    wsPost('/wsuser/remove', {_id : id}, function(error, response){
        if(error){
            console.log('Hata : kullanici silinemedi.');
            return;
        }
        tr.remove();
        console.log('Kullanici basariyla silindi.');
        $.unblockUI();
    });   
}
function formHandlers(){
    $('#formPicture').ajaxForm(function(data){
         if(data.state==true){
            alertify.success("İşlem başarı ile gerçekleştirildi.");
            $('#userPicture').attr('src', JSON.parse(data).url);
            $('#pictureUrl').val(JSON.parse(data).url);
            console.log('url : ' + JSON.parse(data).url);
            $.unblockUI();
        }else{
            alertify.error("İşlem başarısız.");
        }
    }); 
}
function otherScripts(){
    
}
function checkPassword(pass, rePass){
    if(pass === rePass){
        return true;
    }
    return false;
}

function checkRoleAndTask(){
    var role = $('#inpRole').val();
    var task = $('#inpTask').val();
    if(role == 'Rol Seçiniz' || task == 'Görev Seçiniz'){
        return false;   
    }
    return true;
}

function checkRequiredField(){
    $('.req').each(function(index, item){
        //console.log(index + ' : ' + $(item).val());
         if($(item).val() == ''){
            requiredField = false; 
            $(item).css('border-color','red');
            return;
         }else{
             requiredField = true; 
             $(item).css('border-color','#cccccc');
         }
    });
}

function createUserObject(){
    var user = {
        name : $('#inpName').val(),
        surname : $('#inpSurname').val(),
        role : $('#inpRole').val(),
        task : $('#inpTask').val(),
        pictureUrl : $('#pictureUrl').val(),
        email : $('#inpEmail').val(),
        gsm1 : $('#inpGsm').val(),
        password : $('#userPass').val(),
        isActive : 'no'
    };
    
    if($('#inpActive').is(':checked')){
        user.isActive = 'yes';
    }
    
    if(isUpdate){
        user._id = $('#inpId').val();  
    }
    //console.log('user : ' + JSON.stringify(user));
    return user;
}

function clearUI(){
    $('#inpName').val('');
    $('#inpSurname').val('');
    $('#pictureUrl').val('');
    $('#inpEmail').val('');
    $('#inpGsm').val('');
    $('#userPass').val('');
    $('#userRePass').val('');
    $('#inpRole').find('option:contains("Rol Seçiniz")').attr('selected', true);
    $('#inpTask').find('option:contains("Görev Seçiniz")').attr('selected', true);
    $('#userPicture').attr('src', '../uploads/3df7051c2a31638ac8c2e86068432939eac2f518.png');
}

function addTable(user){
    var table = $('#userTable');
    var tr = $('<tr id="'+ user._id +'"></tr>');
    var count = table.find('tr').size();
    
    var tdCount = '<td class="text-center">' + (++count) + '</td>';
    var tdName = $('<td>' + user.name + ' ' + user.surname + '</td>');
    var tdRole = $('<td>' + user.role + '</td>');
    var tdTask = $('<td>' + user.task + '</td>');
    var tdGsm = $('<td>' + user.gsm1 + '</td>');
    var tdEposta = $('<td>' + user.email + '</td>');
    var tdIsActive = $('<td class="text-center">' + '<i style="color:#0DA611;" class="fa fa-check"></i>' + '</td>');
    if(user.isActive == 'no'){
        tdIsActive = $('<td class="text-center">' + '<i style="color:#911E29;" class="fa fa-times"></i>' + '</td>');
    }
    var tdButtons;
    if(user.role == "Administrator"){
        tdButtons = $('<td><button class="btn btn-info btn-sm btn-flat edit"><i class="fa fa-pencil"></i></button></td>');   
    }else{
        tdButtons = $('<td><button class="btn btn-info btn-sm btn-flat edit"><i class="fa fa-pencil"></i></button>' + '<span> </span>' +
        '<button class="btn btn-danger btn-sm btn-flat remove"><i class="fa fa-trash-o"></i></button></td>');   
    }
    
    tr.append(tdCount);tr.append(tdName);tr.append(tdRole);tr.append(tdTask);tr.append(tdGsm);tr.append(tdEposta);tr.append(tdIsActive);tr.append(tdButtons);
    table.append(tr);
}

function fillUI(id){
    //console.log('id : ' + id);
    wsPost('/wsuser/getwithid', { _id : id }, function(error, response){
        if(error){
            console.error(error);
            return;   
        }
        var user = response.data;
        //console.log('user : ' + JSON.stringify(user));
        if(user){
            $('#inpId').val(user._id);
            $('#inpName').val(user.name);
            $('#inpSurname').val(user.surname);
            $('#pictureUrl').val(user.pictureUrl);
            $('#inpEmail').val(user.email);
            $('#inpGsm').val(user.gsm1);
            $('#userPass').val(user.password);
            $('#userPicture').attr('src', '../'+user.pictureUrl);
            $('#inpRole').find('option:contains("' + user.role + '")').attr('selected', true);
            $('#inpTask').find('option:contains("' + user.task + '")').attr('selected', true);   
        }
    });
}

function updateTableRow(){
    var user = {
        _id : $('#inpId').val(), 
        name : $('#inpName').val(),
        surname : $('#inpSurname').val(),
        email : $('#inpEmail').val(),
        gsm1 : $('#inpGsm').val(),
        role : $('#inpRole').val(),
        task : $('#inpTask').val()
    }
    
    var table = $('#userTable');
    table.find('tr[id="' + user._id + '"]').remove();
    addTable(user);
}