// Import dependencies
import React from 'react';
import PropTypes from 'prop-types';

import { format } from 'date-fns';
import helpers from 'helpers';

import './electionTitle.scss';

const ElectionTitle = (props) => {
    return (
        <div className="electionTitle">
            <div className="electionTitle__date">{format(new Date(props.electionInfo.electionDay), 'MMMM do, yyyy')}</div>
            <h2 className="electionTitle__text">{helpers.fucktify(props.electionInfo.name)}</h2>
        </div>
    );
};

// set up propType validation
ElectionTitle.propTypes = {
    electionInfo: PropTypes.object,
};

export default ElectionTitle;
