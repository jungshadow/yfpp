/*
Your Fucking Polling Place
Address Lookup Request Processing JavaScript
by Nick Catalano
www.nickcatalano.com
*/

(function(amplify, $){

    var level_ordering = [
        "international",
        "country",
        "administrativeArea1",
        "regional",
        "administrativeArea2",
        "locality",
        "subLocality1",
        "subLocality2",
        "special"
    ];

    var scope_ordering = [
        "national",
        "statewide",
        "congressional",
        "stateUpper",
        "stateLower",
        "countywide",
        "judicial",
        "schoolBoard",
        "cityWide",
        "township",
        "countyCouncil",
        "cityCouncil",
        "ward",
        "special"
    ];

    var role_ordering = [
        "headOfState",
        "headOfGovernment",
        "deputyHeadOfGovernment",
        "governmentOfficer",
        "executiveCouncil",
        "legislatorUpperBody",
        "legislatorLowerBody",
        "highestCourtJudge",
        "judge",
        "schoolBoard",
        "specialPurposeOfficer"
    ];

    function compare_level(a, b) {
        if (!('level' in a) || !('level' in b) || a.level.length === 0 || b.level.length === 0) {
            return 0;
        }
        var level_weight_a = level_ordering.indexOf(a.level[0]);
        var level_weight_b = level_ordering.indexOf(b.level[0]);
        if (level_weight_a > level_weight_b) {
            return 1;
        }
        if (level_weight_a < level_weight_b) {
            return -1;
        }
        return 0;
    }

    function compare_scope(a, b) {
        var scope_weight_a = scope_ordering.indexOf(a.district.scope);
        var scope_weight_b = scope_ordering.indexOf(b.district.scope);
        if (scope_weight_a > scope_weight_b) {
            return 1;
        }
        if (scope_weight_a < scope_weight_b) {
            return -1;
        }
        return 0;
    }

    function compare_role(a, b) {
        if (!('roles' in a) || !('roles' in b) || a.roles.length === 0 || b.roles.length === 0) {
            return 0;
        }
        var role_weight_a = role_ordering.indexOf(a.roles[0]);
        var role_weight_b = role_ordering.indexOf(b.roles[0]);
        if (role_weight_a > role_weight_b) {
            return 1;
        }
        if (role_weight_a < role_weight_b) {
            return -1;
        }
        return 0;
    }

    function compare_contests(a, b) {
        var level_score = compare_level(a, b);
        if (level_score !== 0) {
            return level_score;
        }
        var scope_score = compare_scope(a, b);
        if (scope_score !== 0) {
            return scope_score;
        }
        var role_score = compare_role(a, b);
        if (role_score !== 0) {
            return role_score;
        }
        return 0;
    }


    amplify.subscribe("lookupAddress", function(address) {
        var data = {
            'key': 'AIzaSyAnjkErJZeEzUIrr52eqcQuiPfTQxQxsMk',
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

        // Apply our custom sorting to contests if they exist
        if ('contests' in response) {
            response.contests = response.contests.sort(compare_contests);
        }
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

