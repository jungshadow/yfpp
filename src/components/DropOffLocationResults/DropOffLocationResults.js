import React from 'react';
import PropTypes from 'prop-types';
import Pager from 'components/Pager/Pager';
import LocationCard from 'components/LocationCard/LocationCard';

const DropOffLocationResults = (props) => {
    return (
        <Pager data={props.locations}>
            <LocationCard locationType="drop-off" />
        </Pager>
    );
};

DropOffLocationResults.propTypes = {};

export default DropOffLocationResults;
