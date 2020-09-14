import React from 'react';
import PropTypes from 'prop-types';
import Pager from 'components/Pager/Pager';
import LocationCard from 'components/LocationCard/LocationCard';

const EarlyVoteResults = (props) => {
    return (
        <Pager data={props.locations}>
            <LocationCard locationType="early-vote" />
        </Pager>
    );
};

EarlyVoteResults.propTypes = {};

export default EarlyVoteResults;
