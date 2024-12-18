import React, { useState, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classnames from 'classnames';

import helpers from 'helpers';

import './locationCard.scss';
import LocationActions from './LocationActions';

import Map from 'components/Map/Map';
import { CloseIcon } from 'components/Icons';
import { motion } from 'framer-motion';
import useOutsideClick from 'hooks/useOutsideClick';
import { AppContext } from 'appReducer';
import { camelCase } from 'lodash';

const LocationCard = ({ data, locationType, slug }) => {
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
    const locationCardRef = useRef();

    useOutsideClick(locationCardRef, handleCloseMap);
    const { normalizedAddress } = useContext(AppContext);

    const openSpring = { type: 'spring', stiffness: 200, damping: 30 };
    const closeSpring = { type: 'spring', stiffness: 300, damping: 35 };

    const renderEarlyVoteSiteBadge = () => {
        if (locationType === 'early-vote') {
            return (
                <motion.div className="locationCard__badge" layout>
                    <span className="locationCard__badgeTitle">
                        Early Polling Location
                    </span>
                    <span className="locationCard__badgeDate">
                        {moment(startDate).format('MMMM Do')} -{' '}
                        {moment(endDate).format('MMMM Do')}
                    </span>
                </motion.div>
            );
        }
    };

    const handleMapItClick = async () => {
        setIsActive(true);
    };

    function handleCloseMap() {
        setIsActive(false);
    }

    function getCardClassName() {
        return classnames({
            locationCard: true,
            'locationCard--isActive': isActive,
            'locationCard--isSlug': slug,
        });
    }

    function parsePollingHours(hours = '') {
        const hoursArray = hours.split('\n');
        const currentDate = moment().startOf('day');

        const futureHours = hoursArray.filter(hourString => {
            // Extract date string (e.g., "Mon, Sep 23")
            const [datePart] = hourString.split(':');
            // Remove day of week for more reliable parsing
            const dateStr = datePart.split(', ')[1];
            const date = moment(dateStr, 'MMM D');

            // Set year since the date string doesn't include it
            date.year(currentDate.year());

            return date.isSameOrAfter(currentDate);
        });

        return (
            <ul className="locationCard__hoursList">
                {futureHours.map((hours, index) => (
                    <li
                        key={`${camelCase(hours)}_${index}`}
                        className="locationCard__hoursListItem"
                    >
                        {hours}
                    </li>
                ))}
            </ul>
        );
    }

    return (
        <>
            <motion.div
                className={getCardClassName()}
                key={name}
                ref={locationCardRef}
                layoutTransition={isActive ? openSpring : closeSpring}
                layout
            >
                {isActive && (
                    <button
                        className="locationCard__closeBtn"
                        type="button"
                        onClick={handleCloseMap}
                    >
                        <span className="isVisuallyHidden">close</span>
                        <span className="locationCard__closeBtnIcon">
                            <CloseIcon />
                        </span>
                    </button>
                )}
                <motion.div className="locationCard__hd" layout>
                    {renderEarlyVoteSiteBadge()}
                    <motion.h3 className="locationCard__name" layout>
                        {helpers.cleanString(
                            helpers.fucktify(address.locationName || name)
                        )}
                    </motion.h3>
                </motion.div>
                <div className="locationCard__bd">
                    <motion.div className="locationCard__addressBlock" layout>
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
                    </motion.div>

                    <motion.div className="locationCard__hours" layout>
                        <strong>Polling Hours:</strong>
                        {parsePollingHours(pollingHours)}
                    </motion.div>
                </div>
                {isActive && (
                    <motion.div className="locationCard__map" layout>
                        <Map
                            latitude={latitude}
                            longitude={longitude}
                            originAddress={helpers.getAddressStringFromObject(
                                normalizedAddress
                            )}
                            destinationAddress={helpers.getAddressStringFromObject(
                                address
                            )}
                        />
                    </motion.div>
                )}
                <motion.div className="locationCard__ft" layout>
                    <LocationActions
                        location={address}
                        latitude={latitude}
                        longitude={longitude}
                        onMapItClick={handleMapItClick}
                        isActive={isActive}
                    />
                </motion.div>
            </motion.div>
            {isActive && (
                <div
                    className="locationCard locationCard__isSlug"
                    style={{
                        height: `${
                            locationCardRef.current.getBoundingClientRect()
                                .height
                        }px`,
                    }}
                ></div>
            )}
        </>
    );
};

LocationCard.propTypes = {
    data: PropTypes.object,
    locationType: PropTypes.string,
};

export default LocationCard;
