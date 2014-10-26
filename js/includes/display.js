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
            return Handlebars.helpers.pluralize(array.length, single, plural);
        });

        Handlebars.registerHelper('fuckit', function(name) {
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
            $('.error').html(result.error.message);
        });
    });

    // Render a few extra items

    amplify.subscribe("resultsRendered", function() {
        // Turn Google Maps URLs into directions
        $.each($('.address-list-item .map-link'), function() {
            var address = $(this).attr('data-address');
            var user_address = $('.user-address').attr('data-address');
            var google_address = 'https://www.google.com/maps/dir/' +
                encodeURIComponent(address) + '/' +
                encodeURIComponent(user_address) + '/';
            $(this).attr('href', google_address);
        });
    });

})(window.Handlebars, window.amplify, jQuery);