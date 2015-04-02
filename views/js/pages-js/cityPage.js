function listTowns(){
    $("#slctCity").on("change",function(){
        $(".towns tbody").empty();
        var cityId=$("#slctCity option:selected").attr("id");
        wsPost("/wscity/gettowns",{_id : cityId},function(err,resp){
            if(err){
                console.error(err);
                return;
            }
            console.log(resp.data[0].towns.length);
            for(var i=0;i<resp.data[0].towns.length;i++){
            var tr=$("<tr id="+resp.data[0].towns[i]._id+"></tr>");
            var td=$("<td class='text-center'>"+(i+1)+".</td>");
            var td1=$("<td>"+resp.data[0].towns[i].townName+"</td>");
            var btnSil='<button class="btn btn-danger sil"><i class="fa fa-trash-o"></i></button>';
            var td2=$("<td id="+resp.data[0].towns[i]._id+" class='text-center'>"+btnSil+"</td>");
            tr.append(td);tr.append(td1);tr.append(td2);
            $(".towns tbody").append(tr);
            }
        });
    });
}
function removeTown(){
    $(".towns").on("click",".sil",function(){
    var cityId=$("#slctCity option:selected").attr("id");
    var townId=$(this).closest("td").attr("id");    
    var tr=$(this).closest("tr");
    var townName=tr.find("td").eq("1").text();
     console.log(townName);   
    wsPost("/wscity/removetown",{cityId : cityId,townName : townName},function(err,resp){
        if(err){
            console.error(err);
            return;
        }
        tr.remove();
    });
 });
}
function addTown(){
    $("#btnAddTown").click(function(){
        if($("#slctCity option:selected").text()!=="İl Seçiniz"){
            var cityId=$("#slctCity option:selected").attr("id");
            var townName=$("#inpTown").val();
            wsPost("/wscity/addtown",{_id : cityId,townName : townName},function(err,resp){
                if(err){
                    console.error(err);
                    return;
                }
                var count= $(".towns tbody tr").size();
                var tr=$("<tr></tr>");
                var td=$("<td class='text-center'>"+(count+1)+".</td>");
                var td1=$("<td>"+townName+"</td>");
                var btnSil='<button class="btn btn-danger sil"><i class="fa fa-trash-o"></i></button>';
                var td2=$("<td class='text-center'>"+btnSil+"</td>");
                tr.append(td);tr.append(td1);tr.append(td2);
                $(".towns tbody").last().append(tr);
                $("input[type='text']").val("");
        });
        }else{
             alert("lütfen şehir ismi seçiniz");
      }
    });
}
function otherScripts(){
   listTowns();
}
function clickHandlers(){
    removeFromTable("citys","/wscity/remove",function(data){
        $("#slctCity option[id='"+data+"']").remove();
    });
    removeTown();
    addTown();
}
function formHandlers(){
    $("#frmCity").ajaxForm(function(resp){
        var count= $(".citys tbody tr").size();
        var tr=$("<tr id="+resp.data._id+"></tr>");
        var td1=$("<td class='text-center'>"+count+".</td>");
        var td2=$("<td>"+resp.data.city+"</td>");
        var btnSil='<button class="btn btn-danger sil"><i class="fa fa-trash-o"></i></button>';
        var td4=$("<td class='text-center' id="+resp.data._id+">"+btnSil+"</td>");
        tr.append(td1);tr.append(td2);tr.append(td4);
        $(".citys tbody").last().append(tr);
        $("input[type='text']").val("");
        $("#slctCity").append("<option id="+resp.data._id+"  value="+resp.data.city+">"+resp.data.city+"</option>");
    });
}