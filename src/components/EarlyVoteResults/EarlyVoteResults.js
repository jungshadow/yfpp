import React from 'react';
import PropTypes from 'prop-types';
import Pager from 'components/Pager/Pager';
import LocationCard from 'components/LocationCard/LocationCard';
import FallbackMessage from 'components/FallbackMessage/FallbackMessage';

const EarlyVoteResults = ({ locations }) => {
    if (!locations.length) {
        return <FallbackMessage message="No fucking early voting results for that address" />;
    }
    return (
        <Pager data={locations}>
            <LocationCard locationType="early-vote" />
        </Pager>
    );
};

EarlyVoteResults.propTypes = {};

export default EarlyVoteResults;
