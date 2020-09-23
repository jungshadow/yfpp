// Import dependencies
import React from 'react';
import PropTypes from 'prop-types';

import CandidateResults from './CandidateResults';
import ReferendumResults from './ReferendumResults';

/**
 * Contest Results Component
 *
 * @class PollingPlaceResults
 * @extends React.Component
 */

function ContestResults(props) {
    const getResults = (contest) => {
        return contest.type === 'Referendum' ? <ReferendumResults contest={contest} /> : <CandidateResults contest={contest} />;
    };

    return <li className={'results_contest ' + props.contest.primaryParty}>{getResults(props.contest)}</li>;
}

// set up propType validation
ContestResults.propTypes = {
    currentContest: PropTypes.object,
    filterBy: PropTypes.string,
};
export default ContestResults;
