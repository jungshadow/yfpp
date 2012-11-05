// Facebook Code
window.fbAsyncInit = function() {
  FB.init({
    appId  : '382719335136154',
    //channelUrl : '//channel.html',
    status : true, // check login status
    cookie : true, // enable cookies to allow the server to access the session
    xfbml  : true  // parse XFBML
  });

  FB.Event.subscribe('edge.create', function(targetUrl) {
    _gaq.push(['_trackSocial', 'facebook', 'like', targetUrl],['_trackEvent', 'facebook', 'like', targetUrl]);
  });
  FB.Event.subscribe('edge.remove', function(targetUrl) {
    _gaq.push(['_trackSocial', 'facebook', 'unlike', targetUrl],['_trackEvent', 'facebook', 'unlike', targetUrl]);
  });
};

(function() {
  var e = document.createElement('script');
  e.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';
  e.async = true;
  document.getElementById('fb-root').appendChild(e);
}());

$(".toggle-button").click(function (e) {
        e.preventDefault();
        $(this).toggleClass("closed open").next('.toggle-container').slideToggle();

    });

    $('.toggle-button, .toggle-container').click(function (e) {
        e.stopPropagation();
    });
    $(document).click(function () {
           $(".toggle-container").slideUp('slow', function () {
            // Animation complete.
            
        });

    });

function pretty(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

$('.tell-friends').click(function () {
    datalocation = $(this).attr("data-location");
    city = pretty($(this).attr("data-city"));
    state = $(this).attr("data-state");
    postToFeed(datalocation, city, state);
    return false;
});

$('.try-again').click(function () {
  _gaq.push(['_trackEvent', 'Action', 'Try Again']);
});

function postToFeed(location) {
    var obj = {
        method: 'feed',
        link: 'http://www.yourfuckingpollingplace.com/',
        picture: 'http://www.yourfuckingpollingplace.com/site_media/static/images/wmfpp.png',
        name: 'I Vote At ' + location,
        caption: "YourFuckingPollingPlace.com",
        description: 'I vote at ' + location + ' in ' + city + ' ' + state + ', where the fuck do you vote? Visit YourFuckingPollingPlace.com to find out'
    }
    function callback(response) {
        _gaq.push(['_trackSocial', 'facebook', 'post', response],['_trackEvent', 'facebook', 'post', response]);
    }
    FB.ui(obj, callback);
};

// Twitter Code
    window.twttr = (function (d,s,id) {
      var t, js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return; js=d.createElement(s); js.id=id;
      js.src="//platform.twitter.com/widgets.js"; fjs.parentNode.insertBefore(js, fjs);
      return window.twttr || (t = { _e: [], ready: function(f){ t._e.push(f) } });
    }(document, "script", "twitter-wjs"));

function trackTwitter(intent_event) {
  if (intent_event) {
    var opt_pagePath;
    if (intent_event.target && intent_event.target.nodeName == 'IFRAME') {
          opt_target = extractParamFromUri(intent_event.target.src, 'url');
    }
    _gaq.push(['_trackSocial', 'twitter', 'tweet', opt_pagePath],['_trackEvent', 'twitter', 'tweet', opt_pagePath]);
  }
}

//Wrap event bindings - Wait for async js to load
twttr.ready(function (twttr) {
  //event bindings
  twttr.events.bind('tweet', trackTwitter);
  twttr.events.bind('follow', function(event) {
      _gaq.push(['_trackSocial', 'twitter', 'follow', event.data.screen_name],['_trackEvent', 'twitter', 'follow', event.data.screen_name]);
      });
});

$('.candidate-link').click(function () {
  contest = $(this).attr("data-contest");
  channeltype = $(this).attr("data-channeltype");
  candidate = $(this).attr("data-candidate");
  _gaq.push(
    ['_trackEvent', 'Channel Click', channeltype, candidate],
    ['_trackEvent', 'Candidate Click', contest, candidate]
  );
});