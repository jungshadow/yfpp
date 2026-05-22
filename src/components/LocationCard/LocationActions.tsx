import React from 'react';

import './locationActions.scss';
import { MapIcon } from 'components/Icons';
import helpers from 'helpers';
import useWindowSize from 'hooks/useWindowSize';

interface LocationActionsProps {
    latitude?: number;
    longitude?: number;
    location: {
        state?: string;
        locationName?: string;
        city?: string;
        zip?: string;
        line1?: string;
    };
    onMapItClick: () => void;
    isActive: boolean;
}

const LocationActions = ({
    latitude,
    longitude,
    location,
    onMapItClick,
    isActive,
}: LocationActionsProps) => {
    const { state, locationName, city, zip, line1 } = location;
    const windowSize = useWindowSize();

    const isMobile = windowSize.width < 768;

    const buildMap = () => {
        const UA = navigator.userAgent;
        const isLngLat = !!(longitude && latitude);
        const isAppleMobileDevice = /\b(iPad|iPhone|iPod)\b/.test(UA);
        const googleUrl = 'https://www.google.com/maps/search/?api=1&query=';
        const appleUrl = `https://maps.apple.com/${isLngLat ? '?ll=' : '?daddr='}`;

        // set up url components to build google maps url
        const components = [line1, city, state, zip];

        // figure out if lat/long combination or needs an address
        const queryString = `${
            isLngLat ? `${latitude},${longitude}` : encodeURI(components.join(' '))
        }`;

        return `${
            isAppleMobileDevice
                ? `${appleUrl}${queryString}&z=20&q=${
                      locationName
                          ? `${encodeURI(helpers.titlecase(helpers.fucktify(locationName)))}`
                          : 'This fucking place'
                  }`
                : `${googleUrl}${queryString}`
        }`;
    };

    return (
        <div className={`locationActions ${isActive ? 'locationActions--isActive' : ''}`}>
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
        </div>
    );
};

export default LocationActions;
