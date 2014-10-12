/*!

Your Fucking Polling Place
Javascript Code by Nick Catalano
www.nickcatalano.com

*/

(function(amplify, $){
    $(function(){
        // Handle pageviews where there is a hash
        if (window.location.hash.replace('#','') !== '') {
            amplify.publish("processHash", window.location.hash.replace('#',''));
        }

        $('#main-content').on('submit', '.address-form', function(event) {
            var address;
            if ($('#address-mobile').val()) {
                address = $('#address-mobile').val();
            } else {
                address = $('#address-desktop').val();
            }
            amplify.publish("lookupAddress", address);
            event.preventDefault();
            console.log('somebody submitted something');
        });

        $('.title-link').click(function(event){
            if (window.history && window.history.pushState) {
                // Remove the hash using the history API
                history.pushState(null, null, window.location.pathname);
                amplify.publish("displayInput");
                event.preventDefault();
            }
        });
    });
})(window.amplify, jQuery);
