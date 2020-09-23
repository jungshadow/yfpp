import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PartySelect from 'components/PartySelect';
import ContestsList from 'components/ContestsList';

const BallotResults = (props) => {
    const [currentPartyFilter, setCurrentPartyFilter] = useState('all');

    const handleOnFilterChange = (e) => {
        setCurrentPartyFilter(e.target.value);
    };

    const getFilteredContests = (contests) => {
        if (currentPartyFilter !== 'all') {
            return contests.filter((contest) => contest.primaryParty === currentPartyFilter);
        }
        return contests;
    };

    return (
        <div>
            <PartySelect onSelect={handleOnFilterChange} primaryParties={props.primaryParties} />
            <ContestsList contests={getFilteredContests(props.contests)} />
        </div>
    );
};

BallotResults.propTypes = {};

export default BallotResults;
