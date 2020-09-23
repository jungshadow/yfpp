import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import helpers from 'helpers';

import './locationCard.scss';
import LocationActions from './LocationActions';

const LocationCard = ({ data, locationType }) => {
    const { startDate, endDate, address, pollingHours, name } = data;

    const renderEarlyVoteSiteBadge = () => {
        if (locationType === 'early-vote') {
            return (
                <div className="locationCard__badge">
                    <span className="locationCard__badgeTitle">Early Polling Location</span>
                    <span className="locationCard__badgeDate">
                        {moment(startDate).format('MMMM Do')} - {moment(endDate).format('MMMM Do')}
                    </span>
                </div>
            );
        }
    };
    return (
        <div className="locationCard">
            <div className="locationCard__hd">
                {renderEarlyVoteSiteBadge()}
                <h3 className="locationCard__name">{helpers.cleanString(helpers.fucktify(address.locationName || name))}</h3>
            </div>
            <div className="locationCard__bd">
                <div className="locationCard__addressBlock">
                    <div className="locationCard__address locationCard__address--line1">{helpers.lowerCase(address.line1)}</div>
                    <div className="locationCard__address locationCard__address--line2">{helpers.lowerCase(address.line2)}</div>
                    <div className="locationCard__address locationCard__address--cityStateZip">
                        {helpers.lowerCase(address.city)}, {address.state} {address.zip}
                    </div>
                </div>

                <div className="locationCard__hours">
                    <strong>Polling Hours:</strong> {pollingHours}
                </div>
            </div>
            <div className="locationCard__ft">
                <LocationActions location={address} />
            </div>
        </div>
    );
};

LocationCard.propTypes = {};

export default LocationCard;
