import React from 'react';
import PropTypes from 'prop-types';
import Pager from 'components/Pager/Pager';
import LocationCard from 'components/LocationCard/LocationCard';

const DropOffLocationResults = ({ locations }) => {
    if (!locations.length) {
        return null;
    }
    return (
        <Pager data={locations}>
            <LocationCard locationType="drop-off" />
        </Pager>
    );
};

DropOffLocationResults.propTypes = {};

export default DropOffLocationResults;
