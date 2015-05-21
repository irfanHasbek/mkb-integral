function clickHandlers(){
    removeFromTable("coverPages","/wscoverpage/remove",function(id){});
    
    $('.coverPages').on('click', '.update', function(){
        var id = $(this).closest('td').attr('id');
        var data = JSON.parse($('tr[id=' + id + ']').find('td').eq(3).attr('data'));
        //console.log(data)
        if(data.active){
            checkToCheckBox('cbActive');   
        }
        $('#inpLabel').val(data.label);
        $('#inpCoverContent').data("wysihtml5").editor.setValue(data.content);
        $('#inpCoverPageId').val(data._id);
        $('#inpCoverPageId').removeAttr('disabled');
        $('#frmCoverPage').attr('action', '/wscoverpage/update');
    });
    
    $('#btnSave').on('click', function(){
         
    });
}
function formHandlers(){
    $('#frmCoverPage').ajaxForm(function(data){
         if($('#frmCoverPage').attr('action') == '/wscoverpage/addnew'){
            if(data.state == true){
                alertify.success("İşlem başarı ile gerçekleştirildi.");
                var count= $(".coverPages tbody tr").size();
                var tr=$("<tr id="+data.data._id+"></>");
                var td1=$("<td class='text-center'>"+count+".</td>");
                var td2=$("<td>"+data.data.label+"</td>");
                var btnSil='<button class="btn btn-danger sil"><i class="fa fa-trash-o"></i></button>&nbsp;&nbsp;<button class="btn btn-info  update"><i class="fa fa-search"></i></button>';
                var td3=$("<td id="+data.data._id+">"+btnSil+"</td>");
                var td4=$("<td data="+JSON.stringify(data.data)+" style='display:none;'></td>");
                tr.append(td1);tr.append(td2);tr.append(td3);
                $(".coverPages tbody").last().append(tr);
                $("input[type='text']").val("");
                $('#inpCoverContent').data("wysihtml5").editor.setValue('');
            }else{
                alertify.error("İşlem başarısız.");
            }   
         }else{
            $('#inpCoverPageId').attr('disabled');
            $('#frmCoverPage').attr('action', '/wscoverpage/addnew');
            if(data.state == true){
                alertify.success("İşlem başarı ile gerçekleştirildi.");
                location.reload();
            }else{
                alertify.error("İşlem başarısız.");
                location.reload();
            }
         }
    });
}
function otherScripts(){}

function checkToCheckBox(id){
    $('#' + id).prop('checked', true);
    $('#' + id).prop('aria-checked', true);
    $('#' + id).closest('div').prop('class', 'icheckbox_minimal checked'); 
}