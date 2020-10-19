import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import helpers from 'helpers';

import './locationCard.scss';
import LocationActions from './LocationActions';

import Map from 'components/Map/Map';

const LocationCard = ({ data, locationType }) => {
    const {
        startDate,
        endDate,
        address,
        pollingHours,
        name,
        latitude,
        longitude,
    } = data;
    const [isActive, setIsActive] = useState(false);

    const renderEarlyVoteSiteBadge = () => {
        if (locationType === 'early-vote') {
            return (
                <div className="locationCard__badge">
                    <span className="locationCard__badgeTitle">
                        Early Polling Location
                    </span>
                    <span className="locationCard__badgeDate">
                        {moment(startDate).format('MMMM Do')} -{' '}
                        {moment(endDate).format('MMMM Do')}
                    </span>
                </div>
            );
        }
    };

    const handleMapItClick = async e => {
        console.log(data);
        setIsActive(true);
        console.log('click coord', latitude, longitude);
    };

    return (
        <div className="locationCard">
            <div className="locationCard__hd">
                {renderEarlyVoteSiteBadge()}
                <h3 className="locationCard__name">
                    {helpers.cleanString(
                        helpers.fucktify(address.locationName || name)
                    )}
                </h3>
            </div>
            <div className="locationCard__bd">
                <div className="locationCard__addressBlock">
                    <div className="locationCard__address locationCard__address--line1">
                        {helpers.lowerCase(address.line1)}
                    </div>
                    <div className="locationCard__address locationCard__address--line2">
                        {helpers.lowerCase(address.line2)}
                    </div>
                    <div className="locationCard__address locationCard__address--cityStateZip">
                        {helpers.lowerCase(address.city)}, {address.state}{' '}
                        {address.zip}
                    </div>
                </div>

                <div className="locationCard__hours">
                    <strong>Polling Hours:</strong> {pollingHours}
                </div>
            </div>
            {isActive && (
                <div className="locationCard__map">
                    <Map latitude={latitude} longitude={longitude} />
                </div>
            )}
            <div className="locationCard__ft">
                <LocationActions
                    location={address}
                    onMapItClick={handleMapItClick}
                />
            </div>
        </div>
    );
};

LocationCard.propTypes = {
    data: PropTypes.object,
    locationType: PropTypes.string,
};

export default LocationCard;
