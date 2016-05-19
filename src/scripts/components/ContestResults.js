// Import dependencies 
import React from 'react';
import ReactDOM from 'react-dom';
import autobind from 'autobind-decorator';

import CandidateResults from './CandidateResults';

@autobind
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

	 	const contests = this.props.contests;

	 	const candidates = contests.candidates;

	 	

	 	var rows = [];
	 	let i = 0;

	 	
	 	if (candidates) {
	 		candidates.forEach(function(candidate) {

	 			if (this.props.filterBy === 'all') {

	 				rows.push(<CandidateResults key={i} candidate_id={i} candidate={candidate} />);
	 				i++;

	 				return;
	 			} else if (candidate.party && candidate.party.toLowerCase().indexOf(this.props.filterBy) === -1 ) {
	 				
	 				return;
	 			} else {
	 				rows.push(<CandidateResults key={i} candidate_id={i} candidate={candidate} />);
	 				i++;
	 			}



	 		}.bind(this));

	 	}




	 	return (
	 		<li className="results_contest">
	 		<h3 className="hdg hdg_3">{contests.office}</h3>
	 		<div>{contests.type}</div>
	 		<ul className="vList">
	 		{rows}
	 		</ul>
	 		</li>
	 		)
	 }

	};

	export default ContestResults;