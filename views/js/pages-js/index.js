function clickHandlers(){

}
function formHandlers(){

}
function otherScripts(){
    $(function() {
        wsPost('/wsoffer/search', {search : {
            'activities.owner.ownerName' : $('#inpUsernameForIndex').val()
        }}, function(error, response){
            var newEvents = [];
            if(response.response.length > 0){
                for(var i = 0; i < response.response.length; i++){
                    for(var j = 0; j < response.response[i].activities.length; j++){
                        var event = {
                            start: new Date(),
                            end: new Date()
                        };
                        event.activityId = response.response[i].activities[j]._id;
                        event.activityType = response.response[i].activities[j].activityType;
                        event.content = response.response[i].activities[j].owner.ownerName;
                        event.title = response.response[i].activities[j].content;
                        event.activityStatus = response.response[i].activities[j].activityStatus;
                        event.note = response.response[i].activities[j].note;
                        event.start = new Date(response.response[i].activities[j].activityDate);
                        event.end = new Date(response.response[i].activities[j].activityDate);
                        event.activityStatus = response.response[i].activities[j].activityStatus;
                        if(event.activityStatus){
                            event.backgroundColor = "#0f0";
                            event.borderColor = "#fff";
                        }else{
                            event.backgroundColor = "#f00";
                            event.borderColor = "#fff";
                        }
                        newEvents.push(event);
                    }
                }
            }
               /* initialize the calendar
             -----------------------------------------------------------------*/
            var lastView;
            $('#calendar').fullCalendar({
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                buttonText: {//This is to add icons to the visible buttons
                    prev: "<span class='fa fa-caret-left'></span>",
                    next: "<span class='fa fa-caret-right'></span>",
                    today: 'Bugün',
                    month: 'Ay',
                    week: 'Hafta',
                    day: 'Gün'
                },
                defaultView: 'month',
                lang:'tr',
                eventClick : function(event){
                    var activityNote = '';
                    alertify.prompt("Sayin " + event.content + ";<br /> Aktiviteyi tamamladiniz mi?", "Not",
                      function(evt, value){
                        wsPost('/wsoffer/updateActivity', {activityId : event.activityId, status : true, note : value}, function(errorOk, respOk){
                            if(errorOk){
                                alertify.error('Aktivite guncellenemedi. Hata : ' + respOk);
                                return;
                            }
                            alertify.success('Gorev tamamlandi olarak notunuzla birlikte kaydedildi.'); 
                            event.backgroundColor = '#0f0';
                            $('#calendar').fullCalendar('rerenderEvents');
                        });
                      },
                      function(){
                        wsPost('/wsoffer/updateActivity', {activityId : event.activityId, status : false, note : event.note}, function(errorCancel, respCancel){
                            if(errorCancel){
                                alertify.error('Aktivite guncellenemedi. Hata : ' + respCancel);
                                return;
                            }
                            alertify.error('Gorev tamamlanmadi olarak notunuzla birlikte kaydedildi.'); 
                            event.backgroundColor = '#f00';
                            $('#calendar').fullCalendar('rerenderEvents');
                        });                    
                      });
                }
            });
            $('#calendar').fullCalendar('addEventSource', newEvents);
            $('#calendar').fullCalendar('rerenderEvents');
        });
    });
}