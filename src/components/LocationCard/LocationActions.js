import React from 'react';
import PropTypes from 'prop-types';

import './locationActions.scss';
import { FacebookIcon, MapIcon } from 'components/Icons';
import TwitterIcon from 'components/Icons/TwitterIcon';
import analytics from 'analytics';
import helpers from 'helpers';
import useWindowSize from 'hooks/useWindowSize';

const LocationActions = ({
    latitude,
    longitude,
    location,
    onMapItClick,
    isActive,
}) => {
    const { state, locationName, city, zip, line1 } = location;
    const windowSize = useWindowSize();

    const isMobile = windowSize.width < 768;

    const handleFacebookShare = e => {
        e.preventDefault();

        function facebook_callback(response) {
            analytics.social_action('facebook', 'post', undefined);
        }

        const shareObj = {
            method: 'feed',
            link:
                'https://yourfuckingpollingplace.com/?utm_source=facebook&utm_medium=social&utm_campaign=YFPP_2020_USER_' +
                state,
            picture:
                'https://yourfuckingpollingplace.com/images/social/social_2x.png',
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
        const url = encodeURI('https://yourfuckingpollingplace.com');

        const params = { text, url, related, via: 'fnpollingplace' };
        const tweetParams = helpers.buildQueryString(params);

        return `https://twitter.com/intent/tweet?${tweetParams}`;
    };

    const buildMap = () => {
        const UA = navigator.userAgent;
        const isLngLat = !!(longitude && latitude);
        const isAppleMobileDevice = /\b(iPad|iPhone|iPod)\b/.test(UA);
        const googleUrl = 'https://www.google.com/maps/search/?api=1&query=';
        const appleUrl = `https://maps.apple.com/${
            isLngLat ? '?ll=' : '?daddr='
        }`;

        // set up url components to build google maps url
        const components = [line1, city, state, zip];

        // figure out if lat/long combination or needs an address
        const queryString = `${
            isLngLat
                ? `${latitude},${longitude}`
                : encodeURI(components.join(' '))
        }`;

        return `${
            isAppleMobileDevice
                ? `${appleUrl}${queryString}&z=20&q=${
                    !!locationName ? `${encodeURI(
                        helpers.titlecase(
                            helpers.fucktify(locationName)
                        ))}` : 'This fucking place'}`
                : `${googleUrl}${queryString}`
        }`;
    };

    return (
        <div
            className={`locationActions ${
                isActive ? 'locationActions--isActive' : ''
            }`}
        >
            {isMobile && (
                <a
                    className="locationActions__btn locationActions__btn--mapBtn"
                    href={buildMap()}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Map It
                    <i className="locationActions__btnIcon">
                        <MapIcon />
                    </i>
                </a>
            )}
            {!isMobile && (
                <button
                    className="locationActions__btn locationActions__btn--mapBtn"
                    onClick={onMapItClick}
                >
                    Map It
                    <i className="locationActions__btnIcon">
                        <MapIcon />
                    </i>
                </button>
            )}
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
    latitude: PropTypes.number,
    longitude: PropTypes.number,
};

export default LocationActions;
