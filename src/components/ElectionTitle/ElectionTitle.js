// Import dependencies
import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import helpers from 'helpers';

import './electionTitle.scss';

const ElectionTitle = (props) => {
    return (
        <div className="electionTitle">
            <div className="electionTitle__date">{moment(props.electionInfo.electionDay).format('MMMM Do, YYYY')}</div>
            <h2 className="electionTitle__text">{helpers.fucktify(props.electionInfo.name)}</h2>
        </div>
    );
};

// set up propType validation
ElectionTitle.propTypes = {
    electionInfo: PropTypes.object,
};

export default ElectionTitle;
