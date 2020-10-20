import React, {useState} from 'react';
import PropTypes from 'prop-types';

import ContestsList from 'components/ContestsList/ContestsList';
import PartySelect from 'components/PartySelect/PartySelect';

import './ballotResults.scss';
import FallbackMessage from 'components/FallbackMessage/FallbackMessage';

const BallotResults = ({contests, primaryParties}) => {
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

    if (!contests.length) {
        return <FallbackMessage message="No fucking ballot results for that address" />;
    }

    return (
        <div className="ballotResults">
            <div className="ballotResults__hd">
                <PartySelect onSelect={handleOnFilterChange} primaryParties={primaryParties} />
            </div>
            <div className="ballotResults__bd">
                <ContestsList contests={getFilteredContests(contests)} />
            </div>
        </div>
    );
};

BallotResults.propTypes = {
    contests: PropTypes.array,
    primaryParties: PropTypes.array
};

export default BallotResults;
