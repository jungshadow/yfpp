// Import dependencies
import React from 'react';
import PropTypes from 'prop-types';

import CandidateCard from 'components/CandidateCard/CandidateCard';
import ReferendumCard from 'components/ReferendumCard/ReferendumCard';

function ContestResults({ data }) {
    if (!data && !data.length) {
        return null;
    }
    const getResults = data => {
        return data.type === 'Referendum' ? (
            <ReferendumCard contest={data} />
        ) : (
            <CandidateCard contest={data} />
        );
    };

    return <>{getResults(data)}</>;
}

ContestResults.propTypes = {
    currentContest: PropTypes.object,
    filterBy: PropTypes.string,
};
export default ContestResults;
