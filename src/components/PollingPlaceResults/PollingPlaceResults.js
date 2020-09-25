import React from 'react';
import PropTypes from 'prop-types';
import Pager from 'components/Pager/Pager';
import LocationCard from 'components/LocationCard/LocationCard';

const PollingPlaceResults = (locations) => {
    if (!locations.length) {
        return null;
    }
    return (
        <Pager data={locations}>
            <LocationCard locationType="polling-place" />
        </Pager>
    );
};

PollingPlaceResults.propTypes = {};

export default PollingPlaceResults;
