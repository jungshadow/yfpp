// Import dependencies
import React from 'react';
import PropTypes from 'prop-types';

import CandidateCard from 'components/CandidateCard/CandidateCard';
import ReferendumCard from 'components/ReferendumCard/ReferendumCard';

/**
 * Contest Results Component
 *
 * @class PollingPlaceResults
 * @extends React.Component
 */

function ContestResults(props) {
    const getResults = (contest) => {
        return contest.type === 'Referendum' ? <ReferendumCard contest={contest} /> : <CandidateCard contest={contest} />;
    };

    return <li className={'results_contest ' + props.contest.primaryParty}>{getResults(props.contest)}</li>;
}

// set up propType validation
ContestResults.propTypes = {
    currentContest: PropTypes.object,
    filterBy: PropTypes.string,
};
export default ContestResults;
