(function(Handlebars, amplify, $){



    function generate_middle_name(string) {
        // Because we want to make sure that a candidate always has the same
        // middle name no matter who is searching, we need to figure out some
        // way to hash the name and output a position in a list of possible
        // middle names.

        // There must always be 20 available middle names
        var middle_names = [
            "Wiggles",
            "Susical",
            "Belguim Waffles",
            "Wrigley",
            "McCloud",
            "Juicy Fruit",
            "Moose",
            "Melonballer",
            "Calking Gun",
            "Doily",
            "Contusion",
            "String Bean",
            "Wild Boar",
            "Pants",
            "Kumquat",
            "McGeenus",
            "The Tooth",
            "Big Kahuna Burger",
            "Eye of the Tiger"];

        
        var hash = 0, len = string.length, i;
        if (string.length === 0) {
            // Choosen by a fair dice roll, guaranteed to be random
            return middle_names[4];
        }
        /*jslint bitwise: true */
        for (i = 0, len = string.length; i < len; i++) {
            // Grab the unicode character value
            var chr = string.charCodeAt(i);
            hash = ((hash << 4) - hash) + chr - len;
        }
        /*jslint bitwise: false */
        // Turn the resulting hash into a string, grab the last digit and
        // turn back into an integer
        var initial_position = parseInt(Math.abs(hash).toString().slice(-1), 10);

        // Odd length hashes get multiplied by 2
        var final_position = initial_position * (Math.abs(hash) % 2 + 1);

        return middle_names[final_position];
    }



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

        Handlebars.registerHelper('fuckem', function(name) {
            var orig = Handlebars.helpers.pretty(name);
            var arr = orig.split(' ');
            arr.splice(1,0,generate_middle_name(name));
            return arr.join(" ");
        });

        // Setup templates
        var result_source = $('#result-template').html();
        var result_template = Handlebars.compile(result_source);

        var failure_source = $('#failure-template').html();
        var failure_template = Handlebars.compile(failure_source);

        var input_source = $('#submit-template').html();
        var input_template = Handlebars.compile(input_source);

        amplify.subscribe("displayInput", function() {
            var html = input_template({});
            console.log("Failure");
            $('#main-content').html(html);
        });

        amplify.subscribe("displaySuccess lookupSuccess", function(result) {
            window.results = result;
            var context = {
                result: result
            };
            var html = result_template(context);
            $('#main-content').html(html);
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

})(window.Handlebars, window.amplify, jQuery);