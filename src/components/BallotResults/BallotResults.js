import React, { useState } from 'react';
import PropTypes from 'prop-types';

import PartySelect from 'components/PartySelect/PartySelect';

import './ballotResults.scss';
import FallbackMessage from 'components/FallbackMessage/FallbackMessage';
import Pager from 'components/Pager/Pager';
import ContestResults from 'components/ContestResults/ContestResults';

const BallotResults = ({ contests, primaryParties }) => {
    const [currentPartyFilter, setCurrentPartyFilter] = useState('all');

    const handleOnFilterChange = e => {
        setCurrentPartyFilter(e.target.value);
    };

    const getFilteredContests = contests => {
        if (currentPartyFilter !== 'all') {
            return contests.filter(
                contest => contest.primaryParty === currentPartyFilter
            );
        }
        return contests;
    };

    if (!contests.length) {
        return (
            <FallbackMessage message="No fucking ballot results for that address" />
        );
    }

    return (
        <div className="ballotResults">
            <div className="ballotResults__hd">
                <PartySelect
                    onSelect={handleOnFilterChange}
                    primaryParties={primaryParties}
                />
            </div>
            <div className="ballotResults__bd">
                <Pager data={getFilteredContests(contests)}>
                    <ContestResults />
                </Pager>
            </div>
        </div>
    );
};

BallotResults.propTypes = {
    contests: PropTypes.array,
    primaryParties: PropTypes.array,
};

export default BallotResults;
