/*
Your Fucking Polling Place
Social JavaScript
by Nick Catalano
www.nickcatalano.com
*/

(function(window, amplify, $){

    (function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    window.twttr = (function (d,s,id) {
    var t, js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return; js=d.createElement(s); js.id=id;
    js.src="//platform.twitter.com/widgets.js"; fjs.parentNode.insertBefore(js, fjs);
    return window.twttr || (t = { _e: [], ready: function(f){ t._e.push(f); } });
    }(document, "script", "twitter-wjs"));

    // Use $.Deferred() to allow extra things to run when Facebook first loads
    // From http://johnkpaul.tumblr.com/post/32087902037/handling-fbasyncinit-use-deferred
    window.fbAsyncInit = function(){
        FB.init({
          appId      : '382719335136154',
          xfbml      : true,
          version    : 'v2.1'
        });
        window.fbAsyncInit.fbLoaded.resolve();
    };
    window.fbAsyncInit.fbLoaded = $.Deferred();



    amplify.subscribe("resultsRendered", function() {
        if ('widgets' in window.twttr) {
            window.twttr.widgets.load();
        }
    });

    amplify.subscribe("postToFacebook", function(polling_info){
        var obj = {
            method: 'feed',
            link: 'http://yourfuckingpollingplace.com/?utm_source=facebook&utm_medium=social&utm_campaign=YFPP_2014_USER_' + polling_info.state,
            picture: 'http://yourfuckingpollingplace.com/images/yfpp-fbwide.jpg',
            name: 'I Vote At ' + polling_info.location,
            caption: "YourFuckingPollingPlace.com",
            description: 'I vote at ' + polling_info.location + ' in ' + polling_info.city + ' ' + polling_info.state + ', where the fuck do you vote? Visit YourFuckingPollingPlace.com to find out'
        };
        function callback(response) {
            amplify.publish("facebookFeedCallback", response);
        }
        FB.ui(obj, callback);
    });

    $(function(){
        $('#main-content').on('click', '.fb-post', function(event) {
            amplify.publish("postToFacebook", {
                location: $(this).attr('data-location'),
                city: $(this).attr('data-city'),
                state: $(this).attr('data-state')
            });
            event.preventDefault();
        });
    });

})(window, window.amplify, jQuery);
