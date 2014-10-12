

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


})(window, window.amplify, jQuery);