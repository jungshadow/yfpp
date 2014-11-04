(function(Handlebars, amplify, $){

    $(function(){


        Handlebars.registerHelper('pretty', function(text) {
            if (text === undefined) {
                return text;
            }
            return text.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
        });

        // Setup helpers
        Handlebars.registerHelper('pluralize', function(number, single, plural) {
            if (number === 1) { return single; }
            else { return plural; }
        });

        Handlebars.registerHelper('pluralize_length', function(array, single, plural) {
            if (array === undefined) { return single; }
            return Handlebars.helpers.pluralize(array.length, single, plural);
        });

        Handlebars.registerHelper('fuckit', function(name) {
            if (name === undefined) {
                return "No Fucking Place Name Provided";
            }
            var orig = Handlebars.helpers.pretty(name);
            var arr = orig.split(' ');
            arr.splice(1,0,"Fucking");
            return arr.join(" ");
        });

        Handlebars.registerHelper('urlencode', function(string) {
            return encodeURIComponent(string);
        });

        Handlebars.registerHelper('chain', function () {
            // Chain helpers. From https://github.com/wycats/handlebars.js/issues/304
            var helpers = [], value;
            $.each(arguments, function (i, arg) {
                if (Handlebars.helpers[arg]) {
                    helpers.push(Handlebars.helpers[arg]);
                } else {
                    value = arg;
                    $.each(helpers, function (j, helper) {
                        value = helper(value, arguments[i + 1]);
                    });
                    return false;
                }
            });
            return value;
        });

        // Setup templates
        var result_source = $('#result-template').html();
        var result_template = Handlebars.compile(result_source);

        var input_source = $('#submit-template').html();
        var input_template = Handlebars.compile(input_source);

        amplify.subscribe("displayInput", function() {
            var html = input_template({});
            console.log("Failure");
            $('#main-content').html(html);
            window.ga_page = '/';
            window.ga_title = 'Your Fucking Polling Place';
            amplify.publish("pageSwitch");
            amplify.publish("contentRendered");
        });

        amplify.subscribe("displaySuccess lookupSuccess", function(result) {
            window.results = result;
            var context = {
                result: result
            };
            var html = result_template(context);
            $('#main-content').html(html);
            window.ga_page = '/results';
            window.ga_title = 'Results';
            amplify.publish("pageSwitch");
            amplify.publish("contentRendered");
            amplify.publish("resultsRendered");
        });
        amplify.subscribe("displayFailure lookupFailure", function(result) {
            console.log("Well, we made it to the failure");
            /*var context = {
                result: result
            };
            //var html = failure_template(context);
            //$('#main-content').html(html);
            */
            var error_message = result.error.message;
            var clean_reasons = {
                parseError: "We couldn't process that address.<br>Did you enter a full fucking address?",
                required: "You didn't provide us an address...<br>How the fuck do you think this even works??",
                invalidValue: "Well for fuck sake, we couldn't find data for this address for this election.<br>Come back later and try again.",
                invalidQuery: "The election is over... get the fuck out of here<br>(but come back next time)",
                notFound: "Fuck. We couldn't find any data for this address.<br>Try again with a residental address, or come back later.",
                conflict: "Fuck. We have conflicting data about this shit.<br>Come back later",
                backendError: "Something's fucked up with our provider's servers.<br>Come back later.",
                invalid: "Well for fuck sake, we couldn't find data for this address for this election.<br>Come back later and try again."
            };
            if (result.reason in clean_reasons) {
                error_message = clean_reasons[result.reason];
            }
            $('.error').html(error_message);
        });
    });

    // Render a few extra items

    amplify.subscribe("resultsRendered", function() {
        // Turn Google Maps URLs into directions
        $.each($('.address-list-item .map-link'), function() {
            var address = $(this).attr('data-address');
            var user_address = $('.user-address').attr('data-address');
            var google_address = 'https://www.google.com/maps/dir/' +
                encodeURIComponent(user_address) + '/' +
                encodeURIComponent(address) + '/';
            $(this).attr('href', google_address);
        });
    });

    amplify.subscribe("resultsRendered", function() {
        $('#error-feedback-link').click(function(event) {
            event.preventDefault();
            amplify.publish("reportSubmitted", $(this).attr('data-state'));
            $('#error-feedback-form').submit();
        });
    });

})(window.Handlebars, window.amplify, jQuery);