/*
Your Fucking Polling Place
Address Lookup Request Processing JavaScript
by Nick Catalano
www.nickcatalano.com
*/

(function(amplify, $){


    amplify.subscribe("lookupAddress", function(address) {
        var data = {
            'key': 'AIzaSyAnjkErJZeEzUIrr52eqcQuiPfTQxQxsMk',
            'electionId': 4100,
            'address': address
        };
        var request = $.ajax({
            url: 'https://www.googleapis.com/civicinfo/v2/voterinfo?callback=?',
            type: "GET",
            dataType: 'jsonp',
            data: data
        });
        request.done(function(response) {
            if ('error' in response) {
                amplify.publish("requestFailure", response, address);
            } else {
                amplify.publish("requestSuccess", response, address);
            }
        });
    });

    // Handle successful request responses (aka 200s)
    amplify.subscribe("requestSuccess", function(response, address) {
        console.log("requestSuccess");
        response.result = 'success';
        response.user_address = address;

        amplify.publish("lookupSuccess", response);
    });

    // Handle requests that returned an error
    amplify.subscribe("requestFailure", function(response, address) {
        console.log("requestFailure");
        response.result = 'failure';
        response.reason = response.error.errors[0].reason;
        response.user_address = address;

        amplify.publish("lookupFailure", response);
    });
})(window.amplify, jQuery);

