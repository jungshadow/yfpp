// Import dependencies
import React from 'react';

import { format } from 'date-fns';
import helpers from 'helpers';

import './electionTitle.scss';

interface ElectionTitleProps {
    electionInfo: { electionDay?: string; name?: string };
}

const ElectionTitle = (props: ElectionTitleProps) => {
    return (
        <div className="electionTitle">
            <div className="electionTitle__date">{format(new Date(props.electionInfo.electionDay || ''), 'MMMM do, yyyy')}</div>
            <h2 className="electionTitle__text">{helpers.fucktify(props.electionInfo.name || '')}</h2>
        </div>
    );
};

export default ElectionTitle;
