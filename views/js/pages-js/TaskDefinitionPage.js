function otherScripts(){
   
}
function clickHandlers(){
    removeFromTable("tasks","/wstaskdefinition/remove",function(id){});
}
function formHandlers(){
     $("#frmTaskDefinition").ajaxForm(function(resp){
        var count= $(".tasks tbody tr").size();
        var tr=$("<tr id="+resp.data._id+"></>");
        var td1=$("<td class='text-center'>"+count+".</td>");
        var td2=$("<td>"+resp.data.task+"</td>");
        var td3=$("<td>"+resp.data.setBy+"</td>");
        var btnSil='<button class="btn btn-danger btn-sm sil"><i class="fa fa-trash-o"></i></button>';
        var td4=$("<td st id="+resp.data._id+">"+btnSil+"</td>");
        tr.append(td1);tr.append(td2);tr.append(td3);tr.append(td4);
        $(".tasks tbody").last().append(tr);
        $("input[type='text']").val("");
    });
}