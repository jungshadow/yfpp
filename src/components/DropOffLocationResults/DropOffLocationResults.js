import React from 'react';
import PropTypes from 'prop-types';
import Pager from 'components/Pager/Pager';
import LocationCard from 'components/LocationCard/LocationCard';
import FallbackMessage from 'components/FallbackMessage/FallbackMessage';

const DropOffLocationResults = ({ locations, ...additionalProps }) => {
    if (!locations.length) {
        return (
            <FallbackMessage message="No fucking drop off results for that address" />
        );
    }
    return (
        <Pager data={locations} {...additionalProps}>
            <LocationCard locationType="drop-off" />
        </Pager>
    );
};

DropOffLocationResults.propTypes = { locations: PropTypes.array };

export default DropOffLocationResults;
