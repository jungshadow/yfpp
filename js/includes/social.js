

(function(window, amplify, $){


    window.fbAsyncInit = function() {
        FB.init({
          appId      : '382719335136154',
          xfbml      : true,
          version    : 'v2.1'
        });
    };
    /* jshint ignore:start */
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
    /* jshint ignore:stop */

    amplify.subscribe("resultsRendered", function() {
        if ('widgets' in window.twttr) {
            window.twttr.widgets.load();
        }
    });

    amplify.subscribe("postToFacebook", function(polling_info){
        var obj = {
            method: 'feed',
            link: 'http://www.yourfuckingpollingplace.com/',
            picture: 'http://www.yourfuckingpollingplace.com/site_media/static/images/wmfpp.png',
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
