function pretty(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function fuckit(str) {
    orig = pretty(str);
    arr = orig.split(' ');
    arr.splice(1,0,"Fucking")
    return arr.join(" ");
}

function lookup(address, callback) {
    gapi.client.setApiKey('AIzaSyDKcKTrfTWZQWTIYRGlmiZcpOI3XlHY_Cc')
    var req = gapi.client.request({
        'path' : '/civicinfo/us_v1/voterinfo/4000/lookup',
        'method' : 'POST',
        'body' : {'address' : address}
    });
    req.execute(callback);
}

function render(response, rawresponse) {
    console.log(response);
    if (response.status != "success" || response.pollingLocations.length == 0) {
        $('.cantfind').show();
        _gaq.push(['_trackEvent', 'Address', 'Failure', response.status]);
    } else {
        $('.cantfind').hide();
        window.address = response.pollingLocations[0].address;
        window.locationname = fuckit(address.locationName);
        window.state = address.state;
        window.city = pretty(address.city);
        var straddr = address.line1;
        $('.address-list #name').text(fuckit(address.locationName));
        $('.address-list #address1').text(address.line1);
        $('.address-list #city').text(address.city);
        $('.address-list #zip').text(address.zip);
        $('.address-list #state').text(address.state);
        address.line2 ? $('.address-list #address2').text(address.line2) : address.line2 = '';
        address.line3 ? $('.address-list #address3').text(address.line3) : address.line3 = '';
        $('.address-list a.map-link').attr("href","https://maps.google.com/maps?q=" + encodeURIComponent(address.line1 + ' ' + address.line2 + ' ' + address.line3 + ' ' + address.city + ', ' + address.state + ' ' + address.zip))
        $('.origform').fadeOut();
        $('.results').fadeIn();
        $('.address-container').fadeIn();
        $(".address-form").slideUp('slow')
        $('input.text-field', this).val("")
        $('.sharelocation').attr("data-location", locationname);
        $('.sharelocation').attr("data-city", city);
        $('.sharelocation').attr("data-city", state);
        $('.tweet').attr("href","https://twitter.com/intent/tweet?text=" + encodeURIComponent('I vote at ' + locationname + ', where the fuck do you vote?') + '&url=http%3A%2F%2Fyourfuckingpollingplace.com%2F');
        twttr.widgets.load();
        _gaq.push(['_trackEvent', 'Address', 'Lookup', address.state]);
    }

}

$(".address-form").submit(function() {
    addr = $('input.text-field', this).val()
    console.log(lookup(addr,render))
    return false;
})

$(".toggle-button").click(function() {
    return false;
})

$(".toggle-button").click(function () {
        $('.address-container').fadeOut();
        $(this).toggleClass("closed open").next('.toggle-container').slideToggle();

    });

    $('.toggle-button, .toggle-container').click(function (e) {
        e.stopPropagation();
    });
    $(document).click(function () {
        $(".address-container").show();
           $(".toggle-container").slideUp('slow', function () {
            // Animation complete.
            
});

    });

$('.tell-friends').click(function () {
    datalocation = $(this).attr("data-location");
    city = $(this).attr("data-city");
    state = $(this).attr("data-state");
    postToFeed(datalocation);
    return false;
})

function postToFeed(location, city, state) {
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
/*$('.tweet').click(function(event) {
  var width  = 575,
      height = 400,
      left   = ($(window).width()  - width)  / 2,
      top    = ($(window).height() - height) / 2,
      url    = "http://twitter.com/share?text=" + encodeURIComponent('I vote at ' + locationname + ', where the fuck do you vote?') + '&url=http%3A%2F%2Fyourfuckingpollingplace.com%2F',
      opts   = 'status=1' +
               ',width='  + width  +
               ',height=' + height +
               ',top='    + top    +
               ',left='   + left;
  
  window.open(url, 'twitter', opts);
  _gaq.push(['_trackSocial', 'twitter', 'openindividual']);
  return false;
});*/
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