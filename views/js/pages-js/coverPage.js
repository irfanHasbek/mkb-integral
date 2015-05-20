function clickHandlers(){
    removeFromTable("coverPages","/wscoverpage/remove",function(id){});
    
    $('.coverPages').on('click', '.update', function(){
        var id = $(this).closest('td').attr('id');
        var data = JSON.parse($('tr[id=' + id + ']').find('td').eq(3).attr('data'));
        console.log(data)
        $('#inpLabel').val(data.label);
        $('#inpCoverContent').data("wysihtml5").editor.setValue(data.content);
    });
}
function formHandlers(){
    $('#frmCoverPage').ajaxForm(function(data){
         
    });
}
function otherScripts(){}