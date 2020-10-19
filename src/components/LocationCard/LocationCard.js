import React, { useState, useRef } from 'react';
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

    const handleMapItClick = async e => {
        setIsActive(true);
    };

    function handleCloseMap(e) {
        setIsActive(false);
    }

    function getCardClassName() {
        return classnames({
            locationCard: true,
            'locationCard--isActive': isActive,
            'locationCard--isSlug': slug,
        });
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
                    <h3 className="locationCard__name">
                        {helpers.cleanString(
                            helpers.fucktify(address.locationName || name)
                        )}
                    </h3>
                </motion.div>
                <motion.div className="locationCard__bd" layout>
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
                </motion.div>
                {isActive && (
                    <motion.div className="locationCard__map" layout>
                        <Map latitude={latitude} longitude={longitude} />
                    </motion.div>
                )}
                <div className="locationCard__ft">
                    <LocationActions
                        location={address}
                        onMapItClick={handleMapItClick}
                        isActive={isActive}
                    />
                </div>
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
