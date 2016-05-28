// Import dependencies 
import React from 'react';
import ReactDOM from 'react-dom';




/**
 * Candidate Results Component
 *
 * @class CandidateResults
 * @extends React.Component
 */
 class CandidateResults extends React.Component {

    /**
     * Renders candidate results list items
     *
     * @method render
     * @return {object} candidate results component markup
     */
     render() {

        const candidate = this.props.candidate;

        if (!candidate.name) {
            return;
        }

        return (
            <li className="candidate">
                <div>{candidate.name}
                <strong>{candidate.party}</strong></div>
            </li>
            )
     }

    };

    export default CandidateResults;