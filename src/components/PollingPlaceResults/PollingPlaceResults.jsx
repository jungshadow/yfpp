import React from 'react';
import PropTypes from 'prop-types';
import Pager from 'components/Pager/Pager';
import LocationCard from 'components/LocationCard/LocationCard';
import FallbackMessage from 'components/FallbackMessage/FallbackMessage';

const PollingPlaceResults = ({ locations }) => {
    const fallbackMessage = (
        <p>
            <strong>We didn't get any fucking polling place results</strong>,
            but check with your local election official if you think you should
            have some.
        </p>
    );
    if (!locations.length) {
        return <FallbackMessage message={fallbackMessage} />;
    }
    return (
        <Pager data={locations} numberPerPage={5}>
            <LocationCard locationType="polling-place" />
        </Pager>
    );
};

PollingPlaceResults.propTypes = {
    locations: PropTypes.array.isRequired,
};

export default PollingPlaceResults;
