// Import dependencies
import React from 'react';
import ReactDOM from 'react-dom';

import moment from 'moment'

import helpers from '../helpers';

/**
 * ElectionTitle Component
 *
 * @class ElectionTitle
 * @extends React.Component
 */
class ElectionTitle extends React.Component {
    /**
     * Renders election information markup
     *
     * @method render
     * @return {object} ElectionTitle component markup
     */
    render() {
        return (
            <div className="election-title">
                <h4 className="hdg hdg_3 mix-hdg_centered mix-hdg_uppercase mix-hdg_headline">{helpers.fucktify(this.props.electionInfo.name)} &mdash; {moment(this.props.electionInfo.electionDay).format('MMMM Do, YYYY')}</h4>
            </div>
        )
    }
};

// set up propType validation
ElectionTitle.propTypes = {
    electionInfo: React.PropTypes.object
}

export default ElectionTitle;
