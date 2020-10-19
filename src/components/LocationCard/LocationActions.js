import React from 'react';
import PropTypes from 'prop-types';

import './locationActions.scss';
import { FacebookIcon, MapIcon } from 'components/Icons';
import TwitterIcon from 'components/Icons/TwitterIcon';
import analytics from 'analytics';
import helpers from 'helpers';

const LocationActions = ({ location, onMapItClick, isActive }) => {
    const { state, locationName, city, zip, line1, line2 } = location;

    const handleFacebookShare = e => {
        e.preventDefault();

        function facebook_callback(response) {
            analytics.social_action('facebook', 'post', undefined);
        }

        const shareObj = {
            method: 'feed',
            link:
                'http://yourfuckingpollingplace.com/?utm_source=facebook&utm_medium=social&utm_campaign=YFPP_2016_USER_' +
                state,
            picture:
                'http://yourfuckingpollingplace.com/web/images/social/social_2x.png',
            name: 'I Vote At ' + locationName,
            caption: 'YourFuckingPollingPlace.com',
            description: `I vote at ${helpers.titlecase(
                helpers.fucktify(locationName)
            )} in ${helpers.titlecase(
                location.city
            )} ${state}, where the fuck do you vote? Visit YourFuckingPollingPlace.com to find out.`,
        };

        window.FB.ui(shareObj, facebook_callback);
    };

    const buildTweet = () => {
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
        if (locationName) {
            text = `I vote at ${helpers.titlecase(
                helpers.fucktify(locationName)
            )}. Where the fuck do you vote? Find out at`;
        } else {
            text =
                'I found my fucking polling location. Where the fuck do you vote? Find out at';
        }

        const related = authorTwitter.join(',');
        const url = encodeURI('http://yourfuckingpollingplace.com');

        const params = { text, url, related, via: 'fnpollingplace' };
        const tweetParams = helpers.buildQueryString(params);

        return `https://twitter.com/intent/tweet?${tweetParams}`;
    };

    const buildMap = () => {
        // set variable for correctly cased locationName
        let casedLocationName = '';

        // if locationName exists, make that shit title cased
        if (locationName) {
            casedLocationName = helpers.titlecase(locationName);
        }

        // set up url components to build google maps url
        const components = [
            casedLocationName,
            line1,
            line2 || '',
            city,
            state,
            zip,
        ];

        // build google maps url from components array
        const url =
            'https://maps.google.com/maps?q=' + encodeURI(components.join(' '));

        return url;
    };

    return (
        <div
            className={`locationActions ${
                isActive ? 'locationActions--isActive' : ''
            }`}
        >
            <a
                className="locationActions__btn locationActions__btn--mapBtn"
                // href={buildMap()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onMapItClick}
            >
                Map It
                <i className="locationActions__btnIcon">
                    <MapIcon />
                </i>
            </a>
            <button
                className="locationActions__btn locationActions__btn--facebookBtn"
                type="button"
                onClick={handleFacebookShare}
            >
                Share
                <i className="locationActions__btnIcon">
                    <FacebookIcon />
                </i>
            </button>
            <a
                className="locationActions__btn locationActions__btn--twitterBtn twitter-share-button"
                href={buildTweet()}
            >
                Share
                <i className="locationActions__btnIcon">
                    <TwitterIcon />
                </i>
            </a>
        </div>
    );
};

LocationActions.propTypes = {
    locations: PropTypes.array,
};

export default LocationActions;
