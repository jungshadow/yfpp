import React, { useState } from 'react';

import PartySelect from 'components/PartySelect/PartySelect';

import './ballotResults.scss';
import FallbackMessage from 'components/FallbackMessage/FallbackMessage';
import Pager from 'components/Pager/Pager';
import ContestResults from 'components/ContestResults/ContestResults';

import type { Contest } from 'types/index';

interface BallotResultsProps {
    contests: Contest[];
    primaryParties: string[];
}

const BallotResults = ({ contests, primaryParties }: BallotResultsProps) => {
    const [currentPartyFilter, setCurrentPartyFilter] = useState('all');

    const handleOnFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrentPartyFilter(e.target.value);
    };

    const getFilteredContests = (contests: Contest[]) => {
        if (currentPartyFilter !== 'all') {
            return contests.filter(contest => contest.primaryParty === currentPartyFilter);
        }
        return contests;
    };

    if (!contests.length) {
        return <FallbackMessage message="No fucking ballot results for that address" />;
    }

    return (
        <div className="ballotResults">
            <div className="ballotResults__hd">
                <PartySelect onSelect={handleOnFilterChange} primaryParties={primaryParties} />
            </div>
            <div className="ballotResults__bd">
                <Pager data={getFilteredContests(contests)}>
                    <ContestResults />
                </Pager>
            </div>
        </div>
    );
};

export default BallotResults;
