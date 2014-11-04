/*
Your Fucking Polling Place
Analytics JavaScript
by Nick Catalano
www.nickcatalano.com


*/

// Make sure that we have a version of the ga() var locally
// From https://stackoverflow.com/questions/20914703/
window.ga = window.ga || function () {
    (window.ga.q = window.ga.q || []).push(arguments);
};

// It's probably unwise to rely on amplify pubsub for JS monitoring
window.onerror = function(msg, url, linenumber) {
    // Log error to console
    console.log('Error message: '+msg+'\nURL: '+url+'\nLine Number: '+linenumber);
    ga('send', 'event', 'Javascript Error', msg, linenumber);
};


// Put everything inside this closure to help with minification
(function(window, document, amplify, $){


    /*
        getElem: This is a shortcut function for parsing a URL using the DOM.
        This allows you to quickly get the domain, pathname, etc off of a full URL.
        From https://github.com/bluestatedigital/bsd-google-analytics-integration
    */

    function getElem(href) {
        var target = document.createElement("a");
        target.href = href;
        return target;
    }

    /*
    GA Helpers
    Useful so that we're sure that we always pass the current page
    */
    function sendEvent(category, action, label, noninteraction) {
        var nI = 0;
        if (noninteraction === true) {
            nI = 1;
        }
        ga('send', 'event', category, action, label,
            {
                    'nonInteraction': nI,
                    'page': window.ga_page,
                    'title': window.ga_title
            });
    }

    function social_action(social_network, action, label) {
        ga('send', 'social', social_network, action, label, {
            'page': window.ga_page,
            'title': window.ga_title
        });
        ga('send', 'event', social_network, action, label, {
            'page': window.ga_page,
            'title': window.ga_title
        });
    }

    amplify.subscribe('pageSwitch', function() {
        ga('send', 'pageview', {
            'page': window.ga_page,
            'title': window.ga_title
        });
    }, 9);


    amplify.subscribe('lookupSuccess', function(result) {
        ga('send', 'event', 'Address', 'Lookup', result.normalizedInput.state,
            {
                'nonInteraction': 1,
                'page': '/results',
                'title': 'Results'
            });
    }, 11);

    amplify.subscribe('lookupFailure', function(result) {
        sendEvent('Address', 'Failure', result.reason);
        if (result.reason === 'invalid') {
            sendEvent('Misc', 'Invalid Message', result.error.message, true);
        }
    }, 11);

    amplify.subscribe("tryAgainToggle", function() {
        if ($('.toggle-button').hasClass('open')) {
            sendEvent('Page Action', 'Try Again', 'Open');
        } else {
            sendEvent('Page Action', 'Try Again', 'Close');
        }
    });

    amplify.subscribe("reportSubmitted", function(state) {
        sendEvent('Error Report', state, '');
    });

    amplify.subscribe("candidateClick", function(data) {
        sendEvent('Candidate Click', data['contest'], data['candidate_name']);
    });


    amplify.subscribe("foundInLocalStorage", function() {
        sendEvent('Storage', 'Found', '', true);
    }, 50);

    /*

    Generic Tracking

    */

    $(function() {
        $('footer a').click(function(event) {
            sendEvent('Exit', 'Footer', $(this).attr('href'));
        });
        $('.map-link').click(function(event) {
            sendEvent('googlemap', 'Click', $(this).attr('data-state'));
        });
    });

    /*
    Social Tracking
    */

    // Add these to the Facebook Async Setup
    window.fbAsyncInit.fbLoaded.done(function(){
        FB.Event.subscribe('edge.create', function(targetUrl) {
            social_action('facebook', 'like', targetUrl);
        });
        FB.Event.subscribe('edge.remove', function(targetUrl) {
            social_action('facebook', 'unlike', targetUrl);
        });
        FB.Event.subscribe('message.send', function(targetUrl) {
            social_action('facebook', 'send', targetUrl);
        });
    });


    amplify.subscribe("facebookFeedCallback", function(response) {
        social_action('facebook', 'post', response);
    }, 50);

    window.twttr.ready(function(twttr){ //Wrap on twttr.ready for async compatibility. 
        /*
            Twitter Tracking
            Create Twitter events for clicks, tweets, RTs, Follows and Favorites.
            Uses an iterator to avoid repetitive code.
            Adapted from https://github.com/bluestatedigital/bsd-google-analytics-integration
            and written by Yahel Carmon https://github.com/yahelc
            Released under an Apache 2.0 License http://www.apache.org/licenses/
        */
        'click tweet retweet follow favorite'.replace(/\w+/g, function(n) {
            twttr.events.bind(n, function(intent) {
                var target;
                if (intent && intent.target) {
                    if (intent.target.src) {
                        target = getElem(decodeURIComponent((intent.target.src.match(/[&#?](url=)([^&]*)/)||[""]).pop()));
                    }
                    else if (intent && intent.target && intent.target.href) {
                        $.each(decodeURIComponent(intent.target.search).replace(/\+/g, " ").split(/&| |\=/g), function(i, v) {
                        if (v.match(/(^https?:\/\/)|(^www.)/)) {
                              target = getElem(v);
                              return false;
                            }
                         });
                    }
                }
                if(target){
                    social_action("twitter", intent.type, target.href.replace(target.hash, ""), target.pathname);
                }
            });
        });
    });

})(window, document, window.amplify, jQuery);
