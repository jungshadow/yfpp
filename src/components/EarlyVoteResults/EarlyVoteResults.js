import React from 'react';
import PropTypes from 'prop-types';
import Pager from 'components/Pager/Pager';
import LocationCard from 'components/LocationCard/LocationCard';

const EarlyVoteResults = ({ locations }) => {
    if (!locations.length) {
        return null;
    }
    return (
        <Pager data={locations}>
            <LocationCard locationType="early-vote" />
        </Pager>
    );
};

EarlyVoteResults.propTypes = {};

export default EarlyVoteResults;
