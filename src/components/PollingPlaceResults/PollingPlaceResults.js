import React from 'react';
import PropTypes from 'prop-types';
import Pager from 'components/Pager/Pager';
import LocationCard from 'components/LocationCard/LocationCard';
import FallbackMessage from 'components/FallbackMessage/FallbackMessage';

const PollingPlaceResults = ({ locations }) => {
    if (!locations.length) {
        return <FallbackMessage message="No fucking polling place results for that address" />;
    }
    return (
        <Pager data={locations} numberPerPage={5}>
            <LocationCard locationType="polling-place" />
        </Pager>
    );
};

PollingPlaceResults.propTypes = {};

export default PollingPlaceResults;
