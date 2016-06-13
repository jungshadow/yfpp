// Import dependencies 
import React from 'react';
import ReactDOM from 'react-dom';

/**
 * Referendum Results Component
 *
 * @class ReferendumResults
 * @extends React.Component
 */
class ReferendumResults extends React.Component {

    /**
     * Renders referendum results list items
     *
     * @method render
     * @return {object} referendum results component markup
     */
    render() {
        const referendum = this.props.referendum;

        if (!referendum.referendumTitle) {
            return;
        }

        return (
            <div className="referendum">
	        {referendum.referendumText ? <p>{referendum.referendumText}</p> : ''}
                {referendum.referendumUrl ? <a href={referendum.referendumUrl} target="_blank">Learn More</a> : '' }
            </div>
        );
    }

};

export default ReferendumResults;
