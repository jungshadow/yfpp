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
})

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
        _gaq.push(['_trackSocial', 'facebook', 'post', response]);
    }
    FB.ui(obj, callback);
    _gaq.push(['_trackSocial', 'facebook', 'opendialog', state]);
};

function trackTwitter(intent_event) {
  if (intent_event) {
    var opt_pagePath;
    if (intent_event.target && intent_event.target.nodeName == 'IFRAME') {
          opt_target = extractParamFromUri(intent_event.target.src, 'url');
    }
    _gaq.push(['_trackSocial', 'twitter', 'tweet', opt_pagePath]);
  }
}

//Wrap event bindings - Wait for async js to load
twttr.ready(function (twttr) {
  //event bindings
  twttr.events.bind('tweet', trackTwitter);
  twttr.events.bind('follow', function(event) {
      _gaq.push(['_trackSocial', 'twitter', 'follow', event.data.screen_name]);
      });
});