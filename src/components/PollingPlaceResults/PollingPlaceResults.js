import React from 'react';
import PropTypes from 'prop-types';
import Pager from 'components/Pager/Pager';
import LocationCard from 'components/LocationCard/LocationCard';

const PollingPlaceResults = (props) => {
    return (
        <Pager data={props.locations}>
            <LocationCard locationType="polling-place" />
        </Pager>
    );
};

PollingPlaceResults.propTypes = {};

export default PollingPlaceResults;
