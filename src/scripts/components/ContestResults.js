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
	 	
	 	const currentContest = this.props.currentContest;

	 	const candidates = currentContest.candidates;

	 	var candidateList = [];
	 	
	 	let i = 0;


	 	if (candidates) {

	 		candidates.forEach(function(candidate) {

	 				candidateList.push(<CandidateResults key={i} candidate_id={i} candidate={candidate} />);
	 				
	 				i++;

	 		}.bind(this));

	 	}




	 	return (
	 		<li className={'results_contest ' + currentContest.primaryParty}>
		 		<div className="card card_secondary">
		 			<div className="card-bd">
		 				<h3 className="hdg hdg_3">{currentContest.office}</h3>
		 				<div>{currentContest.type}</div>
		 				<ul className="vList">
		 					{candidateList}
		 				</ul>
		 			</div>
		 		</div>
	 		</li>
	 		)
	 }

	};

	export default ContestResults;