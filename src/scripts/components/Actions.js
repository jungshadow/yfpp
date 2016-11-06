// Import dependencies
import React from 'react';
import ReactDOM from 'react-dom';

import helpers from '../helpers';
import $ from 'jquery';

import analytics from '../analytics'

/**
* Load social media
*/

(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return; }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


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

// Twitter widgets code
window.twttr = (function(d, s, id) {
    var t, js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "//platform.twitter.com/widgets.js";
    fjs.parentNode.insertBefore(js, fjs);
    return window.twttr || (t = { _e: [], ready: function(f) { t._e.push(f); } });
}(document, "script", "twitter-wjs"));

window.twttr.ready(function(twttr){ //Wrap on twttr.ready for async compatibility.
    /*
        Twitter Tracking
        Create Twitter events for clicks, tweets, RTs, Follows and Favorites.
        Uses an iterator to avoid repetitive code.
        Adapted from https://github.com/bluestatedigital/bsd-google-analytics-integration
        and written by Yahel Carmon https://github.com/yahelc
        Released under an Apache 2.0 License http://www.apache.org/licenses/
    */
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
                analytics.social_action("twitter", intent.type, target.href.replace(target.hash, ""), target.pathname);
            }
        });
    });
});


$(function(){
    $('#app').on('click', '.shareLocationFacebook', function(event) {
        event.preventDefault();

        function facebook_callback(response) {
            analytics.social_action("facebook", "post", undefined)
        }

        var obj = {
            method: 'feed',
            link: 'http://yourfuckingpollingplace.com/?utm_source=facebook&utm_medium=social&utm_campaign=YFPP_2016_USER_' + $(this).data('state'),
            picture: 'http://yourfuckingpollingplace.com/web/images/social/social_2x.png',
            name: 'I Vote At ' + $(this).data('name'),
            caption: "YourFuckingPollingPlace.com",
            description: 'I vote at ' + $(this).data('name') + ' in ' + $(this).data('city') + ' ' + $(this).data('state') + ', where the fuck do you vote? Visit YourFuckingPollingPlace.com to find out.'
        };
        FB.ui(obj, facebook_callback);

    });
});


/**
 * Actions Component
 *
 * @class Actions
 * @extends React.Component
 */
 class Actions extends React.Component {

    /**
     * Handles post-render actions
     *
     * @method componentDidMount
     */
    componentDidMount() {
        /* Handle twitter intent handling */
        if (window.twttr && 'widgets' in window.twttr) {
            window.twttr.widgets.load();
        }
    }

    /**
     * Builds the twitter intent link
     *
     * @method buildTweet
     */
    buildTweet() {

        const location = this.props.location;

        // Shuffle the author twitter accounts for optimal fairness
        const authorTwitter = helpers.shuffle([
            'golovashkina',
            'joshualturner',
            'jungshadow',
            'momaraqa',
            'nickcatal',
            'sixBcreative',
        ]);

        // setup empty variable to store tweet text
        let text = '';

        // if locationName exists setup text string including location name
        // else use predefined string
        if (location.locationName) {
            text = encodeURI('I vote at ' + helpers.titlecase(helpers.fucktify(location.locationName)) + '. Where the fuck do you vote? Find out at');
        } else {
            text = 'I found my fucking polling location. Where the fuck do you vote? Find out at';
        }

        const related = authorTwitter.join(',');
        const url = encodeURI('http://yourfuckingpollingplace.com');

        return <a className="actionLink actionLink_twitter"
          href={'https://twitter.com/intent/tweet?text=' + text + '&url=' + url + '&related=' + related + '&via=fnpollingplace'}>
        Tweet</a>
    }

    /**
     * Builds the facebook link containing the relevant data attributes
     *
     * @method buildFB
     */
    buildFB() {
        const location = this.props.location;
        return <a className="actionLink actionLink_facebook mix-actionLink_blue shareLocationFacebook"
            href="#"
            data-name={helpers.titlecase(helpers.fucktify(location.locationName))}
            data-city={helpers.titlecase(location.city)}
            data-state={location.state}>Facebook</a>
    }

    /**
     * Builds the Google Maps link
     *
     * @method buildMap
     */
    buildMap() {
        // sets props.location to local variable
        const location = this.props.location;

        // set variable for correctly cased locationName
        let casedLocationName = '';

        // if locationName exists, make that shit title cased
        if (location.locationName) {
            casedLocationName = helpers.titlecase(location.locationName)
        }

        // set up url components to build google maps url
        const components = [
            casedLocationName,
            location.line1,
            location.line2 || '',
            location.city,
            location.state,
            location.zip
        ]

        // build google maps url from components array
        const url = "https://maps.google.com/maps?q=" + encodeURI(components.join(' '))

        return <a className="actionLink actionLink_map" href={url} target="_blank">Map</a>
    }


    /**
     * Renders actions under polling place results
     *
     * @method render
     * @return {object} actions component markup
     */
     render() {
        return (
            <ul className="actions">
                <li className="actions-item">
                    <span className="actions-item-title">Share</span>
                    <div className="actions-item-links">
                        <ul className="hList">
                            <li>
                                {this.buildTweet()}
                            </li>
                            <li>
                                {this.buildFB()}
                            </li>
                        </ul>
                    </div>
                </li>
                <li className="actions-item">
                    <span className="actions-item-title">Map It</span>
                    <div className="actions-item-links">
                        {this.buildMap()}
                    </div>
                </li>
            </ul>
            )
     }

    };

    export default Actions;
