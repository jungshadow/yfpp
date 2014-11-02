/*
Your Fucking Polling Place
Google Prediction Javascript
by Nick Catalano
www.nickcatalano.com
*/

(function(window, amplify, $) {
    var options = {
      types: ['address'],
      componentRestrictions: {country: 'us'}
    };

    amplify.subscribe("attachAutocomplete contentRendered", function() {
        $.each($('.addrfield'), function(index, input) {
            if ($(input).hasClass('autocomplete-attached') === false) {
                new window.google.maps.places.Autocomplete(input, options);
                $(input).addClass('autocomplete-attached');
            }

        });
    });

})(window, window.amplify, jQuery);
