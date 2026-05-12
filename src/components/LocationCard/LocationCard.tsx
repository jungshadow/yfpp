import React, { useState, useRef, useContext } from 'react';
import { format } from 'date-fns';
import classnames from 'classnames';

import helpers from 'helpers';
import type { NormalizedAddress } from 'types/api';

import './locationCard.scss';
import LocationActions from './LocationActions';

import Map from 'components/Map/Map';
import { CloseIcon } from 'components/Icons';
import { motion } from 'framer-motion';
import useOutsideClick from 'hooks/useOutsideClick';
import { AppContext } from 'appReducer';

interface LocationCardProps {
    data?: {
        startDate?: string;
        endDate?: string;
        address: {
            locationName?: string;
            line1?: string;
            line2?: string;
            city?: string;
            state?: string;
            zip?: string;
        };
        pollingHours?: string;
        name?: string;
        latitude?: number;
        longitude?: number;
    };
    locationType: string;
    slug?: boolean;
}

const LocationCard = ({ data, locationType, slug }: LocationCardProps) => {
    if (!data) return null;
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
    const locationCardRef = useRef<HTMLDivElement>(null);

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
                        {startDate && format(new Date(startDate), 'MMMM do')} -{' '}
                        {endDate && format(new Date(endDate), 'MMMM do')}
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
        return (
            <ul className="locationCard__hoursList">
                {hoursArray.map((hours, index) => (
                    <li
                        key={`${hours.replace(/\W+/g, '_')}_${index}`}
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
                            latitude={latitude || 0}
                            longitude={longitude || 0}
                            originAddress={helpers.getAddressStringFromObject(
                                normalizedAddress as NormalizedAddress
                            )}
                            destinationAddress={helpers.getAddressStringFromObject(
                                address as NormalizedAddress
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
                            locationCardRef.current!.getBoundingClientRect()
                                .height
                        }px`,
                    }}
                ></div>
            )}
        </>
    );
};

export default LocationCard;
