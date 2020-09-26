import React from 'react';
import PropTypes from 'prop-types';
import Pager from 'components/Pager/Pager';
import LocationCard from 'components/LocationCard/LocationCard';
import FallbackMessage from 'components/FallbackMessage/FallbackMessage';

const DropOffLocationResults = ({ locations }) => {
    if (!locations.length) {
        return <FallbackMessage message="No fucking drop off results for that address" />;
    }
    return (
        <Pager data={locations}>
            <LocationCard locationType="drop-off" />
        </Pager>
    );
};

DropOffLocationResults.propTypes = {};

export default DropOffLocationResults;
