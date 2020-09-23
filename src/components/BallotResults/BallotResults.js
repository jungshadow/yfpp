import React, { useState } from 'react';
import PropTypes from 'prop-types';

import ContestsList from 'components/ContestsList';
import PartySelect from 'components/PartySelect/PartySelect';

import './ballotResults.scss';

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
        <div className="ballotResults">
            <div className="ballotResults__hd">
                <PartySelect onSelect={handleOnFilterChange} primaryParties={props.primaryParties} />
            </div>
            <div className="ballotResults__bd">
                <ContestsList contests={getFilteredContests(props.contests)} />
            </div>
        </div>
    );
};

BallotResults.propTypes = {};

export default BallotResults;
