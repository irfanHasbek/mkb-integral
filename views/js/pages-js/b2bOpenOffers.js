function otherScripts(){
   
}
function clickHandlers(){
    $('#tableOpenOffers').on('click', '.edit', function() {
        var offerId = $(this).closest('tr').attr('id');
        if (offerId) {
            var win = window.open('/b2b_teklif?id=' + offerId, '_blank');
            win.focus();
         }
    });
}
function formHandlers(){
}