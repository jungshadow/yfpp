import React from 'react';

import CandidateCard from 'components/CandidateCard/CandidateCard';
import ReferendumCard from 'components/ReferendumCard/ReferendumCard';

interface ContestResultsProps {
    data?: { type: string; [key: string]: unknown };
}

function ContestResults({ data }: ContestResultsProps) {
    if (!data) {
        return null;
    }
    return <>{data.type === 'Referendum' ? (
        <ReferendumCard contest={data as Parameters<typeof ReferendumCard>[0]['contest']} />
    ) : (
        <CandidateCard contest={data as Parameters<typeof CandidateCard>[0]['contest']} />
    )}</>;
}

export default ContestResults;
