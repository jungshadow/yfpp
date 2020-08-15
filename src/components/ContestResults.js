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

class ContestResults extends React.Component {
    /**
     * Renders Contest results list items
     *
     * @method render
     * @return {object} polling place results component markup
     */
    render() {
        const currentContest = this.props.currentContest;
        const candidates = currentContest.candidates;

        let candidateList = [];
        let referenda = [];

        let i = 0;

        let refCount = 0;

        if (candidates) {
            candidates.forEach(function(candidate) {
                candidateList.push(<CandidateResults key={i} candidate_id={i} candidate={candidate} />);
                i++;
            });
        }

        if (currentContest.type === 'Referendum') {
            referenda.push(<ReferendumResults key={refCount} referendum={currentContest} />);
            refCount++;
        }

        return (
            <li className={'results_contest ' + currentContest.primaryParty}>
                {(() => {
                    if (currentContest.candidates) {
                        return (
                            <div className="card card_secondary">
                                <span className="card-flag">{currentContest.type}</span>
                                <div className="card-bd">
                                    <div className="group group_md">
                                        <div className="group-hd">
                                            <h3 className="hdg hdg_2 mix-hdg_headline mix-hdg_blue">{currentContest.office}</h3>
                                        </div>
                                        <div className="group-bd">
                                            <ul className="vList vList_divided">{candidateList}</ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    } else {
                        return (
                            <div className="card card_secondary">
                                <span className="card-flag">{currentContest.type}</span>
                                <div className="card-bd">
                                    <h3 className="hdg hdg_3 mix-hdg_headline mix-hdg_blue">{currentContest.referendumTitle}</h3>
                                    {currentContest.referendumText ? <p>{currentContest.referendumText}</p> : ''}
                                </div>
                            </div>
                        );
                    }
                })()}
            </li>
        );
    }
}

// set up propType validation
ContestResults.propTypes = {
    currentContest: PropTypes.object,
    filterBy: PropTypes.string,
};
export default ContestResults;
