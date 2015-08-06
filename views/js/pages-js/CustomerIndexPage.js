function clickHandlers(){}
function otherScripts(){
$(function() {
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
            lang:'tr'
        });
    });
}
function formHandlers(){
}