
/*
Your Fucking Polling Place
Site Navigation JavaScript
by Nick Catalano
www.nickcatalano.com
*/

(function(amplify, $){

    function generate_hash(string) {
        // Generate a 4 character hash of an address
        // Adapted from https://stackoverflow.com/questions/7616461/

        /*jslint bitwise: true */
        var hash = 0, i, len;
        if (string.length === 0) {
            return "fuck";
        }
        for (i = 0, len = string.length; i < len; i++) {
            var chr = string.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0;
        }
        // Always return 4 characters. Risk collissions, live life on the edge
        return ("fuck" + Math.abs(hash).toString(36)).slice(-4);
    }

    $(function(){

        $(window).on('hashchange', function() {
            console.log('hashchange Fired');
            var hash = window.location.hash.replace('#','');
            console.log(hash);

            // We have to make sure we compare against latest_lookup_key as we
            // are causing this event to fire when we change the hash on new
            // lookups and don't want to re-enter the render loop
            if (hash !== window.latest_lookup_key) {
                amplify.publish("processHash", hash);
            } else {
                window.latest_lookup_key = undefined;
            }
        });

        amplify.subscribe("processHash", function(hash) {
            console.log("Process Hash");


            // Check for an existing stored result
            var stored_result = amplify.store(hash);
            var stored_address = amplify.store(hash + '_address');

            // If the hash or result isn't available locally, display the initial page
            if (hash === '' || stored_result === undefined) {
                console.log("Stored Result Nowhere To Be Found");
                if (stored_address !== undefined) {
                    amplify.publish("lookupAddress", stored_address);
                } else {
                    amplify.publish("displayInput");
                }
            } else {
                // If we have a copy in sessionStorage, display it
                if (stored_result.result === 'success') {
                    amplify.publish("displaySuccess", stored_result);
                }
                if (stored_result.result === 'failure') {
                    amplify.publish("displayFailure", stored_result);
                }
                amplify.publish("foundInLocalStorage");
            }
        });

        amplify.subscribe("lookupSuccess", function(result) {
            var hash = generate_hash(result.user_address);
            window.latest_lookup_hash = hash;
            window.location.hash = hash;
            // Store the result based on our hash. Expire in 30 minutes
            var options = {
                expires: 30*60*1000
            };
            amplify.store(hash, result, options);

            // Store the address associated with this key in long-term storage
            amplify.store(hash + '_address', result.user_address);
        });

    });
})(window.amplify, jQuery);